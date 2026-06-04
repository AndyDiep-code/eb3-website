---
name: playwright-generate-pom
description: Generate TypeScript Page Object Model files from KB locators (tests/playwright/docs/locators/). Use after running docs-generate to create or update Playwright page objects from the persistent locator KB.
user-invocable: true
when_to_use: "Invoke to generate TypeScript Page Object Model files from KB locators."
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash(find:*)
  - Bash(ls:*)
  - Bash(npx:*)
auto-approve: true
category: test
keywords: [playwright, pom, page-objects, typescript, generate]
---

# Playwright Generate POM

## Arguments

| Argument | Required | Default | Description |
|----------|----------|---------|-------------|
| `--page=<name>` | ❌ | all pages | Generate for specific page only |
| `--locator=primary\|fallback` | ❌ | `primary` | `primary` = getByRole/etc. `fallback` = XPath |

- Input: `tests/playwright/docs/locators/{PageName}/locators.md` (KB repo)
- Output: `tests/playwright/pages/{kebab-name}.page.ts`
- Does NOT generate test specs — use `playwright-automate` for that.

---

## ⛔ STOP — Do This First

Use the `Read` tool now before anything else:

`Read(".claude/skills/playwright-generate-pom/references/modes/default.md")`

This file is the ONLY source of truth for steps, format, and output. Do not execute anything before reading it.

After reading, execute all steps in that file. The arguments the user passed (--page, --locator) are already in your context — use them in STEP 1 of the guide.
