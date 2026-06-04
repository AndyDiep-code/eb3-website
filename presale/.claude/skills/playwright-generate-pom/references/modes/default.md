# DEFAULT MODE — Generate Page Objects from Locators

Generate TypeScript Page Object files for all pages (or specific page) from the locator KB.

## Terminal Output Standards

```bash
CYAN='\033[1;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
RED='\033[0;31m'; GRAY='\033[0;90m'; WHITE='\033[1;37m'; NC='\033[0m'

echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   QAKit — Generate POM               ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
```

## Prerequisites

- `tests/playwright/docs/locators/{PageName}/locators.md` must exist
- Run `/qakit:playwright:docs-generate` first if missing (populates KB locators)

## Variables

```
LOCATORS_ROOT    = ./tests/playwright/docs/locators
AUTOMATION       = ./tests/playwright
PAGES_OUTPUT     = {AUTOMATION}/pages
PAGE_FILTER      = {--page argument, or * for all}
LOCATOR_STRATEGY = {--locator argument: "primary" (default) | "fallback"}
```

## Step-by-Step Process

### STEP 1: Parse Input
Extract optional `--page` and optional `--locator`. No `--task` required.

- `--locator=primary` (default) → use **Primary Locator** column in constructor
- `--locator=fallback` → use **Fallback Locator** column (XPath) in constructor
- If `--locator` not provided → default to `primary`

### STEP 2: Validate Locators
- List page folders under `{LOCATORS_ROOT}` (`./tests/playwright/docs/locators/`)
- If `--page` specified → verify `{LOCATORS_ROOT}/{PageName}/locators.md` exists
- If no pages found → stop: `❌ No locators found in KB. Run /qakit:playwright:docs-generate first.`

### STEP 2.5: Conflict Detection (for each page in scope)

Before generating, check if the output POM file already exists:

```bash
KEBAB_NAME=$(echo "{PageName}" | sed 's/Page$//' | sed 's/\([A-Z]\)/-\1/g' | sed 's/^-//' | tr '[:upper:]' '[:lower:]')
POM_PATH="{PAGES_OUTPUT}/${KEBAB_NAME}.page.ts"
[ -f "$POM_PATH" ] && echo "exists" || echo "not_found"
```

**If `not_found`:** Proceed — no conflict.

**If `exists`:** Use `AskUserQuestion` before generating:

```
header: "POM Conflict"
question: "{POM_PATH} already exists. What do you want to do?"
options:
  - label: "Overwrite"
    description: "Replace the entire file. Existing custom methods will be lost."
  - label: "Merge"
    description: "Keep existing file, append only NEW methods not already present."
  - label: "Skip"
    description: "Keep existing file as-is. Do not regenerate this page."
```

- **Overwrite** → proceed to STEP 3 (write entire file)
- **Merge** → after STEP 5, read existing POM, extract existing method names, append only new methods
- **Skip** → log `ℹ  Skipped {PageName} — existing POM kept` → next page

### STEP 3: Read Locators
For each page in scope:
- Read `./tests/playwright/docs/locators/{PageName}/locators.md`
- Parse element table: Name, Role, Primary Locator, Fallback Locator, Description
- Identify element types: input, button, link, text, checkbox, etc.
- **Select locator column based on `LOCATOR_STRATEGY`:**
  - `primary` → use **Primary Locator** column for constructor (default)
  - `fallback` → use **Fallback Locator** column (XPath) for constructor
  - Log: `ℹ  Locator strategy: {LOCATOR_STRATEGY}`

**Flutter Web `getByText` locator rule** *(skip if app is not Flutter Web):*

Flutter Web ARIA renders stat/count groups as **separate label + number elements**, NOT as one combined element:

```yaml
# Flutter ARIA structure (NOT one element)
- generic: Total request 1
  - generic: Total request   ← label element
  - generic: 1               ← number element (separate!)
```

When generating `getByText` locators from locators.md:

```typescript
// ❌ WRONG — no single element contains "Total request 1"
page.getByText(/Total request \d/)   // regex won't find any element
page.getByText('Total request 1')    // exact text doesn't exist

// ✅ CORRECT — target the label element only (without the number)
page.getByText('Total request')      // matches label element exactly
page.getByText('Pending')
page.getByText('Approved')
```

**Rule:** For Flutter stat/count elements (e.g. `Total request 1`, `Pending 0`, `In Office 138`):
- Use `getByText('label only')` — strip the number from the locator string
- Never use regex with `\d` expecting "label + number" in one element

### STEP 4: Determine Actions per Element

Map element types to Page Object methods:

| Element Type | Methods Generated |
|-------------|-------------------|
| button | `click{ElementName}()` |
| textbox / input | `fill{ElementName}(value)`, `get{ElementName}Value()` |
| link | `click{ElementName}()` |
| checkbox | `check{ElementName}()`, `uncheck{ElementName}()`, `is{ElementName}Checked()` |
| select/dropdown | `select{ElementName}(value)` |
| any | `isVisible{ElementName}()`, `waitFor{ElementName}()` |

### STEP 5: Generate Page Object File

**Before generating any code**, read the format template:

`Read(".claude/skills/playwright-generate-pom/references/formats/page-object-template.md")`

This file is the ONLY source of truth for POM class structure, method naming, and TypeScript format.

**Filename conversion rule** (apply before writing file):
1. Strip trailing `Page` suffix from PageName if present (e.g. `HomePage` → `Home`, `AttendancePage` → `Attendance`)
2. Convert PascalCase to kebab-case (e.g. `LoginWithMicrosoft` → `login-with-microsoft`)
3. Lowercase everything, keep existing hyphens (e.g. `Microsoft-Auth` → `microsoft-auth`)

Examples:
- `HomePage` → `home.page.ts` (class stays `HomePage`)
- `LoginWithMicrosoft` → `login-with-microsoft.page.ts` (class: `LoginWithMicrosoftPage`)
- `AttendancePage` → `attendance.page.ts` (class: `AttendancePage`)
- `Microsoft-Auth` → `microsoft-auth.page.ts` (class: `MicrosoftAuthPage`)

For each page, generate `{PAGES_OUTPUT}/{kebab-name}.page.ts` following `references/formats/page-object-template.md`.

**Constructor locator selection:**
- If `LOCATOR_STRATEGY = primary` → use Primary Locator column value in `this.{element} = page.{primaryLocator}`
- If `LOCATOR_STRATEGY = fallback` → use Fallback Locator column value in `this.{element} = page.{fallbackLocator}`
- Example with `--locator=fallback`:
  ```typescript
  // Instead of: this.saveButton = page.getByRole('button', { name: 'Save' });
  this.saveButton = page.locator('xpath=//button[normalize-space()="Save"]');
  ```

**Entry-point detection before generating navigation methods:**

Read `./tests/playwright/docs/locators/{PageName}/metadata.json` to get the page URL.

- `url == "/"` or starts with `"/login"` → **Entry point**: generate `goto()` only (URL-based)
- Any other path → **Navigation-only**: generate both `goto()` + `navigateTo()` per the Navigation Pattern in `page-object-template.md`

Navigation path: infer from page URL and element names in `locators.md` — use the nav element that leads to this page.

If `{PAGES_OUTPUT}/base.page.ts` does not exist → create it from `assets/base.page.template.ts`.

### STEP 6: TypeScript Verify + Summary

Run from automation path:
```bash
npx tsc --noEmit 2>&1 | grep -E "error TS|\.ts\("
```

- If clean → ✅ proceed to summary
- If errors → fix and re-verify

Output as **Claude text response**:

```
**🎉 Page Objects generated**

| | |
|---|---|
| **Pages** | {PAGE_COUNT} |
| **Output** | `./tests/playwright/pages/` |

Methods available per page:
{list of generated methods}

→ **Next:** `/qakit:playwright:test-cases` → promote → `/qakit:playwright:automate`
```

## Error Handling

| Situation | Action |
|-----------|--------|
| Locators dir missing | Stop: run `/qakit:playwright:docs-generate` first |
| locators.md empty | Skip page, log warning |
| TypeScript errors | Fix automatically, re-verify |
| Page already exists | Ask user: Overwrite / Merge / Skip (see STEP 2.5) |
