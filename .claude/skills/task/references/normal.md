# Normal Task Init

Creates task folder structure only. No research, planning, or implementation.

## Step 1: Get Task ID

If not provided, use `AskUserQuestion`. Format: kebab-case or ticket (e.g., `ABC-123`, `feature-name`).

## Step 2: Check Existing Task

Check if `./.claude/tasks/[task-id]/` already exists.
If exists, inform user and ask: reset or continue with existing?

## Step 3: Check Git History (Optional)

Git is optional. If unavailable, skip silently and proceed to Step 4.

```bash
# Search commit messages for task ID
git log --oneline --all --grep="[task-id]" 2>/dev/null || echo ""

# Search for task ID in code
git log --oneline --all -S "[task-id]" 2>/dev/null || echo ""
```

If prior implementation found, create `./.claude/tasks/[task-id]/requirements/existing-implementation.md` documenting:
- Related commits (hash, message, date)
- Files that were modified
- Brief summary of what was already implemented
- Any related branches found

## Step 4: Create Folder Structure

```
./.claude/tasks/[task-id]/
├── README.md
├── requirements/
│   ├── 01-functional.md
│   ├── 02-non-functional.md
│   └── existing-implementation.md  (only if prior work found)
├── reports/
└── plan/
```

## Step 5: Create README.md

```markdown
---
stage: ready  # ready → requirement → plan → implement → test → done
status: pending  # pending → in_progress → done
---

# Task: [task-id]

**Created:** YYYY-MM-DD
**Status:** Initialized

## Overview
[To be filled during brainstorming/capture-requirement]

## Quick Links
- Requirements: `./requirements/`
- Reports: `./reports/`
- Plan: `./plan/`

## Next Steps

### Option A: AI-Assisted
1. `/devkit:requirement --mode brainstorm [task-id]` - Let AI explore solutions and ideas

### Option B: Manual First
1. Add requirements manually to `./requirements/` folder
2. Then `/devkit:requirement --mode update [task-id]` - AI validates & enhances
2. Or `/devkit:requirement --mode capture [task-id]` - AI researches & enhances (more detailed)

### Then Continue With
3. `/devkit:plan [task-id]` - Create implementation plan
```

## Step 6: Create Empty Templates

**requirements/01-functional.md:**
```markdown
# Functional Requirements: [task-id]

<!-- Add functional requirements here -->
<!-- Use /devkit:brainstorm or /devkit:requirement to populate -->
```

**requirements/02-non-functional.md:**
```markdown
# Non-Functional Requirements: [task-id]

<!-- Add non-functional requirements here -->
<!-- Performance, security, scalability, etc. -->
```

## Step 7: Set Active Task

```bash
node .claude/scripts/set-active-task.cjs [task-id]
```

## Step 8: Summary Output

```
════════════════════════════════════════════════════════════════════
                    TASK INITIALIZED
════════════════════════════════════════════════════════════════════

TASK ID: [task-id]
LOCATION: ./.claude/tasks/[task-id]/

STRUCTURE CREATED:
  requirements/01-functional.md
  requirements/02-non-functional.md
  [requirements/existing-implementation.md] (if prior work found)
  reports/    (empty)
  plan/       (empty)

PRIOR IMPLEMENTATION: [Found X commits | None found]

NEXT STEPS:

Option A: AI-Assisted
1. /devkit:requirement --mode brainstorm [task-id]

Option B: Manual First
1. Add requirements to ./requirements/
2. /devkit:requirement --mode capture [task-id]

Then:
3. /devkit:plan [task-id]
```

## Rules

- Do NOT create .gitkeep files
- Do NOT research, plan, or implement
- If prior implementation exists, document it but don't analyze deeply
- Sacrifice grammar for concision in reports
