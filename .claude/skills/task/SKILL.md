---
name: devkit:task
description: "Initialize task folder structure — normal mode (full requirements/reports/plan folders) or lite mode (single-file structure for small tasks)"
user-invocable: true
when_to_use: "Invoke to initialize task folder structure for normal or lite-mode task planning."
argument-hint: "[--mode lite] [task-id] [description]"
allowed-tools: Read, Write, Edit, Bash, AskUserQuestion, Glob, Grep, Skill
category: core
keywords: [task, folder, structure, initialization, planning, lite]
---

<!--
Usage:
  /devkit:task [task-id]                              - Normal: full folder structure
  /devkit:task --mode lite [task-id] [description]   - Lite: minimal structure for small tasks

Examples:
  /devkit:task ABC-123
  /devkit:task feature-user-auth
  /devkit:task --mode lite fix-login-bug Fix the login redirect issue
  /devkit:task --mode lite add-logout Add logout button to navbar
-->

Input: <input>$ARGUMENTS</input>

---

## Mode Detection

Parse `--mode lite` from `$ARGUMENTS`. Everything after `--mode lite` (or just `$ARGUMENTS` for normal) is passed as args.

| Condition | Mode |
|-----------|------|
| `--mode lite` present | LITE — minimal single-file structure |
| Otherwise | NORMAL (default) — full folder structure |

**After detecting mode:** Read the ref file and follow its instructions exactly.

| Mode | Purpose | Detail |
|------|---------|--------|
| `normal` | Full structure: `requirements/`, `reports/`, `plan/` | [references/normal.md](./references/normal.md) |
| `lite` | Minimal: `requirements.md` + `plan.md` for small tasks | [references/lite.md](./references/lite.md) |
