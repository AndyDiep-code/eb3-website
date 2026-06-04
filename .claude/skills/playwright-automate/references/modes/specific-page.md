# SPECIFIC PAGE MODE - Generate Test Specs for One Page

Generate test specs for only one specified page, using existing Page Objects.

## Overview

Use this mode when the user wants incremental Playwright UI automation generation.

This mode generates:

- Page Objects for all valid pages in the task
- UI test specs for only the selected page
- test data updates for only the selected page
- fixture updates for the generated output

## Key Principle

All Page Objects are generated for the full task, not just the selected page.

This is required because the selected page's test flow may depend on other pages. For example, a dashboard test may still require the login page object for setup steps.

## Terminal Output Standards

Define these color variables at the start of ALL bash execution in this mode:

```bash
CYAN='\033[1;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
RED='\033[0;31m'; GRAY='\033[0;90m'; WHITE='\033[1;37m'; NC='\033[0m'
```

Print this header block first:

```bash
echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  Playwright Automate — Specific Page ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
```

For every step, follow this pattern:

```bash
echo -e "${YELLOW}⏳ [X/16] Step description...${NC}"    # before
echo -e "${GREEN}✅ [X/16] Step description${NC}"        # after success
echo -e "${RED}❌ [X/16] Step description — FAILED${NC}"  # on failure
echo -e "${GRAY}   ℹ  Per-file: {FileName}.page.ts${NC}"  # per-file progress
```

At STEP 16, output the following as **Claude text response**:

```
**🎉 Automation code generated (Specific Page)**

| | |
|---|---|
| **Task** | {TASK_ID} |
| **Page** | {PAGE_NAME} (specs only) |
| **Page Objects** | all pages included |
| **Output** | `./tests/playwright/tests/ui/pages/{PAGE_NAME}/` |

→ **Next:** `/qakit:playwright:execute --task={TASK_ID} --page={PAGE_NAME}`
```

## Expected Inputs

This mode expects:

- a valid Playwright task ID
- a valid page name
- Page Objects already generated: `./tests/playwright/pages/{kebab-name}.page.ts` (kebab-case, see generate-pom)
- Test cases promoted: `./tests/playwright/test-cases/pages/{PageName}/`
- manual test cases for one or more pages
- an initialized Playwright automation project

## Step-by-Step Process

### STEP 1: Resolve Required Input

Resolve:

- `TASK_ID`
- `TARGET_PAGE`
- `AUTH_STATE` (optional)

#### Task ID
- Extract `--task={task-id}` if provided.
- If missing, ask the user: `Please provide the Task ID (for example: test-001):`
- Store the response as `TASK_ID`.
- If the user does not provide a task ID, stop.

#### Page Name
- Extract `--page={page-name}` if provided.
- If missing, ask the user: `Please provide the page name (for example: DashboardPage):`
- Store the response as `TARGET_PAGE`.
- If the user does not provide a page name, stop.

#### Auth State (Optional)
- If provided:
  - Validate the file exists at `.auth/{filename}` (relative to `AUTOMATION_PATH`)
  - If not found, warn: `⚠️ Auth state file not found: .auth/{filename} — proceeding without auth state`
  - If found, store as `AUTH_STATE={filename}`
- If NOT provided, ask the user:
  `Do you want to use a saved authentication state? (Yes/No)`
  - If "Yes": ask `Enter auth state filename (e.g., admin-auth.json):`
    - Validate that `.auth/{filename}` exists
    - If not found, warn and proceed without auth state
    - If found, store as `AUTH_STATE={filename}`
  - If "No": set `AUTH_STATE` to empty (proceed without auth state, tests include login steps)

### STEP 2: Build Task Paths

Set:

- `TEST_CASES_ROOT=./tests/playwright/test-cases`

### STEP 3: Validate Task Structure

Verify that all required task directories exist:

- `{TASK_ROOT}`
- `{TEST_CASES_ROOT}`

If any required directory is missing:
- print: `❌ Task {TASK_ID} not found or incomplete`
- stop execution

### STEP 4: Resolve Page Set

Determine the full page set for Page Object generation.

- List page folders under `{AUTOMATION_PATH}/pages
- List page folders under `{TEST_CASES_ROOT}`

Build:

- `PAGE_SET` = pages that have both locator data and test-case data

If `PAGE_SET` is empty:
- print: `❌ No pages found with both locators and test cases`
- stop execution

### STEP 5: Validate Target Page

Verify that `TARGET_PAGE` exists in both:

- `{AUTOMATION_PATH}/pages
- `{TEST_CASES_ROOT}/{TARGET_PAGE}`

If the selected page is missing required input:
- print: `❌ Page {TARGET_PAGE} not found or incomplete`
- stop execution

### STEP 6: Resolve Automation Path

Determine the Playwright automation project path.

- Read `./test-tasks/playwright/qakit.config.json` if it exists
- If it exists, use `automationPath`
- Otherwise, use the default: `./tests/playwright`

Store as:

- `AUTOMATION_PATH`

### STEP 7: Verify Automation Project

Verify that the target Playwright automation project is initialized.

Required checks:

- `{AUTOMATION_PATH}` exists
- `{AUTOMATION_PATH}/package.json` exists

If the automation project is missing:
- print: `❌ Automation project not initialized`
- print: `Run the Playwright initialization command first`
- stop execution

### STEP 7: Read Page Object Methods

For each page in scope:
- Compute `{kebab-name}` from `{PageName}` (strip trailing Page, PascalCase→kebab)
- Read `{AUTOMATION_PATH}/pages/{kebab-name}.page.ts`
- Extract available method signatures for use in spec generation

### STEP 9: Generate Test Specs for the Target Page Only

Generate or update UI test specs for `TARGET_PAGE` only.

Inputs:

- `{TEST_CASES_ROOT}/pages/{TARGET_PAGE}/test-cases.md`

Output:

- `{AUTOMATION_PATH}/tests/ui/pages/{TARGET_PAGE}/test-cases.spec.ts`

Generation rules:

- Create the page test folder if needed
- If the spec file does not exist, create it
- If the spec file already exists, append only new test cases
- Do not duplicate existing test cases
- Generate tests using the page object for `TARGET_PAGE`
- Allow generated test flow to reference other page objects if the scenario depends on them
- Map manual steps into Playwright actions and assertions using the shared generation rules

For test spec rules, see:

- [../guides/code-generation.md](../guides/code-generation.md)
- [../guides/action-mapping.md](../guides/action-mapping.md)
- [../guides/aaa-pattern.md](../guides/aaa-pattern.md)
- [../formats/test-spec-template.md](../formats/test-spec-template.md)
- [../formats/tag-system.md](../formats/tag-system.md)

### STEP 10: Generate Test Data (per-task)

Generate task-isolated test data file for `TARGET_PAGE`.

Input:

- `{TEST_CASES_ROOT}/{TARGET_PAGE}/test-data.json` if it exists

Output:

- `{AUTOMATION_PATH}/support/test-data-{TASK_ID}.ts`

Rules:

- Write data for this task into a single per-task file: `support/test-data-{TASK_ID}.ts`
- Do NOT write to or merge into `support/test-data.ts` (shared file — multi-contributor conflict risk)
- If the per-task file already exists, update it without duplicating existing exports
- Preserve existing valid typed structures where possible
- Spec files for this task must import from `support/test-data-{TASK_ID}` (not `support/test-data`)

If `test-data.json` does not exist:
- continue without failure

### STEP 11: Update Fixtures

Update the Playwright fixtures registration.

Target file:

- `{AUTOMATION_PATH}/tests/fixtures/index.ts`

Rules:

- import all generated page objects that are needed
- register missing fixtures
- do not duplicate existing imports or fixture definitions
- preserve valid existing fixture code

### STEP 12: Verify Generated Output

Verify that generation completed successfully.

Confirm all of the following:

- page object files were created or updated for all pages in `PAGE_SET`
- the test spec file was created or updated for `TARGET_PAGE`
- fixture registration was updated successfully
- `support/test-data-{TASK_ID}.ts` was created/updated successfully if target-page test data existed

**TypeScript compile check (MANDATORY):**

After all files are written, run TypeScript type checking from `{AUTOMATION_PATH}`:

```bash
cd {AUTOMATION_PATH} && npx tsc --noEmit 2>&1 | grep -E "error TS|\.ts\("
```

- If **no output** → ✅ TypeScript valid, continue
- If **errors found** → ❌ Fix ALL type errors before proceeding (do not skip)
  - Common causes: wrong property names, missing imports, type mismatches
  - Fix the error, re-run `tsc --noEmit`, repeat until clean

This catches naming mismatches between test data constants and spec files before the user runs tests.

If verification fails for required generated output:
- print a clear error
- stop and report partial generation status

### STEP 13: Set Auth State Environment Variable

If `AUTH_STATE` is set (non-empty):

- Set `PLAYWRIGHT_AUTH_STATE=.auth/{AUTH_STATE}` as an environment variable before running any test commands
- print: `🔐 Using auth state: .auth/{AUTH_STATE}`

If `AUTH_STATE` is empty:
- Do not set `PLAYWRIGHT_AUTH_STATE`
- Tests will run with their default auth setup (including login steps)

### STEP 15: Optional Visual Baseline Update

If the caller explicitly requested visual baseline update:

- change directory to `{AUTOMATION_PATH}`
- run the visual baseline update command with `PLAYWRIGHT_AUTH_STATE` set if `AUTH_STATE` is non-empty
- print: `📸 Visual baselines created or updated`

If visual update fails:
- log a warning
- continue with generation success reporting

### STEP 16: Show Summary

Print a concise summary.

Include:

- `✅ Generated automation code`
- `📁 Output: {AUTOMATION_PATH}/`
- `📄 Page Objects: {count} (new: X, updated: Y) - all valid pages`
- `📄 Test Specs: 1 (new: X, updated: Y) - {TARGET_PAGE} only`
- `🧪 Test Cases: {count}`

Then show next steps:

```text
Run tests:
  cd {AUTOMATION_PATH}
  npx playwright test --grep @page:{TARGET_PAGE}
```

## Error Handling

### Fatal Errors

Stop execution for any of the following:

- missing task ID after prompting
- missing page name after prompting
- task structure missing or incomplete
- no valid pages with both locators and test cases
- selected page missing required locator or test-case input
- automation project not initialized
- page object generation fails for a required page
- test spec generation fails for the selected page
- output verification fails

### Non-Fatal Errors

Log a warning and continue for any of the following:

- optional page metadata missing
- optional target-page `test-data.json` missing
- optional visual baseline update fails


For shared error handling guidance, see:

- [../guides/error-handling.md](../guides/error-handling.md)

## Example Output

```text
✅ Generated automation code
📁 Output: ./tests/playwright/
📄 Page Objects: 3 (new: 3, updated: 0) - all valid pages
📄 Test Specs: 1 (new: 1, updated: 0) - DashboardPage only
🧪 Test Cases: 5

Run tests:
  cd ./tests/playwright
  npx playwright test --grep @page:DashboardPage
```

## Output Structure

```text
./tests/playwright/
├── pages/
│   ├── base.page.ts
│   ├── login.page.ts
│   ├── home.page.ts
│   └── dashboard.page.ts
├── tests/
│   ├── ui/
│   │   └── pages/
│   │       └── DashboardPage/
│   │           └── test-cases.spec.ts
│   └── fixtures/
│       └── index.ts
└── support/
    └── test-data-{task-id}.ts
```

## Notes

- This mode always generates Page Objects for all valid pages in the task.
- This mode generates test specs for only the selected page.
- This mode is incremental: it should update existing valid files without duplicating content.
- This mode is useful when the user wants to automate pages one by one while keeping all Page Objects available for cross-page flows.