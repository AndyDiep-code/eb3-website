# UI TEST CASES MODE - Generate from Locators

Generate UI test cases from captured locators and feature description.

## Overview

This mode generates comprehensive UI test cases by analyzing captured locators, element interactions, and feature requirements. Creates test cases for form submissions, navigation flows, button clicks, and validation scenarios.

## Terminal Output Standards

Define these color variables at the start of ALL bash execution in this mode:

```bash
CYAN='\033[1;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
RED='\033[0;31m'; GRAY='\033[0;90m'; WHITE='\033[1;37m'; NC='\033[0m'
```

Print this header block first:

```bash
echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  Test Cases — UI Mode                ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
```

For every step, follow this pattern:

```bash
echo -e "${YELLOW}⏳ [X/8] Step description...${NC}"    # before
echo -e "${GREEN}✅ [X/8] Step description${NC}"        # after success
echo -e "${RED}❌ [X/8] Step description — FAILED${NC}"  # on failure
echo -e "${GRAY}   ℹ  Per-page: {PageName} — N cases${NC}" # per-page progress
```

At STEP 8, output the following as **Claude text response**:

```
**🎉 UI test cases generated**

| | |
|---|---|
| **Task** | {TASK_ID} |
| **Pages** | {PAGE_COUNT} |
| **Test cases** | {CASE_COUNT} |
| **Output** | `./test-tasks/playwright/{task-id}/test-cases/` |

→ **Next:** `/qakit:playwright:test-cases-promote --task={TASK_ID}` → `/qakit:playwright:generate-pom --task={TASK_ID}` → `/qakit:playwright:automate`
```

## Prerequisites

- Task exists: `./test-tasks/playwright/{task-id}/`
- Locators captured: `./test-tasks/playwright/{task-id}/locators/`

## Step-by-Step Process

### STEP 1: Parse Input
Extract `--task=TASK-ID` (REQUIRED). If missing, ask user via AskUserQuestion.
Extract `--page=PAGE-NAME` (optional, default: all pages in task).

### STEP 2: Validate Task
- Check `test-tasks/playwright/{task-id}/` exists. If not: STOP — "Task not found. Run /qakit:playwright:task first."
- Run: `ls test-tasks/playwright/{task-id}/locators/` → get page list
- If `--page` provided: verify that page exists in task's locators dir
- If `--page` not provided: use ALL pages in task locators dir
- Log: `ℹ  Task: {TASK_ID} | Pages: {N} — {PageName}, {PageName}, ...`
- If no locators: STOP — "No locators found. Run /qakit:playwright:capture first."

### STEP 3: Read Context (thorough — read ALL available sources)

Goal: understand the full UI, business logic, and user workflows before generating any test cases.

**3a. Locators (task workspace — read for EVERY page)**

For each page:
- `test-tasks/playwright/{task-id}/locators/{PageName}/locators.md` → element names, refs, selectors
- `test-tasks/playwright/{task-id}/locators/{PageName}/aria-snapshot.yaml` → ARIA tree for accessibility context
- `test-tasks/playwright/{task-id}/locators/{PageName}/metadata.json` → page URL, capture timestamp, state info
- `test-tasks/playwright/{task-id}/locators/{PageName}/screenshot-*.png` → visual context — read ALL screenshots sorted by name. Use `ls test-tasks/playwright/{task-id}/locators/{PageName}/screenshot-*.png 2>/dev/null | sort` to enumerate, then view each image.

**3b. Business docs — task workspace first, KB fallback**

For each page, try task workspace first:
- `test-tasks/playwright/{task-id}/docs/{PageName}/business-context.md`
- `test-tasks/playwright/{task-id}/docs/{PageName}/user-flows.md`
- `test-tasks/playwright/{task-id}/docs/{PageName}/data-model.md`

If task workspace docs missing (docs-generate not yet run), fall back to KB:
- `tests/playwright/docs/pages/{PageName}/business-context.md`
- `tests/playwright/docs/pages/{PageName}/user-flows.md`
- `tests/playwright/docs/pages/{PageName}/data-model.md`

Log: `ℹ  Docs source: task-workspace` or `ℹ  Docs source: KB fallback (docs-generate not run)`

**3c. Features KB (always from KB — feature-level is cross-task)**

If `tests/playwright/docs/features/` exists, read feature-level docs:
- `tests/playwright/docs/features/{feature-name}/overview.md`
- `tests/playwright/docs/features/{feature-name}/user-journeys.md`

**3d. App source code (if repo is available — scout for deeper business context)**

If an app repo is available alongside the task workspace, scout for:
- Feature files: `src/features/`, `app/features/`, `lib/features/`
- Page/screen files: `src/pages/`, `src/screens/`, `src/views/`
- Business logic: `src/services/`, `src/store/`, `src/hooks/`
- Route definitions: `src/router/`, `app/routes/`

Use Grep/Glob to find relevant files. Read key ones for business rules not captured in docs.

**3e. Summarize before generating**

After reading all sources, write a brief internal summary:
```
Pages to cover: [list]
Key user flows: [list from user-flows.md]
Validation rules: [list from data-model.md]
Business rules: [list from business-context.md]
```
This ensures test cases reflect real business behavior, not just visible UI.

### STEP 4: Analyze Elements

Using data gathered in Step 3, identify testable interactions per page:
- Form submissions (required fields, validation rules from data-model)
- Navigation flows (flows from user-flows.md)
- Button clicks and state changes
- Input validations (rules from data-model.md)
- Error states and empty states
- Conditional displays (business rules from business-context.md)
- Edge cases from data boundaries

### STEP 5: Generate Test Cases

**⚠️ NAVIGATION RULE — MANDATORY:**

Test steps MUST describe real user navigation behavior. Never write "Navigate to URL" for non-entry-point pages.

**Format for navigation steps:**
- Always include `[SourcePage]` context prefix so automate skill knows which POM provides the click
- Format: `[SourcePage] Click | elementName | Description`

```markdown
# ❌ WRONG — URL navigation, no source context
| 1 | Navigate to | https://staging.enoverse.app/notifications | Page loads |
| 1 | Navigate to | https://staging.enoverse.app/app/attendance | Page loads |

# ✅ CORRECT — click navigation with source page context
| 1 | [HomePage] Click | notificationsTabButton | Navigate to /notifications |
| 2 | [NotificationPage] Verify visible | notificationsHeading | Heading shown |

| 1 | [HomePage] Click | attendanceAppCard | Navigate to /app/attendance |
| 2 | [AttendancePage] Verify visible | attendanceTab | Tab shown |
```

**Entry point classification** (from Page Classification Table in automate/guides/code-generation.md):
- ✅ Entry points (goto() ok): `LoginWithMicrosoftPage`, `HomePage`
- ❌ Navigation-only: all other pages — MUST use click steps with `[SourcePage]` prefix

See: `references/guides/test-case-generation-rules.md` for full navigation table.

**⚠️ MANDATORY FORMAT — do NOT use any other format:**

Every `test-cases.md` file MUST follow `references/formats/ui-test-case-template.md` exactly.

**File header** (once per file):
```markdown
# Test Cases: {PageName}

| Field | Value |
|-------|-------|
| Generated | {YYYY-MM-DD} |
| Page | {PageName} |
| URL | {page_url} |
| Module | {module_name} |
| Total Cases | {count} |
| Scope | {one-line scope description} |
```

**Per test case** (each `## TC-...` section):
```markdown
## TC-{TYPE}-{NUM}: {Title}

| Field | Value |
|-------|-------|
| Priority | High / Medium / Low |
| Type | Positive / Negative / Edge / Validation |
| Category | Navigation / Form Submission / Validation / etc. |
| Module | {module_name} |
| Tags | smoke, regression |

### Test Steps

| Step | Action | Element | Expected Result |
|------|--------|---------|-----------------|
| 1 | Navigate to | {URL} | Page loads |
| 2 | Verify visible | {ElementName} [ref=eX] | Element displayed |
| 3 | Click | {ElementName} [ref=eX] | Action performed |
| 4 | Fill | {ElementName} [ref=eX] | Value accepted |
| 5 | Verify result | {ElementName} [ref=eX] | Expected outcome |

### Elements

| Name | Ref | Selector |
|------|-----|----------|
| {ElementName} | eX | `{playwright_selector}` |

### Expected Results

- Result bullet 1
- Result bullet 2
```

**Element naming rules:**
- Use the `name` from `locators.md` (e.g., `inOfficeStatGroup`, `attendanceTab`)
- Include `[ref=eX]` from locators.md in the Element column
- Selector = primary locator from locators.md

**Type prefix for TC ID** (per-page files):
- `TC-HP-{NUM}` → Positive / Happy path
- `TC-NEG-{NUM}` → Negative
- `TC-EDGE-{NUM}` → Edge case
- `TC-VAL-{NUM}` → Validation

For each page generate:
- Positive test cases (happy path)
- Negative test cases (invalid inputs)
- Edge cases (boundary values)
- Validation tests (required fields)

### STEP 6: Write Output

**Output structure:** See `references/formats/output-structure.md` (canonical — do not redefine here).

Per-page files to create:
- `test-tasks/playwright/{task-id}/test-cases/pages/{PageName}/test-cases.md`
- `test-tasks/playwright/{task-id}/test-cases/pages/{PageName}/test-data.json`
- Update `test-tasks/playwright/{task-id}/test-cases/README.md`

### STEP 6.5: Generate Feature-Level Test Cases

**Precondition — check before running:**

At least one of these must be true:
- `tests/playwright/docs/features/` exists with at least one subfolder, OR
- `tests/playwright/docs/features/_proposal.md` exists, OR
- `feature.md` contains explicit multi-page flow descriptions

**If no precondition is met:**
→ Skip this step entirely
→ Log: `⏭ Step 6.5 skipped — no feature docs found`
→ Proceed to STEP 7

**If precondition is met**, follow these sub-steps:

#### 6.5a — Enumerate ALL feature folders (MANDATORY)

Run this shell command and store the result as `FEATURE_LIST`:

```bash
ls tests/playwright/docs/features/ | grep -v "^_"
```

Log the full list:
```
ℹ  Features found: {N}
   - {feature-1}
   - {feature-2}
   - {feature-N}
```

**This is the authoritative list. Do NOT add or remove features — generate for every folder listed.**

#### 6.5b — For EACH feature in FEATURE_LIST

For **every** feature in `FEATURE_LIST`, execute in order:

**1. Read feature docs:**
- `tests/playwright/docs/features/{feature-name}/overview.md` → scope, purpose
- `tests/playwright/docs/features/{feature-name}/user-journeys.md` → step-by-step flows
- `tests/playwright/docs/features/{feature-name}/page-map.md` → pages involved
- `tests/playwright/docs/features/{feature-name}/data-model.md` → data fields (if exists)

**2. Generate test cases file:**

Output: `test-tasks/playwright/{task-id}/test-cases/features/{feature-name}/test-cases.md`

Template per test case:
```markdown
## TC-F-{NUM}: {Flow name}

| Field | Value |
|-------|-------|
| Feature | {feature-name} |
| Pages | {PageA} → {PageB} → {PageC} |
| Type | Integration / Positive |
| Priority | P0 |
| Tags | smoke, e2e |

**Steps:**
1. [{PageA}] {action}
2. [{PageB}] {action}
3. [{PageC}] {verify}

**Expected:** {end-to-end outcome}
```

Rules:
- Only generate flows that span at least 2 pages (reference `page-map.md`)
- Base flows on `user-journeys.md` — do NOT invent flows
- Focus on critical business flows (P0/P1)
- Reference actual locator names from per-page `locators.md` files

**3. Log progress after each feature:**
```
✅ feature/{feature-name} — N test cases written
```

#### 6.5c — Verify output completeness

After generating ALL features, verify:

```bash
ls test-tasks/playwright/{task-id}/test-cases/features/ | wc -l
```

Expected count = `len(FEATURE_LIST)`.

If count < `len(FEATURE_LIST)`:
→ Log which features are missing
→ Generate the missing ones before continuing

### STEP 7: Update Task README

Update `test-tasks/playwright/{task-id}/README.md`:
- Mark "Test Cases" as ✅ Done

### STEP 8: Show Summary
```
✅ Generated UI test cases (draft)
📁 Output: ./test-tasks/playwright/{task-id}/test-cases/
📄 Pages: {page_count}
🗂  Features: {feature_count} / {expected_feature_count} (must be equal — see STEP 6.5c)
🧪 Test Cases: {total_count}
   Pages: {page_tc_count}
   Features: {feature_tc_count}
   Positive: X
   Negative: Y
   Edge Cases: Z
   Validation: W
```

## Test Case Categories

### Positive Cases (Happy Path)
- Valid form submission
- Successful navigation
- Correct element visibility
- Expected user flows

### Negative Cases
- Invalid inputs
- Missing required fields
- Unauthorized access
- Error message display

### Edge Cases
- Boundary values
- Special characters
- Long inputs
- Concurrent actions

### Validation Cases
- Field format validation
- Required field validation
- Cross-field validation
- Business rule validation

## Example Output

```
✅ Generated UI test cases
📁 Output: ./test-tasks/playwright/task-001/test-cases/
📄 Pages: 2 (LoginPage, DashboardPage)
🧪 Test Cases: 12
   Positive: 4
   Negative: 5
   Edge Cases: 2
   Validation: 1
```

## Related Documentation

[See: UI Test Case Template](../formats/ui-test-case-template.md)
[See: Test Case Generation Rules](../guides/test-case-generation-rules.md)
