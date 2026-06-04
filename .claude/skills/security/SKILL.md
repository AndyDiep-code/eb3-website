---
name: devkit:security
description: "Unified security toolkit. Dispatches to one of five workflows via --mode: security-audit (STRIDE+OWASP audit), security-scan (secrets+OWASP+deps scan), osv-scanner-install (binary lifecycle), package-vulnerable-scan (npm CVE audit), cyber-threat-expert (OSINT/CTI investigation). Invoke for any security audit, vulnerability scan, dependency check, or threat-intelligence task."
user-invocable: true
when_to_use: "Invoke for any security audit, scan, dependency check, or OSINT investigation task."
category: security
argument-hint: "--mode <security-audit|security-scan|osv-scanner-install|package-vulnerable-scan|cyber-threat-expert> [mode-specific args]"
keywords: [security, audit, scan, vulnerability, OWASP, STRIDE, OSINT, CTI, threat-intelligence, secrets, dependencies, CVE]
---

# devkit:security — Unified Security Toolkit

Single entry point for every security workflow in the toolkit. The `--mode` flag selects which workflow to run; remaining args are passed through to that workflow.

## Modes

| Mode | Purpose | Workflow file | Typical args |
|------|---------|---------------|--------------|
| `security-audit` | STRIDE + OWASP audit with red-team personas; optional auto-fix loop | `modes/security-audit/WORKFLOW.md` | `<scope> [--fix] [--red-team] [--iterations N]` |
| `security-scan` | Lightweight scan for secrets, dep vulns, OWASP code patterns | `modes/security-scan/WORKFLOW.md` | `[scope] [--secrets-only] [--deps-only] [--full]` |
| `osv-scanner-install` | Install / update / verify the osv-scanner binary cache | `modes/osv-scanner-install/WORKFLOW.md` | `[--force-reinstall] [--uninstall] [--verify-only] [--pin-version <ver>]` |
| `package-vulnerable-scan` | Audit Node deps for known CVEs (pnpm audit + optional osv-scanner) | `modes/package-vulnerable-scan/WORKFLOW.md` | `[--depth simple\|full] [--severity ...] [--workspace ...] [--auto-fix]` |
| `cyber-threat-expert` | OSINT / cyber threat intelligence investigation toolkit | `modes/cyber-threat-expert/WORKFLOW.md` | `[target] [--yolo] [--case\|--sweep\|--query\|--flow]` |

## Dispatch Protocol

1. **Parse `--mode <name>`** from the invocation. The value must match EXACTLY one of: `security-audit`, `security-scan`, `osv-scanner-install`, `package-vulnerable-scan`, `cyber-threat-expert`.
2. **If `--mode` is missing, misspelled, or unrecognized → STOP and call `AskUserQuestion`.** Do NOT guess. Do NOT pick a default. The question MUST include all five modes with their description and accepted args (see "Mode Catalog for AskUserQuestion" below). After the user answers, proceed with that mode.
3. **If args after `--mode <name>` look incomplete or ambiguous for the chosen mode** (e.g., `security-audit` requires a `<scope>` but none was given; `cyber-threat-expert` requires a `<target>`), call `AskUserQuestion` for the missing required arg before loading the workflow.
4. **Load workflow.** Read `modes/<name>/WORKFLOW.md` and follow its instructions verbatim.
5. **Forward remaining args.** Everything after `--mode <name>` (e.g., `<scope>`, `--fix`, etc.) is passed to the mode workflow as if it were the user's input.
6. **Mode-internal cross-references** (e.g., `package-vulnerable-scan` calling `osv-scanner-install`) should be resolved by directly loading the sibling `modes/<other>/WORKFLOW.md` — no need to re-invoke the parent skill.

## Mode Catalog for AskUserQuestion

When prompting the user via `AskUserQuestion` because `--mode` is missing or unknown, build the question with these five options. Each option's `description` field should be a 1-2 sentence summary plus the arg list. Use this exact data:

| Mode | Description (for option) | Args |
|------|--------------------------|------|
| `security-audit` | STRIDE + OWASP threat-modeled audit with optional red-team personas and auto-fix loop. Use before releases or after auth/payment changes. | `<scope>` (required, e.g. `src/api/` or `full`), `--fix` (apply fixes iteratively), `--red-team` (run adversarial personas), `--iterations N` (cap for --fix loop) |
| `security-scan` | Fast lightweight scan: secrets, vulnerable deps, OWASP code patterns. Report-only, no modifications. | `[scope]` (optional, default = current project), `--secrets-only` (only credential scan), `--deps-only` (only dependency audit), `--full` (everything) |
| `osv-scanner-install` | Install, update, verify, or uninstall the osv-scanner binary cache at `~/.cache/devkit/osv-scanner`. Idempotent. | `--force-reinstall`, `--uninstall`, `--verify-only`, `--pin-version <ver>` |
| `package-vulnerable-scan` | Audit Node.js dependencies for CVEs via pnpm audit + (optionally) osv-scanner. Scores by severity + reachability + exploit maturity. | `--depth simple\|full` (default simple), `--severity low\|moderate\|high\|critical`, `--workspace <name>` (monorepo), `--auto-fix`, `--lang vi\|en` |
| `cyber-threat-expert` | OSINT / cyber threat intelligence investigation toolkit. Generates search queries, builds case timelines, produces structured intelligence products. Claude-only. | `<target>` (required, e.g. domain/username/email), `--yolo` (full autonomous run), `--case` / `--sweep` / `--query` / `--flow` (workflow selector) |

**AskUserQuestion construction**:
- Question text: `"Which security mode should I run?"` (or `"Mode '<bad-value>' isn't recognized. Pick one of:"` if the user passed a wrong value)
- Header: `"Security mode"`
- multiSelect: `false`
- One option per mode using the description above. Put the most common ones (`security-scan`, `security-audit`) at the top.
- After the user picks a mode, if that mode has REQUIRED args (e.g., `security-audit` needs `<scope>`, `cyber-threat-expert` needs `<target>`) and they weren't supplied, follow up with another `AskUserQuestion` for that arg.

**Never** dispatch to a mode without explicit user confirmation when the input is ambiguous. Silent guessing is the failure mode.

## Examples

```bash
# Pre-release threat-modeled audit on the auth module with auto-fix
/devkit:security --mode security-audit src/auth/ --fix --red-team

# Quick secrets-only scan
/devkit:security --mode security-scan --secrets-only

# Deep dependency CVE check before shipping
/devkit:security --mode package-vulnerable-scan --depth full --severity high --auto-fix

# Refresh osv-scanner binary cache
/devkit:security --mode osv-scanner-install --force-reinstall

# Run an OSINT case
/devkit:security --mode cyber-threat-expert target.com --case
```

## When to Use vs. Other Skills

- `code-review` — general code quality, not security-focused. Use `--mode security-audit` for threat modeling.
- `debug` — bug investigation, not vulnerability discovery.
- For outdated-but-not-vulnerable packages → `devkit:package-update` (separate skill, not consolidated here).

## Layout

```
security/
├── SKILL.md                # this file (router)
└── modes/
    ├── security-audit/
    ├── security-scan/
    ├── osv-scanner-install/
    ├── package-vulnerable-scan/
    └── cyber-threat-expert/
```

Each `modes/<name>/` is a self-contained workflow with its own `WORKFLOW.md`, references, and (where applicable) scripts/assets/sub-folders.
