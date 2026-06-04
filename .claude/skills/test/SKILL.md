---
name: devkit:test
description: "Create comprehensive unit tests with 100% coverage - supports task-id, file path, or git changes"
user-invocable: true
when_to_use: "Invoke for running or designing validation suites."
argument-hint: "[task-id | file-path | (empty for git changes)]"
allowed-tools: Read, Write, Edit, Task, Bash, Grep, AskUserQuestion, Skill
category: test
keywords: [test, unit, coverage, vitest, jest, testing]
---

<!--
Usage Modes:
1. Task mode:     /devkit:test [task-id]           - Test all files for a specific task
2. File mode:     /devkit:test [file-path]         - Test only the specified file
3. Git mode:      /devkit:test                     - Test all changed files in git

Examples:
  /devkit:test ABC-123                             - Test all files for task ABC-123
  /devkit:test src/utils/auth.ts                   - Test only auth.ts file
  /devkit:test                                     - Test all git-changed files

Requirements:
- Task mode: Task must exist in ./.claude/tasks/[task-id]/
- File mode: File must exist and be a testable source file
- Git mode: Must be in a git repository with changes (if git unavailable, ask for task-id or file path)
-->

**MUST READ** `CLAUDE.md` then **THINK HARDER** to create comprehensive tests.

**Generate Task ID**: If TASK MODE, use provided TASK-ID. Otherwise, generate `test-YYMMDD-HHmm` (use `bash -c 'date +%y%m%d-%H%M'`).

Input: <input>$ARGUMENTS</input>

---

## Mode Detection

| Condition | Mode |
|-----------|------|
| `$ARGUMENTS` is empty | GIT MODE |
| `$ARGUMENTS` contains `/` or file extension | FILE MODE |
| Otherwise | TASK MODE |

For validation steps per mode → [`references/workflow.md`](./references/workflow.md)

---

## Role

Orchestrator — delegate all testing work to `tester` sub-agent (`./.claude/agents/tester.md`).
Process files **ONE BY ONE**. Complete 100% coverage per file before moving to next.

---

## Workflow

| Phase | Description | Detail |
|-------|-------------|--------|
| 0 | Setup, validate input, detect mode, build file list | [workflow.md §Phase0](./references/workflow.md) |
| 1 | Initialize file queue | [workflow.md §Phase1](./references/workflow.md) |
| 2 | Process each file: check → analyze → create tests | [tester-prompts.md](./references/tester-prompts.md) |
| 3 | Verify all files complete | [workflow.md §Phase3](./references/workflow.md) |
| 4–5 | Generate report & finalize | [report-templates.md](./references/report-templates.md) |

---

## Critical Enforcement Rules

- **ZERO FAILURES** — all tests must pass before completion
- **ONE FILE AT A TIME** — 100% coverage before moving to next
- **FIX FAILURES FIRST** — before adding new tests
- **NO FAKE MOCKS** — no commented-out tests, no tests without real assertions
- Run coverage per file: `npm test -- --coverage --collectCoverageFrom='path/to/file.ts'`

Files to skip → [`references/skip-patterns.md`](./references/skip-patterns.md)

**Fallback:** Task tools (`TaskList`/`TaskUpdate`/`TaskGet`) are CLI-only — unavailable in VSCode extension. If they error, use `TodoWrite` for progress tracking and coordinate via `SendMessage` only.
