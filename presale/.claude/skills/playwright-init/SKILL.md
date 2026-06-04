---
name: playwright-init
description: Initialize a Playwright automation project from the Enouvo template. Use this skill when setting up a new Playwright codebase, initializing to the default path, initializing to a custom output path, or applying custom configuration such as base URL, browsers, or reporters.
user-invocable: true
when_to_use: "Invoke to initialize a Playwright automation project from the Enouvo template."
category: test
keywords: [playwright, init, setup, automation, template]
allowed-tools:
  - Bash(find:*)
  - Bash(grep:*)
  - Bash(cat:*)
  - Bash(ls:*)
  - Bash(pwd:*)
  - Bash(mkdir:*)
  - Bash(cp:*)
  - Bash(node:*)
  - Bash(command:*)
  - Bash(npx:*)
  - Bash(git:*)
  - Write
  - Read
  - Edit
  - AskUserQuestion
  - Skill
auto-approve: true
category: test
keywords: [playwright, init, setup, template, configuration]
---

# Playwright Init

## Arguments

- `--mode=<mode>` — `default` | `custom-path` | `custom-config` (optional, prompted if missing)
- `--output=<path>` — output path (default: `./tests/playwright`)
- `--baseUrl=<url>` — base URL for tests (optional)
- `--browsers=<list>` — comma-separated: `chromium,firefox,webkit` (default: `chromium`)
- `--reporter=<list>` — comma-separated: `allure,html,list` (default: `allure,html`)

---

## ⛔ STOP — Do This First

Determine the mode from arguments (or ask user if missing), then read the matching reference:

- Default mode: `Read(".claude/skills/playwright-init/references/modes/default.md")`
- Custom path mode: `Read(".claude/skills/playwright-init/references/modes/custom-path.md")`
- Custom config mode: `Read(".claude/skills/playwright-init/references/modes/custom-config.md")`

After reading, execute all steps in that file. Do not execute anything before reading the matching file.

Initialize a Playwright automation project by executing the resolved initialization mode and following its reference document.

## Execution

This skill uses reference-driven execution.

If the setup mode is already resolved by the calling command, do not ask the user to choose a mode again.
Instead, execute the provided mode directly by reading and following the corresponding mode document (→ See Read() call in STOP section above).

Only perform mode selection inside this skill when no setup mode was resolved by the caller.

Treat the selected mode document as the source of truth for:

- prerequisites
- default values
- initialization steps
- backup behavior
- template cloning
- config creation
- dependency installation
- verification
- final summary output

Keep the main skill focused on execution and navigation.
If implementation details and mode references ever differ, follow the selected mode reference.

## Mode References

Use the corresponding reference document for the resolved mode.

### 1. DEFAULT MODE

Use this mode when the project should be initialized with the default output path and default configuration values.

Reference:

→ See Read() call in STOP section above

### 2. CUSTOM PATH MODE

Use this mode when the project should be initialized in a custom output directory while keeping the default configuration values.

Reference:

→ See Read() call in STOP section above

### 3. CUSTOM CONFIG MODE

Use this mode when the project should be initialized with one or more custom settings such as output path, base URL, browsers, or reporters.

Reference:

→ See Read() call in STOP section above

## Operating Rules

- If the calling command already resolved the setup mode, do not ask the user to choose a mode again.
- If the calling command already resolved required inputs, do not ask for them again unless a critical value is still missing.
- Always read the selected mode reference before acting.
- Follow the selected mode document exactly for defaults, structure, and output.
- Keep logs clear and user-facing.
- Perform work in the foreground and allow real-time progress visibility.
- If prerequisites are missing, stop and report the issue clearly.
- If an existing target directory already exists, follow the backup behavior defined in the selected mode.
- After setup, verify the installation as defined by the selected mode.
- End with a concise summary of what was created, where it was created, and what the user should do next.

## Fallback Mode Selection

Use this section only when the setup mode was not already resolved by the calling command.

If no mode was provided by the caller, determine the best mode from the available request details.

Use these defaults for interpretation:

- no custom path and no custom settings mentioned -> default mode
- custom output path only -> custom path mode
- any custom setup values such as base URL, browsers, or reporters -> custom config mode

If the request is still ambiguous after checking the available details, ask only for the minimum missing information needed to choose the correct mode.

## Direct Execution

If the calling command or user request already provides a resolved mode, execute that mode directly by following the corresponding mode reference.

Examples:

- `mode=default` -> execute default mode
- `mode=custom-path` with `output=./e2e` -> execute custom path mode
- `mode=custom-config` with custom values -> execute custom config mode