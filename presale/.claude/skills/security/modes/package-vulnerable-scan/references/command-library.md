# Command Library — package-vulnerable-scan

Preferred canonical commands. Skill may adapt if pnpm output schema changes, workspace topology differs, or newer audit fields become available.

---

## Block A — Pre-flight (always run)

```bash
# Run ID + report path (YYMMDD-HHMM, matches devkit session naming)
export RUN_ID=$(date +%y%m%d-%H%M)
export REPORT_DIR="${DEVKIT_REPORTS_PATH:-.claude/tasks/reports}/package-vulnerables"
export REPORT_FILE_MD="$REPORT_DIR/package-vuln-scan-${RUN_ID}.md"
export REPORT_FILE_JSON="$REPORT_DIR/package-vuln-scan-${RUN_ID}.json"
mkdir -p "$REPORT_DIR"

# Detect package manager
if   [ -f pnpm-lock.yaml ];   then export PM=pnpm
elif [ -f yarn.lock ];         then export PM=yarn
elif [ -f package-lock.json ]; then export PM=npm
else echo "ERR: no lockfile found"; exit 1
fi

# Runtime detection (warning only — never block)
export NODE_REQUIRED=$(jq -r '.engines.node // "unset"' package.json 2>/dev/null)
export PNPM_REQUIRED=$(jq -r '.engines.pnpm // "unset"' package.json 2>/dev/null)
export NODE_CURRENT=$(node --version 2>/dev/null || echo missing)
export PNPM_CURRENT=$(pnpm --version 2>/dev/null || echo missing)

# Mode (default simple)
export MODE=${MODE:-simple}

echo "RUN_ID=$RUN_ID PM=$PM MODE=$DEPTH"
echo "Node: required=$NODE_REQUIRED current=$NODE_CURRENT"
echo "Pnpm: required=$PNPM_REQUIRED current=$PNPM_CURRENT"
echo "Reports: $REPORT_FILE_MD + $REPORT_FILE_JSON"
```

Mismatch handling: record `runtime_mismatch=true` in JSON metadata + emit warning string for the markdown report's Section 5. **Do not call AskUserQuestion**, do not abort.

---

## Block B — OSV bootstrap (only when DEPTH=full)

**Owner**: `devkit:security --mode osv-scanner-install` skill.

This block does NOT contain install logic. Detection only:

```bash
if command -v osv-scanner >/dev/null 2>&1; then
  export OSV=osv-scanner
elif [ -x "$HOME/.cache/devkit/osv-scanner" ]; then
  export OSV="$HOME/.cache/devkit/osv-scanner"
else
  export OSV=""   # NOT installed → invoke install skill below
fi
```

If `$OSV` is empty after detection, **invoke `Skill("devkit:security --mode osv-scanner-install")`** to handle:
- AskUserQuestion explaining why osv-scanner is needed
- Download from GitHub releases
- SHA256 verify against `osv-scanner_SHA256SUMS`
- Cache at `~/.cache/devkit/osv-scanner`
- Set `$OSV` on success

After install skill returns:
- `$OSV` set → proceed to Block C/D parallel scan
- `$OSV` empty (user declined) → downgrade `DEPTH=simple`, record in report Warnings

### Docker fallback (advanced — user picks in install skill)

```bash
export OSV="docker run --rm -v $PWD:/src -w /src ghcr.io/google/osv-scanner:latest"
```

---

## Block C — pnpm audit (always run, both modes)

```bash
$PM audit --json > /tmp/audit-$RUN_ID.json 2>&1 || true
jq '.metadata.vulnerabilities' /tmp/audit-$RUN_ID.json
```

Monorepo: root-level audit covers all workspaces via the lockfile. No per-workspace iteration needed.

---

## Block D — osv-scanner (only DEPTH=full)

```bash
if [ "$DEPTH" = "full" ] && [ -n "$OSV" ]; then
  $OSV scan --lockfile=pnpm-lock.yaml --format=json > /tmp/osv-$RUN_ID.json 2>&1 || true
  jq '.results | length' /tmp/osv-$RUN_ID.json
fi
```

---

## Block E — Lockfile freshness

```bash
git diff --name-only -- pnpm-lock.yaml
```

Empty output = clean. Non-empty = warn user that uncommitted lockfile changes may interfere with audit.

---

## Block F — Dedupe analysis + dependency paths

### Check if dedupe alone resolves anything

```bash
$PM dedupe --check 2>&1 | tee /tmp/dedupe-$RUN_ID.txt || true
```

### For each P0/P1 finding, capture dependency path

```bash
# pkg list comes from aggregated findings — loop in 5-pkg batches
for PKG in lodash dompurify vite; do
  echo "=== $PKG ==="
  $PM why "$PKG" --json 2>/dev/null | jq -r '
    .[] | .dependencies // {} | to_entries[] |
    "\(.key): \(.value.version)"
  ' | head -10
done
```

### Detect dedupe-resolvable vulnerabilities

A vuln is dedupe-resolvable when:
- Multiple resolved versions of the same pkg exist in lockfile
- The non-vulnerable version is already present
- `pnpm dedupe --check` flags the pkg

If detected, prefer the recommendation:
```
"{pkg} appears at {ver1} (vulnerable) and {ver2} (clean) in lockfile.
 Run `pnpm dedupe` first — may eliminate vulnerable copy without upgrade."
```

---

## Block G — Apply fixes (only after user confirmation)

### Bump direct dep
```bash
pnpm add <pkg>@<version> --filter <workspace>
```

### Auto-fix batch (only when user picked "Apply recommended plan")
```bash
$PM audit --fix
```

### Dedupe-only fix (when Block F flagged)
```bash
$PM dedupe
```

For monorepo with identical version across workspaces, prefer single root update over per-workspace.

---

## Block H — Re-verify

```bash
$PM install --frozen-lockfile=false
$PM audit --json > /tmp/audit-after-$RUN_ID.json
jq '.metadata.vulnerabilities' /tmp/audit-after-$RUN_ID.json

# Re-run osv-scanner if DEPTH=full
if [ "$DEPTH" = "full" ] && [ -n "$OSV" ]; then
  $OSV scan --lockfile=pnpm-lock.yaml --format=json > /tmp/osv-after-$RUN_ID.json
fi

# Lockfile diff stats
git diff --stat pnpm-lock.yaml
```

Compute delta: `jq -n --slurpfile a /tmp/audit-$RUN_ID.json --slurpfile b /tmp/audit-after-$RUN_ID.json '$b[0].metadata.vulnerabilities | to_entries | map({k: .key, before: $a[0].metadata.vulnerabilities[.key], after: .value, delta: (.value - $a[0].metadata.vulnerabilities[.key])})'`

---

## Block I — Cleanup OSV cache (only with --cleanup-osv flag)

```bash
[ "$CLEANUP_OSV" = "1" ] && rm -f "$HOME/.cache/devkit/osv-scanner" && echo "OSV cache removed"
```

Default: keep cache for next run.

---

## Block J — jq aggregation queries

### J1. Compact summary (severity + count + fix)

```bash
jq -r '.advisories | to_entries | group_by(.value.module_name) | .[] |
  { pkg: .[0].value.module_name,
    count: length,
    top_severity: (map(.value.severity) | (
      if   any(.=="critical") then "critical"
      elif any(.=="high")     then "high"
      elif any(.=="moderate") then "moderate"
      else "low" end)),
    patched: ([.[].value.patched_versions] | unique | join(", "))
  } | "\(.top_severity)\t\(.pkg)\t\(.count)\tfix: \(.patched)"' \
  /tmp/audit-$RUN_ID.json | sort
```

### J2. Detailed reasons (for Findings section)

```bash
jq '.advisories | to_entries | group_by(.value.module_name) | .[] |
  {
    pkg: .[0].value.module_name,
    severity: (map(.value.severity) | (
      if   any(.=="critical") then "critical"
      elif any(.=="high")     then "high"
      elif any(.=="moderate") then "moderate"
      else "low" end)),
    titles: [.[].value.title] | unique,
    cves: [.[].value.cves[]?] | unique,
    advisory_ids: [.[].value.github_advisory_id] | unique,
    patched: [.[].value.patched_versions] | unique,
    why_it_matters: (.[0].value.overview | gsub("\\n+"; " ") | gsub("\\s+"; " ") | .[0:400]),
    references: [.[].value.references | gsub("\\n"; " ")] | unique | .[0:2],
    paths: [.[].value.findings[]?.paths[]?] | unique | .[0:5]
  }' /tmp/audit-$RUN_ID.json
```

The `paths` field gives raw dependency chains for `pnpm why` cross-check.

### J3. OSV-scanner merge (only DEPTH=full)

```bash
if [ "$DEPTH" = "full" ] && [ -f /tmp/osv-$RUN_ID.json ]; then
  jq '.results[].packages[].vulnerabilities[]? |
    {
      id: .id,
      aliases: .aliases,
      summary: .summary,
      severity_score: (.severity[0].score // "unscored"),
      affected_pkg: .affected[0].package.name,
      fixed_in: [.affected[0].ranges[0].events[]?.fixed]
    }' /tmp/osv-$RUN_ID.json
fi
```

Then merge GHSA + OSV findings by package name + CVE-ID. Tag each finding with `source: GHSA | OSV | both`. Findings only in OSV (not GHSA) get extra attention — they're the value-add of full mode.

### J4. Exploit maturity classifier

```bash
classify_exploit() {
  local advisory_text="$1"
  echo "$advisory_text" | grep -qiE 'in the wild|actively exploited|KEV|CISA' && echo "actively-exploited" && return
  echo "$advisory_text" | grep -qiE 'PoC|proof of concept|exploit available' && echo "public-poc" && return
  echo "$advisory_text" | grep -qiE 'disputed|false positive|not exploitable' && echo "disputed" && return
  echo "theoretical"
}
```

Apply per-finding by feeding `references` + `overview` text.

### J5. Reachability classifier

```bash
classify_reachability() {
  local pkg="$1"
  # test framework match
  echo "$pkg" | grep -qE '^(jest|vitest|eslint|storybook|cypress|playwright|@testing-library|@vitest|@playwright)' && echo "test-only" && return
  # build tool chain match
  echo "$pkg" | grep -qE '^(vite|esbuild|webpack|rollup|swc|babel|postcss|terser)' && echo "build-time" && return
  # check if in dependencies (not devDependencies) of any workspace
  for ws in apps/*/package.json packages/*/package.json package.json; do
    [ -f "$ws" ] && jq -e --arg p "$pkg" '.dependencies[$p] // empty' "$ws" >/dev/null 2>&1 && echo "runtime" && return
  done
  echo "build-time"  # default if only in devDeps
}
```

Apply per-finding to populate `runtime_exposure`.

---

## Notes

- All `/tmp/*-$RUN_ID.*` files are scratch — safe to ignore after the run
- The `~/.cache/devkit/` directory is user-level (XDG-compliant), not project-bound
- No commands write to the source code unless user explicitly approves a fix in Block G
