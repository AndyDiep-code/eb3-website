---
name: playwright-docs-from-requirements
description: Generate QAKit business docs (business-context.md, user-flows.md, data-model.md) from BRD, PRD, user stories, or feature specs. Output format is identical to docs-generate, enabling the full test automation pipeline to work from requirements documents.
user-invocable: true
when_to_use: "Invoke to generate QAKit business docs from BRD, PRD, or user stories."
allowed-tools:
  - Read
  - Write
  - Bash(find:*)
  - Bash(ls:*)
auto-approve: true
category: test
keywords: [playwright, docs, requirements, brd, user-stories]
---

# Playwright Docs from Requirements

## Arguments

- `--task=<task-id>` — Task ID (REQUIRED)
- `--source=<file-path>` — Path to BRD/PRD/user stories file (REQUIRED)
- `--page=<PageName>` — Specific page only (optional)

---

## ⛔ STOP — Do This First

Use the `Read` tool now before anything else:

`Read(".claude/skills/playwright-docs-from-requirements/references/modes/brd.md")`

This file is the ONLY source of truth for steps, format, and output. Do not execute anything before reading it.

After reading, execute all steps in that file. The arguments the user passed (--task, --source, --page) are already in your context — use them in STEP 1.

## Operating Rules

- Follow `references/formats/output-spec.md` for output format (referenced in brd.md)
- Infer page names from BRD section headings, screen names, or URLs mentioned
- If BRD covers multiple pages → generate separate docs folder per page
- If no explicit field validation rules → leave data-model.md minimal but present
- Do NOT invent business rules not mentioned in the source document
- After writing all files, show summary of pages documented and next steps
