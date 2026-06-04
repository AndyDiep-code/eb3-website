# Output Rules — TC Generation, CSV Format, Save Instructions

## Test Cases Table Columns

| Column | Description |
|--------|-------------|
| TC ID | `{MODULE}-{FEATURE}-{NNN}` |
| Title | Short imperative label |
| Description | 1 sentence ≤150 chars — see Description Format below |
| Type | `HP` · `NEG` · `EDGE` · `VAL` |
| Priority | `Critical` · `High` · `Normal` · `Low` (Testmo-compatible — use `Normal` not `Medium`) |
| Tags | See Tags below |
| Preconditions | Role + app state before step 1 |
| Steps | Numbered, `<br>`-separated in table cells |
| Automation Selectors | *(QAKit mode only)* `` `"element name" role`: `getByRole(...)` `` |
| Expected Result | Exact element, location, value |
| FR Ref | Journey name or BR ID |

## Description Format (unified `→` flow, ≤150 chars)

| Case | Pattern | Example |
|------|---------|---------|
| HP single-page | `[Page]. [What is validated].` | `Dashboard. Confirms 4 KPI stat cards and Recent Surveys table render on first load.` |
| HP cross-page / E2E | `[Page A] → [Page B] → [Page C]. [Business outcome].` | `Resources → BookingModal → My Bookings. A user books a room and receives confirmation.` |
| NEG / VAL | `[Page] → [error state]. Validates [constraint] is enforced.` | `Login → [email error]. Validates email field is required before form submission.` |
| QAKit journeys | `[Page A] → [Page B] → [Page C]. [Journey name / outcome].` | Auto-populated from page chain in `user-journeys.md`. |

## Tags

`smoke` · `sanity` · `regression` · `e2e` · `critical` · `functional` · `negative` · `edge-case` · `validation` · `security` · `rbac` · `audit` · `performance` · `accessibility` · `mobile` · `visual`

`visual` — any TC that verifies UI appearance/layout in the real app.

## Steps Quality Standards

- Separate steps with `<br>` in table cells: `1. Step one.<br>2. Step two.<br>3. Step three.`
- Start each step with an action verb: `Navigate to` · `Click` · `Type` · `Enter` · `Select` · `Verify` · `Check` · `Confirm` · `Scroll` · `Observe that`
- Minimum 3 steps per TC: (1) setup/navigate → (2) perform action → (3) verify result
- Be specific about location: `Click the "Save" button in the form footer` not `Click Save`
- Include test data inline: `Type "test@example.com" in the Email field` not `Enter email`
- Verification steps must state WHERE and WHAT: `Verify the success toast appears at top-right: "Changes saved"` not `Check message`
- Never write a step as just "Observe" or "Check" alone
- Steps must be executable by a manual QA without reading the requirements

**QAKit mode — Automation Selectors column:** Reference UI elements using exact text from locators.md, including any emoji that appears in the actual button label. The element name and selector must match what is visible in the real app.

## Expected Result Standards

Specify the exact element, location, and value:
- `Profile page shows updated name "Jane Doe" in the header; save button returns to inactive state` — not `Name is updated`

## Coverage Summary (end of test-cases file)

1. **Business Rules Coverage**: table `| Feature | Business Rule | Test Case(s) |`
2. **Tag Counts**: scan every TC row's Tags column, tally each tag individually — never estimate. List only tags that appear at least once.
3. **Total TC count** in file header must match actual TC row count.
4. **Execution Strategy**: table with TC counts matching the tally exactly.

## CSV Format (Testmo multi-row)

Columns: `Name,Description,Preconditions,TC ID,Type,Priority,Tags,Step,Expected Result,FR Ref`

- Each step = 1 row; title repeats on every row
- `Description` and `Preconditions`: populate on first step row only — leave empty on subsequent rows
- Steps come from the **Steps column only** — do NOT include Automation Selectors content in CSV steps
- Steps split by `<br>` → separate rows; single-step TCs → 1 row
- Always generate paired `.csv` alongside `.md` — same filename, `.csv` extension
- **CSV for large outputs (>50 TCs)**: generate MD first, then derive CSV by parsing MD tables

**CSV quoting (critical — wrong quoting causes import errors):**
- Any field containing `"`, `,`, or newlines MUST be wrapped in double quotes: `"field value"`
- Internal double quotes MUST be escaped by doubling: `"` → `""` inside a quoted field
- Example: `Click the "Save" button` → `"Click the ""Save"" button"`
- Python `csv.writer` with `quoting=csv.QUOTE_MINIMAL` handles this correctly — use it or apply the same rules manually

## --module Filter

When `--module=XXX` provided:
- Output: `test-cases-{module-kebab}.md` + `.csv`
- Header: `Module: {name} ({N} cases)` instead of full project header
- Skip E2E section and Coverage Summary

## Save Instructions

- ALWAYS write to file — never display inline only
- Create directories with `mkdir -p` before writing
- Confirm: `✅ Saved to: qa-docs/{project-kebab}/{file}.md + {file}.csv`
- `--type=all` → create all 3 files (test-plan.md, test-cases/all.md + all.csv, test-summary.md)
