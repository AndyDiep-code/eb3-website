---
name: devkit:review
description: "Code and plan review — business logic, plan validation, adversarial security review, or deep code review"
user-invocable: true
when_to_use: "Invoke for business logic, plan validation, security, or deep code review."
argument-hint: "--mode [business|plan|plan-security|code] [args]"
category: utilities
keywords: [review, quality, red-team, security, code, business, plan, database, performance]
allowed-tools: Read, Write, Edit, Grep, Glob, Bash, Task, AskUserQuestion, Skill
---

<!--
Usage:
  /devkit:review --mode business --task [TASK-ID] [file-path | folder-path | --changed]
  /devkit:review --mode plan [task-id | plan-path]
  /devkit:review --mode plan-security [task-id | plan-path]
  /devkit:review --mode code [--task TASK-ID] [file-path | folder-path | --changed | --diff <branch> | --codebase] [--skip-db] [--skip-perf] [--skip-security]

Examples:
  /devkit:review --mode business --task ABC-123 src/services/auth.service.ts
  /devkit:review --mode business --task ABC-123 --changed
  /devkit:review --mode plan ABC-123
  /devkit:review --mode plan-security ABC-123
  /devkit:review --mode code --changed
  /devkit:review --mode code --task ABC-123 --changed
  /devkit:review --mode code src/features/checkout/ --skip-db
  /devkit:review --mode code --diff main
  /devkit:review --mode code --codebase --skip-db --skip-perf
-->

Input: <input>$ARGUMENTS</input>

---

## Mode Detection

Parse `--mode [MODE]` from `$ARGUMENTS`. Everything after `--mode [MODE]` is passed as args to the mode handler.

If no `--mode` provided, use `AskUserQuestion` to ask which mode to run.

| Mode | Purpose | Detail |
|------|---------|--------|
| `business` | Review code against business requirements, find gaps | [references/business.md](./references/business.md) |
| `plan` | Validate plan via critical questions interview | [references/plan.md](./references/plan.md) |
| `plan-security` | Adversarial red-team review of implementation plan | [references/plan-security.md](./references/plan-security.md) |
| `code` | Deep review via team-based specialized agents (parallel) | [references/code.md](./references/code.md) |

**After detecting mode:** Read the ref file and follow its instructions exactly.

---

## Code Review Modes Comparison

| Mode | Isolation | Execution | Best For |
|------|-----------|-----------|---------|
| `code` | Shared context | Parallel subagents | Standard reviews |
