# Lite Implementation Mode

For SMALL tasks — execute all phases in ONE session (max 4 phases).
**NO TESTS** — use `/devkit:test` separately.

Activate relevant skills based on task type: `backend-development`, `code-review`.

## Pre-Implementation Check (Active Task Detection)

Before starting, check for existing active task:

1. **Check session context:** Read `## Plan Context` injected by hooks for active task:
   - If `DEVKIT_TASK_ID` env var or `Plan:` shows an active task: use it
   - If different task-id provided: run `node .claude/scripts/set-active-task.cjs [task-id]`

2. **If no task-id provided and no active task:** Use `AskUserQuestion` tool to ask user for task-id

## Workflow

### Step 0: Setup & Validation

#### Step 0.1: Sub-Agent Report Preference (MANDATORY)

**Before spawning ANY sub-agent**, you MUST ask user about report preference:

Use `AskUserQuestion` tool:
```
question: "How should sub-agent reports be delivered?"
header: "Report Style"
options:
  - label: "Inline Report (Recommended)"
    description: "Brief summary displayed in conversation, no file saved"
  - label: "Detailed Report"
    description: "Full analysis saved to ./.claude/tasks/[TASK-ID]/reports/"
```

**Pass preference to ALL sub-agent prompts:**
- Inline selected → Add `generate_report: false` to prompt
- Detailed selected → Add `generate_report: true` to prompt

**IMPORTANT:** Do NOT spawn any sub-agent until this question is answered.

#### Step 0.2: Validate Task

1. If task-id not provided, check `$DEVKIT_TASK_ID` env var or `## Plan Context` from hooks first
2. Verify `./.claude/tasks/$ARGUMENTS/plan.md` exists
3. If not found: "Plan not found. Run `/devkit:plan --mode lite` first."

### Step 1: Load Plan & Update Status

1. Read `plan.md` completely
2. Read `requirements.md` for acceptance criteria
3. **Update plan.md frontmatter**: Set `status: in_progress` and `stage: implement`
4. Initialize TodoWrite with all phases and tasks

**Output:** `✓ Step 1: Loaded plan with [N] phases - Status: in_progress`

### Step 2: Implement All Phases
For each phase (except final review phase):
1. Mark phase as in_progress in TodoWrite
2. Implement each task in the phase (Check all the available skills and use the appropriate skill for the task)
3. Mark tasks complete as done
4. Run type checking to verify no syntax errors (only all phase are completed, run one time for all the file that generated across all the phases)
5. **If NOT the last phase:** Use `AskUserQuestion` to ask user if they want to proceed:
   ```
   question: "Phase [phase-name] completed. Do you want to proceed to the next phase?"
   header: "Next Phase"
   options:
     - label: "Yes, continue (Recommended)"
       description: "Proceed to implement the next phase immediately"
     - label: "No, stop here"
       description: "Pause and return later with /devkit:implement --mode lite"
   ```
   - **"Yes, continue":** Proceed to next phase
   - **"No, stop here":** Skip remaining phases, go to Step 3 (Code Review) with completed phases only

**Output:** `✓ Step 2: Implemented [N] phases - [files modified]`

### Step 3: Code Review (ONLY AFTER LAST PHASE MEAN ONLY IF ALL PHASES ARE COMPLETED)

**CRITICAL:** Code review triggers ONLY ONCE - after the LAST phase of Step 2 completes. Do NOT review after each phase (wastes tokens). Wait until ALL files from ALL phases are generated, then review everything in ONE batch.

**Verification before code review:**
1. Confirm all phases from Step 2 are marked complete
2. Run type checking and compile to verify no syntax errors
3. **Start the app** to verify it runs without runtime errors:
   - Frontend: `npm run dev` or equivalent - verify app loads without console errors
   - Backend: `npm run start:dev` or equivalent - verify server starts and responds
   - Fullstack: Verify both frontend and backend start successfully
4. If startup fails: Fix the issue before proceeding to code review

**Smart File Exclusion:** Apply all exclusion patterns from `./.claude/rules/file-exclusion-patterns.md` to filter out non-reviewable files (tests, generated code, configs, dependencies, assets, etc.).

**MANDATORY: Collect ALL files before review:**
1. Review the plan file to get the complete list of ALL phases
2. For EACH phase, collect ALL files that were created or modified
3. Compile a COMPLETE file list covering the ENTIRE task (not just 1-2 files)
4. Pass this COMPLETE list to the code-reviewer

**Use `code-reviewer` sub-agent** for batch review:
```
Task(subagent_type="code-reviewer", prompt="Review ALL code for lite task [task-id] across the ENTIRE plan.

**COMPLETE FILE LIST (all phases):**
- Phase 1: [list all files from phase 1]
- Phase 2: [list all files from phase 2]
- Phase N: [list all files from phase N]

Review ALL [total count] files as a SINGLE batch - NOT one file at a time. Do NOT skip any files. Check against ./docs/code-standards.md and ./.claude/rules/coding-convention.md. Report critical issues only. SKILL USAGE: Check <available_skills> and use Skill tool for matching tasks.", description="Review all code")
```

**Fix Loop (MANDATORY):**
If medium/high/critical issues found: STOP, fix all issues, re-run `code-reviewer`.
Repeat until no medium/high/critical issues.

**Issue severity levels to fix:**
- **Critical:** Security vulnerabilities (XSS, SQL injection, OWASP), data loss risks
- **High:** Performance bottlenecks, architectural violations, principle violations
- **Medium:** Code quality issues, maintainability concerns, missing error handling

**Validation:** If medium/high/critical issues > 0, Step 3 INCOMPLETE - do not proceed to Step 4.

**Output:** `✓ Step 3: Review [passed/N issues] - [total files] files reviewed, app starts successfully`

### Step 4: User Approval

**REQUIRED:** Before finalizing, get explicit user approval for the completed task.

1. **Present Task Summary:**
   - Files created/modified
   - Key changes implemented
   - Code review status

2. **Request Approval:**
   Use `AskUserQuestion`: "Task [task-id] implementation complete. Please review the changes and confirm:\n\n**Files Changed:** [list]\n**Key Changes:** [summary]\n**Code Review:** [status]\n\nApprove this task? (yes/no/feedback)"

3. **Handle Response:**
   - **"yes" or approval:** Proceed to Step 5
   - **"no" or rejection:** STOP, ask for specific feedback, return to relevant step (2/3)
   - **feedback provided:** Address feedback, re-run affected steps, request approval again

**Output (waiting):** `⏸ Step 4: WAITING for approval`
**Output (approved):** `✓ Step 4: User approved task [task-id]`

**Validation:** User must explicitly approve. Do not proceed without approval.

### Step 5: Finalize

1. **Update plan.md frontmatter**: Set `status: done` and `stage: done`

**Use `project-manager` sub-agent:**
```
Task(subagent_type="project-manager", prompt="Update lite task [task-id] status to Complete. Update plan.md frontmatter: status=done, stage=done. Update plan.md phases to DONE. Update README.md status. Check <available_skills> and use Skill tool for matching tasks.", description="Update status")
```

### Step 6: Clear Active Task

After successful completion, the session state retains the active task until a new task is set or the session ends. No manual cleanup needed.

**Output:** `✓ Step 5: Task [task-id] complete`

### Step 7: Summary Report

**IMPORTANT:** Only show this summary after ALL steps (1-6) are complete and user has approved (Step 4).

```
════════════════════════════════════════════════════════════════════
                    ✅ LITE TASK COMPLETE
════════════════════════════════════════════════════════════════════

TASK: [task-id]
STATUS: Implementation Complete

IMPLEMENTED:
  ✅ Phase 1: [name]
  ✅ Phase 2: [name]
  ✅ Phase 3: [name]
  ✅ Phase 4: Code Review

FILES MODIFIED:
  • [file1] - [brief change]
  • [file2] - [brief change]

CODE REVIEW: Passed

NEXT STEPS:
  → Ready for testing: /devkit:test [task-id]

════════════════════════════════════════════════════════════════════
```

## Sub-Agent Usage Summary

| Step | Agent | Purpose |
|------|-------|---------|
| Step 3 | `code-reviewer` | Review code quality (ONLY after ALL phases complete) |
| Step 4 | `AskUserQuestion` | Get explicit user approval (REQUIRED) |
| Step 5 | `project-manager` | Update task status |

**Testing:** Use `/devkit:test` command separately for comprehensive testing.

## Critical Rules

- **ALL PHASES IN ONE SESSION** - Complete all phases unless user chooses to stop
- **ASK BEFORE NEXT PHASE** - After each phase (except last), ask user if they want to continue
- **NO RESEARCH** - Use existing knowledge only
- **NO TESTS** - Do not create unit/integration/E2E tests (use `/devkit:test` instead)
- **VERIFY APP STARTS** - After implementation, verify app starts without errors before code review
- **CODE REVIEW AFTER ALL PHASES** - Do NOT review after each phase, review ALL files as batch after ALL phases complete
- **FIX LOOP UNTIL CLEAN** - If medium/high/critical issues found, fix ALL, re-run reviewer, repeat until 0 issues
- **FOLLOW CODE STANDARDS** - Check ./docs/code-standards.md
- **USER APPROVAL MANDATORY** - Do not proceed to Step 5 without explicit user approval
- **SUB-AGENT SKILL INHERITANCE** - Include skill reminder in sub-agent prompts

## Blocking Gates

- **Step 3:** App must start successfully AND no medium/high/critical code review issues
- **Step 4:** User must explicitly approve (MANDATORY)
- **Step 5:** project-manager must complete successfully

## When to Use Full Spec Instead

If during implementation you find:
- Task is more complex than expected
- Need research or external docs
- More than 4 phases required

Stop and suggest: "This task is too complex for lite mode. Use `/devkit:plan` instead."

## Important Notes

- **CRITICAL:** Follow `./.claude/rules/coding-convention.md` for code quality standards
- **CRITICAL:** Follow `./docs/development-rules.md` if exists
- This is for SMALL tasks only
- One session, all phases
- Keep it simple - YAGNI, KISS, DRY
