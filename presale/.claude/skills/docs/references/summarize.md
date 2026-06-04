<!--
Usage: /devkit:docs --mode summarize [focused-topics] [should-scan-codebase]
Requires: Existing docs/codebase-summary.md
Example: /devkit:docs --mode summarize
Example: /devkit:docs --mode summarize "authentication API" false
Example: /devkit:docs --mode summarize "all" true
-->

**Report Protocol**: Follow ./.claude/CLAUDE.md "Sub-Agent Report Generation" protocol before spawning subagents.

**Generate Task ID**: `docs-generation-YYMMDD-HHmm` (use `bash -c 'date +%y%m%d-%H%M'` for date)

Use `/scout "analyze codebase structure and key components"` to analyze the codebase and update `docs/codebase-summary.md` and respond with a summary report.

```
Task(subagent_type="docs-manager", prompt="
---
context:
  task-id: docs-generation-YYMMDD-HHmm
---

[task description summary]
")
```

## Arguments:
$1: Focused topics (default: all)
$2: Should scan codebase (`Boolean`, default: `false`)

## Focused Topics:
<focused_topics>$1</focused_topics>

## Should Scan Codebase:
<should_scan_codebase>$2</should_scan_codebase>

## Important:
- Use `.claude/skills/docs/doc-templates/` directory as the source of truth for documentation.
- Do not scan the entire codebase unless the user explicitly requests it.

**IMPORTANT**: **Do not** start implementing.
