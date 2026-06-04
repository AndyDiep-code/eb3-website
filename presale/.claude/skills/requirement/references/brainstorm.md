# Brainstorm Mode

Elite solution brainstormer: YAGNI, KISS, DRY. Collaborates via Q&A to find optimal solutions.
**DO NOT implement** — only brainstorm and advise.

## Phase 0: Report Preference

Use `AskUserQuestion` **before ANY sub-agent**:
```
question: "How should sub-agent reports be delivered?"
header: "Report Style"
options:
  - label: "Inline Report (Recommended)"
    description: "Brief summary displayed in conversation, no file saved"
  - label: "Detailed Report"
    description: "Full analysis saved to ./.claude/tasks/[TASK-ID]/reports/"
```
Pass `generate_report: true/false` to ALL sub-agent prompts.

## Phase 1: Validate Task

1. Resolve task-id: from args → `$DEVKIT_TASK_ID` env → `## Plan Context` hooks → `AskUserQuestion`
2. Validate task exists in `./.claude/tasks/` → else error: "Run /devkit:task first"
3. Run `node .claude/scripts/set-active-task.cjs [task-id]`
4. Update README.md frontmatter: `stage: requirement`, `status: in_progress`
5. Read ALL existing files in `./.claude/tasks/[task-id]/requirements/`
6. **Auto-detect platform** (do NOT ask user):
   - Check `package.json` deps: React/Next.js = frontend; Express/NestJS = backend
   - Check paths: `src/components/`, `src/pages/` = frontend; `src/controllers/`, `src/routes/` = backend
   - Check Python: `requirements.txt`, FastAPI/Django/Flask imports
   - Determine: **frontend** | **backend** | **fullstack**

## Phase 2: Clarify Question

Parse question from args (after task-id). If missing, use `AskUserQuestion`: "What would you like to brainstorm for this task?"

## Phase 3: Brainstorm

Use `AskUserQuestion` proactively throughout to:
- Understand requirements, constraints, timeline, success criteria
- Provide frank, unfiltered feedback on ideas
- Present 2-3 viable solutions with clear pros/cons
- Challenge assumptions and user's initial approach
- Consider all stakeholders: users, developers, ops, business

**Research tools:**
- `planner` agent for industry best practices
- `docs-manager` agent for project context and constraints
- `WebSearch` for proven approaches and case studies
- `docs-seeker` skill for latest library docs
- `sequential-thinking` skill for complex problems
- `psql` for database structure insights

**Process:** Discovery → Research → Analysis (2-3 options) → Debate → Consensus → Documentation → Finalize

At Finalize: use `AskUserQuestion` to ask if user wants a plan. If yes, invoke `/devkit:plan` passing TASK-ID.

## Phase 4: Capture Requirements

⚠️ MANDATORY: Create ALL 6 files below. Never skip. Use "To Be Determined" sections for incomplete info.

```
./.claude/tasks/[task-id]/requirements/
├── 01-functional.md
├── 02-non-functional.md
├── 03-constraints.md
├── 04-decisions.md
├── 05-risks.md
└── YYYYMMDD-brainstorm-topic.md  (session notes)
```

File templates → [references/brainstorm-templates.md](./references/brainstorm-templates.md)

## Phase 5: Resolve Unresolved Questions

ALL unresolved questions MUST be resolved before completing.

While unresolved questions remain:
1. Pick most critical question
2. Use `AskUserQuestion` with clear options
3. Record decision in `04-decisions.md`
4. Update relevant requirement files

Only proceed to Phase 6 when ALL questions resolved.

## Phase 6: Summary

```
════════════════════════════════════════════════════════════════════
                    BRAINSTORM COMPLETE
════════════════════════════════════════════════════════════════════
TASK: [task-id]
QUESTION: [question]

FILES CREATED/UPDATED:
  ./.claude/tasks/[task-id]/requirements/YYYYMMDD-brainstorm-topic.md
  ./.claude/tasks/[task-id]/requirements/01-05 (created/updated)

REQUIREMENTS CAPTURED:
  Functional: [count]  Non-Functional: [count]
  Decisions: [count]   Risks: [count]
QUESTIONS RESOLVED: [count]
RECOMMENDED APPROACH: [Brief summary]

NEXT STEPS:
  1. Review requirements in ./.claude/tasks/[task-id]/requirements/
  2. /devkit:requirement --mode update-requirement [task-id] [changes]
  3. /devkit:requirement --mode capture-requirement [task-id]
  4. /devkit:plan [task-id]
════════════════════════════════════════════════════════════════════
```

**Mandatory reminder after summary:**
> If all requirements captured, run `/clear` then `/devkit:plan [task-id]` for fresh context.

## Constraints

- DO NOT implement — only brainstorm and advise
- Validate feasibility before endorsing any approach
- Update existing requirement files, don't duplicate content
- Sacrifice grammar for concision in outputs
- MANDATORY: ALL 6 requirement files MUST be created
