# Lite Task Init

For SMALL tasks that don't need research or extensive planning.

## Step 1: Parse Arguments

Extract from `$ARGUMENTS`:
- **task-id**: First word (kebab-case or ticket format)
- **description**: Remaining text

If task-id not provided, use `AskUserQuestion`.
If description not provided (only task-id given), use `AskUserQuestion` to ask for description.

## Step 2: Get Current Date

```bash
date +%Y-%m-%d
```

## Step 3: Check Existing Task

Check if `./.claude/tasks/[task-id]/` already exists.
If exists, use `AskUserQuestion`: continue with existing or reset?

## Step 4: Gather Acceptance Criteria

Use `AskUserQuestion`:
- Question: "What are the acceptance criteria for this task? (Enter each criterion, or 'skip' to add later)"

## Step 5: Create Minimal Structure

```
./.claude/tasks/[task-id]/
├── README.md
├── requirements.md    (inline requirements - single file)
└── plan.md            (inline plan - single file, empty)
```

## Step 6: Create README.md

```markdown
---
stage: ready  # ready → requirement → plan → implement → test → done
status: pending  # pending → in_progress → done
---

# Task: [task-id]

**Created:** [YYYY-MM-DD]
**Type:** Lite (small task)
**Status:** Initialized

## Description
[description from arguments]

## Next Steps
1. `/devkit:plan --mode lite [task-id]` - Create implementation plan
2. `/devkit:implement --mode lite [task-id]` - Implement
```

## Step 7: Create requirements.md

```markdown
# Requirements: [task-id]

## Description
[description from arguments]

## Acceptance Criteria
[criteria from Step 4, or placeholder if skipped]
- [ ] Criterion 1
- [ ] Criterion 2

## Scope
<!-- What's in scope and out of scope -->

## Notes
<!-- Any additional context -->
```

## Step 8: Set Active Task

```bash
node .claude/scripts/set-active-task.cjs [task-id]
```

Updates session state so hooks inject correct task context (reports path, task-id, plan path) into Claude Code and all subagents.

## Step 9: Summary Output

```
════════════════════════════════════════════════════════════════════
                    LITE TASK CREATED
════════════════════════════════════════════════════════════════════

TASK ID: [task-id]
LOCATION: ./.claude/tasks/[task-id]/
ACTIVE: Yes (set as active task)

FILES CREATED:
  README.md
  requirements.md
  plan.md

ACCEPTANCE CRITERIA:
  [list criteria or "To be defined in requirements.md"]

NEXT STEPS:
  1. /devkit:plan --mode lite [task-id] - Create quick plan (max 4 phases)
  2. /devkit:implement --mode lite [task-id]   - Implement all phases

Ready to plan? Run:
  → /devkit:plan --mode lite [task-id]
════════════════════════════════════════════════════════════════════
```

## Rules

- For SMALL tasks only — no research folder
- Single requirements.md, not separate functional/non-functional files
- Active task tracking enables continuity across sessions
- Follow `./.claude/rules/coding-convention.md` for code quality
- DO NOT start planning or implementing during this step
