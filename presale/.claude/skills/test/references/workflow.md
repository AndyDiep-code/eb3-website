# Test Skill: Workflow Reference

## Git Optional Note

**NOTE**: Git is optional. If git is not available:
- GIT MODE falls back gracefully — prompt user for task-id or file path instead
- Do not throw errors if git commands fail
- All git commands should use `2>/dev/null` and provide fallbacks

---

## Phase 0: Setup & Validation

### Step 0.1: Detect Mode & Validate Input

1. **Check if input is empty:**
   - If `$ARGUMENTS` is empty → **GIT MODE** → Step 0.1.3

2. **Check if input is a file path:**
   - If `$ARGUMENTS` contains `/` or ends with file extension (`.ts`, `.js`, `.py`, etc.) → **FILE MODE** → Step 0.1.2

3. **Otherwise assume TASK MODE:**
   - Input is treated as task-id → Step 0.1.1

#### Step 0.1.1: TASK MODE Validation

1. Verify `./.claude/tasks/$ARGUMENTS/` directory exists
2. If not found, return error: "Task `$ARGUMENTS` not found. Run `/devkit:task` first."
3. Verify `./.claude/tasks/$ARGUMENTS/plan/plan.md` exists
4. If not found, return error: "Plan not found. Run `/devkit:plan` first."
5. **Update plan.md frontmatter**: Set `stage: test` and `status: in_progress`
6. **Collect files from task:**
   - Read plan phases to identify files created/modified
   - Extract all source file paths from plan
   - Build list of source files that need tests

#### Step 0.1.2: FILE MODE Validation

1. Verify file exists: `$ARGUMENTS`
2. If not found, return error: "File `$ARGUMENTS` not found."
3. Check if file is testable (not a test file, config, or generated file)
4. If not testable, return error: "File `$ARGUMENTS` is not a testable source file."
5. Add `$ARGUMENTS` to files list

#### Step 0.1.3: GIT MODE Validation

1. Check if in git repository: `git rev-parse --git-dir 2>/dev/null`
2. If not, prompt user for task-id or file path (do not error)
3. **Collect changed files from git:**
   - Run: `git diff --name-only HEAD 2>/dev/null`
   - Run: `git diff --cached --name-only 2>/dev/null`
   - Combine both lists (staged + unstaged changes)
   - Filter for testable source files (exclude test files, configs, etc.) — see [skip-patterns.md](./skip-patterns.md)
   - If no files found, return error: "No changed files found in git."

---

## Phase 1: Initialize File Queue

1. Create ordered list of files to test from Phase 0
2. Initialize TodoWrite with each file as a task
3. Set first file as current target

---

## Phase 3: Verify All Files Complete

1. Run full test suite with coverage
2. Verify each file has 100% coverage
3. Verify all tests pass (0 failures)
4. If any file < 100%, return to Phase 2 (tester-prompts.md) for that file
