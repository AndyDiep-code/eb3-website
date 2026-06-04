# Feature Synthesize — Step-by-Step Reference

## AUTO-DETECT MODE

When `--auto-detect` flag is provided:

### Phase 1: Check for existing proposal

```bash
PROPOSAL_FILE="tests/playwright/docs/features/_proposal.md"
[ -f "${PROPOSAL_FILE}" ] && echo "proposal_exists" || echo "no_proposal"
```

**If proposal exists → skip to Phase 3 (synthesize from proposal)**

**If no proposal → run Phase 2 (cluster and generate proposal)**

---

### Phase 2: Cluster pages and generate proposal

**2.1 Discover all pages in KB:**
```bash
ls tests/playwright/docs/pages/
```

**2.2 Read user-flows.md for each page** — detect cross-page navigation signals:
- "navigates to", "redirects to", "opens", "app navigate", "goes to"
- Note which pages link to which

**2.3 Cluster pages into features** based on:
- URL patterns (e.g., `/app/attendance*` → same feature)
- Cross-page navigation links (pages that navigate to each other → same feature)
- Shared data model entities (pages sharing same fields → likely same feature)

**2.4 Write proposal file:**

```markdown
# Feature Grouping Proposal
# Edit this file to rename features or move pages between features.
# When done, type "proceed" in the chat to start synthesis.
# To cancel, delete this file.

## Feature: {feature-slug}
Pages: {PageA}, {PageB}, {PageC}

## Feature: {feature-slug-2}
Pages: {PageD}
```

Save to: `tests/playwright/docs/features/_proposal.md`

**2.5 Print proposal content to user** and say:

```
📋 Feature grouping proposal saved to:
   tests/playwright/docs/features/_proposal.md

Review and edit the file in your IDE to:
  - Rename features (change the slug after "Feature:")
  - Move pages between features
  - Remove features you don't want to synthesize

When ready, type: proceed
```

**STOP — wait for user to type "proceed"**

---

### Phase 3: Synthesize from proposal

**3.1 Read proposal file:**
```bash
cat tests/playwright/docs/features/_proposal.md
```

**3.2 Parse features and pages** from the proposal.

**3.3 For each feature in proposal → run STEP 2–7 below** (read docs, generate feature files).

**3.4 After all features synthesized → delete proposal file:**
```bash
rm tests/playwright/docs/features/_proposal.md
```

---

## STANDARD MODE (--pages)

## STEP 1: Resolve Inputs

### 1.1 Resolve feature name
```
If --feature provided → use it directly
Else → derive slug from page names (e.g. common prefix) or use "unnamed-feature"
Slugify: lowercase, spaces/underscores to hyphens
```

### 1.2 Discover pages
```bash
# If --pages provided → use those names directly
PAGES=({page1} {page2} ...)

# If no --pages → list all folders in KB pages dir
ls tests/playwright/docs/pages/
```
Store as `PAGES` array.

### 1.3 Verify KB docs exist
For each page in `PAGES`:
```bash
ls tests/playwright/docs/pages/{PAGE_NAME}/
```
- If exists → include in synthesis
- If missing → log warning: `⚠️ {PAGE_NAME} not in KB — run docs-generate first` → skip page

---

## STEP 2: Read All Per-Page Docs

For each page in `PAGES` (that exists in KB):
- Read `tests/playwright/docs/pages/{PAGE_NAME}/business-context.md`
- Read `tests/playwright/docs/pages/{PAGE_NAME}/user-flows.md`
- Read `tests/playwright/docs/pages/{PAGE_NAME}/data-model.md`

---

## STEP 3: Detect Cross-Page Navigation

From all `user-flows.md` files, identify:
- References to other pages (e.g., "navigates to", "opens", "redirects to")
- Entry points (which page starts the flow)
- Exit points (which page ends the flow)

Build a navigation map:
```
PageA → [action] → PageB
PageB → [action] → PageC
```

---

## STEP 4: Generate Feature Docs

### 4.1 Prepare output path
```bash
OUTPUT_DIR="tests/playwright/docs/features/{FEATURE_NAME}"
mkdir -p "${OUTPUT_DIR}"
DATE=$(date +%Y-%m-%d)
```

### 4.2 Compute input hash
```bash
# Hash = feature name + sorted pages list (detects structural changes)
PAGES_SORTED=$(echo "{PAGE_LIST}" | tr ',' '\n' | sort | tr '\n' ',' | sed 's/,$//')
INPUT_HASH=$(echo "{FEATURE_NAME}:${PAGES_SORTED}" | md5)
```

### 4.3 Check existing output and decide mode
```bash
OVERVIEW="${OUTPUT_DIR}/overview.md"
if [ ! -f "${OVERVIEW}" ]; then
  MODE="create"
else
  OLD_HASH=$(grep "^input-hash:" "${OVERVIEW}" | awk '{print $2}')
  if [ "${INPUT_HASH}" != "${OLD_HASH}" ]; then
    MODE="overwrite"
  else
    MODE="ask"
  fi
fi
```

- `create` → write all 4 files fresh
- `overwrite` → pages list changed, overwrite all 4 files
- `ask` → use `AskUserQuestion` with:
  - Question: `"{FEATURE_NAME}: Pages list unchanged. Per-page docs may have changed. Update anyway?"`
  - Options: `["Yes — overwrite with fresh content", "No — skip this feature"]`
  - If Yes → `MODE="overwrite"`, If No → skip and move to next feature

### 4.3 Generate each doc

⛔ **STRICT FORMAT ENFORCEMENT — REQUIRED SECTIONS (exact headings, exact order)**

Every file MUST contain ALL sections below with EXACT heading names. Do NOT rename, reorder, or skip any section.

#### overview.md — REQUIRED SECTIONS
```markdown
---
feature: {FEATURE_NAME}
pages: [{PAGE_LIST}]
generated: {DATE}
---

# {FEATURE_NAME} — Overview

## Purpose

## Users

## Business Rules

## Entry Points

## Key Outcomes
```

#### user-journeys.md — REQUIRED SECTIONS
```markdown
---
feature: {FEATURE_NAME}
generated: {DATE}
---

# {FEATURE_NAME} — User Journeys

## Journey: {Journey Name}

**Trigger:**
**Actor:**

| Step | Page | Action | Next Page |
|------|------|--------|-----------|

**Expected outcome:**
```
(Repeat `## Journey:` block for each journey)

#### data-model.md — REQUIRED SECTIONS
```markdown
---
feature: {FEATURE_NAME}
generated: {DATE}
---

# {FEATURE_NAME} — Data Model

## {Entity Name}

| Field | Type | Required | Pages | Notes |
|-------|------|----------|-------|-------|
```
(Repeat `## {Entity Name}` block for each entity. Deduplicate fields across pages.)

#### page-map.md — REQUIRED SECTIONS
```markdown
---
feature: {FEATURE_NAME}
generated: {DATE}
---

# {FEATURE_NAME} — Page Map

## Navigation Graph

## Pages

| Page | URL | Role in Feature | Entry? | Exit? |
|------|-----|-----------------|--------|-------|
```

---

## STEP 5: Write Output

**If MODE = create:**
Write each file directly.

**If MODE = overwrite:**
Overwrite each file with fresh content (page list changed since last run).

---

## STEP 6: Verify Output

```bash
for DOC in overview user-journeys data-model page-map; do
  [ -f "${OUTPUT_DIR}/${DOC}.md" ] && echo "✅ ${DOC}.md" || echo "❌ ${DOC}.md MISSING"
done
```

---

## STEP 7: Print Summary

```
**🎉 Feature docs synthesized**

| | |
|---|---|
| **Feature** | {FEATURE_NAME} |
| **Pages synthesized** | {PAGE_COUNT} |
| **Docs** | overview, user-journeys, data-model, page-map |
| **Output** | `./tests/playwright/docs/features/{FEATURE_NAME}/` |

→ **Next:** `/qakit:playwright:app-synthesize` or `/qakit:playwright:test-cases`
```
