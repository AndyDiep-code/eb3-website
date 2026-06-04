# Execution Flow Reference

Complete step-by-step execution guide for running Playwright test scripts and analyzing results.

## Terminal Output Standards

Define these color variables at the start of ALL bash execution:

At Step 6, output the following as **Claude text response** (NOT bash echo — bash output collapses in Claude Code UI):

```
**✅ Tests complete**

| | |
|---|---|
| **Passed** | {PASSED} |
| **Failed** | {FAILED} |
| **Duration** | {DURATION}s |
| **Task** | {TASK_ID} |
| **Report** | `./tests/playwright/playwright-report/index.html` |
```

If failures exist, follow immediately with root-cause analysis for each failed test.

## Error Handling

| Situation | Action |
|-----------|--------|
| No `.spec.ts` files found | Stop. Tell user to run `automate` first |
| Playwright not installed | Stop. Tell user to run `init-automation` first |
| All tests skipped | Warn that grep filter matched nothing; suggest checking tag names |
| `results.json` missing after run | Try reading stdout JSON output as fallback |
| Task directory missing | Create it before saving report |
| `--ui` flag | Launch UI and skip steps 4–5 (no automated analysis) |
