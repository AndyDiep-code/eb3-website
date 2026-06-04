---
name: playwright-automate
description: Generate Playwright UI test spec files from promoted test cases and existing Page Objects. Use this skill when generating or updating test specs after test cases have been reviewed and promoted.
user-invocable: true
when_to_use: "Invoke to generate Playwright UI test specs from promoted test cases and Page Objects."
category: test
keywords: [playwright, automate, automation, test-cases, pom]
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
keywords: [playwright, automate, specs, page-objects, testing]
---

# Playwright Automate

## Arguments

- `--page=<page-name>` — Generate for specific page only (optional, default: all pages)
- `--path=<path>` — Explicit test cases folder path (optional)
- `--tc=<TC-ID,...>` — Surgical update for specific test case(s) only (optional)

**No `--task` needed** — reads from promoted test cases (`tests/playwright/test-cases/`) and existing POMs (`tests/playwright/pages/`).

---

## ⛔ STOP — Do This First

Determine the mode, then use the `Read` tool for the matching reference:

- Default mode (no `--page`): `Read(".claude/skills/playwright-automate/references/modes/default.md")`
- Specific page (`--page` provided): `Read(".claude/skills/playwright-automate/references/modes/specific-page.md")`

After reading, execute all steps in that file. The arguments the user passed (--page, --path, --tc) are already in your context — use them in STEP 1.

Generate UI test spec files from promoted test cases. Reads existing Page Objects for correct method signatures.

## Scope

This skill generates **UI automation only**.

- Use this skill for Playwright UI tests that interact with the page and verify UI behavior.
- Do not use this skill for API-only test generation.
- Do not use this skill for general integration-test planning unless the selected mode explicitly supports it.

## Operating Rules

- Always identify the correct mode before performing any generation steps.
- Always read the selected mode reference before acting.
- Follow the selected mode document exactly for defaults, structure, and output.
- Keep logs clear and user-facing.
- Perform work in the foreground and allow real-time progress visibility.
- If prerequisites are missing, stop and report the issue clearly.
- If POMs or promoted test cases are missing, stop and report the issue clearly.
- After generation, verify the output as defined by the selected mode.
- End with a concise summary of what was generated, where it was saved, and what the user should do next.

## Mode Inference

Use this section only when the generation mode was not already resolved by the caller.

Use these defaults for interpretation:

- no specific page mentioned -> default mode
- specific page mentioned -> specific-page mode

If the request is still ambiguous after checking the available details, ask only for the minimum missing information needed to choose the correct mode.

