# Docs Generate — Execution Guide

This is the ONLY source of truth for execution steps. Read all steps before starting.

---

## Phase 0 — Setup (run once)

**Step 0.1 — Read reference guides**

Read these 5 files before generating any content:

```
Read(".claude/skills/playwright-docs-generate/references/output-structure.md")
Read(".claude/skills/playwright-docs-generate/references/business-context-guide.md")
Read(".claude/skills/playwright-docs-generate/references/user-flows-guide.md")
Read(".claude/skills/playwright-docs-generate/references/data-model-guide.md")
Read(".claude/skills/playwright-docs-generate/references/quality-gates.md")
```

**Step 0.2 — Resolve scope**

Build the list of `(TASK_ID, PAGE_NAME)` pairs:
- `--all-tasks` → list all dirs in `./test-tasks/playwright/`
- `--task=X` → use X only
- `--all-pages` or no `--page` → list all dirs in `./test-tasks/playwright/{TASK_ID}/locators/`
- `--page=Y` → use Y only

**Step 0.3 — Print header**

```bash
CYAN='\033[1;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
RED='\033[0;31m'; GRAY='\033[0;90m'; WHITE='\033[1;37m'; NC='\033[0m'

echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   QAKit — Docs Generate              ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
echo -e "${GRAY}   Task: {TASK_ID} | Pages: {N}${NC}"
```

---

## Phase 1 — Per-Page Loop

Repeat Steps 1–9 for every `(TASK_ID, PAGE_NAME)` pair.

---

**Step 1 — Verify inputs**

```bash
SRC="./test-tasks/playwright/{TASK_ID}/locators/{PAGE_NAME}"
echo -e "${YELLOW}⏳ [{PAGE_NAME}] Verifying inputs...${NC}"

[ -f "$SRC/locators.md" ]        || { echo -e "${RED}❌ MISSING: locators.md${NC}";        SKIP=true; }
[ -f "$SRC/aria-snapshot.yaml" ] || { echo -e "${RED}❌ MISSING: aria-snapshot.yaml${NC}"; SKIP=true; }
[ -f "$SRC/metadata.json" ]      || { echo -e "${RED}❌ MISSING: metadata.json${NC}";      SKIP=true; }
[ "$SKIP" = true ] && continue
```

Optional: `network-calls.json` (enriches output if present)

**Step 2 — Read inputs**

Read using the `Read` tool:
1. `{SRC}/locators.md`
2. `{SRC}/aria-snapshot.yaml`
3. `{SRC}/metadata.json`
4. `{SRC}/network-calls.json` (if exists)

From `metadata.json` extract: `pageUrl`, `elementCount`, `notes`

**Step 3 — Detect complexity**

| elementCount | complexity |
|-------------|-----------|
| < 50 | `simple` |
| 50–200 | `medium` |
| > 200 | `complex` |

**Step 4 — Compute input hash**

```bash
ELEMENTS=$(grep -o '| [a-zA-Z][a-zA-Z0-9]* |' "$SRC/locators.md" | sort | tr -d '| ' | tr '\n' ',')
INPUT_HASH=$(echo "{PAGE_NAME}:${ELEMENTS}" | md5)
```

**Step 5 — Generate docs**

Follow the content guide for each doc type:
- `business-context.md` → `business-context-guide.md`
- `user-flows.md` → `user-flows-guide.md`
- `data-model.md` → `data-model-guide.md`

Use `output-structure.md` (read in Step 0.1) for:
- YAML frontmatter schema (Section 1) — all required fields, complexity rules
- Required sections per doc type (Section 2)
- Locator KB and Pages KB file structure (Sections 3-4)

Print progress:

```bash
echo -e "${YELLOW}⏳ [{PAGE_NAME}] Generating docs...${NC}"
echo -e "${GRAY}   ℹ  business-context.md${NC}"
echo -e "${GRAY}   ℹ  user-flows.md${NC}"
echo -e "${GRAY}   ℹ  data-model.md${NC}"
```

**Step 6 — Write Dest 1: QA Working Docs (always overwrite)**

```
./test-tasks/playwright/{TASK_ID}/docs/{PAGE_NAME}/
├── business-context.md
├── user-flows.md
└── data-model.md
```

Create directory if needed. Always overwrite. No hash check.

**Step 7 — Write Dest 2: Pages KB (hash-based)**

```
./tests/playwright/docs/pages/{PAGE_NAME}/
├── business-context.md
├── user-flows.md
└── data-model.md
```

Determine mode:

```bash
KB_FILE="./tests/playwright/docs/pages/{PAGE_NAME}/business-context.md"
if [ ! -f "$KB_FILE" ]; then
  MODE="create"
else
  OLD_HASH=$(grep "^input-hash:" "$KB_FILE" | awk '{print $2}')
  [ "$INPUT_HASH" != "$OLD_HASH" ] && MODE="overwrite" || MODE="ask"
fi
```

- `create` → create dir, write all 3 docs
- `overwrite` → overwrite all 3 docs with updated `input-hash`
- `ask` → `AskUserQuestion`: "Locators unchanged. Update Pages KB anyway?" Yes/No

```bash
echo -e "${GRAY}   ℹ  Pages KB [${MODE}]: {PAGE_NAME}${NC}"
```

**Step 8 — Write Dest 3: Locator KB (hash-based)**

```
./tests/playwright/docs/locators/{PAGE_NAME}/
├── locators.md
├── aria-snapshot.yaml
├── aria-snapshot-state-*.yaml   ← ALL state snapshots
├── metadata.json                ← + inputHash + kbUpdatedAt
└── screenshot-*.png             ← ALL screenshots
```

Determine mode (same hash logic as Step 7, check `metadata.json` for `"inputHash"`):

```bash
KB_META="./tests/playwright/docs/locators/{PAGE_NAME}/metadata.json"
if [ ! -f "$KB_META" ]; then
  MODE="create"
else
  OLD_HASH=$(grep '"inputHash"' "$KB_META" | sed 's/.*: *"//' | tr -d '",')
  [ "$INPUT_HASH" != "$OLD_HASH" ] && MODE="overwrite" || MODE="ask"
fi
```

Copy commands:

```bash
DST="./tests/playwright/docs/locators/{PAGE_NAME}"
mkdir -p "$DST"
cp "$SRC/locators.md"          "$DST/"
cp "$SRC"/aria-snapshot*.yaml  "$DST/"
cp "$SRC"/screenshot-*.png     "$DST/" 2>/dev/null || true
```

Update `metadata.json` to add `inputHash` and `kbUpdatedAt`:

```bash
# Add inputHash + kbUpdatedAt to the copied metadata.json
python3 -c "
import json, sys
m = json.load(open('$SRC/metadata.json'))
m['inputHash'] = '$INPUT_HASH'
m['kbUpdatedAt'] = '$(date -u +%Y-%m-%dT%H:%M:%SZ)'
m['captured'] = True
print(json.dumps(m, indent=2))
" > "$DST/metadata.json"
```

```bash
echo -e "${GRAY}   ℹ  Locator KB [${MODE}]: {PAGE_NAME}${NC}"
```

**Step 9 — Quality gates**

Apply all 6 gates from `quality-gates.md` (read in Step 0.1). If any gate fails → fix before next page.

```bash
echo -e "${GREEN}✅ [{PAGE_NAME}] Done${NC}"
```

---

## Phase 2 — Summary

Output as Claude text response:

```
**🎉 Docs generated**

| | |
|---|---|
| **Task** | {TASK_ID} |
| **Pages** | {PAGE_COUNT} processed |
| **Docs** | business-context, user-flows, data-model |
| **QA output** | `./test-tasks/playwright/{TASK_ID}/docs/` |
| **Pages KB** | `./tests/playwright/docs/pages/` |
| **Locator KB** | `./tests/playwright/docs/locators/` |

→ **Next:** `/qakit:playwright:test-cases --task={TASK_ID}`
```
