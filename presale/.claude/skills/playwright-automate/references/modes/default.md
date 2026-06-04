# DEFAULT MODE - Generate Test Specs for All Pages

Generate test specs for all pages with promoted test cases, using existing Page Objects.

## Overview

Use this mode when the user wants to generate the full Playwright UI automation output for a task, including all Page Objects, all page-level UI test specs, merged test data, and updated fixtures.

## Terminal Output Standards

Define these color variables at the start of ALL bash execution in this mode:

```bash
CYAN='\033[1;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
RED='\033[0;31m'; GRAY='\033[0;90m'; WHITE='\033[1;37m'; NC='\033[0m'
```

Print this header block first:

```bash
echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   Playwright Automate — Default      ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
```

For every step, follow this pattern:

```bash
echo -e "${YELLOW}⏳ [X/16] Step description...${NC}"   # before
echo -e "${GREEN}✅ [X/16] Step description${NC}"       # after success
echo -e "${RED}❌ [X/16] Step description — FAILED${NC}" # on failure
echo -e "${GRAY}   ℹ  Per-file: {FileName}.page.ts${NC}" # per-file progress
```

At STEP 16, output the following as **Claude text response**:

```
**🎉 Automation code generated**

| | |
|---|---|
| **Pages** | {PAGE_COUNT} |
| **Page Objects** | {POM_COUNT} files |
| **Test Specs** | {SPEC_COUNT} files |
| **Output** | `./tests/playwright/tests/ui/` |

→ **Next:** `/qakit:playwright:execute`
```

## Expected Inputs

This mode expects:

- Promoted test cases: `./tests/playwright/test-cases/pages/{PageName}/`
- Page Objects already generated: `./tests/playwright/pages/{PageName}.page.ts`
- An initialized Playwright automation project at `./tests/playwright/`

## Step-by-Step Process

### STEP 1: Resolve Input

Set paths:

- `TEST_CASES_ROOT=./tests/playwright/test-cases`
- `AUTOMATION_PATH=./tests/playwright`

#### Auth State (Optional)
- If `--auth` argument provided: store as `AUTH_STATE={filename}`
- Otherwise: set `AUTH_STATE` to empty (tests run with default auth setup)

### STEP 2: Validate Prerequisites

Verify required directories exist:

- `{TEST_CASES_ROOT}/pages/` — promoted test cases
- `{AUTOMATION_PATH}/pages/` — Page Object files

If promoted test cases missing:
- print: `❌ No promoted test cases found. Run /qakit:playwright:test-cases-promote first.`
- stop execution

If POM directory missing:
- print: `❌ Page Objects not found. Run /qakit:playwright:generate-pom first.`
- stop execution

### STEP 4: Resolve Page Set

Determine which pages should be generated.

**POM filename convention:** Strip trailing `Page` suffix from PageName (if present), then convert PascalCase to kebab-case.
- `HomePage` → `home.page.ts`
- `LoginWithMicrosoft` → `login-with-microsoft.page.ts`
- `AttendancePage` → `attendance.page.ts`
- `Microsoft-Auth` → `microsoft-auth.page.ts`

- List page folders under `{TEST_CASES_ROOT}/pages/`
- For each PageName, compute `{kebab-name}` using the convention above
- Verify each has a corresponding POM: `{AUTOMATION_PATH}/pages/{kebab-name}.page.ts`

Build the working page set from pages that have:
- promoted test cases in `{TEST_CASES_ROOT}/pages/{PageName}/`
- existing POM at `{AUTOMATION_PATH}/pages/{kebab-name}.page.ts`

If POMs missing:
- print: `❌ Page Objects not found. Run /qakit:playwright:generate-pom --task=<id> first`

If no valid pages are found:
- print: `❌ No promoted test cases found in {TEST_CASES_ROOT}/pages/`
- stop execution

Store the resolved list as:

- `PAGE_SET`

### STEP 5: Verify Automation Project

Verify the Playwright automation project is initialized at `{AUTOMATION_PATH}`.

Required checks:
- `{AUTOMATION_PATH}` exists
- `{AUTOMATION_PATH}/package.json` exists

If missing: print `❌ Automation project not initialized. Run /qakit:playwright:init-automation first.` and stop.

### STEP 6: Read Page Object Methods

For each page in `PAGE_SET`:

- Compute `{kebab-name}` from PageName using the convention defined in STEP 4
- Read existing `{AUTOMATION_PATH}/pages/{kebab-name}.page.ts`
- Extract available method signatures (name, parameters, return type)
- Use these method names when generating test spec action steps

This ensures generated specs call correct POM methods with correct parameter types.

### STEP 8: Generate Test Specs

Generate or update UI test specs for all pages in `PAGE_SET`.

For each page in `PAGE_SET`:

- Read test cases from `{TEST_CASES_ROOT}/pages/{PageName}/test-cases.md`
- Determine the output location:
  - `{AUTOMATION_PATH}/tests/ui/pages/{PageName}/test-cases.spec.ts`
- Create the page test folder if needed
- Generate or update the test spec file

Generation rules:

- If the spec file does not exist, create it
- If the spec file already exists, append only new test cases
- Do not duplicate existing test cases
- Generate tests using the page object for that page
- Map manual steps into Playwright actions and assertions
- Use the selected assertion and code generation conventions consistently

For test spec rules, see:
- [../guides/code-generation.md](../guides/code-generation.md)
- [../guides/action-mapping.md](../guides/action-mapping.md)
- [../guides/aaa-pattern.md](../guides/aaa-pattern.md)
- [../formats/test-spec-template.md](../formats/test-spec-template.md)
- [../formats/tag-system.md](../formats/tag-system.md)

### STEP 9: Generate Feature Test Specs

Generate cross-page feature flow specs if `test-cases/features/` exists.

Check:

```
{TEST_CASES_ROOT}/features/
```

If no `features/` folder → skip this step entirely, log: `⏭ No feature test cases — skipping`

For each feature folder found:

- Read test cases from `{TEST_CASES_ROOT}/features/{feature-name}/test-cases.md`
- Determine the output location:
  - `{AUTOMATION_PATH}/tests/ui/features/{feature-name}/test-cases.spec.ts`
- Create the feature test folder if needed
- Generate or update the spec file

Generation rules:

- Same AAA pattern and tag system as page specs
- Import all relevant page objects needed by the cross-page flow
- Tag format: `@feature:{feature-name} @tc:TC-F-001`
- If the spec file already exists, append only new test cases — do not overwrite existing ones

For test spec rules, see:

- [../guides/code-generation.md](../guides/code-generation.md)
- [../guides/aaa-pattern.md](../guides/aaa-pattern.md)
- [../formats/test-spec-template.md](../formats/test-spec-template.md)
- [../formats/tag-system.md](../formats/tag-system.md)

### STEP 10: Generate Test Data

Generate test data file.

- Target file: `{AUTOMATION_PATH}/support/test-data.ts`
- For each page in `PAGE_SET`: read `test-data.json` if it exists in the page test-case folder
- Also include feature test data if `{TEST_CASES_ROOT}/features/*/test-data.json` exists

Rules:

- If `support/test-data.ts` already exists, update it without duplicating existing exports
- Preserve existing valid typed structures
- Spec files must import from `support/test-data`

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
- test spec files were created or updated for all pages in `PAGE_SET`
- integration test spec file was created or updated (if integration test cases exist)
- `support/test-data.ts` exists or was created/updated successfully
- fixture registration was updated successfully

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

If verification fails for a required generated output:
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
- `📄 Page Objects: {count} (new: X, updated: Y)`
- `📄 UI Test Specs: {count} (new: X, updated: Y)`
- `📄 Integration Test Specs: {count} (if present)`
- `🧪 Test Cases: {count}`

Then show next steps:

```text
Run tests:
  cd {AUTOMATION_PATH}
  npm test
```

## Error Handling

### Fatal Errors

Stop execution for any of the following:

- promoted test cases not found
- no valid pages with both promoted test cases and POMs
- automation project not initialized
- required locator input missing for a page being generated
- required test case input missing for a page being generated
- page object generation fails for a required page
- test spec generation fails for a required page
- output verification fails

### Non-Fatal Errors

Log a warning and continue for any of the following:

- optional page metadata missing
- optional `test-data.json` missing
- optional integration test cases missing
- optional visual baseline update fails


For shared error handling guidance, see:
- [../guides/error-handling.md](../guides/error-handling.md)

## Example Output

```text
✅ Generated automation code
📁 Output: ./tests/playwright/
📄 Page Objects: 3 (new: 3, updated: 0)
📄 UI Test Specs: 3 (new: 3, updated: 0)
📄 Integration Test Specs: 1 (new: 1, updated: 0)
🧪 Test Cases: 16

Run tests:
  cd ./tests/playwright
  npm test
```

## Output Structure

Mirrors the promoted test-cases structure:

```text
./tests/playwright/
├── pages/
│   ├── base.page.ts
│   ├── home.page.ts             ← kebab-case
│   └── login-with-microsoft.page.ts
├── test-cases/                  ← READ (promoted test cases)
│   ├── pages/{PageName}/
│   │   └── test-cases.md
│   └── features/{feature-name}/
│       └── test-cases.md
├── tests/
│   ├── ui/
│   │   ├── pages/               ← mirrors test-cases/pages/
│   │   │   ├── HomePage/
│   │   │   │   └── test-cases.spec.ts
│   │   │   └── LoginWithMicrosoft/
│   │   │       └── test-cases.spec.ts
│   │   └── features/            ← mirrors test-cases/features/
│   │       └── attendance-remote-request/
│   │           └── test-cases.spec.ts
│   ├── api/
│   └── fixtures/
│       └── index.ts
└── support/
    └── test-data.ts
```

## Notes

- This mode generates output for all valid pages in the task.
- This mode also generates feature test specs if `test-cases/features/` exists.
- This mode is incremental: it should update existing valid files without duplicating content.
- API automation is handled by the dedicated API automation workflow.