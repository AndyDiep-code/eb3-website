# Update Requirement Mode

Update existing requirements with new changes. For when requirements evolve after brainstorm or capture.
**DO NOT implement** — only update documentation.

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

## Phase 1: Validate Task

1. Resolve task-id: from args → `$DEVKIT_TASK_ID` env → `## Plan Context` hooks → `AskUserQuestion`
2. Validate `./.claude/tasks/[task-id]/` exists → else: "Run /devkit:task first"
3. Run `node .claude/scripts/set-active-task.cjs [task-id]`
4. Verify requirements folder exists → else: "Run /devkit:requirement --mode brainstorm first"

## Phase 2: Parse Changes

Extract changes description from args (after task-id). If not provided, use `AskUserQuestion`:
```
"What changes would you like to make to the requirements for task [task-id]?"
```

## Phase 3: Read Existing Requirements

Read ALL files in `./.claude/tasks/[task-id]/requirements/` to understand current state before making any changes.

## Phase 4: Clarify & Apply Changes

1. Analyze impact of requested changes on existing requirements
2. If change is ambiguous, use `AskUserQuestion` to clarify before modifying files
3. Identify files to update:
   - New/changed features → `01-functional.md`
   - Performance/security changes → `02-non-functional.md`
   - New limitations → `03-constraints.md`
   - New decisions → `04-decisions.md`
   - New risks → `05-risks.md`
   - Summary refresh → `06-summary.md` (if exists)
   - Acceptance criteria changes → `08-acceptance-criteria.md` (if exists)
4. Update files — **NEVER overwrite existing user decisions without asking**
5. Add new decisions to `04-decisions.md` with date and rationale

## Phase 5: Validate Consistency

After updates, check:
- [ ] No conflicting requirements between files?
- [ ] Acceptance criteria still valid after changes?
- [ ] Risks updated if new constraints were added?
- [ ] Technical specs need updating? (`07-technical-specs.md`)

If inconsistencies found, use `AskUserQuestion` to resolve before finalizing.

## Phase 6: Summary

```
════════════════════════════════════════════════════════════════════
                    REQUIREMENTS UPDATED
════════════════════════════════════════════════════════════════════
TASK: [task-id]
CHANGES: [brief description]

FILES UPDATED:
  [filename] — [change summary]
  [filename] — [change summary]

DECISIONS RECORDED: [count added to 04-decisions.md]
CONSISTENCY: [No conflicts | N issues resolved]
STATUS: [Ready for Planning | Needs More Clarification]

NEXT STEPS:
  1. Review updated requirements in ./.claude/tasks/[task-id]/requirements/
  2. /devkit:requirement --mode capture [task-id] (to re-analyze with changes)
  3. /devkit:plan [task-id]
════════════════════════════════════════════════════════════════════
```

## Constraints

- PRESERVE EXISTING — update files, never overwrite decisions already made
- DO NOT IMPLEMENT — only update documentation
- ASK BEFORE ASSUMING — use `AskUserQuestion` for all ambiguities
- Cross-reference changes across all files for consistency
- Sacrifice grammar for concision
