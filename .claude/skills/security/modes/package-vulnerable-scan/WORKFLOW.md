---
description: "Audit Node.js dependencies for known vulnerabilities. Two modes: simple (pnpm audit / GitHub Advisories) and full (also runs osv-scanner against OSV.dev which aggregates NVD + ecosystem-specific advisories). Scores each finding by severity + reachability + exploit maturity, ranks remediation order, and produces both markdown + JSON reports. Optimized for pnpm/turbo monorepos."
when_to_use: "Invoke to audit Node.js dependencies for known vulnerabilities."
category: security
argument-hint: "[--depth simple|full] [--severity low|moderate|high|critical] [--workspace <name>] [--auto-fix] [--lang vi|en]"
---

# devkit:package-vulnerable-scan

Audits dependencies for **known security vulnerabilities**, scores each finding by realistic risk, ranks remediation order, and produces a 2-phase report (proposed → done).

For: secrets / OWASP code patterns → `devkit:security --mode security-scan`. For outdated-but-not-vulnerable → `devkit:package-update`. Unused deps → out of scope.

## Modes

| Mode | Sources | Speed | Setup |
|------|---------|-------|-------|
| **simple** (default) | pnpm audit (npm/GitHub advisory ecosystem) | ~5s | 0 install |
| **full** | + osv-scanner (OSV.dev aggregating NVD aliases + ecosystem-specific advisories) | ~15s | osv-scanner cached at `~/.cache/devkit/osv-scanner` (download 1x, ~10MB) |

`simple` covers 90% of needs. Use `full` for pre-release verification or when GHSA seems incomplete.

---

## Core Behavior

1. **Never block** the workflow on environmental warnings. Record them in the report and continue.
2. **Score every finding** before asking the user — see Ranking Strategy.
3. **Single summary question** for batch decisions. Per-package questions only when ambiguity is genuine.
4. **2-phase report**: PROPOSED right after scan, DONE after fix. Same file, no overwrite.
5. **Both formats**: markdown for humans, JSON for automation.

## Workflow

```
preflight → scan → analyze (score + rank + dedupe) → write PROPOSED report
  → ONE summary AskUserQuestion → apply → verify → update DONE report
```

---

## Scan Strategy

### Pre-flight (always run, never block)

Set env vars and detect tools. See **Command Library — Block A (Pre-flight)**.

The skill **does not block** on:
- Missing `engines` field in `package.json` — proceed, record in report
- Runtime version mismatch with `engines` — record warning, continue

#### Runtime Compatibility Warning (non-blocking)

If current runtime differs from `package.json#engines`, record a warning in the report:

```
⚠ Runtime mismatch detected:
  - required node: >=20
  - current node: v22.3.0
  Audit may slightly differ from CI/production resolution.
```

Continue scanning normally. Vulnerability scanning is lockfile-based — runtime differences rarely change advisory output.

### Bootstrap osv-scanner (only when `DEPTH=full`)

This skill **does not own** the osv-scanner install logic — delegated to **`devkit:security --mode osv-scanner-install`**.

Detection inline (Tier 1 + Tier 2):
```bash
if command -v osv-scanner >/dev/null 2>&1; then
  export OSV=osv-scanner
elif [ -x "$HOME/.cache/devkit/osv-scanner" ]; then
  export OSV="$HOME/.cache/devkit/osv-scanner"
fi
```

If neither tier finds the binary, **invoke the install skill**:
```
Skill("devkit:security --mode osv-scanner-install")
```

The install skill handles AskUserQuestion (with full explanation), download, SHA verify, and caching. After it returns:
- If `$OSV` is set → continue to parallel scan
- If `$OSV` is empty (user declined install) → downgrade `DEPTH=simple` and continue, recording the downgrade in the report's Warnings section

### Parallel Scan

Run in one batched message:
- **Block C** (always): `pnpm audit --json`
- **Block D** (full mode only): `osv-scanner --lockfile`
- **Block E** (always): lockfile freshness check

---

## Ranking Strategy

Severity alone is insufficient. Each finding gets a composite score combining 3 dimensions: **CVSS-style severity**, **runtime reachability**, and **exploit maturity**.

### Scoring Rubric (0-15 points)

| Factor | Pts | Detection |
|--------|----:|-----------|
| Severity: critical | +4 | from advisory |
| Severity: high | +3 | |
| Severity: moderate | +2 | |
| Severity: low | +1 | |
| Direct dep (in `package.json`) | +2 | grep pkg in workspace package.json |
| Has patch within current major | +2 | patched_versions semver-intersects current major |
| Affects ≥3 workspaces | +1 | count distinct workspace prefixes |
| Cross-source confirmed (full mode) | +1 | from OSV merge |
| **Reachability: runtime** | +2 | `dependencies` (not dev) |
| **Reachability: build-time** | 0 | devDeps + name in vite/esbuild/webpack/swc/babel chain |
| **Reachability: test-only** | -1 | name matches jest/vitest/eslint/storybook/cypress/playwright |
| **Exploit: actively-exploited** | +3 | refs contain "in the wild" / "KEV" / "exploited" |
| **Exploit: public-poc** | +2 | refs contain "PoC" / "proof of concept" |
| **Exploit: theoretical** | 0 | default |
| **Exploit: disputed** | -2 | refs contain "disputed" / "false positive" |

### Reachability Detection Heuristics

| Context | Heuristic | Score |
|---------|-----------|-------|
| `runtime` | listed in `dependencies` of an `apps/*` workspace | +2 |
| `build-time` | listed in `devDependencies` AND name matches build tool chain (vite/esbuild/webpack/swc/babel/postcss) | 0 |
| `test-only` | name matches test framework (jest/vitest/eslint/storybook/cypress/playwright) OR only in test workspace | -1 |
| `optional` | listed in `optionalDependencies` | -1 |

### Exploit Maturity Detection

Parse advisory `references` and `overview` text for these signals:

| Label | Patterns (case-insensitive) |
|-------|------------------------------|
| `actively-exploited` | "in the wild", "actively exploited", "KEV", "CISA" |
| `public-poc` | "PoC", "proof of concept", "exploit available", "github.com/.../poc" |
| `theoretical` | (default — no exploitation evidence) |
| `disputed` | "disputed", "false positive", "not exploitable" |

### Tier Mapping (3 tiers)

| Score | Tier | Recommendation |
|------:|:---:|----------------|
| 11-15 | 🔴 **P0 — Now** | Block release, fix immediately |
| 4-10  | 🟠 **P1 — Soon** | Schedule this/next sprint |
| 0-3   | 🟢 **P2 — Defer** | Monitor, wait for upstream |

3 tiers (not 4) — P0 demands action now, P1 plans into a sprint, P2 sits in backlog. Anything in between collapsed into Soon for a clearer signal.

### Deduplication First

Before recommending upgrades, run dedupe analysis (Command Library — Block F). If `pnpm dedupe` alone resolves the vulnerability (multiple resolved versions of same pkg, only one is vulnerable), prefer dedupe over a version bump:

```
"@apollo/client appears at 3.11.11 + 3.13.5 in lockfile.
 Vulnerable version 3.11.11 is unreachable after dedupe — prefer
 `pnpm dedupe` over a forced upgrade."
```

For each P0/P1 finding, also run `pnpm why <pkg>` to capture the dependency path. Store in report Section 3.

---

## Remediation Strategy

### Single Summary Question (default)

After scoring, present **ONE** AskUserQuestion summarizing all tiers:

```
Found:
  🔴 2 P0 vulnerabilities (lodash, dompurify)
  🟠 3 P1 vulnerabilities (vite + 2 cascade)
  🟢 11 P2 transitives (auto-resolve when @tanstack/router-devtools updates)

Recommended plan:
  - Apply 2 P0 fixes immediately (~2min)
  - Bundle 3 P1 into one PR (peer chain: vite + vitest + storybook)
  - Defer 11 P2 transitives (no direct fix, wait for upstream)

Options:
  - Apply recommended plan (Recommended)
  - Apply P0 only, defer rest
  - Show detailed per-package breakdown
  - Cancel
```

### Per-package follow-up (only when needed)

Open per-package AskUserQuestion ONLY when:
- A bump is **major version** (cross-major, breaking)
- A **peer-dep cascade** detected during apply
- `pnpm audit --fix` fails partially

Otherwise, **stay silent and execute** the recommended plan.

### Apply

Use Command Library — Block G. For monorepo with identical version across workspaces, prefer single root update.

### Verify

Re-run pnpm audit (and osv-scanner if full mode). Compute before/after delta. See Command Library — Block H.

---

## Reporting Schema

Two output files per run, same base name:

```
$DEVKIT_REPORTS_PATH/package-vulnerables/package-vuln-scan-{YYMMDD-HHMM}.md
$DEVKIT_REPORTS_PATH/package-vulnerables/package-vuln-scan-{YYMMDD-HHMM}.json
```

### Markdown Report (human-readable)

**Phase 1** (Write tool, immediately after scoring — before asking user):

```markdown
# Package Vulnerability Scan — {RUN_ID}
State: **PROPOSED**

## 1. Run Metadata
- Date, Run ID, mode (simple/full)
- PM + version, Node version (current vs engines, ⚠ if mismatch)
- Workspace count
- Sources used: GHSA + OSV (if full)

## 2. Summary
| Severity | Count | Unique pkgs |
| Tier breakdown: P0 / P1 / P2 counts |

## 3. Findings (one block per pkg, sorted by score DESC)

> **CRITICAL — `why_it_matters` MUST be a summary, NOT a raw fetch.** See "Writing why_it_matters" section below.

### {pkg}@{current}  —  {severity}  —  {tier emoji} {tier}
- **Why it matters**: {2-3 plain-language sentences — summarize, do NOT paste raw advisory}
- **Sources**: GHSA | OSV | both
- **Exploit maturity**: theoretical | public-poc | actively-exploited | disputed
- **Runtime exposure**: runtime | build-time | test-only | optional
- **CVE / Advisory**: {GHSA-..., CVE-...}
- **Fix**: bump to {patched range} OR `pnpm dedupe` (if dedupe-resolvable)
- **Affected workspaces**: {list}
- **Dependency path**: {`pnpm why` output, 3-5 lines max}
- **References**: {1-2 URLs}
- **Score**: {N}/15 = {breakdown like "high(3) + direct(2) + patch(2) + runtime(2) + poc(2)"}

### Writing `why_it_matters` (MANDATORY rules)

The `why_it_matters` field is the **most important** part of the report — user reads it to decide priority. It MUST be a summary Claude writes, not a fetch dump.

#### Rules

1. **2-3 plain sentences max**, ~150-300 characters total
2. **Strip all markdown** from advisory: no `## Summary`, `### Impact`, code blocks, bullet lists, asterisks
3. **No truncation mid-sentence** — finish thoughts cleanly
4. **Structure**: `{vulnerability type} in {package}. {How it can be exploited / who is affected}. {Concrete impact for THIS project if derivable}.`
5. **Match user's language** — if `--lang vi` flag set OR user's recent message in Vietnamese, write in Vietnamese
6. **No filler** — skip "This vulnerability allows...", "An attacker could potentially..." → just say what happens

#### Good vs Bad examples

❌ **BAD** (current behavior — raw fetch + truncation):
```
## Summary  DOMPurify versions 3.0.1 through 3.3.3 (latest) are vulnerable
to a prototype pollution-based XSS bypass. When an application uses
`DOMPurify.sanitize()` with the default configuration (no
`CUSTOM_ELEMENT_HANDLING` option), a prior prototype pollution gadget can
inject permissive `tagNameCheck` and `attributeNameCheck` regex values i...
```
- Markdown headers leaked
- Truncated mid-word ("regex values i...")
- Verbose, unfocused
- 400+ chars

✅ **GOOD** (summarized, English):
```
XSS bypass in DOMPurify when `sanitize()` is called with default config.
Attacker chains a prototype-pollution gadget to relax DOMPurify's tag/attribute
filters, letting malicious markup through. Risk applies anywhere the app
sanitizes user-supplied HTML.
```
- ~280 chars, 3 sentences
- Names the attack class (XSS bypass)
- Names the precondition (default config + prior gadget)
- States the impact (malicious markup through sanitizer)

✅ **GOOD** (summarized, Vietnamese):
```
Lỗ hổng XSS bypass trong DOMPurify khi gọi `sanitize()` với config mặc định.
Attacker chain một prototype-pollution gadget để nới lỏng filter tag/attribute,
cho phép markup độc hại đi qua sanitizer. Ảnh hưởng mọi chỗ app sanitize
HTML từ người dùng.
```

#### How to derive the summary

Workflow when writing each finding:

1. Read raw `overview` field from advisory (Block C2 query — no truncation now, full text)
2. Identify: **what** (vuln class), **how** (precondition / vector), **impact** (what attacker gains)
3. Write 2-3 sentences using above structure
4. Strip markdown formatting (`##`, ```, `*`, `_`)
5. Cross-check length (~300 chars max)
6. If raw advisory has `## Summary` section, base the summary on that. If only `## Details` exists, condense those.
7. If advisory is itself only 1 sentence (e.g. "Minimist prior to 1.2.6 is vulnerable to Prototype Pollution via setKey()"), expand slightly: "Prototype pollution in minimist <1.2.6 via the `setKey()` function in `index.js`. Allows attackers to inject properties onto Object.prototype affecting all objects in the app."

## 4. Recommended Update Order (sorted by score DESC)
| Rank | Pkg | Current → Target | Tier | Score | Reason | Effort |
| Quick action plan: 2-3 sentences |

## 5. Warnings
Runtime mismatch, lockfile dirty, dedupe candidates, peer cascades.
```

**Phase 2** (Edit tool, after fix completes — flip state, append):

```markdown
State: **DONE**

## 6. Applied Actions
| pkg | action | result | notes |

## 7. Verification (before / after)
| severity | before | after | delta |
+ lockfile diff stats

## 8. Unresolved
Items skipped + reason; peer cascade warnings.

## 9. Next Steps
Re-run dates, deferred PRs.
```

### JSON Report (machine-readable)

Generated alongside markdown. Schema:

```json
{
  "metadata": {
    "run_id": "260507-1034",
    "date": "2026-05-07T10:34:00+07:00",
    "mode": "full",
    "package_manager": {"name": "pnpm", "version": "9.x.x"},
    "node": {"current": "22.3.0", "required": ">=20", "mismatch": false},
    "workspaces": 14,
    "sources": ["GHSA", "OSV"]
  },
  "summary": {
    "by_severity": {"critical": 0, "high": 38, "moderate": 28, "low": 2},
    "by_tier": {"P0": 2, "P1": 3, "P2": 11}
  },
  "findings": [
    {
      "package": "lodash",
      "current_version": "4.17.20",
      "patched_range": ">=4.17.21",
      "severity": "high",
      "tier": "P0",
      "score": 12,
      "score_breakdown": {
        "severity": 3, "direct": 2, "has_patch": 2,
        "runtime": 2, "exploit_poc": 2, "multi_workspace": 1
      },
      "exploit_maturity": "public-poc",
      "runtime_exposure": "runtime",
      "sources": ["GHSA", "OSV"],
      "advisories": ["GHSA-jf85-cpcp-j695", "CVE-2021-23337"],
      "affected_workspaces": ["apps/web-app", "apps/web-admin"],
      "dependency_path": ["apps/web-app > lodash@4.17.20"],
      "dedupe_candidate": false,
      "references": ["https://github.com/advisories/GHSA-jf85-cpcp-j695"],
      "why_it_matters": "Command injection via template..."
    }
  ],
  "applied_actions": [
    {"package": "lodash", "action": "bump", "from": "4.17.20", "to": "4.17.23", "result": "ok"}
  ],
  "verification": {
    "before": {"high": 38, "moderate": 28},
    "after": {"high": 2, "moderate": 5}
  },
  "warnings": []
}
```

Use cases:
- PR automation (bot comments)
- CI integration (gate on tier counts)
- Dashboards (trend analysis)
- AI post-processing (cross-run comparison)

---

## Command Library

All bash commands are kept in **`references/command-library.md`** to keep this prompt focused on decisions and behavior.

Blocks referenced above:
- **A**: Pre-flight env setup + runtime detection
- **B**: OSV bootstrap (3-tier fallback + AskUserQuestion explanation)
- **C**: pnpm audit (always)
- **D**: osv-scanner (full mode only)
- **E**: Lockfile freshness
- **F**: Dedupe analysis + `pnpm why`
- **G**: Apply fixes
- **H**: Re-verify
- **I**: Cleanup OSV cache (--cleanup-osv)
- **J**: jq aggregation queries (compact + detailed + OSV merge)

These are **preferred canonical commands**. The skill may adapt if:
- pnpm output schema changes between versions
- workspace topology differs (e.g., catalog vs direct)
- newer audit fields become available
- additional metadata is needed

Goal: maintain reproducibility without becoming brittle.

---

## Anti-patterns

- ❌ Blocking workflow on engine mismatch → record warning, continue
- ❌ Multiple AskUserQuestion per tier → ONE summary first
- ❌ Listing findings alphabetically → sort by score DESC
- ❌ Recommending P0 + P2 in same prompt → tier drives default action (P0 default Apply, P2 default Defer)
- ❌ Skipping `pnpm dedupe --check` → may recommend unnecessary upgrades
- ❌ Showing "high severity" without `why_it_matters` → must include 2-3 sentence summary
- ❌ **Pasting raw advisory text** into `why_it_matters` (with `## Summary`, code blocks, headers) → MUST summarize in plain language. See "Writing why_it_matters" rules
- ❌ **Truncating `why_it_matters` mid-sentence with `...`** → finish thoughts cleanly within ~300 chars
- ❌ Creating new file in Phase 2 → must Edit existing
- ❌ Markdown only, no JSON → both formats required

## Status Reporting

End with:
```
**Status:** DONE | DONE_WITH_CONCERNS | BLOCKED
**Summary:** [N P0 fixed, M P1 fixed, K skipped, before→after counts]
**Concerns:** [warnings, peer cascades, manual review needed]
```
