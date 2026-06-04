# Diagram Mode — Generate Docs from Flow Diagrams

## Terminal Output Standards

```bash
CYAN='\033[1;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; GRAY='\033[0;90m'; NC='\033[0m'
```

Header:
```bash
echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  Docs from Diagram                   ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
```

Summary at end:
```
**🎉 Docs generated from diagram**

| | |
|---|---|
| **Task** | {TASK_ID} |
| **Source** | {SOURCE_FILE} ({FORMAT}) |
| **Pages documented** | {PAGE_COUNT} |
| **Output** | `./test-tasks/playwright/{task-id}/docs/` |

→ **Next:** `/qakit:playwright:test-cases --task={TASK_ID}`
```

## Step-by-Step Process

### STEP 1: Parse Arguments
- `--task=TASK-ID` (REQUIRED)
- `--source=FILE_PATH` (REQUIRED)
- `--format=mermaid|plantuml|image|drawio` (auto-detect if not provided)
- `--page=PageName` (optional)

### STEP 2: Detect Format and Read Content

**If text-based (Mermaid, PlantUML, draw.io XML):**
- Read file directly
- Parse nodes, edges, states, transitions
- Extract: screens/pages, user actions, system responses, decision points

**If image (PNG, JPEG, PDF, Figma export):**
- Use native vision to analyze the diagram image. Extract:
  1. All screen/page names visible
  2. User flow steps and sequences
  3. Decision points and branches
  4. Any form fields or data elements shown
  5. Navigation paths between screens
- Use the description as source material

### STEP 3: Extract Page Inventory

From the diagram content, identify distinct pages/screens:
- Rectangles/boxes with screen names
- State labels in state diagrams
- Swimlane labels
- Explicit screen/page labels

Build `PAGE_LIST`.

### STEP 4: For EACH page — Extract Flows

Trace all paths through the diagram involving this page:
- **Incoming paths**: what brings user to this page
- **Actions on page**: what user does here
- **Outgoing paths**: where user goes after
- **Decision branches**: conditional flows

### STEP 5: Write Docs

For each page, write 3 files following `references/formats/output-spec.md`:

```
test-tasks/playwright/{task-id}/docs/pages/{PageName}/business-context.md
test-tasks/playwright/{task-id}/docs/pages/{PageName}/user-flows.md
test-tasks/playwright/{task-id}/docs/pages/{PageName}/data-model.md
```

**Note:** `user-flows.md` is the richest output from diagrams. `business-context.md` may be inferred. `data-model.md` may be minimal unless diagram shows data fields.

Set `source: diagram` in frontmatter.

### STEP 6: Feature-Level Flows

If diagram shows multi-page flows (sequences spanning multiple pages):
```
test-tasks/playwright/{task-id}/docs/features/{feature-name}/user-journeys.md
test-tasks/playwright/{task-id}/docs/features/{feature-name}/page-map.md
```

### STEP 7: Summary
