---
name: playwright-docs-generate
description: Generate business documentation from captured locators and network data. Use this skill to create business-context.md, user-flows.md, and data-model.md from locator capture output. Writes to QA working docs (test-tasks/) and persistent project knowledge base (tests/playwright/docs/pages/ and tests/playwright/docs/locators/) with hash-based update.
user-invocable: true
when_to_use: "Invoke to generate business documentation from captured locators and network data."
category: test
keywords: [playwright, docs, generate, business, locators]
---

# Playwright Docs Generate

Generate structured business documentation from captured page data (locators, ARIA snapshots, meta data) to enable context-aware test case generation.

---

## Arguments

- `--task=<id>` — Task ID. Required unless `--all-tasks`. Defaults to `--all-pages` if no `--page` specified.
- `--all-tasks` — Iterate all tasks in `./test-tasks/playwright/`. Implies all pages unless `--page` specified.
- `--page=<name>` — Single page name. Optional.
- `--all-pages` — Explicitly process all pages in the task's locators folder.
- `--doc=<type>` — `business-context`, `user-flows`, `data-model`, `all` (default: `all`)

| Command | Scope |
|---------|-------|
| `--task=X --page=LoginPage` | 1 task × 1 page |
| `--task=X` | 1 task × all pages |
| `--all-tasks --page=LoginPage` | All tasks × 1 page |
| `--all-tasks` | All tasks × all pages |

---

## ⛔ STOP — Do This First

Use the `Read` tool now before anything else:

`Read(".claude/skills/playwright-docs-generate/references/execution-guide.md")`

This file is the ONLY source of truth for steps, format, and output. Do not execute anything before reading it.

After reading, execute all steps in that file using the arguments already provided above.
