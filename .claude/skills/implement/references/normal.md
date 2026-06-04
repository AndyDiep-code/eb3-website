# Normal Implementation Mode

Multi-phase implementation that loops through ALL phases in ONE execution.
**NO TESTS** — testing handled separately via `/devkit:test`.

## Auto Mode Detection

**Check if `--auto` flag is present in `$ARGUMENTS`:**

```
AUTO_MODE = "--auto" in $ARGUMENTS
TASK_ID = $ARGUMENTS with "--auto" removed and trimmed
```

**When `AUTO_MODE = true`:**
- Skip ALL `AskUserQuestion` prompts
- Use default/recommended options automatically
- Auto-approve phases and continue to next phase
- **Run until ALL phases are complete (no stopping)**
- Default report preference: `generate_report: false` (inline)

**When `AUTO_MODE = false` (Manual mode):**
- Ask for user approval at each phase
- **Automatically continue to next phase after user approves**
- **Run until ALL phases complete OR user selects "Approve and stop"**
- Only stops when user explicitly chooses to stop or all phases done

**Output at start:** `🤖 Auto mode: ON - Running all phases without interruption`

---

## Phase 0: Setup & Validation

### Step 0.1: Sub-Agent Report Preference

**If `AUTO_MODE = true`:**
- Skip this question
- Default to `generate_report: false` (inline report)
- Output: `⏭ Step 0.1: Auto mode - Using inline reports`

**If `AUTO_MODE = false`:**
Before spawning ANY sub-agent, you MUST ask user about report preference:

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

-   Inline selected → Add `generate_report: false` to prompt
-   Detailed selected → Add `generate_report: true` to prompt

**IMPORTANT:** Do NOT spawn any sub-agent until this step is resolved.

### Step 0.2: Validate Task

1. If task-id not provided:
   - Check `$DEVKIT_TASK_ID` env var (set by session hooks)
   - Check `## Plan Context` from hooks for active task path
   - **If `AUTO_MODE = true` and still no task-id:** Return error: "Auto mode requires task-id. Usage: /spec:implement [task-id] --auto"
   - **If `AUTO_MODE = false` and still no task-id:** Use `AskUserQuestion` to ask for it
2. Run `node .claude/scripts/set-active-task.cjs [TASK_ID]` to ensure session tracks this task.
3. Verify `./.claude/tasks/[TASK_ID]/` directory exists
4. If not found, return error: "Task not found. Run `/devkit:task` first."
5. Verify `./.claude/tasks/[TASK_ID]/plan/plan.md` exists
6. If not found, return error: "Plan not found. Run `/devkit:plan` first."

---

## Role Responsibilities

-   You are a senior software engineer who must study the provided implementation plan end-to-end before writing code.
-   Validate the plan's assumptions, surface blockers, and confirm priorities with the user prior to execution.
-   Drive the implementation from start to finish, reporting progress and adjusting the plan responsibly while honoring **YAGNI**, **KISS**, and **DRY** principles.
-   **DO NOT create any tests** (unit tests, integration tests, E2E tests). Testing is handled separately via `/devkit:test` command.

**IMPORTANT:** Remind these rules with subagents communication:

-   Sacrifice grammar for the sake of concision when writing reports.
-   In reports, list any unresolved questions at the end, if any.

-   **CRITICAL:** You MUST strictly follow `./docs/development-rules.md` in ALL circumstances. If that file doesn't exist, follow `./.claude/doc-templates/development-rules.md` instead. This is NON-NEGOTIABLE.
-   **CRITICAL:** You MUST strictly follow `./.claude/rules/coding-convention.md` (Read it carefully first to know clearly about the development rules before starting the implementation, and don't skip any rule, it's very important!!!) in ALL circumstances. This is NON-NEGOTIABLE.

---

# Your Approach

## Step 0: Plan Detection & Phase Selection

1. **Absorb the Plan**: Read `./.claude/tasks/[TASK_ID]/plan/plan.md`, map dependencies, and list ambiguities.
2. Parse plan for phases and status, auto-select next incomplete (prefer IN_PROGRESS or earliest Planned)
3. **Update plan.md frontmatter**: Set `status: in_progress` and `stage: implement`
4. **Update phase status to IN_PROGRESS:**

   - Call `project-manager` sub-agent: "In the master plan file [plan-path]/plan.md, locate the phase [phase-name] entry and update its status from PENDING to IN_PROGRESS. Add start timestamp to the phase entry."
   - **⚠️ ALWAYS follow with Edit tool regardless of sub-agent result** (do NOT skip this):
     - Use `Edit` tool to update the phase entry in `plan.md` to `IN_PROGRESS` with timestamp
     - Use `Edit` tool to update the phase file's own status/frontmatter to `IN_PROGRESS`
   - This double-write pattern ensures status is set even if sub-agent partially fails
   - **DO NOT proceed to Step 1 until Edit calls are done**

**Output:** `✓ Step 0: [Plan Name] - [Phase Name] - Status: in_progress (verified)`

**Subagent Pattern (use throughout):**

```
Task(subagent_type="[type]", prompt="[task description]", description="[brief]")
```

---

## Workflow Sequence

**Rules:** Follow steps 1-6 in order. Each step requires output marker starting with "✓ Step N:". Mark each complete in TodoWrite before proceeding. Do not skip steps. User approval (Step 6) is MANDATORY - combines approval + next phase decision in a single prompt.

**CRITICAL - CONTINUOUS EXECUTION:**
- This command processes through ALL plan phases automatically
- After completing one phase, it **automatically loops back to Step 0** for the next phase
- **DO NOT STOP** until all phases are complete OR user selects "Approve and stop"
- The workflow is: Phase 1 → Phase 2 → Phase 3 → ... → Phase N (all in ONE command execution)

**Note:** Testing is handled separately via `/devkit:test` command.

---

## ⚠️ EXECUTION CONTROL - CRITICAL - READ THIS FIRST

**THIS IS A CONTINUOUS, MULTI-PHASE COMMAND:**
- ONE command invocation processes ALL phases (Phase 1 → Phase 2 → ... → Phase N)
- Steps 1-6 repeat FOR EACH PHASE within the same execution context
- You MUST NOT EXIT after completing a phase unless:
  - All phases are complete, OR
  - User explicitly selects "Approve and stop" in Manual Mode

**LOOP IMPLEMENTATION REQUIREMENTS:**
- After Step 6 approval for continuation:
  1. Mark Step 6 complete
  2. Show Summary Output
  3. **DO NOT STOP. DO NOT EXIT. DO NOT WAIT.**
  4. **IMMEDIATELY start Step 0 for the next phase**
  5. Continue within THIS execution (no user re-invocation needed)

**The Summary Output is INTERMEDIATE, not FINAL** (unless last phase or user stops).

**If you display Summary Output and stop execution, you have FAILED this command.**

---

## Step 1: Analysis & Task Extraction

Read plan file completely. Map dependencies between tasks. List ambiguities or blockers. Identify required skills/tools and activate from catalog. Parse phase file and extract actionable tasks.

**TodoWrite Initialization & Task Extraction:**

-   Initialize TodoWrite with `Step 0: [Plan Name] - [Phase Name]` and all command steps (Step 1 through Step 5)
-   Read phase file (e.g., phase-01-preparation.md)
-   Look for tasks/steps/phases/sections/numbered/bulleted lists
-   MUST convert to TodoWrite tasks:
    -   Phase Implementation tasks → Step 2.X (Step 2.1, Step 2.2, etc.)
    -   Phase Code Review tasks → Step 3.X (Step 3.1, Step 3.2, etc.)
-   Ensure each task has UNIQUE name (increment X for each task)
-   Add tasks to TodoWrite after their corresponding command step

**Output:** `✓ Step 1: Found [N] tasks across [M] phases - Ambiguities: [list or "none"]`

Mark Step 1 complete in TodoWrite, mark Step 2 in_progress.

---

## Step 2: Implementation

Implement selected plan phase step-by-step following extracted tasks (Step 2.1, Step 2.2, etc.). Mark tasks complete as done. For UI work, call `ui-ux-designer` subagent: "Implement [feature] UI per ./docs/design-guidelines.md" (if available). Use `imagemagick` for image editing. Run type checking and compile to verify no syntax errors.

**Output:** `✓ Step 2: Implemented [N] files - [X/Y] tasks complete, compilation passed`

Mark Step 2 complete in TodoWrite, mark Step 3 in_progress.

---

## Step 3: Code Review (ONLY AFTER LAST PHASE MEAN ONLY IF ALL PHASES ARE COMPLETED)

**CRITICAL:** Code review triggers ONLY ONCE - after the LAST phase of the plan. Do NOT review after each phase (wastes tokens). This step is SKIPPED unless this is the LAST phase.

**Before proceeding, check:**

1. Count total phases in the plan
2. Count completed phases (including current phase being finalized)
3. If completed phases < total phases → **SKIP Step 3**, go directly to Step 4

**If this is the LAST phase (all phases now complete):**

**Smart File Exclusion:** Apply all exclusion patterns from `./.claude/rules/file-exclusion-patterns.md` to filter out non-reviewable files (tests, generated code, configs, dependencies, assets, etc.).

**MANDATORY: Collect ALL files before review:**

1. Read the plan file to get the complete list of ALL phases
2. For EACH phase, collect ALL files that were created or modified
3. Compile a COMPLETE file list covering the ENTIRE plan (not just 1-2 files)
4. Pass this COMPLETE list to the code-reviewer

Call `code-reviewer` subagent: "Review ALL code changes for task [task-id] across the ENTIRE plan.

**COMPLETE FILE LIST (all phases):**

-   Phase 1: [list all files from phase 1]
-   Phase 2: [list all files from phase 2]
-   Phase N: [list all files from phase N]

Review ALL [total count] files as a SINGLE batch - NOT one file at a time. Do NOT skip any files. Check security, performance, architecture, YAGNI/KISS/DRY against ./docs/code-standards.md and ./.claude/rules/coding-convention.md."

**CRITICAL - MANDATORY FIX REQUIREMENT:**
If ANY medium, high, or critical issues found: **STOP immediately**, fix ALL of them, then re-run `code-reviewer`. Repeat this cycle until the count reaches ZERO for all three severity levels.

**⚠️ DO NOT SKIP CRITICAL OR HIGH OR MEDIUM ISSUES** - Critical and high and medium issues are equally mandatory to fix. This is NON-NEGOTIABLE.

**Issue severity levels (ALL must be fixed to 0):**

-   **Critical:** Security vulnerabilities (XSS, SQL injection, OWASP), data loss risks → **MUST FIX**
-   **High:** Performance bottlenecks, architectural violations, principle violations → **MUST FIX**
-   **Medium:** Code quality issues, maintainability concerns, missing error handling → **MUST FIX**

**Output (skipped):** `⏭ Step 3: Skipped - [N] phases remaining`
**Output (reviewed):** `✓ Step 3: Code reviewed - [0] medium/high/critical issues`

**Validation:** Step 3 is INCOMPLETE if medium > 0 OR high > 0 OR critical > 0. ALL three must be ZERO to proceed.

Mark Step 3 complete (or skipped) in TodoWrite, mark Step 4 in_progress.

---

## Step 4: Prepare Summary (Auto-proceed)

**Purpose:** Collect summary of completed work for Step 6 user review. No interruption here.

1. **Collect Phase Summary:**
    - Files created/modified
    - Key changes implemented
    - Code review status (if applicable)

2. **Store summary** internally for presentation in Step 6

**Output:** `✓ Step 4: Summary prepared - [N] files changed`

Mark Step 4 complete in TodoWrite, mark Step 5 in_progress.

---

## Step 5: Finalize

1. **STATUS UPDATE (BLOCKING - MUST VERIFY):**

   - Call `project-manager` sub-agent: "Update plan status in [plan-path]. Mark plan phase [phase-name] as DONE with timestamp. Update roadmap. And after that update the plan.md file (master plan file) with the new status."
   - **⚠️ ALWAYS follow with Edit tool regardless of sub-agent result** (do NOT skip this):
     - Use `Edit` tool to update the phase file's status/frontmatter to `DONE` with timestamp
     - Use `Edit` tool to update the phase entry in `plan.md` to `DONE` with timestamp
   - This double-write pattern ensures status is set even if sub-agent partially fails
   - Log: `Status written via Edit: [phase-file] + plan.md`

2. **ONBOARDING CHECK:** Detect onboarding requirements (API keys, env vars, config) + generate summary report with next steps.

3. Check if this is the last phase of the plan. If ALL phases complete:
    - **Use `Edit` tool** to update plan.md frontmatter: set `status: done` and `stage: done`
    - Log: `Plan marked done in plan.md`

**Output:** `✓ Step 5: Finalized - Status updated and verified, roadmap current`

**Validation:** Status verification MUST pass. If sub-agent fails to update status, manual update is REQUIRED.

Mark Step 5 complete in TodoWrite.

**Phase workflow finished.**

---

## Step 6: User Approval & Next Phase Decision

**If `AUTO_MODE = true`:**
- Skip `AskUserQuestion` prompt
- **If MORE phases remain:** Auto-approve and continue to next phase
  - Output: `⏭ Step 6: Auto mode - Approved, continuing to next phase [NOW RETURNING TO STEP 0]`
  - Show Summary Output (intermediate)
  - **IMMEDIATELY return to Step 0 for next phase (DO NOT EXIT)**
- **If this is the LAST phase:** Auto-approve and finalize
  - Output: `⏭ Step 6: Auto mode - Approved, implementation complete [ALL PHASES DONE]`
  - Show Summary Output (final)
  - EXIT command

**If `AUTO_MODE = false`:**
Get explicit user approval and decide next action in a SINGLE prompt.

**Present the summary collected in Step 4 and ask for approval:**

**If MORE phases remain**, use `AskUserQuestion` tool:

```
question: "Phase [phase-name] implementation complete.\n\n**Files Changed:** [list]\n**Key Changes:** [summary]\n**Code Review:** [status]\n\nWhat would you like to do?\n\n💡 To request changes: Select 'Type something' and describe what to change."
header: "Phase Complete"
options:
  - label: "Approve and continue to next phase (Recommended)"
    description: "Finalize this phase and proceed to implement the next phase"
  - label: "Approve and stop here"
    description: "Finalize this phase and pause - return later with /devkit:implement"
```

**If this is the LAST phase**, use `AskUserQuestion` tool:

```
question: "Phase [phase-name] implementation complete.\n\n**Files Changed:** [list]\n**Key Changes:** [summary]\n**Code Review:** [status]\n\nWhat would you like to do?\n\n💡 To request changes: Select 'Type something' and describe what to change."
header: "Implementation Complete"
options:
  - label: "Approve and finalize (Recommended)"
    description: "Complete the implementation - ready for /devkit:test"
```

**Handle Response:**

-   **"Approve and continue":**
    1. Mark Step 6 complete in TodoWrite
    2. Show Summary Output (intermediate, not final)
    3. **⚠️ CRITICAL - DO NOT EXIT COMMAND:**
       - DO NOT stop execution
       - DO NOT wait for user to re-invoke command
       - DO NOT treat this as task completion
    4. **IMMEDIATELY proceed to next phase:**
       - Return to Step 0 for next phase
       - Continue within THIS execution context
       - Process next phase through Steps 1-6
    5. Repeat until all phases complete or user stops

-   **"Approve and stop":**
    1. Mark Step 6 complete
    2. Show Summary Output (final for this session)
    3. EXIT command (user can resume later with /devkit:implement [TASK_ID])

-   **"Approve and finalize" (last phase):**
    1. Mark Step 6 complete
    2. Show Summary Output (final)
    3. EXIT command

-   **"Type something" (custom text input):** User is requesting changes
    1. **Read user's typed feedback** describing what changes they want
    2. **Rollback phase status:** Call `project-manager` sub-agent: "Update phase [phase-name] status from DONE back to IN_PROGRESS in [plan-path]/plan.md"
    3. Address the feedback by returning to Step 2 (implementation) or Step 3 (code review) as needed
    4. After modifications, re-run from Step 4 onwards
    5. Return to Step 6 for re-approval

**Output (approved + continue):** `✓ Step 6: User approved - Auto-continuing to next phase [NOW RETURNING TO STEP 0]`
**Output (approved + stop):** `✓ Step 6: User approved - Pausing implementation (resume with /devkit:implement [TASK_ID])`
**Output (approved + finalize):** `✓ Step 6: User approved - Implementation complete [ALL PHASES DONE]`
**Output (custom feedback):** `↩ Step 6: Changes requested - "[brief feedback summary]" - Rolling back to IN_PROGRESS`

**Validation:** User must explicitly approve. Do not proceed without approval.
**IMPORTANT:** Must use `AskUserQuestion` tool AND continue execution after receiving response. Do not stop the process or output plain text questions.

**LOOP BACK BEHAVIOR - MANDATORY EXECUTION FLOW:**

**When continuing to next phase:**
```
✓ Step 6: User approved (or auto-approved)
  ↓
✓ Mark Step 6 complete in TodoWrite
  ↓
✓ Display Summary Output (INTERMEDIATE, not final)
  ↓
⚠️ **CRITICAL DECISION POINT:**
  ├─ More phases remain? → **IMMEDIATELY START STEP 0 FOR NEXT PHASE**
  │                         (DO NOT EXIT, DO NOT STOP, DO NOT WAIT)
  │                         ↓
  │                         Return to Step 0
  │                         ↓
  │                         Process next phase (Steps 1-6)
  │                         ↓
  │                         Repeat until all phases done or user stops
  │
  └─ Last phase or user stopped? → EXIT COMMAND
```

**If you display Summary Output with "Auto-continuing to next phase..." and then STOP EXECUTION, you have violated this protocol.**

Mark Step 6 complete in TodoWrite.

---

## ⚠️ Summary Output Context - READ BEFORE DISPLAYING

**CRITICAL - UNDERSTAND OUTPUT PURPOSE:**
- **If continuing to next phase:** This is an INTERMEDIATE summary, NOT the end of execution
- **After displaying summary with "Auto-continuing to next phase...":**
  - DO NOT stop execution
  - DO NOT wait for new user input
  - IMMEDIATELY return to Step 0 for next phase
- **Only treat as FINAL output when:**
  - Last phase complete, OR
  - User selected "Approve and stop"

**Displaying the summary does NOT mean the command is finished.**

---

## Summary Output

**IMPORTANT:** The "NEXT STEPS" section must be conditional:

-   Check if all plan phases are completed (compare completed phases vs total phases in plan)
-   Only show testing recommendation if this was the last phase
-   Otherwise, show continuation message for next phase

```
════════════════════════════════════════════════════════════════════
                    ✅ IMPLEMENTATION COMPLETE
════════════════════════════════════════════════════════════════════

TASK: [TASK_ID]
PHASE: [phase-name]
MODE: [Manual / Auto]

STEPS COMPLETED:
  ✓ Step 1: Analysis & Task Extraction
  ✓ Step 2: Implementation
  ⏭ Step 3: Code Review (skipped - more phases remain)
     OR ✓ Step 3: Code Review (all phases complete)
  ✓ Step 4: Summary prepared
  ✓ Step 5: Finalize
  ✓ Step 6: User approved - [continue/stop/finalize]
     OR ⏭ Step 6: Auto mode - Approved, [continuing/complete]

FILES MODIFIED: [count] files
TASKS COMPLETED: [X/Y] tasks

NEXT STEPS:
  [If more phases remain (AUTO_MODE or user approved "continue"):]
    → Auto-continuing to next phase...

  [If user selected "Approve and stop":]
    → Resume later with: /devkit:implement [TASK_ID]

  [If all phases complete:]
    → Ready for testing? Run: /devkit:test [TASK_ID]

════════════════════════════════════════════════════════════════════
```

---

## Critical Enforcement Rules

**Step outputs must follow unified format:** `✓ Step [N]: [Brief status] - [Key metrics]`

**Examples:**

-   Auto mode start: `🤖 Auto mode: ON - Running all phases without interruption`
-   Step 0.1: `⏭ Step 0.1: Auto mode - Using inline reports` (auto mode)
-   Step 0: `✓ Step 0: [Plan Name] - [Phase Name] - Status: in_progress (verified)`
-   Step 1: `✓ Step 1: Found [N] tasks across [M] phases - Ambiguities: [list]`
-   Step 2: `✓ Step 2: Implemented [N] files - [X/Y] tasks complete`
-   Step 3: `⏭ Step 3: Skipped - [N] phases remaining` (if more phases remain)
-   Step 3: `✓ Step 3: Code reviewed - [0] medium/high/critical issues` (ONLY after ALL phases complete, ALL three must be 0)
-   Step 4: `✓ Step 4: Summary prepared - [N] files changed`
-   Step 5: `✓ Step 5: Finalized - Status updated and verified, roadmap current`
-   Step 6: `✓ Step 6: User approved - Auto-continuing to next phase [NOW RETURNING TO STEP 0]`
-   Step 6: `✓ Step 6: User approved - Pausing implementation (resume with /devkit:implement [TASK_ID])`
-   Step 6: `✓ Step 6: User approved - Implementation complete [ALL PHASES DONE]` (last phase)
-   Step 6: `↩ Step 6: Changes requested - "[feedback]" - Rolling back to IN_PROGRESS` (custom text input)
-   Step 6: `⏭ Step 6: Auto mode - Approved, continuing to next phase [NOW RETURNING TO STEP 0]` (auto mode)
-   Step 6: `⏭ Step 6: Auto mode - Approved, implementation complete [ALL PHASES DONE]` (auto mode, last phase)

**If any "✓ Step N:" output missing, that step is INCOMPLETE.**

**TodoWrite tracking required:** Initialize at Step 0, mark each step complete before next.

**Mandatory subagent calls:**

-   Step 3: `code-reviewer` (ONLY after ALL phases complete - skip if more phases remain)
-   Step 5: `project-manager`
-   Step 6: `AskUserQuestion` (REQUIRED unless `AUTO_MODE = true`)
-   Step 6 (if custom feedback typed): `project-manager` (rollback status to IN_PROGRESS)

**Blocking gates:**

-   Step 0: `project-manager` sub-agent called → then **Edit tool writes unconditionally** to phase file + plan.md → MUST complete before Step 1
-   Step 3: **ALL** severity levels must be 0 → medium=0 AND high=0 AND critical=0 (when code review executes). **DO NOT SKIP CRITICAL OR HIGH OR MEDIUM ISSUES.**
-   Step 5: `project-manager` sub-agent called → then **Edit tool writes unconditionally** to phase file + plan.md. Edit calls are NOT conditional — always run regardless of sub-agent result.
-   Step 6: User must explicitly approve phase before continuing or stopping (skipped in `AUTO_MODE`)

**Testing:** Use `/devkit:test` command separately for comprehensive testing with 100% code coverage.

**REMEMBER:**

-   **CRITICAL:** ALWAYS follow `./docs/development-rules.md` (Project specific) and `./.claude/rules/development-rules.md` (General development rules) - NO EXCEPTIONS.
-   **NO TESTS:** Do not create unit tests, integration tests, or E2E tests. Use `/devkit:test` command for testing.
-   Do not skip steps. Do not proceed if validation fails. Do not assume approval without user response (unless `AUTO_MODE = true`).
-   **AUTO MODE:** With `--auto` flag, runs ALL phases without stopping. Auto-approves and continues. No user questions asked.
-   **MANUAL MODE:** Asks for user approval at each phase, then **automatically continues** to next phase after approval (loops until "stop" selected or all phases complete).
-   **LOOP BEHAVIOR:** Both AUTO and MANUAL modes loop through all phases automatically - difference is AUTO skips confirmations, MANUAL asks for approval.
-   **⚠️ STATUS UPDATES — DOUBLE-WRITE PATTERN:** For BOTH Step 0 (IN_PROGRESS) and Step 5 (DONE), ALWAYS call `project-manager` sub-agent first, then **unconditionally** follow with `Edit` tool writes to both the phase file and plan.md. The Edit calls are NOT conditional on sub-agent success — they always run. This prevents the fast auto-loop from skipping the verification+fallback step.
