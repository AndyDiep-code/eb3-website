# Test Skill: Tester Sub-Agent Prompt Templates

Agent: `tester` at `./.claude/agents/tester.md`

Process files **ONE BY ONE** — complete 100% coverage on each file before moving to next.

---

## Phase 2: Process Each File (REPEAT FOR EACH FILE)

### Step 2.1: Check Existing Tests

```
Task(subagent_type="tester", prompt="
FILE: [full-path-to-source-file]
TASK-ID: [task-id]

CHECK:
1. Does a test file exist for this source file?
2. If YES: Run existing tests, report pass/fail status
3. If tests FAIL: Fix them until all pass
4. Report current coverage for THIS FILE ONLY

OUTPUT: { hasTests: bool, testsPass: bool, coverage: X% }
", description="Check existing tests for [filename]")
```

### Step 2.2: Analyze Coverage Gap

```
Task(subagent_type="tester", prompt="
FILE: [full-path-to-source-file]
CURRENT COVERAGE: [X]%

ANALYZE:
1. Run coverage report for THIS FILE ONLY
2. List all uncovered lines
3. List all uncovered branches
4. Identify functions/methods without tests
5. List edge cases not covered

OUTPUT: Detailed list of what needs test coverage
", description="Analyze coverage for [filename]")
```

### Step 2.3: Create Tests Until 100%

**REPEAT until file coverage = 100%:**

```
Task(subagent_type="tester", prompt="
FILE: [full-path-to-source-file]
CURRENT COVERAGE: [X]%
UNCOVERED: [list from Step 2.2]

CREATE TESTS:
1. Write tests for uncovered lines/branches
2. Focus on ONE function/section at a time
3. Include edge cases and error scenarios
4. Run tests - fix any failures immediately
5. Re-check coverage

FORBIDDEN:
- Commenting out tests
- Fake mocks just to pass
- Tests without real assertions
- Skipping difficult cases

TARGET: 100% coverage for THIS FILE
", description="Create tests for [filename] - iteration [N]")
```

**After each iteration:**
- Run coverage check for this file
- If < 100% → repeat Step 2.3
- If = 100% → proceed to next file
