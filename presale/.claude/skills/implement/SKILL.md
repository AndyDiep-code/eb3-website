---
name: devkit:implement
description: "Implement task phases — normal mode (multi-phase, --auto flag) or lite mode for small tasks. Includes code review, user approval, status tracking."
user-invocable: true
when_to_use: "Invoke to execute multi-phase implementation with review and approval checkpoints."
argument-hint: "[--mode lite] [task-id] [--auto]"
allowed-tools: Read, Write, Edit, Bash, AskUserQuestion, Glob, Grep, Skill, Task
category: core
keywords: [implement, phases, plan, execution, workflow, tasks]
---

<!--
Usage:
  /devkit:implement [task-id]              - Normal: full multi-phase implementation
  /devkit:implement [task-id] --auto       - Normal: auto-approve all phases
  /devkit:implement --mode lite [task-id]  - Lite: small task, single session

Examples:
  /devkit:implement ABC-123
  /devkit:implement TICKET-456 --auto
  /devkit:implement --mode lite fix-login-bug
-->

**MUST READ** `CLAUDE.md` then **THINK HARDER** before starting.

Input: <input>$ARGUMENTS</input>

---

## Mode Detection

Parse `--mode lite` from `$ARGUMENTS`. Everything else is passed as args.

| Condition | Mode |
|-----------|------|
| `--mode lite` present | LITE — small task, streamlined single-session |
| Otherwise | NORMAL (default) — multi-phase, auto/manual approval loop |

**After detecting mode:** Read the ref file and follow its instructions exactly.

| Mode | Purpose | Detail |
|------|---------|--------|
| `normal` | Multi-phase, code review, `--auto` flag, status tracking | [references/normal.md](./references/normal.md) |
| `lite` | Single-session small task, max 4 phases | [references/lite.md](./references/lite.md) |
