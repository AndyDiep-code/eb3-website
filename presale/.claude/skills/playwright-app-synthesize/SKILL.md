---
name: playwright-app-synthesize
description: Synthesize all feature-level and page-level KB docs into app-wide business documentation. Reads from tests/playwright/docs/features/ and tests/playwright/docs/pages/ and generates app overview, sitemap, feature-map, navigation-flow, and data-model. Use when you need a complete picture of the entire application.
user-invocable: true
when_to_use: "Invoke to synthesize all feature and page docs into app-wide business documentation."
category: test
keywords: [playwright, synthesis, documentation, features, app]
---

# Playwright App Synthesize

## Arguments

- `--doc=<type>` — Optional. `overview`, `sitemap`, `feature-map`, `navigation-flow`, `data-model`, `all` (default: `all`)

Source: `tests/playwright/docs/features/` + `tests/playwright/docs/pages/` (KB repo) — always.

---

## ⛔ STOP — Do This First

Use the `Read` tool now before anything else:

`Read(".claude/skills/playwright-app-synthesize/references/synthesis.md")`

This file is the ONLY source of truth for steps, format, and output. Do not execute anything before reading it.

After reading, execute all steps in that file. The argument the user passed (--doc) is already in your context — use it in STEP 5.

## Output Quality Criteria

- `overview.md`: covers all features, not just one
- `sitemap.md`: every page in `tests/playwright/docs/pages/` is listed
- `feature-map.md`: every feature in `tests/playwright/docs/features/` is listed with its pages
- `navigation-flow.md`: shows connections across features, not just within
- `data-model.md`: unified model with cross-feature entity references
