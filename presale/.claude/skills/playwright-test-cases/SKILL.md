---
name: playwright-test-cases
description: Generate UI test cases from captured locators and business docs
user-invocable: true
when_to_use: "Invoke to generate UI test cases from captured locators and business docs."
allowed-tools:
  - Bash(find:*)
  - Bash(grep:*)
  - Bash(cat:*)
  - Bash(ls:*)
  - Bash(pwd:*)
  - Bash(mkdir:*)
  - Bash(cp:*)
  - Bash(npx:*)
  - Write
  - Read
  - Edit
auto-approve: true
category: test
keywords: [playwright, test-cases, generate, ui, automation]
---

# Playwright Test Cases

## Arguments

- `--task=<task-id>` — Task ID (REQUIRED)
- `--page=<page-name>` — Specific page only (optional, default: all pages in task)

**Mode is always `ui`.** For API test cases use: `/qakit:playwright:api:normalize` → `/qakit:playwright:api:test-cases`

---

## ⛔ STOP — Do This First

Use the `Read` tool now before anything else:

`Read(".claude/skills/playwright-test-cases/references/modes/ui-test-cases.md")`

This file is the ONLY source of truth for steps, format, and output. Do not execute anything before reading it.

After reading, execute all steps in that file. The arguments the user passed (--task, --page) are already in your context — use them in STEP 1.

## Operating Rules

- Read ALL available context before generating: task workspace docs (+ KB fallback), locators, app source
- Follow `references/formats/ui-test-case-template.md` exactly for every test case
- Follow `references/formats/output-structure.md` for directory layout
- If prerequisites are missing, stop and report clearly
- End with concise summary of what was generated and what to do next
