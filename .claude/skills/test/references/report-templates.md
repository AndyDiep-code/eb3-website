# Test Skill: Report Templates

---

## Phase 4: Generate Report & Finalize

### TASK MODE

1. **Update plan.md frontmatter**: Set `stage: done` and `status: done`
2. **Call** `project-manager` sub-agent: "Update task [$ARGUMENTS] test status to COMPLETE with 100% coverage."
3. **Generate test report** at `./.claude/tasks/$ARGUMENTS/test-report.md`:

```markdown
# Test Report: [task-id]

## Summary
- Files Tested: [N]
- Total Tests: [X]
- Coverage: 100%

## Per-File Results

| File | Tests | Coverage | Status |
|------|-------|----------|--------|
| [file1] | [N] | 100% | ✅ |
| [file2] | [N] | 100% | ✅ |

## Test Categories
- Unit Tests: [X]
- Integration Tests: [Y]
- Edge Cases: [Z]

## Notes
[Any observations or recommendations]
```

### FILE MODE

Generate inline summary (no file written):

```
File: [$ARGUMENTS]
Tests Created: [N]
Coverage: 100%
Status: ✅ Complete
```

### GIT MODE

Generate report at `./test-report-git-changes.md`:

```markdown
# Test Report: Git Changes

## Summary
- Files Tested: [N]
- Total Tests: [X]
- Coverage: 100%

## Changed Files Tested

| File | Tests | Coverage | Status |
|------|-------|----------|--------|
| [file1] | [N] | 100% | ✅ |
| [file2] | [N] | 100% | ✅ |

## Git Status
- Branch: [current-branch]
- Changed files: [N]
- All changes tested: ✅

## Notes
[Any observations or recommendations]
```

---

## Phase 5: Summary Report

```
════════════════════════════════════════════════════════════════════
                    ✅ [MODE] COMPLETE
════════════════════════════════════════════════════════════════════

MODE: [TASK | FILE | GIT CHANGES]
[TASK/GIT: FILES TESTED (each at 100% coverage):]
  ✅ [file1.ts] - [N] tests
  ✅ [file2.ts] - [N] tests
[FILE: FILE: [file-path]]

TOTAL TESTS: [X] passed, 0 failed
COVERAGE: 100% (lines, branches, functions)
[REPORT: path/to/report.md  ← omit for FILE mode]

════════════════════════════════════════════════════════════════════
```
