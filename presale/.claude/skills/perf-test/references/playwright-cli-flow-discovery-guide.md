# playwright-cli Flow Discovery Guide

How to execute `--flow` steps using `playwright-cli snapshot` to auto-discover UI elements.
Works for **any web project** — no hardcoded selectors needed.

## Core Concept

For each `--flow` step, the skill:
1. Takes a fresh snapshot of the current page
2. Matches the step description against ARIA elements in the snapshot
3. Translates to the best `playwright-cli` command
4. Executes and continues

## Element Matching from ARIA Snapshot

`playwright-cli snapshot` returns ARIA-structured output:

```yaml
- textbox "Email address" [ref=e11]
- textbox "Password" [ref=e13]
- button "Sign in" [ref=e15]
- button "Add to cart" [ref=e54]
- link "Checkout" [ref=e88]
```

### Matching Rules

| Step description | Matches ARIA | playwright-cli command |
|-----------------|-------------|----------------------|
| `"email field"` | `textbox "Email*"` | `fill '#email-input' value` |
| `"username"` | `textbox "Username"` | `fill '#username' value` |
| `"login button"` | `button "Login"` or `button "Sign in"` | `click '#login-button'` |
| `"add to cart"` | first `button "Add to cart"` | `click '[data-action=add-to-cart]'` |
| `"submit"` | `button[type=submit]` | `click '[type=submit]'` |
| `"#css-selector"` | Use directly as CSS selector | no snapshot needed |

**Priority order for resolution:**
1. If description starts with `#`, `.`, `[`, `/` → treat as CSS/XPath selector directly
2. Match against `textbox`, `button`, `link` ARIA roles by label similarity
3. Match by visible text content
4. Fall back to `input[type=text]`, `button[type=submit]` etc.

## Executing a `--flow` Step by Step

```bash
SESSION="perf-flow-$$"
STATE_FILE="/tmp/perf-state-$SESSION.json"
AUDIT_PAGES=()

playwright-cli -s=$SESSION open "$BASE_URL" 2>/dev/null

for step in "${FLOW_STEPS[@]}"; do
  ACTION=$(echo "$step" | jq -r 'keys[0]')
  
  case "$ACTION" in
    fill)
      DESCRIPTION=$(echo "$step" | jq -r '.fill')
      VALUE=$(echo "$step" | jq -r '.value')
      # Snapshot → find selector
      SNAPSHOT=$(playwright-cli -s=$SESSION snapshot 2>/dev/null)
      SELECTOR=$(resolve_selector "$DESCRIPTION" "$SNAPSHOT")
      playwright-cli -s=$SESSION fill "$SELECTOR" "$VALUE" 2>/dev/null
      ;;
      
    click)
      DESCRIPTION=$(echo "$step" | jq -r '.click')
      SNAPSHOT=$(playwright-cli -s=$SESSION snapshot 2>/dev/null)
      SELECTOR=$(resolve_selector "$DESCRIPTION" "$SNAPSHOT")
      playwright-cli -s=$SESSION click "$SELECTOR" 2>/dev/null
      ;;
      
    goto)
      URL=$(echo "$step" | jq -r '.goto')
      playwright-cli -s=$SESSION goto "$URL" 2>/dev/null
      ;;
      
    audit)
      # Record current page URL for Lighthouse audit
      CURRENT_URL=$(playwright-cli -s=$SESSION snapshot 2>/dev/null | grep "Page URL" | awk '{print $NF}')
      AUDIT_PAGES+=("$CURRENT_URL")
      ;;
      
    wait)
      SELECTOR=$(echo "$step" | jq -r '.wait')
      playwright-cli -s=$SESSION snapshot 2>/dev/null  # just wait for stable state
      ;;
  esac
done

# Save state for Lighthouse
playwright-cli -s=$SESSION state-save "$STATE_FILE" 2>/dev/null
playwright-cli -s=$SESSION close 2>/dev/null
```

## resolve_selector Logic

```bash
resolve_selector() {
  local DESCRIPTION="$1"
  local SNAPSHOT="$2"
  
  # Direct CSS/XPath selector
  if [[ "$DESCRIPTION" =~ ^[#\.\[\//] ]]; then
    echo "$DESCRIPTION"
    return
  fi
  
  local DESC_LOWER=$(echo "$DESCRIPTION" | tr '[:upper:]' '[:lower:]')
  
  # Textbox matching
  if [[ "$DESC_LOWER" =~ email|username|user.name|login.field ]]; then
    echo $(echo "$SNAPSHOT" | grep -i 'textbox.*[Ee]mail\|textbox.*[Uu]ser' | grep -o 'ref=e[0-9]*' | head -1 | sed 's/ref=/[/;s/$/]/')
    return
  fi
  
  if [[ "$DESC_LOWER" =~ password|pass ]]; then
    echo $(echo "$SNAPSHOT" | grep -i 'textbox.*[Pp]assword\|input.*password' | grep -o 'ref=e[0-9]*' | head -1 | sed 's/ref=/[/;s/$/]/')
    [ -z "$RESULT" ] && echo '[type=password]'
    return
  fi
  
  # Button matching — find by label similarity  
  if [[ "$DESC_LOWER" =~ login|sign.in|submit ]]; then
    echo '[type=submit]'
    return
  fi
  
  if [[ "$DESC_LOWER" =~ add.to.cart|add.*cart ]]; then
    # First "Add to cart" button
    echo $(echo "$SNAPSHOT" | grep -i 'button.*[Aa]dd to cart' | head -1 | grep -o 'ref=e[0-9]*' | head -1 | sed 's/ref=/[/;s/$/]/')
    return
  fi
  
  if [[ "$DESC_LOWER" =~ checkout ]]; then
    echo $(echo "$SNAPSHOT" | grep -i 'button.*[Cc]heckout\|link.*[Cc]heckout' | head -1 | grep -o 'ref=e[0-9]*' | head -1 | sed 's/ref=/[/;s/$/]/')
    return
  fi
  
  # Generic: find button/link with matching text
  echo $(echo "$SNAPSHOT" | grep -i "button.*${DESCRIPTION}\|link.*${DESCRIPTION}" | head -1 | grep -o 'ref=e[0-9]*' | head -1 | sed 's/ref=/[/;s/$/]/')
}
```

## Extract Cookies from Saved State

```bash
# After state-save, extract Cookie header for Lighthouse
COOKIE=$(node -e "
  const s = JSON.parse(require('fs').readFileSync('$STATE_FILE','utf8'));
  const c = (s.cookies||[]).filter(c => c.domain.includes('$DOMAIN'))
    .map(c => c.name+'='+c.value).join('; ');
  process.stdout.write(c);
" 2>/dev/null)
```

## Real-world Examples

### E-commerce checkout flow
```json
[
  {"fill": "email",    "value": "user@test.com"},
  {"fill": "password", "value": "pass123"},
  {"click": "login"},
  {"click": "add to cart"},
  {"goto": "/cart"},
  {"audit": true},
  {"click": "checkout"},
  {"audit": true}
]
```

### SaaS dashboard flow
```json
[
  {"fill": "#email",    "value": "admin@company.com"},
  {"fill": "#password", "value": "admin123"},
  {"click": "[type=submit]"},
  {"wait": ".dashboard"},
  {"audit": true},
  {"goto": "/reports"},
  {"audit": true},
  {"goto": "/settings"},
  {"audit": true}
]
```

### App with dropdown selection
```json
[
  {"fill": "username", "value": "john"},
  {"fill": "password", "value": "pass"},
  {"click": "login"},
  {"select": "country", "value": "Vietnam"},
  {"click": "confirm"},
  {"goto": "/profile"},
  {"audit": true}
]
```

## Error Handling

- **Element not found**: Log warning, try snapshot again after 2s, retry once
- **Navigation timeout**: Check current URL, continue if already on target page
- **Login failed** (still on login page after click): Report BLOCKED — wrong credentials or selector

## playwright-cli Reference

```bash
playwright-cli -s=SESSION open URL          # open browser
playwright-cli -s=SESSION snapshot          # get ARIA snapshot of current page
playwright-cli -s=SESSION fill SEL VALUE    # fill input
playwright-cli -s=SESSION click SEL         # click element
playwright-cli -s=SESSION goto URL          # navigate
playwright-cli -s=SESSION select SEL VALUE  # dropdown
playwright-cli -s=SESSION state-save FILE   # save cookies + localStorage
playwright-cli -s=SESSION close             # close browser
```
