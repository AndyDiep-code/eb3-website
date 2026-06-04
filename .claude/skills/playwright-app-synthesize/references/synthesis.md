# App Synthesize — Step-by-Step Reference

## STEP 1: Discover All Features and Pages

### 1.1 Discover features
```bash
ls tests/playwright/docs/features/ 2>/dev/null || echo "no_features"
```
Store as `FEATURES` array.

### 1.2 Discover pages
```bash
ls tests/playwright/docs/pages/ 2>/dev/null || echo "no_pages"
```
Store as `PAGES` array.

### 1.3 Validate
- If no features AND no pages → STOP: "No KB docs found. Run docs-generate and feature-synthesize first."
- If no features but pages exist → generate from pages only, note gap in output

---

## STEP 2: Read All Feature Docs

For each feature in `FEATURES`:
- Read `tests/playwright/docs/features/{FEATURE}/overview.md`
- Read `tests/playwright/docs/features/{FEATURE}/user-journeys.md`
- Read `tests/playwright/docs/features/{FEATURE}/data-model.md`
- Read `tests/playwright/docs/features/{FEATURE}/page-map.md`

---

## STEP 3: Read All Page Docs

For each page in `PAGES`:
- Read `tests/playwright/docs/pages/{PAGE}/business-context.md`

(user-flows and data-model already captured via feature docs — skip to avoid redundancy)

---

## STEP 4: Prepare Output

```bash
OUTPUT_DIR="tests/playwright/docs/app"
mkdir -p "${OUTPUT_DIR}"
DATE=$(date +%Y-%m-%d)
```

### Compute input hash
```bash
# Hash = sorted features list + sorted pages list
FEATURES_SORTED=$(echo "{FEATURES}" | tr ' ' '\n' | sort | tr '\n' ',' | sed 's/,$//')
PAGES_SORTED=$(echo "{PAGES}" | tr ' ' '\n' | sort | tr '\n' ',' | sed 's/,$//')
INPUT_HASH=$(echo "features:${FEATURES_SORTED}|pages:${PAGES_SORTED}" | md5)
```

### Decide mode
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

- `create` → write all 5 files fresh
- `overwrite` → features/pages list changed, overwrite all 5 files
- `ask` → use `AskUserQuestion` with:
  - Question: `"App: Pages and features list unchanged. Per-page or feature docs may have changed. Update anyway?"`
  - Options: `["Yes — overwrite with fresh content", "No — skip"]`
  - If Yes → `MODE="overwrite"`, If No → stop

---

## STEP 5: Generate App Docs

⛔ **STRICT FORMAT ENFORCEMENT — REQUIRED SECTIONS (exact headings, exact order)**

Every file MUST contain ALL sections below with EXACT heading names. Do NOT rename, reorder, or skip any section.

### overview.md — REQUIRED SECTIONS
```markdown
---
generated: {DATE}
input-hash: {INPUT_HASH}
features: [{FEATURE_LIST}]
pages: {PAGE_COUNT} total
---

# {APP_NAME} — App Overview

## Purpose

## User Types

| Role | Description |
|------|-------------|

## Business Domain

## Features

| Feature | Entry Page | Purpose |
|---------|------------|---------|
```

### sitemap.md — REQUIRED SECTIONS
```markdown
# App Sitemap

## App Navigation

\`\`\`
├── {Section/Role}
│   ├── {PageName} ({URL})
│   │   ├── {sub-page or action} → {destination}
│   │   └── {sub-page or action} → {destination}
│   └── {PageName} ({URL})
│        └── {sub-page or action}
\`\`\`
```

Rules:
- Wrap the entire tree in a code block (``` ``` ```) so it renders correctly in Markdown preview
- Group pages by feature/role (e.g., Auth, Main App, Settings)
- Show navigation hierarchy — child pages indented under parent
- Show sub-actions/states within a page (e.g., tabs, dialogs, form steps)
- Use `→` to show navigation destination
- Use `(URL)` after page name
- Pages not in any feature go under `## Standalone`

### feature-map.md — REQUIRED SECTIONS
```markdown
# Feature Map

## {feature-name}
- **Entry:** {entry page}
- **Pages:** {comma-separated page list}
- **Purpose:** {one-line}

| Page | Role |
|------|------|
```
(Repeat `## {feature-name}` block for each feature.)

### navigation-flow.md — REQUIRED SECTIONS
```markdown
# App Navigation Flow

## Cross-Feature Navigation

## Feature: {feature-name}

## Navigation Diagram

```mermaid
flowchart TD
  subgraph {feature-name}
    PageA --> PageB
  end
  PageB --> PageC
```
```
(Text graph sections use `PageA → [trigger] → PageB` format. Mermaid diagram uses `flowchart TD` with `subgraph` per feature. Cross-feature arrows go outside subgraphs. Node names must be camelCase with no spaces.)

### data-model.md — REQUIRED SECTIONS
```markdown
# App Data Model

## {Entity Name}

| Field | Type | Features | Pages | Notes |
|-------|------|----------|-------|-------|
```
(Repeat `## {Entity Name}` block for each entity. Deduplicate across features.)

---

## STEP 6: Write Output

**If MODE = create:** Write each file directly.

**If MODE = overwrite:** Overwrite each file with fresh content (features/pages list changed since last run).

---

## STEP 7: Verify Output

```bash
for DOC in overview sitemap feature-map navigation-flow data-model; do
  [ -f "${OUTPUT_DIR}/${DOC}.md" ] && echo "✅ ${DOC}.md" || echo "❌ ${DOC}.md MISSING"
done
```

---

## STEP 8: Print Summary

```
**🎉 App docs synthesized**

| | |
|---|---|
| **Features** | {FEATURE_COUNT} |
| **Pages** | {PAGE_COUNT} |
| **Docs** | overview, sitemap, feature-map, navigation-flow, data-model |
| **Output** | `./tests/playwright/docs/app/` |

→ **Next:** `/qakit:playwright:test-cases`
```
