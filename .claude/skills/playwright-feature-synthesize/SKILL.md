---
name: playwright-feature-synthesize
description: Synthesize per-page KB docs into feature-level business documentation. Reads from tests/playwright/docs/pages/ and generates overview, user-journeys, data-model, and page-map for a feature. Use when you need to create cross-page feature documentation from existing per-page docs.
user-invocable: true
when_to_use: "Invoke to synthesize per-page docs into feature-level business documentation."
category: test
keywords: [playwright, feature, synthesis, documentation, pages]
---

# Playwright Feature Synthesize

## Arguments

- `--pages=<list>` — Optional. Comma-separated page names from KB. e.g. `--pages=LoginPage,DashboardPage`
- `--feature=<name>` — Optional. Feature name for output folder. Auto-derived from page names → "unnamed-feature".
- `--auto-detect` — Optional flag. AI clusters all pages in `tests/playwright/docs/pages/` into features, proposes groupings, user confirms before synthesizing via AskUserQuestion.
- `--doc=<type>` — Optional. `overview`, `user-journeys`, `data-model`, `page-map`, `all` (default: `all`)

## Page Resolution (priority order)

1. `--pages` provided → use exactly those pages from KB
2. `--auto-detect` → AI clusters all pages in `tests/playwright/docs/pages/`, proposes to user
3. Nothing provided → ERROR: "Specify --pages or --auto-detect"

Source: `tests/playwright/docs/pages/` (KB repo) — always.

---

## ⛔ STOP — Do This First

Use the `Read` tool now before anything else:

`Read(".claude/skills/playwright-feature-synthesize/references/synthesis.md")`

This file is the ONLY source of truth for steps, format, and output. Do not execute anything before reading it.

After reading, execute all steps in that file. The arguments the user passed (--pages, --feature, --auto-detect, --doc) are already in your context — use them in STEP 1.

## Output Quality Criteria

- `overview.md`: covers all pages in the feature, not just one
- `user-journeys.md`: each journey spans at least 2 pages
- `data-model.md`: deduplicates fields that appear on multiple pages
- `page-map.md`: every page has at least one outgoing or incoming navigation link
