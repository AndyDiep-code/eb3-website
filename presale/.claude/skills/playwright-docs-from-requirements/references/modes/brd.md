# BRD Mode — Generate Docs from Business Requirements

Generate QAKit docs from BRD, PRD, user stories, or any business requirements document.

## Terminal Output Standards

```bash
CYAN='\033[1;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
RED='\033[0;31m'; GRAY='\033[0;90m'; NC='\033[0m'
```

Print header first:
```bash
echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  Docs from Requirements              ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
```

At STEP 7, output as **Claude text response**:
```
**🎉 Docs generated from requirements**

| | |
|---|---|
| **Task** | {TASK_ID} |
| **Source** | {SOURCE_FILE} |
| **Pages documented** | {PAGE_COUNT} |
| **Features documented** | {FEATURE_COUNT} |
| **Output** | `./test-tasks/playwright/{task-id}/docs/` |

→ **Next:** `/qakit:playwright:test-cases --task={TASK_ID}`
```

## Step-by-Step Process

### STEP 1: Parse Arguments
- Extract `--task=TASK-ID` (REQUIRED)
- Extract `--source=FILE_PATH` (REQUIRED) — path to BRD/PRD/user stories file
- Extract `--page=PageName` (optional) — generate for specific page only

If missing → ask user.

### STEP 2: Read and Validate Source

Read the source file. Validate it contains readable text content.

Identify document type:
- **BRD/PRD**: Has sections like "Requirements", "Features", "User Stories", "Acceptance Criteria"
- **User Stories**: Has "As a...", "I want...", "So that..." or Jira-style stories
- **Feature Spec**: Has screen/page descriptions with behaviors

### STEP 3: Extract Page Inventory

Scan the document for explicit or implicit page/screen references:

```
Look for:
- Screen names: "Login Screen", "Dashboard", "Settings Page"
- URL mentions: "/app/attendance", "/notifications"
- Section headers that describe screens
- Feature names that map to pages
```

Build `PAGE_LIST` — list of distinct pages/screens mentioned.

Log:
```
ℹ  Pages detected: N
   - {PageName 1}
   - {PageName 2}
```

### STEP 4: For EACH page in PAGE_LIST

Read the document sections relevant to this page. Extract:

**a) Business Context:**
- What is the purpose of this page?
- Who are the users? (roles mentioned)
- What are the business rules? (must/shall/should statements)
- How do users reach this page?

**b) User Flows:**
- What actions can users perform?
- What are the step sequences? (numbered steps, flow descriptions)
- What triggers each flow? What is the expected outcome?

**c) Data Model:**
- What fields/inputs are mentioned?
- What types/formats are specified?
- What validation rules exist? (required, max length, format)
- What business states/enums exist?

### STEP 5: Write Docs

For each page, write 3 files following `references/formats/output-spec.md` exactly:

```
test-tasks/playwright/{task-id}/docs/pages/{PageName}/business-context.md
test-tasks/playwright/{task-id}/docs/pages/{PageName}/user-flows.md
test-tasks/playwright/{task-id}/docs/pages/{PageName}/data-model.md
```

Set `source: brd` in frontmatter.

Log after each page:
```
✅ {PageName} documented (N flows, M fields)
```

### STEP 6: Generate Feature Docs (if applicable)

If the document describes **cross-page flows** (workflows spanning multiple pages):

```
test-tasks/playwright/{task-id}/docs/features/{feature-name}/
├── overview.md
├── user-journeys.md
├── data-model.md
└── page-map.md
```

Only generate if explicitly mentioned multi-page flows exist.

### STEP 7: Update Task README + Show Summary

Update `test-tasks/playwright/{task-id}/README.md` — mark "Docs" as ✅ Done.

Show summary as Claude text response (see header above).

## Quality Rules

- **Only extract what's written** — do not invent business rules
- **Use document language** — preserve terminology from the BRD
- **Be specific** — "User must enter email in format xxx@xxx.xxx" not "Email validation"
- **If unclear** — note as "⚠️ Not specified in source — needs clarification"
