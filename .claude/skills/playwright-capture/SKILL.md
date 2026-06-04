---
name: playwright-capture
description: Capture UI locators, ARIA snapshots, and screenshots from live web pages using Playwright. Use this skill when capturing element locators from a page, choosing between simple, interactive, or session-based capture modes, or analyzing accessibility data during UI inspection.
user-invocable: true
when_to_use: "Invoke to capture UI locators, ARIA snapshots, or screenshots from live web pages."
category: test
keywords: [playwright, capture, locators, screenshots, aria]
---

# Playwright Locators Capture

## ⛔ STOP — Read This First

**Before ANY execution, follow these 3 steps in order. No exceptions.**

### Step 1 — Determine mode

| Mode | When to use |
|------|-------------|
| `simple` | Single page, URL provided, automatic browser |
| `interactive` | Multiple pages, user navigates, system captures |
| `session` | Existing open browser session |

- If mode is clear from user args → use it directly
- If ambiguous → use `AskUserQuestion` to ask (minimum info only)
- Priority when overlapping: session > interactive > simple

### Step 2 — Read the mode reference file

Based on the mode determined in Step 1, use the `Read` tool to load the corresponding file:

- `simple` → `Read(".claude/skills/playwright-capture/references/modes/simple.md")`
- `interactive` → `Read(".claude/skills/playwright-capture/references/modes/interactive.md")`
- `session` → `Read(".claude/skills/playwright-capture/references/modes/session.md")`

**The mode file is the ONLY source of truth.** It defines all allowed commands, steps, and output structure. Do not execute anything before reading it.

### Step 3 — Follow the mode file exactly

Execute every step as written in the mode file. Do not deviate.

---

## ⛔ Forbidden Actions (all modes)

- Writing custom Node.js / Python / shell scripts to implement capture
- Using `npx playwright open`, `npx playwright test`, `npx playwright codegen` directly — use `playwright-cli` commands instead (`npx playwright-cli` is allowed)
- Using `playwright codegen`
- Any command NOT in the mode file's allowed commands whitelist

---

## Global Policies

### Network Capture — DISABLED

Skip all network-related steps in mode files:
- Do NOT initialize network listener
- Do NOT collect network calls
- Do NOT write `network-calls.json` or `network-checkpoint.json`
- Do NOT read network-related reference files

Outputs: `locators.md`, `aria-snapshot.yaml`, `metadata.json`, `screenshot-{timestamp}.png` only.

> To re-enable: remove this section.

---

## Operating Rules

- If prerequisites are missing → stop and report clearly
- If task directory already exists → follow backup behavior defined in mode file
- After capture → verify output as defined by mode file
- End with concise summary: what was captured, where saved, next steps
