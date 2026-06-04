---
name: playwright-docs-from-diagram
description: Generate QAKit business docs from flow diagrams (Mermaid, PlantUML, draw.io) or diagram images (wireframes, flowcharts). Output format identical to docs-generate, enabling full test automation pipeline from diagrams alone. Supports image inputs via native vision.
user-invocable: true
when_to_use: "Invoke to generate QAKit business docs from flow diagrams or wireframe images."
allowed-tools:
  - Read
  - Write
  - Bash(find:*)
  - Bash(ls:*)
auto-approve: true
category: test
keywords: [playwright, docs, diagram, flowchart, qa]
---

# Playwright Docs from Diagram

## Arguments

- `--task=<task-id>` — Task ID (REQUIRED)
- `--source=<file-path>` — Path to diagram file (REQUIRED)
- `--format=<format>` — `mermaid|plantuml|image|drawio` (default: auto-detect)
- `--page=<PageName>` — Specific page only (optional)

---

## ⛔ STOP — Do This First

Use the `Read` tool now before anything else:

`Read(".claude/skills/playwright-docs-from-diagram/references/modes/diagram.md")`

This file is the ONLY source of truth for steps, format, and output. Do not execute anything before reading it.

After reading, execute all steps in that file. The arguments the user passed (--task, --source, --format, --page) are already in your context — use them in STEP 1.

## Operating Rules

- Follow `references/formats/output-spec.md` for output format (referenced in diagram.md)
- For image inputs: use native vision to describe diagram content
- For text diagram formats: read and parse directly
- Focus on flows and navigation — diagrams excel at user-flows.md
- business-context.md may be inferred; data-model.md may be minimal
- Set `source: diagram` in frontmatter
