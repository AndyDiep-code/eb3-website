# Playwright Explore — Execution Guide

This is the ONLY source of truth for all execution phases. Read all phases before starting.

---

## PHASE 1 — Setup

### STEP 1.1 — Parse and validate

Extract all arguments from user input.

- If `--url` missing → STOP: `"Missing required --url. Usage: /playwright-explore --url=https://app.com --task=TASK-123"`
- If `--task` missing → STOP: `"Missing required --task. Usage: /playwright-explore --url=https://app.com --task=TASK-123"`
- Set `max_depth` = `--depth` value or `2`
- Set `output_mode` = `--output` value or `"full"`
- Set `base_domain` = domain extracted from `--url` (e.g. `app.com`)
- Set `project_name` = `--project` value or derive from base_domain (e.g. `app-com`)

### STEP 1.2 — Prepare directories

```bash
mkdir -p test-tasks/playwright/{TASK_ID}/locators
mkdir -p test-tasks/playwright/{TASK_ID}/screenshots
mkdir -p tests/playwright/docs/pages
mkdir -p tests/playwright/docs/features
mkdir -p tests/playwright/docs/app
```

Write a README in the locators root:

```bash
cat > test-tasks/playwright/{TASK_ID}/locators/README.md << EOF
# Locators — {TASK_ID}

Captured by playwright-explore on {YYYY-MM-DD}.
Each sub-directory contains aria-snapshot.yaml, locators.md, and metadata.json for one page.
EOF
```

### STEP 1.3 — Initialize state (in-memory tracking)

```
visited_urls  = Set()   # normalized plain URLs — used to prevent re-queuing (STEP 3.3, 4.6)
visited_keys  = Set()   # "url::h1" composite keys — used for SPA page dedup (STEP 4.2)
queue         = []      # { label, url, ref, depth, parent_page }
captured_pages = []     # { page_name, url, depth }
page_count    = 0
MAX_PAGES     = 50
```

---

## PHASE 2 — Authentication

### STEP 2.1 — Open browser

**If `--auth-file` provided, load session state before navigating:**
```bash
playwright-cli open
playwright-cli state-load {--auth-file path}
playwright-cli goto {URL}
sleep 2
playwright-cli snapshot
```

**Otherwise (no auth-file):**
```bash
playwright-cli open {URL}
sleep 2
playwright-cli snapshot
```

### STEP 2.2 — Detect login requirement

Analyze ARIA snapshot for login indicators:
- Contains `textbox` with name/label matching: email, password, username, user, pass
- Contains `heading` with text: "Login", "Sign in", "Log in", "Sign In"
- Contains a `button` with text: "Login", "Sign in", "Log in"

If login form detected → proceed to STEP 2.3.
If no login form → skip to PHASE 3.

### STEP 2.3 — Authenticate

**If `--auth=user:pass` provided:**
1. Find email/username field ref from ARIA snapshot
2. Find password field ref
3. Find submit button ref

```bash
playwright-cli fill {email_ref} "{username_from_auth}"
playwright-cli fill {password_ref} "{password_from_auth}"
playwright-cli click {submit_ref}
sleep 3
```

**If `--auth-file` provided:**
Session state was already loaded in STEP 2.1 before navigation. Verify by taking a snapshot — if no login form visible, auth succeeded. Skip to STEP 2.4.

**If no auth provided but login form detected:**
Ask user via AskUserQuestion:
- Question: "App requires login. Provide credentials:"
- Options: "Enter credentials", "Skip auth (explore public pages only)"
- If credentials provided → use as `--auth` and proceed above
- If skip → continue without login (public pages only)

### STEP 2.4 — Verify auth success

```bash
playwright-cli snapshot
```

If login form still visible → STOP: `"Authentication failed. Check credentials and retry."`

Take note of current URL and H1. Add to both tracking sets:
- `visited_urls.add(normalized_url)`
- `visited_keys.add(normalized_url + "::" + h1_text)`

---

## PHASE 3 — Navigation Discovery

### STEP 3.1 — Capture landing page first

Before building the nav queue, capture the landing page itself:

```bash
playwright-cli eval "document.querySelector('h1')?.textContent?.trim() || document.title"
mkdir -p test-tasks/playwright/{TASK_ID}/locators/{PageName}
playwright-cli snapshot --filename=test-tasks/playwright/{TASK_ID}/locators/{PageName}/aria-snapshot.yaml
playwright-cli screenshot --filename=test-tasks/playwright/{TASK_ID}/screenshots/{PageName}.png
```

Derive `current_page_name` from H1 or title (PascalCase, no special chars).
Add to both tracking sets:
- `visited_urls.add(normalized_url)`
- `visited_keys.add(normalized_url + "::" + h1_text)`

Record in `captured_pages`.
Then follow STEP 4.4d (locators.md) and STEP 4.5 (docs-generate) for this page.

### STEP 3.2 — Analyze navigation structure

From current ARIA snapshot, identify all navigable elements in this priority order:

**Priority 1 — Semantic nav containers:**
- Children of `[role=navigation]`
- Children of `[role=menubar]` or `[role=menu]`
- Links inside `<nav>` or `<aside>` elements

**Priority 2 — Tab navigation:**
- Items in `[role=tablist]`
- Tab elements with `[role=tab]`

**Priority 3 — List-based navigation:**
- `link` elements inside `list` containers that appear to be navigation menus
- Links grouped in sidebar-like patterns

**Priority 4 — Fallback — any internal links:**
- All `link` elements with same-domain hrefs
- Filter: skip external, skip `#`, skip file downloads, skip auth pages

For each found item, extract:
- `label` — text content or aria-label (use for page naming)
- `url` — href if available (absolute or relative, resolve to absolute)
- `ref` — ARIA ref (e.g. `e15`) for click if no href

Apply `--focus` filter if provided: keep only items whose label contains the focus string (case-insensitive).

### STEP 3.3 — Build initial queue

For each discovered nav item whose URL is not already in `visited_urls` (use plain URL check):
```
queue.push({ label, url, ref, depth: 1, parent: "root" })
```

If queue is empty after filtering:
→ Report: `"No navigation items discovered. Captured landing page only."`
→ Skip to PHASE 5.

Report to user:
```
🔍 Navigation discovered: {N} top-level sections
   → {label_1}, {label_2}, {label_3}, ...
   Starting exploration (depth={max_depth}, max_pages={MAX_PAGES})
```

---

## PHASE 4 — BFS Page Capture Loop

Process `queue` one item at a time (breadth-first). For each `item = { label, url, ref, depth, parent_page }`:

### STEP 4.1 — Navigate to page

If `url` available (absolute URL):
```bash
playwright-cli goto {url}
sleep 2
playwright-cli snapshot
```

If only `ref` available (SPA, no href):
```bash
playwright-cli click {ref}
sleep 2
playwright-cli snapshot
```

### STEP 4.2 — Deduplication check

Get actual current URL and page heading:
```bash
playwright-cli eval "window.location.href"
playwright-cli eval "document.querySelector('h1, [role=heading]')?.textContent?.trim() || document.title"
```

Normalize URL:
- Strip `#hash` fragments
- Strip pagination params: `?page=`, `?p=`, `?offset=`
- Keep meaningful query params (e.g. `?tab=settings` defines a distinct view)

**Deduplication logic (handles both regular and SPA apps):**

Compute composite key: `visited_key = "{normalized_url}::{h1_text}"`

- If `visited_key` is in `visited_keys` → **SKIP** (same page already captured — works for both regular and SPA)
- If `page_count >= MAX_PAGES` → **STOP loop**, report max reached

Add `normalized_url` to `visited_urls` (prevents re-queuing this URL).
Add `visited_key` to `visited_keys` (prevents re-capturing this page).
Increment `page_count`.

### STEP 4.3 — Determine page name

Reuse `h1_text` already fetched in STEP 4.2. Attempt in order:
1. Use `h1_text` from STEP 4.2 if non-empty
2. `playwright-cli eval "document.title.split('|')[0].split('-')[0].trim()"`
3. Derive from URL path: last meaningful segment (e.g. `/users/management` → "UserManagement")
4. Fall back to queue item's `label`

Sanitize name:
- Remove special chars, convert to PascalCase
- E.g. "User Management" → "UserManagement", "settings/profile" → "SettingsProfile"
- If name already in `captured_pages` → append index suffix (e.g. "Dashboard2")

### STEP 4.4 — Capture page artifacts

**a) Create per-page directory first:**
```bash
mkdir -p test-tasks/playwright/{TASK_ID}/locators/{PageName}
```

**b) ARIA snapshot — write directly to per-page subdir:**
```bash
playwright-cli snapshot --filename=test-tasks/playwright/{TASK_ID}/locators/{PageName}/aria-snapshot.yaml
```

**c) Screenshot:**
```bash
playwright-cli screenshot --filename=test-tasks/playwright/{TASK_ID}/screenshots/{PageName}.png
```

**d) ⛔ MUST — Extract locators and write locators.md (do NOT skip):**

**First, read the ARIA snapshot that was just saved:**

```
Read("test-tasks/playwright/{TASK_ID}/locators/{PageName}/aria-snapshot.yaml")
```

From the ARIA content just read, extract all **interactive** elements with their **actual refs**. Use the exact ref values shown in the snapshot. Do NOT use refs from memory or previous runs.

This file is **required** by `playwright-docs-generate`. Missing it will cause STEP 4.5 to skip this page silently.

Follow the format defined in `references/locators-format.md`:

```
Read(".claude/skills/playwright-explore/references/locators-format.md")
```

**e) Save metadata:**

Write `test-tasks/playwright/{TASK_ID}/locators/{PageName}/metadata.json`:
```json
{
  "pageName": "{PageName}",
  "url": "{current_url}",
  "title": "{page_title}",
  "capturedAt": "{ISO_timestamp}",
  "depth": {depth},
  "parentPage": "{parent_page}",
  "taskId": "{TASK_ID}"
}
```

**f) Verify all 3 required files exist before continuing:**

```bash
BASE="test-tasks/playwright/{TASK_ID}/locators/{PageName}"
[ -f "$BASE/aria-snapshot.yaml" ] || echo "❌ MISSING: aria-snapshot.yaml — re-run snapshot"
[ -f "$BASE/locators.md" ]        || echo "❌ MISSING: locators.md — extract from ARIA snapshot now"
[ -f "$BASE/metadata.json" ]      || echo "❌ MISSING: metadata.json — write metadata now"
```

If any file is missing → **stop, create the missing file, then continue**. Never proceed to STEP 4.5 with incomplete capture.

### STEP 4.5 — Generate business docs

**Before generating, read these inputs:**

```
Read("test-tasks/playwright/{TASK_ID}/locators/{PageName}/aria-snapshot.yaml")
Read("test-tasks/playwright/{TASK_ID}/locators/{PageName}/locators.md")
Read("test-tasks/playwright/{TASK_ID}/locators/{PageName}/metadata.json")
```

Generate docs from the actual content just read — not from prior knowledge of the app. The ARIA snapshot is the ground truth for what exists on this page.

Follow the `playwright-docs-generate` skill procedure for this page.

Read: `Read(".claude/skills/playwright-docs-generate/references/execution-guide.md")`

Generate with `--task={TASK_ID} --page={PageName} --doc=all`.

Write to **both** destinations (always overwrite):

**Dest 1 — QA Working Docs:**
```
test-tasks/playwright/{TASK_ID}/docs/{PageName}/
├── business-context.md
├── user-flows.md
└── data-model.md
```

**Dest 2 — Persistent KB:**
```
tests/playwright/docs/pages/{PageName}/
├── business-context.md
├── user-flows.md
└── data-model.md
```

Both must be written. Never skip Dest 1.

### STEP 4.6 — Sub-navigation discovery (if depth allows)

If `depth < max_depth`:

From current page ARIA snapshot, look for **secondary navigation** not yet in queue:
- Tab lists (`[role=tablist]`) — each tab is a sub-page
- Sub-menu items revealed by this page
- "Views" or secondary section links specific to this feature
- Pagination — skip (same page)
- Action buttons — skip

For each discovered sub-item:
- Resolve URL (absolute)
- If URL not in `visited_urls` → `queue.push({ label, url, ref, depth: depth+1, parent_page: PageName })`

### STEP 4.7 — Log progress

```
✓ [{page_count}/{estimated_total}] {PageName} captured
  URL: {url}
  Depth: {depth}
```

Record in `captured_pages`: `{ page_name: PageName, url: normalized_url, depth }`

---

## PHASE 5 — Documentation Synthesis

### STEP 5.1 — Validate capture results

If `captured_pages` is empty → STOP: `"No pages captured. Verify app is accessible at {URL} and auth is correct."`

Report:
```
📄 Capture complete: {N} pages
   {list of captured page names}
```

If `--skip-synthesis` flag is set → skip to PHASE 6.

### STEP 5.2 — Feature synthesis

Invoke `playwright-feature-synthesize` with auto-detect:

Read: `Read(".claude/skills/playwright-feature-synthesize/references/synthesis.md")`

Use `--auto-detect` mode. **Clustering algorithm — apply in order:**

1. **Read all user-flows.md files** in `tests/playwright/docs/pages/` — look for cross-page navigation signals: "navigates to", "redirects to", "opens", "proceeds to". Pages that navigate to each other belong in the same feature.
2. **Group by URL/path patterns**: pages sharing URL prefixes (e.g. `/surveys/*`) belong together.
3. **Group by shared data model fields**: pages sharing the same entities (e.g. `surveyTitle`) are likely the same feature.
4. **Name each feature** from the dominant concept in its pages (e.g. `survey-lifecycle`, `analytics-monitoring`).
5. Auto-cluster without user confirmation (fully autonomous).
6. For each detected feature: generate feature KB docs (`overview.md`, `user-journeys.md`, `data-model.md`, `page-map.md`).
7. If `--confirm-synthesis` flag is set → present proposed groupings via AskUserQuestion before proceeding.

Output: `tests/playwright/docs/features/{FeatureName}/`

### STEP 5.3 — App synthesis

Invoke `playwright-app-synthesize`:

Read: `Read(".claude/skills/playwright-app-synthesize/references/synthesis.md")`

Run `--doc=all`.

Output: `tests/playwright/docs/app/`

---

## PHASE 6 — Test Case Generation

If `--output=kb-only` → skip this phase entirely.

### STEP 6.1 — Determine project name

- Use `--project` if provided
- Otherwise derive from `base_domain`: strip TLD and convert to title case (e.g. `staging.myapp.com` → `myapp`)

### STEP 6.2 — Generate test cases via qa-docs

Invoke the `qa-docs` skill with:
```
--source=qakit:tests/playwright/docs
--project="{project_name}"
--type=all
```

Output (QAKit source mode generates `qakit.*` not `all.*`):
- `qa-docs/{project}/test-plan.md`
- `qa-docs/{project}/test-cases/qakit.md`
- `qa-docs/{project}/test-cases/qakit.csv` (Testmo-ready)
- `qa-docs/{project}/test-summary.md`

---

## PHASE 7 — Final Report

```
## ✅ Explore Complete

App:     {--url value}
Task:    {TASK_ID}
Pages:   {N} captured
Depth:   {max_depth}

### Pages Captured
| Page | URL | Depth |
|------|-----|-------|
| {PageName} | {url} | {depth} |
...

### Output
| Artifact | Location |
|----------|----------|
| Locators & ARIA | test-tasks/playwright/{TASK_ID}/locators/ |
| Screenshots | test-tasks/playwright/{TASK_ID}/screenshots/ |
| Page KB docs | tests/playwright/docs/pages/ |
| Feature KB docs | tests/playwright/docs/features/ |
| App KB docs | tests/playwright/docs/app/ |
| Test plan | qa-docs/{project}/test-plan.md |
| Test cases (MD) | qa-docs/{project}/test-cases/qakit.md |
| Test cases (CSV) | qa-docs/{project}/test-cases/qakit.csv |
| Test summary | qa-docs/{project}/test-summary.md |

### Next Steps
1. Review test cases → qa-docs/{project}/test-cases/qakit.md
2. Import to Testmo → qakit.csv
3. Promote to automation → /playwright-test-cases-promote
4. Run automation → /playwright-automate + /playwright-execute
```

---

## Output Directory Structure

```
test-tasks/playwright/{TASK_ID}/
├── locators/
│   ├── README.md
│   └── {PageName}/
│       ├── aria-snapshot.yaml
│       ├── locators.md
│       └── metadata.json
└── screenshots/
    └── {PageName}.png

tests/playwright/docs/
├── pages/
│   └── {PageName}/
│       ├── business-context.md
│       ├── user-flows.md
│       └── data-model.md
├── features/
│   └── {FeatureName}/
│       ├── overview.md
│       ├── user-journeys.md
│       ├── data-model.md
│       └── page-map.md
└── app/
    ├── overview.md
    ├── sitemap.md
    ├── feature-map.md
    ├── navigation-flow.md
    └── data-model.md

qa-docs/{project}/
├── test-plan.md
├── test-summary.md
└── test-cases/
    ├── qakit.md
    └── qakit.csv
```

---

## Error Handling

| Error | Recovery |
|-------|----------|
| `playwright-cli` not found | `"Install playwright-cli: npm install -g @playwright/mcp@latest"` → stop |
| URL not reachable | `"App unreachable at {url}. Ensure app is running."` → stop |
| Auth fails after 1 retry | `"Auth failed. Check credentials."` → stop |
| No nav items found | Capture landing page only → continue to synthesis |
| Single page capture fails | Log warning, skip page, continue with queue |
| MAX_PAGES reached | Report pages processed so far, continue to synthesis |
| Synthesis fails | Report which step failed, output what was completed so far |
| 0 pages captured total | `"No pages captured. Check URL and auth."` → stop |
