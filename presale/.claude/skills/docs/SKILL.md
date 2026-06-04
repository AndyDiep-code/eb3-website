---
name: devkit:docs
description: "Analyze codebase and manage project documentation. Use for doc initialization, updates, summaries, codebase analysis."
user-invocable: true
when_to_use: "Invoke to create, refresh, or audit project documentation."
category: utilities
keywords: [documentation, init, update, summarize]
argument-hint: "--mode [capture-knowledge|init|summarize|update] [prompt]"
allowed-tools: Read, Write, Edit, MultiEdit, Bash, LS, Glob, Grep, WebSearch, WebFetch, Task, AskUserQuestion, Skill
---

<!--
Usage:
  /devkit:docs --mode capture-knowledge [entry-point]   - Capture knowledge from code entry points
  /devkit:docs --mode init [project-type]               - Initialize docs/ from templates
  /devkit:docs --mode summarize [topics] [scan]         - Summarize codebase into codebase-summary.md
  /devkit:docs --mode update [additional-requests]      - Update all project documentation

Examples:
  /devkit:docs --mode capture-knowledge src/services/auth.service.ts
  /devkit:docs --mode capture-knowledge "handleUserLogin function"
  /devkit:docs --mode capture-knowledge "/api/v1/users"
  /devkit:docs --mode init
  /devkit:docs --mode summarize "authentication API" false
  /devkit:docs --mode summarize "all" true
  /devkit:docs --mode update
  /devkit:docs --mode update "focus on API changes"
-->

Input: <input>$ARGUMENTS</input>

---

## Mode Detection

Parse `--mode [MODE]` from `$ARGUMENTS`. Everything after `--mode [MODE]` is the mode's `$PROMPT`.

If no `--mode` provided, use `AskUserQuestion` to ask which mode to run.

| Mode | Purpose | Detail |
|------|---------|--------|
| `capture-knowledge` | Analyze code entry points, generate docs with diagrams | [references/capture-knowledge.md](./references/capture-knowledge.md) |
| `init` | Initialize `docs/` structure from templates | [references/init.md](./references/init.md) |
| `summarize` | Analyze codebase and update `docs/codebase-summary.md` | [references/summarize.md](./references/summarize.md) |
| `update` | Full documentation update across all `docs/` files | [references/update.md](./references/update.md) |

**After detecting mode:** Read the ref file and follow its instructions exactly, using `$PROMPT` as the mode-specific argument.

---

## Assets

| Asset | Path |
|-------|------|
| Doc templates (6 files) | `.claude/skills/docs/doc-templates/` |
| Validation script | `.claude/skills/docs/scripts/validate-docs.cjs` |

When authoring or refreshing diagrams in `system-architecture.md`, apply the universal SVG layout rules from `/debvki:tech-graph`'s `references/svg-layout-best-practices.md` (component spacing, arrow routing, label placement, z-index ordering). Pair with `/debvki:preview --diagram` for visual self-review, or use `/debvki:tech-graph` directly for publish-grade output.
