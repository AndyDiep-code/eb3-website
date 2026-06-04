---
name: playwright-explore
description: Autonomously explore a web application — AI discovers all pages and features via ARIA-driven navigation analysis, captures each page (locators, screenshots, business docs), synthesizes KB docs, and outputs test cases. No human navigation required. Works with any app structure (sidebar, top nav, tabs, cards).
user-invocable: true
when_to_use: "Invoke to autonomously explore a web app, capture all pages, generate KB docs, and produce test cases without human navigation."
category: test
keywords: [playwright, explore, autonomous, discover, crawl, ai-driven, test-cases, kb, navigation, qakit]
allowed-tools:
  - Bash(playwright-cli:*)
  - Bash(npx:*)
  - Bash(ls:*)
  - Bash(mkdir:*)
  - Bash(find:*)
  - Bash(grep:*)
  - Bash(cat:*)
  - Bash(date:*)
  - Bash(echo:*)
  - Bash(sleep:*)
  - Read
  - Write
  - Edit
auto-approve: true
---

# Playwright Explore

AI-driven autonomous application explorer. Discovers navigation structure from ARIA snapshots, captures every reachable page, generates KB documentation, and outputs test cases — no human navigation needed.

## Invocation

| Context | Command |
|---------|---------|
| Template / AI DevKit | `/playwright-explore` |
| QAKit project | `/qakit:playwright:explore` |

## Arguments

| Arg | Description | Default |
|-----|-------------|---------|
| `--url=<url>` | Base URL of the app | **required** |
| `--task=<id>` | Task ID for output organization | **required** |
| `--auth=<user:pass>` | Login credentials | optional |
| `--auth-file=<path>` | Path to existing storageState.json | optional |
| `--depth=<n>` | Max navigation depth: 1=top nav only, 2=sub-pages, 3=deep | `2` |
| `--focus=<label>` | Explore only sections matching this label | all sections |
| `--output=<mode>` | `full` (KB + test cases) or `kb-only` | `full` |
| `--project=<name>` | Project name for qa-docs output | auto-detected from URL |
| `--skip-synthesis` | Skip feature/app synthesis (capture + docs only) | false |
| `--confirm-synthesis` | Ask user to confirm feature groupings before synthesizing | false |

---

## ⛔ STOP — Safety Rules (Read Before Any Action)

**NEVER click or interact with:**
- Buttons or links labeled: Delete, Remove, Logout, Sign out, Deactivate, Archive, Purge, Reset, Confirm, Submit (form submit buttons)
- External links (href pointing to different domain than base URL)
- Anchor-only links (`href="#"` or `href` containing only `#fragment`)
- Download links (href ending in `.pdf`, `.csv`, `.zip`, `.xlsx`, `.docx`)
- Auth-related pages: login, logout, register, forgot-password

**Navigation only — safe elements to click:**
- Nav items, sidebar links, menu items, tabs, breadcrumbs
- When unsure whether something is destructive → **SKIP it**

**Loop prevention:**
- Normalize URLs before tracking: strip `#hash`, strip pagination params (`?page=`, `?p=`)
- `visited_urls` (plain URL) → skip re-queuing same URL (STEP 3.3, 4.6)
- `visited_keys` (`url::h1` composite) → skip re-capturing same page (STEP 4.2); handles SPAs where URL stays the same
- If depth limit reached → do not descend further
- Max pages per run: 50 (prevents runaway exploration)

---

## ⛔ STOP — Do This First

Use the `Read` tool now before anything else:

```
Read(".claude/skills/playwright-explore/references/execution-guide.md")
```

This file is the **ONLY source of truth** for all 7 execution phases. Do not execute anything before reading it.

After reading, execute all phases in order using the arguments already provided above.

For the locators.md format (STEP 4.4d), also read:

```
Read(".claude/skills/playwright-explore/references/locators-format.md")
```
