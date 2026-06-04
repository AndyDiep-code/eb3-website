<!--
Usage: /devkit:review --mode code [--task TASK-ID] [file-path | folder-path | --changed | --diff base-branch | --codebase] [--skip-db] [--skip-perf] [--skip-security]
Purpose: Orchestrate a team of specialized review agents for comprehensive code review
Example: /devkit:review --mode code src/services/
Example: /devkit:review --mode code --changed
Example: /devkit:review --mode code --task ABC-123
Example: /devkit:review --mode code --task ABC-123 --changed
Example: /devkit:review --mode code src/features/checkout/ --skip-db
Example: /devkit:review --mode code --changed staged --skip-perf --skip-security
Example: /devkit:review --mode code --diff main
Example: /devkit:review --mode code --codebase
Example: /devkit:review --mode code --codebase --skip-db --skip-perf

Options:
  --task TASK-ID  Review code based on task requirements (loads plan, requirements)
  --diff <branch> Compare current branch against specified base branch
  --codebase      Scan and analyze the entire codebase
  --skip-db       Skip database review
  --skip-perf     Skip performance review
  --skip-security Skip security review
-->
## Git Optional

**NOTE**: Git is optional for this command. If git is not available or commands fail, gracefully continue without git-dependent features:
- `--changed` and `--diff` modes require git - show friendly message if unavailable
- Skip git-related operations silently when git fails
- Fall back to file/folder path mode or `--codebase` mode

## MANDATORY Report Generation

**⚠️ NON-NEGOTIABLE**: ALL review agents MUST generate a report file. Inline-only reports are NOT acceptable.

**EXECUTE THESE STEPS BEFORE LAUNCHING ANY SUB-AGENTS:**

1. **Resolve PROJECT_ROOT** (absolute path to prevent agents writing to wrong location):
   ```bash
   PROJECT_ROOT=$(pwd)
   echo "PROJECT_ROOT=$PROJECT_ROOT"
   ```
   Store this value - ALL report paths MUST use this absolute prefix.

2. **Generate Task ID**: If `--task` provided, use that TASK-ID. Otherwise, generate `review-YYMMDD-HHmm` (use `bash -c 'date +%y%m%d-%H%M'`).

3. **Create Report Directory IMMEDIATELY** (before launching agents):

   ```bash
   mkdir -p "$PROJECT_ROOT/.claude/tasks/[TASK-ID]/reports"
   ```

   **⚠️ CRITICAL**: This step MUST complete BEFORE launching any sub-agents. Sub-agents will fail to save reports if this directory doesn't exist.

4. **Compute REPORT_DIR** (absolute path passed to every agent):
   ```
   REPORT_DIR=$PROJECT_ROOT/.claude/tasks/[TASK-ID]/reports
   ```
   **⚠️ ALWAYS use this absolute REPORT_DIR in all agent prompts. NEVER use relative paths like `./.claude/...`.**

5. **Sub-Agent Reports**: Set `generate_report: true` for ALL sub-agents. Each saves to:

   - `$REPORT_DIR/code-review.md`
   - `$REPORT_DIR/database-review.md` (if applicable)
   - `$REPORT_DIR/performance-review.md` (if applicable)
   - `$REPORT_DIR/security-review.md` (if applicable)

6. **Confirm Save**: At end of review, verify each report file exists for **DEPLOYED_AGENTS only**:
   ```bash
   # Verify reports were saved (run after all agents complete)
   # Loop ONLY over DEPLOYED_AGENTS report filenames — NOT hardcoded list of all 4
   for report in <DEPLOYED_AGENTS report filenames>; do
     if [ -f "$REPORT_DIR/$report.md" ]; then
       echo "  ✅ $REPORT_DIR/$report.md ($(wc -l < "$REPORT_DIR/$report.md") lines)"
     else
       echo "  ❌ MISSING: $REPORT_DIR/$report.md"
     fi
   done
   ```

**FAILURE TO SAVE REPORT FILES = INCOMPLETE REVIEW. If any report is MISSING after agents complete, re-request the missing agent to save its report.**

# Deep Code Review

Comprehensive multi-dimensional review using specialized agents in parallel:

| Agent                    | Focus Area                                             |
| ------------------------ | ------------------------------------------------------ |
| **code-reviewer**        | Code styling, clean code, development rules compliance |
| **database-admin**       | Database queries, schema design, query performance     |
| **performance-engineer** | Performance bottlenecks, optimization opportunities    |
| **security-agent**       | OWASP compliance, vulnerabilities, secure coding       |

---

## Smart File Exclusion

**Auto-exclude non-reviewable files using shared patterns:**

Apply all exclusion patterns from `./.claude/rules/file-exclusion-patterns.md` to filter out non-reviewable files (tests, generated code, configs, dependencies, assets, etc.).

---

## Input Validation

### Parse Arguments ($ARGUMENTS)

**Step 1: Extract Options**

Parse flags from $ARGUMENTS:

- `--task [TASK-ID]` → Load task context (requirements, plan, files)
- `--codebase` → Scan entire codebase (full codebase review mode)
- `--skip-db` → Skip database-admin review
- `--skip-perf` → Skip performance-engineer review
- `--skip-security` → Skip security-agent review

**Step 2: Validate Task (if --task provided)**

If `--task [TASK-ID]` specified:

1. Verify task exists: !`test -d "$PROJECT_ROOT/.claude/tasks/[TASK-ID]" && echo "EXISTS" || echo "MISSING"`

If MISSING: - Show error: "Task not found: [TASK-ID]" - List available tasks: !`ls -d "$PROJECT_ROOT/.claude/tasks"/*/ 2>/dev/null | head -10` - Use `AskUserQuestion` to ask for correct task-id - Do not proceed

If EXISTS: 2. Load task context: - Read @$PROJECT_ROOT/.claude/tasks/[TASK-ID]/requirements/01-functional.md - Read @$PROJECT_ROOT/.claude/tasks/[TASK-ID]/requirements/10-notes.md - Read @$PROJECT_ROOT/.claude/tasks/[TASK-ID]/plan/plan.md

    3. Extract files from plan:
       - Parse phase files for file references: !`grep -rh "📄\|FILES\|Created\|Modified" "$PROJECT_ROOT/.claude/tasks/[TASK-ID]/plan"/phase-*.md 2>/dev/null | head -50`
       - Get recent git changes (optional, skip if git unavailable): !`git diff --name-only HEAD~20 2>/dev/null | grep -E "\.(ts|tsx|js|jsx|py|go|rs|java|sql)$" | head -50 || echo ""`

    4. Store task context for agents:
       ```
       TASK_CONTEXT:
         task-id: [TASK-ID]
         requirements: [FR-xxx list]
         constraints: [list]
         decisions: [list]
         files: [list from plan]
       ```

**Step 3: Determine Review Target**

After removing option flags, parse remaining arguments:

**If `--codebase` specified** (full codebase review):
1. Task ID and REPORT_DIR already set in MANDATORY section above. Do NOT regenerate.
2. Scan entire codebase and collect into FILE_LIST:
   ```bash
   FILE_LIST=$(find "$PROJECT_ROOT" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.py" -o -name "*.go" -o -name "*.rs" -o -name "*.java" -o -name "*.sql" \) 2>/dev/null | grep -v node_modules | grep -v dist | grep -v build | grep -v .git | head -200)
   ```
3. Apply Smart File Exclusion patterns to FILE_LIST
4. Proceed with full file-by-file analysis using the Mandatory File-by-File Review Protocol — every file in FILE_LIST MUST be reviewed
5. Proceed to Phase 1 categorization, then Phase 3 agent launch

**If no target specified:**
If `--task` was provided:
```
FILE_LIST = TASK_CONTEXT.files  (files extracted from plan in Step 2)
# If FILE_LIST is still empty, fall back to git changes collected in Step 2
FILE_LIST = files from `git diff --name-only HEAD~20`
```
Else:
Use `AskUserQuestion`:

```
Question: What would you like to review?
Header: Review Target
Options:
  - All uncommitted changes (--changed)
  - Staged changes only (--changed staged)
  - Compare with another branch (--diff <branch>)
  - Specific file or folder (provide path)
  - Help me find files to review
```

**If `--changed` specified:**
Parse change scope:

- `--changed` or `--changed all` → All uncommitted changes
- `--changed staged` → Only staged files
- `--changed HEAD~N` → Changes from last N commits

Get changed files (use correct git command per sub-mode):

```bash
# Check if git is available first — if not, stop and show message
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo "Git not available - use file path or --codebase mode instead"
  # Do not proceed with --changed mode
  exit 1  # (or ask user to pick an alternative target via AskUserQuestion)
fi
```

| Sub-mode | Git command |
|----------|-------------|
| `--changed` / `--changed all` | `git diff --name-only HEAD 2>/dev/null` |
| `--changed staged` | `git diff --cached --name-only 2>/dev/null` |
| `--changed HEAD~N` | `git diff --name-only HEAD~N HEAD 2>/dev/null` |

Collect into FILE_LIST:
```bash
FILE_LIST=$(<git-command-from-table> | grep -E "\.(ts|tsx|js|jsx|py|go|rs|java|sql)$")
```

If FILE_LIST is empty: - Show message: "No changed code files found" - Ask user for alternative target - Do not proceed

**If `--diff` specified** (branch comparison):
Extract base branch from arguments (e.g., `--diff main` → `main`)

1. Get current branch (skip if git unavailable): !`git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown"`

2. Verify base branch exists:

```bash
# Check git availability first
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo "Git not available - --diff mode requires git"
else
  git rev-parse --verify <base-branch> 2>/dev/null && echo "EXISTS" || echo "MISSING"
fi
```

If MISSING: - Show error: "Branch not found: <base-branch>" - List available branches: !`git branch -a 2>/dev/null | head -20 || echo "Git not available"` - Use `AskUserQuestion` to ask for correct branch name - Do not proceed

If EXISTS: 3. Collect FILE_LIST — all changed files between current branch and base branch:
```bash
FILE_LIST=$(git diff --name-only $(git merge-base <base-branch> HEAD 2>/dev/null) HEAD 2>/dev/null | grep -E "\.(ts|tsx|js|jsx|py|go|rs|java|sql)$")
```

    4. Show branch comparison summary:
    ```bash
    # Show comparison summary (skip if git unavailable)
    if git rev-parse --git-dir > /dev/null 2>&1; then
      echo "Comparing: $(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'unknown') vs <base-branch>"
      git diff --stat $(git merge-base <base-branch> HEAD 2>/dev/null) HEAD 2>/dev/null | tail -5 || echo "Unable to get diff stats"
    fi
    ```

    5. If FILE_LIST is empty:
       - Show message: "No code file changes found between current branch and <base-branch>"
       - Suggest: "Ensure you have commits that modify code files"
       - Do not proceed

**If file/folder path specified:**
Validate path exists, then collect into FILE_LIST:
```bash
# For a single file
FILE_LIST="$TARGET"

# For a folder
FILE_LIST=$(find "$TARGET" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.py" -o -name "*.go" -o -name "*.rs" -o -name "*.java" -o -name "*.sql" \) 2>/dev/null | head -100)
```
If path does not exist: Show error "Path not found: $TARGET" and ask user for correct path via AskUserQuestion.

---

## Mandatory File-by-File Review Protocol

**CRITICAL ENFORCEMENT RULES:**

1. **Complete File Collection**: Gather ALL files to review before starting
2. **Complete Coverage**: Every file MUST be included in agent review batches
3. **No Skipping**: Every file in the list MUST be reviewed
4. **No Early Termination**: Continue until ALL files reviewed by ALL agents
5. **Progress Tracking**: Track reviewed vs remaining files

### File Review Loop

```
1. Use FILE_LIST from Input Validation. If FILE_LIST is empty or not yet collected, collect it now using the appropriate method for the current mode (--changed / --diff / --codebase / file path)
2. Apply Smart File Exclusion to filter out non-reviewable files
3. Display total file count to user

FOR each file in FILE_LIST:
    - Include file in agent review batch
    - Track as PENDING → IN_PROGRESS → REVIEWED
END FOR

4. Launch agents with COMPLETE file list
5. Wait for ALL agents to complete
6. Display summary with report locations
```

### Progress Display

Show file collection summary:

```
════════════════════════════════════════════════════════════════════
📋 FILES TO REVIEW: [total count]

   Collected:
   1. [file path 1]
   2. [file path 2]
   ...

   Excluded (auto-filtered): [count] files

   Proceeding to review ALL [total] files...
════════════════════════════════════════════════════════════════════
```

### When to Use AskUserQuestion

Use `AskUserQuestion` ONLY for:

- Clarifying review target when not specified
- Confirming branch name when --diff branch not found
- Confirming task ID when --task not found
- Resolving blocking issues

Do NOT use AskUserQuestion to:

- Ask permission to continue reviewing
- Ask if more files should be reviewed
- Interrupt the review process

---

## Phase 1: Pre-Analysis

### Categorize & Plan Review

FILE_LIST was already collected during Input Validation above. Do NOT re-collect files here.

1. **Categorize files FROM FILE_LIST (not entire codebase):**

   **CRITICAL**: Filter ONLY from FILE_LIST collected in Input Validation above. Do NOT search entire codebase.

   ```bash
   # Database files = FILE_LIST entries matching these patterns
   DATABASE_FILES=$(echo "$FILE_LIST" | grep -E "(\.sql$|repository|migration|prisma/|drizzle/)")

   # Note: Security review covers ALL files (vulnerabilities can exist anywhere)
   ```

   - **DATABASE_FILES**: Files from FILE_LIST matching `*.sql`, `*repository*`, `*migration*`, `prisma/*`, `drizzle/*`
   - **Security**: Reviews ALL files in FILE_LIST (not filtered)

2. **Show review plan:**

   ```
   ════════════════════════════════════════════════════════════════════
                       📋 DEEP REVIEW PLAN
   ════════════════════════════════════════════════════════════════════

   TARGET: [file/folder/changes]
   FILES TO REVIEW: [count]
   TASK CONTEXT: [TASK-ID or "None"]

   [If --task provided:]
   REQUIREMENTS LOADED:
     - FR-001: [description]
     - FR-002: [description]
     ...

   AGENTS TO DEPLOY:
     ✓ code-reviewer     - Code styling, clean code, rules
     ✓ database-admin    - Database performance [or ⊘ skipped/not applicable]
     ✓ performance-engineer - Performance optimization
     ✓ security-agent    - Security vulnerabilities

   ════════════════════════════════════════════════════════════════════
   ```

---

## Phase 2: Report Generation (Default: Enabled)

**Default behavior:** All agents generate detailed reports saved to project task folder.

**⚠️ ALL reports ALWAYS saved to**: `$PROJECT_ROOT/.claude/tasks/[TASK-ID]/reports/` (using absolute path from Step 1).

**NEVER use `./.claude/reports/` or any relative path. NEVER save to global `~/.claude/` folder.**

**Report setting:** `generate_report: true` (default)

---

## Phase 3: Launch Parallel Subagents

**PRE-LAUNCH CHECKLIST (verify before launching):**
1. ✓ PROJECT_ROOT is resolved (absolute path)
2. ✓ Task ID is set (either from `--task` or generated)
3. ✓ REPORT_DIR is set: `$PROJECT_ROOT/.claude/tasks/[TASK-ID]/reports`
4. ✓ Reports directory exists (created in MANDATORY section above)
5. ✓ FILE_LIST is collected and non-empty

**Track Deployed Agents** — maintain a DEPLOYED_AGENTS list of report filenames actually launched:
```
DEPLOYED_AGENTS = []
# Add each agent as it's spawned:
# { report: "code-review" }
# { report: "database-review" }    (only if spawned)
# { report: "performance-review" } (only if spawned)
# { report: "security-review" }    (only if spawned)
```
This list is used in Phase 4 for report verification only.

**⚠️ CRITICAL: ALL Task() calls MUST be in ONE single message — NEVER sequential**

```
// ✅ CORRECT — parallel (all Task calls in ONE message, one response turn)
Task(subagent_type="code-reviewer",        prompt="[prompt-A]", description="Code quality review")
Task(subagent_type="database-admin",       prompt="[prompt-B]", description="Database review")
Task(subagent_type="performance-engineer", prompt="[prompt-C]", description="Performance review")
```

```
// ❌ WRONG — sequential (separate messages, one Task per turn)
Task(subagent_type="code-reviewer", ...)        ← message 1, wait for result
Task(subagent_type="database-admin", ...)        ← message 2, wait for result  ← NEVER DO THIS
Task(subagent_type="performance-engineer", ...)  ← message 3, wait for result  ← NEVER DO THIS
```

Max 3 concurrent per wave — if 4 agents needed, emit 3 in wave 1 (single message), wait for all 3 to complete, then emit the 4th in wave 2.

### Shared Agent Prompt Template

**Every agent prompt MUST include these blocks.** Use `[AGENT_NAME]` and `[REPORT_FILENAME]` placeholders per agent.

**⚠️ REPORT_DIR OVERRIDE**: The `REPORT_DIR` in this prompt takes priority over the agent's built-in "Report Output > Location Resolution" section. Agents will see `REPORT_DIR` as priority #1 in their location resolution chain.

**Prompt structure for each agent:**
```
---
context:
  review-type: code-review
  task-id: [TASK-ID]
  target: [TARGET_PATH]
  files: [FILE_LIST or subset]
---

PROJECT_ROOT: [PROJECT_ROOT absolute path]
REPORT_DIR: [REPORT_DIR absolute path]

[AGENT-SPECIFIC INSTRUCTIONS: task description, files, focus areas, output format]

[If --task provided:]
TASK CONTEXT:
  Task: [TASK-ID]
  Requirements: [relevant FR-xxx / NFR-xxx from requirements]
  Constraints: [from 10-notes.md]

generate_report: true

SKILL USAGE: Check <available_skills> and use Skill tool for matching tasks.

⚠️🔴 MANDATORY REPORT SAVE:
1. Save COMPLETE review report using Write tool to EXACT absolute path:
   [REPORT_DIR]/[REPORT_FILENAME].md
   ⚠️ REPORT_DIR is absolute. NEVER use relative paths. NEVER save to ~/.claude/.
   ⚠️ Use EXACT filename [REPORT_FILENAME].md - NOT dynamic slug naming.
   ⚠️ The report directory ALREADY EXISTS — do NOT run mkdir. Write directly.
2. Include ALL findings with file paths, line numbers, and fix recommendations
3. After writing, VERIFY: ls -la [REPORT_DIR]/[REPORT_FILENAME].md
4. If Write fails, retry once. If still fails, include error in your output.
```

---

### Agent 1: Code Reviewer (Subagent)

| Field | Value |
|-------|-------|
| **subagent_type** | `code-reviewer` |
| **report_filename** | `code-review` |
| **files** | FILE_LIST (all files) |
| **skip_if** | Never (always runs) |
| **Relevant skills** | `code-review` |

**Agent-specific instructions:**

```
Review the following files for code quality:

FILES TO REVIEW:
[List of files]

FOCUS AREAS:
1. Code styling and formatting consistency
2. Clean code principles (SOLID, DRY, KISS)
3. Development rules compliance (@$PROJECT_ROOT/.claude/rules/coding-convention.md)
4. Naming conventions and readability
5. Function design (size, parameters, complexity)
6. Error handling patterns
7. Type safety (no `any`, proper types)
[If --task provided:]
8. Implementation completeness against requirements
9. Alignment with task constraints and decisions

OUTPUT FORMAT:
- Critical issues (must fix)
- High priority findings
- Medium priority improvements
- Low priority suggestions
[If --task:] - Requirement coverage gaps
```

### Agent 2: Database Admin (Subagent, if applicable)

Skip if `--skip-db` OR no database-related files in FILE_LIST.

**CRITICAL**: Pass ONLY DATABASE_FILES (subset of FILE_LIST). Do NOT pass all database files in codebase.

| Field | Value |
|-------|-------|
| **subagent_type** | `database-admin` |
| **report_filename** | `database-review` |
| **files** | DATABASE_FILES from FILE_LIST only |
| **skip_if** | `--skip-db` OR no DB files in FILE_LIST |

**Agent-specific instructions:**

```
Review database-related code for performance and best practices:

FILES TO REVIEW (from diff/changed files only):
[List ONLY database files from FILE_LIST - NOT entire codebase]

**SCOPE RESTRICTION**: Review ONLY the files listed above.

FOCUS AREAS:
1. Query optimization (N+1 problems, missing indexes)
2. Schema design and normalization
3. Transaction handling and isolation
4. Connection management and pooling
5. SQL injection prevention
6. Data integrity constraints
7. Migration safety
[If --task provided:]
8. Data model alignment with requirements
9. Query patterns match expected use cases

OUTPUT FORMAT:
- Query performance issues with EXPLAIN analysis
- Schema improvement recommendations
- Security concerns in data access
- Index optimization suggestions
[If --task:] - Data model gaps vs requirements
```

### Agent 3: Performance Engineer (Subagent, if applicable)

Skip if `--skip-perf`.

| Field | Value |
|-------|-------|
| **subagent_type** | `performance-engineer` |
| **report_filename** | `performance-review` |
| **files** | FILE_LIST (all files) |
| **skip_if** | `--skip-perf` |

**Agent-specific instructions:**

```
Analyze code for performance bottlenecks and optimization opportunities:

FILES TO REVIEW:
[List of files]

FOCUS AREAS:
1. Algorithm efficiency (time/space complexity)
2. Memory usage patterns and potential leaks
3. Async/await and promise handling
4. Caching opportunities
5. Bundle size impact (frontend)
6. API response time optimization
7. Resource utilization
[If --task provided:]
8. NFR performance targets achievable
9. Scalability for expected load

OUTPUT FORMAT:
- Critical performance bottlenecks
- Optimization recommendations with expected impact
- Before/after metrics where measurable
[If --task:] - NFR compliance status
```

### Agent 4: Security Agent (Subagent, if applicable)

Skip if `--skip-security`. Launch in wave 2 if 3 agents already running.

**SCOPE**: Review ALL files in FILE_LIST (vulnerabilities can exist anywhere).

| Field | Value |
|-------|-------|
| **subagent_type** | `security-agent` |
| **report_filename** | `security-review` |
| **files** | FILE_LIST (all files) |
| **skip_if** | `--skip-security` |

**Agent-specific instructions:**

```
Perform security audit on the following code:

FILES TO REVIEW:
[List of files]

FOCUS AREAS:
1. OWASP Top 10 compliance
2. Input validation and sanitization
3. Authentication and authorization
4. SQL/NoSQL injection vulnerabilities
5. XSS and CSRF protection
6. Sensitive data exposure
7. Security headers and configuration
8. Cryptographic practices
[If --task provided:]
9. Security requirements coverage
10. Auth/authz implementation correctness

OUTPUT FORMAT:
- Critical vulnerabilities (immediate action required)
- High-risk security issues
- Security best practice violations
- Compliance gaps
[If --task:] - Security requirement gaps
```

### Assembling Agent Prompts

**⚠️ COMPOSE ALL PROMPTS FIRST, THEN LAUNCH ALL AT ONCE IN ONE MESSAGE.**

For each applicable agent, compose its full prompt by combining:
1. **Shared template** (context block + PROJECT_ROOT + REPORT_DIR + TASK CONTEXT + generate_report + SKILL USAGE + MANDATORY REPORT SAVE + TEAM MEMBER PROTOCOL)
2. **Agent-specific instructions** (from the agent section above)
3. Replace `[REPORT_FILENAME]` with the agent's `report_filename` value
4. Replace `[AGENT_NAME]` with the agent's `name` value

Once ALL prompts are ready, emit ALL Task() calls in a **single message** (wave 1 = up to 3, wave 2 = remainder). Do NOT emit one Task() call, wait for its result, then emit the next.

**Concrete example** (code-reviewer, task `review-260222-1430`, target `src/services/`):

```
---
context:
  review-type: code-review
  task-id: review-260222-1430
  target: src/services/
  files: [src/services/auth.ts, src/services/user.ts, src/services/payment.ts]
---

PROJECT_ROOT: /Users/dev/my-project
REPORT_DIR: /Users/dev/my-project/.claude/tasks/review-260222-1430/reports

Review the following files for code quality:

FILES TO REVIEW:
- src/services/auth.ts
- src/services/user.ts
- src/services/payment.ts

FOCUS AREAS:
1. Code styling and formatting consistency
2. Clean code principles (SOLID, DRY, KISS)
...

generate_report: true

SKILL USAGE: Check <available_skills> and use Skill tool for matching tasks.

⚠️🔴 MANDATORY REPORT SAVE:
1. Save COMPLETE review report using Write tool to EXACT absolute path:
   /Users/dev/my-project/.claude/tasks/review-260222-1430/reports/code-review.md
   ⚠️ REPORT_DIR is absolute. NEVER use relative paths. NEVER save to ~/.claude/.
   ⚠️ Use EXACT filename code-review.md - NOT dynamic slug naming.
2. Include ALL findings with file paths, line numbers, and fix recommendations
3. After writing, VERIFY: ls -la /Users/dev/my-project/.claude/tasks/review-260222-1430/reports/code-review.md
4. If Write fails, retry once. If still fails, include error in your output.
```

---

## Phase 4: Verify Reports & Summarize

Subagents return their results inline when complete. After all Task calls resolve:

1. **⚠️ MANDATORY: Verify Report Files Exist (DEPLOYED_AGENTS only):**

   ```bash
   echo "=== REPORT VERIFICATION ==="
   for report in <DEPLOYED_AGENTS report filenames>; do
     if [ -f "$REPORT_DIR/$report.md" ]; then
       echo "✅ $report.md ($(wc -l < "$REPORT_DIR/$report.md") lines)"
     else
       echo "❌ MISSING: $report.md"
     fi
   done
   echo "==========================="
   ```

   **If any report is MISSING:** Generate it yourself from the subagent's inline output. Do not declare review complete with missing reports.

2. **Display Final Summary:**

```
════════════════════════════════════════════════════════════════════
                    ✅ DEEP REVIEW COMPLETE
════════════════════════════════════════════════════════════════════

TARGET: [file/folder/changes]
FILES REVIEWED: [count]
AGENTS DEPLOYED: [count from DEPLOYED_AGENTS]
TASK CONTEXT: [TASK-ID or "None"]

────────────────────────────────────────────────────────────────────

📄 REPORTS SAVED TO: $REPORT_DIR/
    # List ONLY agents from DEPLOYED_AGENTS with ✅
    # Show ⊘ skipped for agents NOT in DEPLOYED_AGENTS
    ├── ✅ code-review.md          (X lines)
    ├── ✅/⊘ database-review.md   (X lines or "skipped")
    ├── ✅/⊘ performance-review.md (X lines or "skipped")
    └── ✅/⊘ security-review.md   (X lines or "skipped")

────────────────────────────────────────────────────────────────────

NEXT STEPS:
  1. Read individual reports for detailed findings
  2. Address Critical issues immediately
  3. Fix High priority issues before merge
  4. Plan Medium/Low improvements for future iterations

════════════════════════════════════════════════════════════════════
```

---

## Parallel Execution Rules

1. **Parallel Spawning**: Launch up to 3 subagents simultaneously in a single message; wave 2 for the 4th
2. **Smart Skipping**: Auto-skip database-admin if no DB files in FILE_LIST
3. **STRICT SCOPE ENFORCEMENT**: Each subagent receives ONLY files from FILE_LIST:
   - `--diff` mode: ONLY files changed between branches
   - `--changed` mode: ONLY uncommitted files
   - Database-admin gets DATABASE_FILES = subset of FILE_LIST matching DB patterns
   - Do NOT expand scope to entire codebase
4. **No coordination needed**: Subagents are independent — they save reports and return inline results
5. **Report verification**: After all tasks complete, verify report files exist on disk

---

## Important Notes

- Subagents run in PARALLEL for efficiency (max 3 per wave)
- Each subagent focuses on its domain expertise independently
- Skip flags allow customization of review scope
- Database review auto-skips if no DB files in FILE_LIST
- `--task` option loads requirements, plan, and constraints for context-aware review
- When `--task` provided, subagents also check implementation against requirements
- **SCOPE RULE**: In `--diff` or `--changed` mode, subagents ONLY review files from the diff/changes - never the entire codebase
- **⚠️ REPORT PATH RULE**: ALL reports MUST use absolute paths (`$PROJECT_ROOT/.claude/tasks/[TASK-ID]/reports/`). NEVER use relative `./` paths. NEVER write to `~/.claude/` (global folder).
- **⚠️ REPORT VERIFICATION**: After all subagents complete, verify report files exist on disk. If missing, generate from inline output.
- **⚠️ REPORT SAVE ORDER**: Subagents MUST save report file as their primary action before returning.
