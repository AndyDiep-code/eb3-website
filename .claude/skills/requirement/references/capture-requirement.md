# Capture Requirement Mode

Deep analysis of existing requirements, research best practices, generate knowledge artifacts.
Enable Ultrathink. **DO NOT implement** — only analyze and document.

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
2. Validate task exists → else error: "Run /devkit:task first"
3. Run `node .claude/scripts/set-active-task.cjs [task-id]`
4. Verify `./.claude/tasks/[task-id]/requirements/` exists and has content → else error: "Run /devkit:requirement --mode brainstorm first"
5. Update README.md: `stage: requirement`, `status: in_progress`
6. **Auto-detect platform** (do NOT ask): frontend | backend | fullstack (same signals as brainstorm mode)

## Phase 2: Gather Requirements

Read ALL files in `./.claude/tasks/[task-id]/requirements/` — all formats: .md, .json, .txt, .yaml, .png/.jpg.

```bash
ls -la ./.claude/tasks/[task-id]/requirements/
```

Do NOT assume specific filenames. Read every file. Build mental map of:
- Functional requirements and relationships
- Non-functional requirements (performance, security)
- Technical constraints and decisions made
- Known risks and mitigations
- Based on detected platform, ensure requirements are appropriately categorized

## Phase 3: Deep Research (OPTIONAL)

Only if task is genuinely complex and research is needed. Otherwise skip to Phase 4.

1. `WebSearch` / `WebFetch` for best practices, security considerations, performance patterns
2. Max 2 parallel `researcher` agents (each max 5 tool calls, focus on actionable insights)
3. Save to `./.claude/tasks/[task-id]/research/`:
   - `YYYYMMDD-best-practices.md` — industry patterns with sources
   - `YYYYMMDD-security-findings.md` — security considerations
   - `YYYYMMDD-technical-research.md` — implementation insights
   Each file ≤100 lines: key findings, recommendations, anti-patterns to avoid.

## Phase 4: Analyze & Identify Gaps

Review requirements for completeness:
- [ ] Functional requirements clearly defined with acceptance criteria?
- [ ] Non-functional requirements quantified (e.g., "< 200ms response time")?
- [ ] Dependencies between requirements identified?
- [ ] Edge cases and error scenarios covered?
- [ ] Security considerations documented?
- [ ] Conflicting requirements identified?
- [ ] Integration points with external systems defined?

For each gap/ambiguity: use `AskUserQuestion` to clarify. **DO NOT assume or fill gaps yourself.**

## Phase 5: Generate Knowledge Artifacts

First ensure core files 01-05 exist in `requirements/`. Create if missing.

Then generate/update:
- `06-summary.md` — requirements overview, FR/NFR tables, open questions
- `07-technical-specs.md` — architecture, data, integrations, security, performance, error handling
- `08-acceptance-criteria.md` — Given/When/Then scenarios per feature
- `09-implementation-notes.md` — suggested approach, challenges, recommended order

Templates → [references/capture-requirement-templates.md](./references/capture-requirement-templates.md)

## Phase 6: Summary

```
════════════════════════════════════════════════════════════════════
                    KNOWLEDGE CAPTURE COMPLETE
════════════════════════════════════════════════════════════════════
TASK: [task-id]

CORE FILES (01-05): [all created/updated]
KNOWLEDGE ARTIFACTS:
  requirements/06-summary.md
  requirements/07-technical-specs.md
  requirements/08-acceptance-criteria.md
  requirements/09-implementation-notes.md

RESEARCH: [web searches: N | articles: N | agents: N]
GAPS IDENTIFIED: [count]  QUESTIONS RESOLVED: [count]
STATUS: [Ready for Planning | Needs More Clarification]

NEXT STEPS:
  1. Review ./.claude/tasks/[task-id]/requirements/
  2. /devkit:requirement --mode update [task-id] [changes]
  3. /devkit:plan [task-id]
════════════════════════════════════════════════════════════════════
```

**Mandatory reminder:** Run `/clear` then `/devkit:plan [task-id]` when requirements are complete.

## Constraints

- DO NOT GUESS — use `AskUserQuestion` for all ambiguities
- DO NOT IMPLEMENT — only analyze and document
- DO NOT document test specs — testing is via `/devkit:test`
- PRESERVE EXISTING — update files, never overwrite user decisions
- Sacrifice grammar for concision
