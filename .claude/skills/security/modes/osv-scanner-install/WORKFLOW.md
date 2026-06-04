---
description: "Install, update, verify, or uninstall the osv-scanner binary at ~/.cache/devkit/osv-scanner with SHA256 verification. Idempotent — silently skips if binary already cached and working. Used by devkit:package-vulnerable-scan when MODE=full, or invokable directly to refresh/audit the cache."
when_to_use: "Invoke to install, update, or verify the osv-scanner binary."
category: dev-tools
argument-hint: "[--force-reinstall] [--uninstall] [--verify-only] [--pin-version <ver>]"
---

# devkit:osv-scanner-install

Single-purpose skill that owns the lifecycle of the `osv-scanner` binary in `~/.cache/devkit/`. After it runs successfully, `$OSV` is exported pointing at the binary path.

## When to Use

- Auto: invoked by `devkit:security --mode package-vulnerable-scan` when `MODE=full` and no osv-scanner found
- Manual: refresh cache (`/osv-scanner-install --force-reinstall`)
- Audit: verify cached binary still matches upstream (`/osv-scanner-install --verify-only`)
- Cleanup: free cache space (`/osv-scanner-install --uninstall`)

## When NOT to Use

- For installing other security tools — copy this skill, don't generalize prematurely (refactor to `binary-cache` only when 2nd tool needed)
- For system-wide install — use `brew install osv-scanner` instead; this skill targets user-cache only

---

## Modes

| Flag | Effect |
|------|--------|
| (none) | Default. Install if missing. Skip if already cached and working. Idempotent. |
| `--force-reinstall` | Always re-download even if cached. Use after upstream update. |
| `--uninstall` | Remove `~/.cache/devkit/osv-scanner`. Return. |
| `--verify-only` | Re-fetch SHA256SUMS and verify cached binary matches. No install. |
| `--pin-version v2.3.6` | Install specific version instead of `latest`. Overrides any other version logic. |

Flags are mutually exclusive except `--pin-version` which combines with `--force-reinstall`.

---

## Workflow

```
parse-flags → detect-state → decide-action → execute → export $OSV
```

### Step 1: Parse Flags

Default values when not provided:
```bash
export FORCE=0
export UNINSTALL=0
export VERIFY_ONLY=0
export PIN_VERSION=""   # empty = use "latest"
```

### Step 2: Detect State

```bash
SYSTEM_OK=$(command -v osv-scanner >/dev/null 2>&1 && echo yes || echo no)
CACHE_PATH="$HOME/.cache/devkit/osv-scanner"
CACHE_OK=no
[ -x "$CACHE_PATH" ] && "$CACHE_PATH" --version >/dev/null 2>&1 && CACHE_OK=yes
echo "system=$SYSTEM_OK cache=$CACHE_OK"
```

If both `SYSTEM_OK=yes` and `CACHE_OK=yes` → prefer system (Tier 1) for `$OSV`. Cache stays as-is.

### Step 3: Decide Action

| State | Flag | Action |
|-------|------|--------|
| system_ok=yes | (any except --uninstall) | export OSV=osv-scanner, return |
| cache_ok=yes | (none) | export OSV=$CACHE_PATH, return (idempotent skip) |
| cache_ok=yes | --force-reinstall | rm cache → install (Step 4) |
| cache_ok=yes | --verify-only | run Step 5 (verify), return |
| cache_ok=yes | --uninstall | rm $CACHE_PATH, return |
| cache_ok=no | (none, --force-reinstall, --pin-version) | install (Step 4) |
| cache_ok=no | --verify-only | echo "no cache to verify", return |
| cache_ok=no | --uninstall | echo "nothing to uninstall", return |

### Step 4: Install (download + verify + cache)

If `cache_ok=no` AND no `--force-reinstall` flag passed by user → **MUST AskUserQuestion** before downloading. The user has not explicitly consented to a network operation.

If user already approved (e.g. via `--force-reinstall` or upstream skill passed consent) → skip the prompt.

#### AskUserQuestion (only when needed)

```
Title: "Install osv-scanner to ~/.cache/devkit/?"
Why:
  - osv-scanner queries OSV.dev (NVD + ecosystem advisories)
  - ~10MB binary, single executable, no system install
  - Cache is user-level, not project-bound
  - Subsequent runs reuse the cached binary instantly
Plan:
  - Download from github.com/google/osv-scanner releases
  - Verify SHA256 against published checksums
  - Cache at ~/.cache/devkit/osv-scanner
Options:
  - Install (Recommended)
  - Skip
```

If user picks Skip: export `OSV=""` and exit cleanly. Caller should fall back to whatever simpler path makes sense.

#### Install commands (single heredoc — atomic)

```bash
bash <<'EOF'
set -euo pipefail
mkdir -p "$HOME/.cache/devkit"
OS=$(uname | tr '[:upper:]' '[:lower:]')                  # darwin / linux
ARCH=$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/') # amd64 / arm64
ASSET="osv-scanner_${OS}_${ARCH}"

# Resolve URL: pin or latest
if [ -n "${PIN_VERSION:-}" ]; then
  BASE="https://github.com/google/osv-scanner/releases/download/${PIN_VERSION}"
else
  BASE="https://github.com/google/osv-scanner/releases/latest/download"
fi
TMP="$HOME/.cache/devkit/osv-scanner.tmp"

echo "Downloading $BASE/$ASSET ..."
curl -fsSL "$BASE/$ASSET" -o "$TMP"
SIZE=$(wc -c < "$TMP")
echo "Downloaded: $SIZE bytes"
[ "$SIZE" -lt 5000000 ] && { echo "ERR: file too small ($SIZE bytes)"; rm -f "$TMP"; exit 1; }

echo "Fetching SHA256SUMS ..."
SUMS=$(curl -fsSL "$BASE/osv-scanner_SHA256SUMS")
EXPECTED=$(echo "$SUMS" | awk -v a="$ASSET" '$2 == a || $2 == "*"a {print $1; exit}')
ACTUAL=$(shasum -a 256 "$TMP" | awk '{print $1}')

if [ -z "$EXPECTED" ]; then
  echo "WARN: $ASSET not found in SHA256SUMS — skipping checksum verify"
elif [ "$EXPECTED" != "$ACTUAL" ]; then
  rm -f "$TMP"
  echo "ERR: SHA256 mismatch"
  echo "  expected: $EXPECTED"
  echo "  actual:   $ACTUAL"
  exit 1
else
  echo "SHA256 verified: $ACTUAL"
fi

mv "$TMP" "$HOME/.cache/devkit/osv-scanner"
chmod +x "$HOME/.cache/devkit/osv-scanner"
echo "Installed at: $HOME/.cache/devkit/osv-scanner"
"$HOME/.cache/devkit/osv-scanner" --version

# Write metadata sidecar
cat > "$HOME/.cache/devkit/osv-scanner.meta" <<META
installed_at=$(date -Iseconds)
version=$("$HOME/.cache/devkit/osv-scanner" --version 2>&1 | head -1)
sha256=$ACTUAL
source=${BASE}/${ASSET}
META
EOF
export OSV="$HOME/.cache/devkit/osv-scanner"
```

**Key details:**
- `curl -fsSL` — `-f` makes curl fail (exit ≠ 0) on HTTP 4xx/5xx so wrong URLs are caught early
- `latest/download/` redirect — works for both binary AND `osv-scanner_SHA256SUMS`. No GitHub API call, no `gh` CLI
- `awk '$2 == a || $2 == "*"a'` — handles BSD (`*filename`) and GNU (`filename`) sums file formats
- Wrapped in `bash <<'EOF' ... EOF` with `set -euo pipefail` to avoid multi-line quoting issues when piped through harness tools
- Metadata sidecar (`osv-scanner.meta`) records install date, version, hash — for `--verify-only` later

### Step 5: Verify-only

```bash
bash <<'EOF'
set -euo pipefail
CACHE="$HOME/.cache/devkit/osv-scanner"
[ -x "$CACHE" ] || { echo "ERR: no cached binary at $CACHE"; exit 1; }

OS=$(uname | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/')
ASSET="osv-scanner_${OS}_${ARCH}"

if [ -n "${PIN_VERSION:-}" ]; then
  BASE="https://github.com/google/osv-scanner/releases/download/${PIN_VERSION}"
else
  BASE="https://github.com/google/osv-scanner/releases/latest/download"
fi

SUMS=$(curl -fsSL "$BASE/osv-scanner_SHA256SUMS")
EXPECTED=$(echo "$SUMS" | awk -v a="$ASSET" '$2 == a || $2 == "*"a {print $1; exit}')
ACTUAL=$(shasum -a 256 "$CACHE" | awk '{print $1}')

echo "Cached: $ACTUAL"
echo "Latest: $EXPECTED"
if [ "$EXPECTED" = "$ACTUAL" ]; then
  echo "✅ Cache matches latest"
else
  echo "⚠️  Cache differs from latest — run with --force-reinstall to update"
fi
EOF
```

### Step 6: Uninstall

```bash
rm -f "$HOME/.cache/devkit/osv-scanner" "$HOME/.cache/devkit/osv-scanner.meta"
echo "Removed osv-scanner cache"
unset OSV
```

---

## Output Contract

After successful install/detect:
- `$OSV` env var = absolute path to working binary
- Exit code 0

After uninstall:
- `$OSV` unset
- Exit code 0

After failure (download fail, SHA mismatch, user declined):
- `$OSV` empty/unset
- Exit code non-zero
- Caller decides fallback behavior

---

## Status Reporting

End with one of:

```
**Status:** DONE
**Action:** [installed | reused-cache | reused-system | reinstalled | verified | uninstalled]
**Path:** $OSV
**Version:** {output of --version}
```

```
**Status:** DONE_WITH_CONCERNS
**Action:** installed
**Concern:** SHA256SUMS missing entry for $ASSET — install proceeded without checksum verify
```

```
**Status:** BLOCKED
**Reason:** [user declined | network failure | SHA mismatch | wrong arch detected]
**Recommendation:** [next step user should take]
```

---

## Anti-patterns

- ❌ Re-downloading when cache is valid → check Step 2 first, idempotent by default
- ❌ Auto-installing without user consent → MUST AskUserQuestion when `cache_ok=no` AND no explicit flag
- ❌ Generalizing to other tools prematurely → keep specific until 2+ tools share install pattern
- ❌ Trusting binary without SHA → verify is non-optional unless SHA file genuinely missing
