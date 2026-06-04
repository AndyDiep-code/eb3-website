---
name: devkit:requirement
description: "Manage task requirements — brainstorm solutions, capture and analyze requirements, or update existing requirements with new changes"
user-invocable: true
when_to_use: "Invoke to brainstorm solutions, capture, or update task requirements."
argument-hint: "--mode [brainstorm|capture-requirement|update-requirement] [task-id] [args]"
allowed-tools: Read, Write, Edit, Bash, AskUserQuestion, WebSearch, WebFetch, Skill, Task
category: plan
keywords: [requirements, analysis, brainstorm, planning, capture]
---

<!--
Usage:
  /devkit:requirement --mode brainstorm [task-id] [question]
  /devkit:requirement --mode capture-requirement [task-id]
  /devkit:requirement --mode update-requirement [task-id] [changes]

Examples:
  /devkit:requirement --mode brainstorm ABC-123 "How should we implement user authentication?"
  /devkit:requirement --mode capture-requirement ABC-123
  /devkit:requirement --mode update-requirement ABC-123 "Add rate limiting to API endpoints"
-->

Input: <input>$ARGUMENTS</input>

---

## Mode Detection

Parse `--mode [MODE]` from `$ARGUMENTS`. Everything after `--mode [MODE]` is passed as args.

If no `--mode` provided, use `AskUserQuestion` to ask which mode to run.

| Mode | Purpose | Detail |
|------|---------|--------|
| `brainstorm` | Explore solutions, capture requirements via structured Q&A | [references/brainstorm.md](./references/brainstorm.md) |
| `capture-requirement` | Analyze existing requirements, fill gaps, generate knowledge artifacts | [references/capture-requirement.md](./references/capture-requirement.md) |
| `update-requirement` | Update existing requirements with new changes | [references/update-requirement.md](./references/update-requirement.md) |

**After detecting mode:** Read the ref file and follow its instructions exactly.
