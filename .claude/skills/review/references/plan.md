<!--
Usage: /devkit:review --mode plan [task-id | plan-path]
Example: /devkit:review --mode plan ABC-123
Example: /devkit:review --mode plan ./.claude/tasks/ABC-123/plan/
-->

## Your mission

Interview the user with critical questions to validate assumptions, confirm decisions, and surface potential issues in an implementation plan before coding begins.

## Argument Resolution

Args can be either:
- **Task ID** (e.g., `ABC-123`) → Resolves to `./.claude/tasks/ABC-123/plan/`
- **Plan path** (e.g., `./.claude/tasks/ABC-123/plan/`) → Use directly

**Detection logic:**
- If args contains `/` or ends with `.md` → treat as path
- Otherwise → treat as task ID and resolve to `./.claude/tasks/{task-id}/plan/`

## Active Plan State

Check `## Plan Context` injected by hooks:
- **"Plan: {path}"** → Active plan. Ask "Continue? [Y/n]" (Only if path is different from current active plan)
- **"Suggested: {path}"** → Branch hint only. Ask if activate or create new.
- **"Plan: none"** → Create new using `Plan dir:` from `## Naming`

After creating plan: `node .claude/scripts/set-active-task.cjs {task-id}`
Reports: Active plans → plan-specific path. Suggested → default path.

### Important
DO NOT create plans or reports in USER directory.
ALWAYS create plans or reports in CURRENT WORKING PROJECT DIRECTORY.

## Workflow

### Step 1: Read Plan Files

Read the plan directory from the active task path `./.claude/tasks/[task-id]/plan/` and requirements directory `./.claude/tasks/[task-id]/requirements/`:
- `plan.md` - Overview and phases list
- `phase-*.md` - All phase files
- Look for decision points, assumptions, risks, tradeoffs

### Step 2: Extract Question Topics

Scan plan content for:

| Category | Keywords to detect |
|----------|-------------------|
| **Architecture** | "approach", "pattern", "design", "structure", "database", "API" |
| **Assumptions** | "assume", "expect", "should", "will", "must", "default" |
| **Tradeoffs** | "tradeoff", "vs", "alternative", "option", "choice", "either/or" |
| **Risks** | "risk", "might", "could fail", "dependency", "blocker", "concern" |
| **Scope** | "phase", "MVP", "future", "out of scope", "nice to have" |

### Step 3: Generate Questions

For each detected topic, formulate a concrete question:

**Question format rules:**
- Each question must have 2-4 concrete options
- Mark recommended option with "(Recommended)" suffix
- Include "Other" option is automatic - don't add it
- Questions should surface implicit decisions

**Example questions:**

```
Category: Architecture
Question: "How should the validation results be persisted?"
Options:
1. Save to plan.md frontmatter (Recommended) - Updates existing plan
2. Create validation-answers.md - Separate file for answers
3. Don't persist - Ephemeral validation only
```

```
Category: Assumptions
Question: "The plan assumes API rate limiting is not needed. Is this correct?"
Options:
1. Yes, rate limiting not needed for MVP
2. No, add basic rate limiting now (Recommended)
3. Defer to Phase 2
```

### Step 4: Interview User

Use `AskUserQuestion` tool to present questions.

**Rules:**
- Use maximum of 8 questions
- Group related questions when possible (max 4 questions per tool call)
- Focus on: assumptions, risks, tradeoffs, architecture

### Step 5: Document Answers

After collecting answers, update the plan:

1. Add `## Validation Summary` section to `plan.md`:
```markdown
## Validation Summary

**Validated:** {date}
**Questions asked:** {count}

### Confirmed Decisions
- {decision 1}: {user choice}
- {decision 2}: {user choice}

### Action Items
- [ ] {any changes needed based on answers}
```

2. If answers require plan changes, note them but **do not modify phase files** - just document what needs updating.

## Output

After validation completes, provide summary:
- Number of questions asked
- Key decisions confirmed
- Any items flagged for plan revision
- Recommendation: proceed to implementation or revise plan first

## Next Steps (MANDATORY)

**IMPORTANT:** After providing the validation summary, you MUST remind the user:

> **Best Practice:** Run `/clear` before implementing to start with fresh context.
> Then run `/devkit:implement {task-id}` to begin implementation.
>
> Fresh context helps Claude focus solely on implementation without planning context pollution, improving plan adherence.

This reminder is **NON-NEGOTIABLE** - always output it at the end of validation.

## Important Notes

**IMPORTANT:** Only ask questions about genuine decision points - don't manufacture artificial choices.
**IMPORTANT:** If plan is simple with few decisions, it's okay to ask fewer than min questions.
**IMPORTANT:** Prioritize questions that could change implementation significantly.
