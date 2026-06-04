# Lite Mode (`--lite`)

Quick plan for small tasks. NO research. MAX 4 phases. Single plan file.
Use full mode for complex tasks requiring more phases.

## Step 0: Report Preference (MANDATORY)

Before spawning ANY sub-agent, ask with `AskUserQuestion`:
```
question: "How should sub-agent reports be delivered?"
header: "Report Style"
options:
  - label: "Inline Report (Recommended)"
    description: "Brief summary displayed in conversation, no file saved"
  - label: "Detailed Report"
    description: "Full analysis saved to ./.claude/tasks/[TASK-ID]/reports/"
```
Pass `generate_report: false` (inline) or `generate_report: true` (detailed) to ALL sub-agents.

## Step 1: Validate Task

1. Resolve task-id: `$ARGUMENTS` → `$DEVKIT_TASK_ID` env → `## Plan Context` → `AskUserQuestion`
2. Verify `./.claude/tasks/[task-id]/` exists → else error: "Run `/devkit:task --mode lite` first."
3. Read `requirements.md` to understand task scope
4. Run `node .claude/scripts/set-active-task.cjs [task-id]`

## Step 2: Gather Context (Quick Scan Only)

**Auto-detect platform** (do NOT ask): frontend | backend | fullstack
**Auto-detect API approach** (backend only): schema-first | code-first | no-api
→ See `references/api-patterns.md` for detection signals

Read existing docs only (no research):
- `./docs/codebase-summary.md` (if exists)
- `./docs/code-standards.md` (if exists)

**Scout for reusable resources:**
```
/scout "Quick scan for [task]. Find: (1) REUSABLE: existing utils, helpers, services, components; (2) PATTERNS: similar implementations to follow; (3) RELATED: entry points, modules."
```
**CRITICAL:** Plan MUST use existing resources — DO NOT duplicate.

## Step 3: Create Plan (Max 4 Phases)

Use `planner` sub-agent. Save to `./.claude/tasks/[task-id]/plan.md` (single file, NOT in `plan/` subfolder).

Plan frontmatter:
```yaml
---
platform: frontend | backend | fullstack
api-approach: schema-first | code-first | no-api
stage: plan
status: pending
created: YYYY-MM-DD
branch: [git branch or "unknown"]
---
```

Plan structure:
```markdown
# Plan: [task-id]
**Created:** YYYY-MM-DD  **Type:** Lite Plan

## Overview
[Brief description]

## Reusable Resources (MUST USE)
- **Utils/Helpers:** [existing — DO NOT recreate]
- **Services:** [existing — extend/use]
- **Patterns:** [follow existing]

## Phases

### Phase 1: [Name]
**Files:** [list]
**Tasks:**
- [ ] ...

### Phase 2-3: [Name] (if needed)
...

### Phase N: Code Review
- [ ] Review code against ./docs/code-standards.md
- [ ] Fix any violations

## Success Criteria
- [ ] All acceptance criteria from requirements.md met
- [ ] No code standard violations
```

## Step 4: Summary Output

```
════════════════════════════════════════════════════════════════════
                    LITE PLAN CREATED
════════════════════════════════════════════════════════════════════
TASK: [task-id]
PLATFORM: [frontend | backend | fullstack]
API APPROACH: [schema-first | code-first | no-api]
PHASES: [N] (max 4)

PHASE SUMMARY:
  1. [Phase name] — [brief]
  2. [Phase name] — [brief]
  N. Code Review

FILES TO MODIFY:
  • [file1]
  • [file2]

NEXT STEPS:
  1. Review ./.claude/tasks/[task-id]/plan.md
  2. Run /devkit:implement --mode lite [task-id] to implement

════════════════════════════════════════════════════════════════════
```

## Constraints

- **MAX 4 PHASES** — if task needs more, switch to full mode
- **NO RESEARCH** — existing docs only
- **NO TESTS IN PLAN** — testing via `/devkit:test`
- **SINGLE FILE** — `plan.md` in task dir, no phase subdirectory
- **MAX 2 TOOLS** — `/scout` + `planner` only
- **DO NOT implement** — planning only
