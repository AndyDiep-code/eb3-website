# Quality Gates

Run after generating each page. Fail fast — fix before moving to next page.

> Format specs (frontmatter schema, required sections, file structures) are defined in `output-structure.md`.
> Gates below reference it — do not duplicate specs here.

---

## Gate 1: Frontmatter Valid

Validate each doc against `output-structure.md` Section 1 (YAML Frontmatter).

**Fail if:**
- Missing `---` delimiters
- Any required field empty or missing (`title`, `pageUrl`, `complexity`, `generatedAt`)
- `complexity` not one of: `simple`, `medium`, `complex`
- `pageUrl` does not start with `http`
- `business-context.md` missing `input-hash:` field

---

## Gate 2: Content Complete

Validate each doc against `output-structure.md` Section 2 (Required Sections).

**Fail if:**
- Required section heading missing
- Section exists but has no content
- `user-flows.md` steps table empty or has < 3 rows
- `data-model.md` has no field rows

---

## Gate 3: Locator References Accurate

For `user-flows.md` only:

**Fail if:**
- Steps reference element names not found in source `locators.md` (case-sensitive)
- Steps contain placeholder text: `{element}`, `TODO`, `TBD`, `[placeholder]`

---

## Gate 4: No Placeholders

Scan all 3 generated docs for:
- `{` and `}` (unreplaced template variables)
- `TODO`, `TBD`, `[placeholder]`, `N/A` in required fields

**Fail if any found.**

---

## Gate 5: Complexity Depth Met

Validate against `output-structure.md` Section 2 complexity rules.

Check that content depth matches the `complexity` value from `metadata.json`:
- `simple` → minimum thresholds
- `medium` → medium thresholds  
- `complex` → high thresholds (include boundary values in data-model)

---

## Gate 6: KB Copy Integrity

Validate against `output-structure.md` Sections 3-4 (Locator KB and Pages KB structures).

### 6a — Locator KB

```bash
SRC="./test-tasks/playwright/{TASK_ID}/locators/{PAGE_NAME}"
DST="./tests/playwright/docs/locators/{PAGE_NAME}"

for f in "$SRC"/aria-snapshot*.yaml; do
  [ -f "$DST/$(basename $f)" ] || echo "MISSING: $(basename $f)"
done
for f in "$SRC"/screenshot-*.png; do
  [ -f "$DST/$(basename $f)" ] || echo "MISSING: $(basename $f)"
done
[ -f "$DST/locators.md" ]   || echo "MISSING: locators.md"
[ -f "$DST/metadata.json" ] || echo "MISSING: metadata.json"
```

**Fail if:** any file missing, or `metadata.json` lacks `inputHash` / `kbUpdatedAt` fields.

### 6b — Pages KB

```bash
DST="./tests/playwright/docs/pages/{PAGE_NAME}"
[ -f "$DST/business-context.md" ] || echo "MISSING: business-context.md"
[ -f "$DST/user-flows.md" ]       || echo "MISSING: user-flows.md"
[ -f "$DST/data-model.md" ]       || echo "MISSING: data-model.md"
```

**Fail if:** any of the 3 doc files missing.

---

## Pass/Fail Output

```
✅ quality-gates PASSED — {page-name}
   - Frontmatter: ✅
   - Content complete: ✅
   - Locator references: ✅
   - No placeholders: ✅
   - Complexity depth: ✅
   - KB copy integrity: ✅ (locators: N files, pages: 3 docs)
```

```
❌ quality-gates FAILED — {page-name}
   - {gate name}: ❌ {reason}
   Action: {what to fix}
```

If FAILED → fix immediately. For Gate 6 failures, re-run the copy step (Step 8), not the generation step.
