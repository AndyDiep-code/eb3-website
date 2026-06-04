---
name: playwright-api-automation
description: Generates API test automation from network captures and test cases
user-invocable: true
when_to_use: "Invoke to generate API test automation from network captures and test cases."
allowed-tools:
  - Bash(find:*)
  - Bash(grep:*)
  - Bash(cat:*)
  - Bash(ls:*)
  - Bash(pwd:*)
  - Bash(mkdir:*)
  - Bash(cp:*)
  - Bash(npx:*)
  - Bash(python3:*)
  - Bash(unzip:*)
  - Write
  - Read
  - Edit
auto-approve: true
category: test
keywords: [playwright, api, automation, testing, network]
---

# Playwright API Automation

## Arguments

- `--task=<task-id>` — Task ID for output subfolder (NOT used in trace mode — auto-derived from trace path)
- `--endpoint=<pattern>` — Filter by endpoint pattern, e.g. `/api/users/*` (optional → endpoint-filter mode)
- `--type=<type>` — Test type: `happy-path|validation|security|performance` (optional → type-filter mode)
- `--trace-dir=<path>` — Path to Playwright test-results dir containing trace.zip files (optional → trace mode)
- `--trace-zip=<path>` — Path to a single trace.zip file (optional → trace mode)
- `--api-filter=<pattern>` — URL pattern to filter API calls from trace, e.g. `api.myapp.com` (used with trace mode)
- `--subfolder=<name>` — Override auto-derived subfolder name in trace mode (optional)

**Mode auto-selection:**
- `--trace-dir` or `--trace-zip` provided → **trace mode** (extract API calls from Playwright trace)
- Both `--endpoint` + `--type` → combined-filters mode
- Only `--endpoint` → endpoint-filter mode
- Only `--type` → type-filter mode
- Neither → default mode (all endpoints, all types)

---

## ⛔ STOP — Do This First

Determine the mode from arguments above, then use the `Read` tool for the matching reference:

- **Trace mode** (`--trace-dir` or `--trace-zip`): `Read(".claude/skills/playwright-api-automation/references/modes/trace-mode.md")`
- Default: `Read(".claude/skills/playwright-api-automation/references/modes/default.md")`
- Endpoint filter: `Read(".claude/skills/playwright-api-automation/references/modes/endpoint-filter.md")`
- Type filter: `Read(".claude/skills/playwright-api-automation/references/modes/type-filter.md")`
- Combined: `Read(".claude/skills/playwright-api-automation/references/modes/combined-filters.md")`

After reading, execute all steps in that file. The arguments are already in your context — use them in STEP 1.

## Operating Rules

- Always identify the correct mode before performing any generation steps.
- Follow the selected mode document exactly for defaults, structure, and output.
- Keep logs clear and user-facing.
- If prerequisites are missing, stop and report the issue clearly.
- If network capture data is incomplete, follow error handling in the selected mode.
- After generation, verify the output as defined by the selected mode.
- End with a concise summary of what was generated, where it was saved, and what to do next.
