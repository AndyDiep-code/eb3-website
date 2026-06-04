# Test Cases Promote — Step-by-Step Reference

## STEP 1: Parse Input

- Extract `--task=TASK-ID` (REQUIRED). If missing, ask user via AskUserQuestion.
- Extract `--page=PAGE-NAME` (optional — promote specific page only)
- If `--page` not provided → promote ALL pages

## STEP 2: Validate Draft Exists

```bash
DRAFT_DIR="test-tasks/playwright/{task-id}/test-cases"
[ -d "${DRAFT_DIR}" ] || STOP: "No draft test cases found. Run /qakit:playwright:test-cases first."
```

List all pages/sections in draft:
```bash
ls "${DRAFT_DIR}/pages/" 2>/dev/null | grep -v "README.md"
```

## STEP 3: Prepare Destination

```bash
DEST_DIR="tests/playwright/test-cases"
mkdir -p "${DEST_DIR}"
```

## STEP 4: Promote Per-Page Test Cases

**Cross-platform hash helper (use Python — works on macOS and Linux):**

```bash
file_hash() { python3 -c "import hashlib,sys; print(hashlib.md5(open(sys.argv[1],'rb').read()).hexdigest())" "$1"; }
```

For each page in `pages/` (or only `--page` if specified):

```bash
DRAFT_FILE="${DRAFT_DIR}/pages/{PageName}/test-cases.md"
DEST_FILE="${DEST_DIR}/pages/{PageName}/test-cases.md"
```

**If file not in repo (new):**
```bash
mkdir -p "${DEST_DIR}/pages/{PageName}"
cp "${DRAFT_FILE}" "${DEST_FILE}"
cp "${DRAFT_DIR}/pages/{PageName}/test-data.json" "${DEST_DIR}/pages/{PageName}/test-data.json" 2>/dev/null || true
echo "✅ Promoted (new): {PageName}"
```

**If file exists in repo:**
```bash
DRAFT_HASH=$(file_hash "${DRAFT_FILE}")
DEST_HASH=$(file_hash "${DEST_FILE}")
```

- If `DRAFT_HASH == DEST_HASH` → log `⏭️  Skipped (no changes): {PageName}`
- If different → ask user via **AskUserQuestion**:
  - Header: `"Conflict — {PageName}"`
  - Question: `"{PageName} test cases have changed. What do you want to do?"`
  - Options:
    - `"Overwrite"` — replace repo file with new draft version
    - `"Skip"` — keep existing repo file as-is
  - If Overwrite:
    ```bash
    cp "${DRAFT_FILE}" "${DEST_FILE}"
    cp "${DRAFT_DIR}/pages/{PageName}/test-data.json" "${DEST_DIR}/pages/{PageName}/test-data.json" 2>/dev/null || true
    echo "✅ Overwritten: {PageName}"
    ```
  - If Skip: log `⏭️  Skipped (kept existing): {PageName}`

## STEP 4.5: Promote Feature-Level Test Cases

After per-page promotion, also promote features if they exist:

```bash
FEATURE_DRAFT_DIR="${DRAFT_DIR}/features"
FEATURE_DEST_DIR="${DEST_DIR}/features"
```

If `${FEATURE_DRAFT_DIR}` does not exist → skip this step entirely.

For each feature in `${FEATURE_DRAFT_DIR}/`:

```bash
DRAFT_FILE="${FEATURE_DRAFT_DIR}/${FEATURE}/test-cases.md"
DEST_FILE="${FEATURE_DEST_DIR}/${FEATURE}/test-cases.md"
```

**If file not in repo (new):**
```bash
mkdir -p "${FEATURE_DEST_DIR}/${FEATURE}"
cp "${DRAFT_FILE}" "${DEST_FILE}"
cp "${FEATURE_DRAFT_DIR}/${FEATURE}/test-data.json" "${FEATURE_DEST_DIR}/${FEATURE}/test-data.json" 2>/dev/null || true
echo "✅ Promoted (new feature): ${FEATURE}"
```

**If file exists in repo:**
```bash
DRAFT_HASH=$(file_hash "${DRAFT_FILE}")
DEST_HASH=$(file_hash "${DEST_FILE}")
```

- If same → log `⏭️  Skipped (no changes): ${FEATURE} (feature)`
- If different → ask user via **AskUserQuestion**:
  - Header: `"Conflict — ${FEATURE} (feature)"`
  - Question: `"${FEATURE} feature test cases have changed. What do you want to do?"`
  - Options:
    - `"Overwrite"` — replace repo file with new draft version
    - `"Skip"` — keep existing repo file as-is
  - If Overwrite:
    ```bash
    cp "${DRAFT_FILE}" "${DEST_FILE}"
    cp "${FEATURE_DRAFT_DIR}/${FEATURE}/test-data.json" "${FEATURE_DEST_DIR}/${FEATURE}/test-data.json" 2>/dev/null || true
    echo "✅ Overwritten: ${FEATURE} (feature)"
    ```

## STEP 5: Update Destination README

Update or create `tests/playwright/test-cases/README.md` with index of all promoted pages and features.

## STEP 6: Update Task README

Update `test-tasks/playwright/{task-id}/README.md`:
- Mark "Test Cases" step as ✅ Promoted

## STEP 7: Show Summary

```
**🎉 Test cases promoted**

| | |
|---|---|
| **Task** | {TASK_ID} |
| **Pages promoted** | {PAGE_COUNT} |
| **Features promoted** | {FEATURE_COUNT} |
| **Skipped** | {SKIP_COUNT} (no changes) |
| **Output** | `./tests/playwright/test-cases/` |

→ **Next:** `/qakit:playwright:automate` (reads promoted test cases + existing POMs)
```
