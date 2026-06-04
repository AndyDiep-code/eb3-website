---
name: devkit:sonar
description: "SonarQube integration: run analysis (--run) or auto-fix all issues (--fix, default). Run mode: typecheck + lint + tests with coverage, then sonar-scanner. Fix mode: fetches Security, Reliability, Maintainability, Duplications, Security Hotspots, Coverage from SonarQube REST API and iteratively fixes until all reach 0 using devkit:fix. Credentials loaded from .claude/.sonar-config.json."
user-invocable: true
when_to_use: "Invoke to run SonarQube analysis or auto-fix all quality issues."
argument-hint: "[project-key] [--run|--fix] [--category security|reliability|maintainability|all] [--dry-run]"
license: MIT
category: dev-tools
keywords: [sonarqube, quality, security, analysis, coverage, issues]
---

# devkit:sonar

SonarQube integration skill. Two modes: `--run` (run analysis) and `--fix` (fetch + fix all issues). Default is `--fix`.

## Modes

| Mode | Invocation | Behavior |
|------|-----------|----------|
| Run analysis | `devkit:sonar --run` | typecheck → lint → tests with coverage → sonar-scanner → show dashboard URL |
| Fix issues | `devkit:sonar --fix` | Fetch all issues, fix iteratively using `devkit:fix` until all reach 0 |
| Default (no arg) | `devkit:sonar` | Same as `--fix` |

## When to Use

- `--run`: After completing a feature, to push updated metrics to SonarQube; in local dev before pushing to CI
- `--fix`: When quality gate is failing before a release; periodic sonar debt cleanup; onboarding a legacy codebase

## When NOT to Use

- `--run` in CI pipelines (use sonar-scanner directly)
- `--fix` when you want to manually review every issue first

---

## Shared Setup: Credential & Project Config

### Load Config

Check in priority order:
1. `.claude/.sonar-config.json` (relative to project root):
```json
{
  "SONAR_HOST": "https://sonarqube.yourcompany.com",
  "SONAR_TOKEN": "squ_xxxxxxxxxxxx",
  "SONAR_PROJECT_KEY": "my-project",
  "COVERAGE_THRESHOLD": 85
}
```
2. Project root `.env` — look for `SONAR_HOST` and `SONAR_TOKEN`
3. Shell environment variables `SONAR_HOST` / `SONAR_TOKEN`

Prefer `.sonar-config.json` when multiple sources exist.

### If Credentials Missing

If `SONAR_HOST` or `SONAR_TOKEN` absent, use `AskUserQuestion` with both fields in one call:
- "SonarQube Host URL" (e.g. `http://localhost:9000`)
- "SonarQube Token" (generate at SonarQube → My Account → Security → Tokens)

Save to `.claude/.sonar-config.json`.

### If Project Key Missing

Check `sonar-project.properties` for `sonar.projectKey=...`. If not found, use `AskUserQuestion`. Save to `.claude/.sonar-config.json`.

---

## Mode: --run (Sonar Analysis)

### Option A: Project has a `sonar` script in `package.json`

If the project defines a `sonar` (or `sonar:scan`) npm/pnpm script, prefer it — it already bundles typecheck + lint + tests + scanner:

```bash
pnpm sonar   # or: npm run sonar / yarn sonar
```

### Option B: Use the generic analysis script

```bash
bash "$CLAUDE_PROJECT_DIR/.claude/skills/sonar/scripts/run_analysis.sh"
```

The script handles the full pipeline:
1. Loads credentials from `.claude/.sonar-config.json`, then `.env`, then `sonar-project.properties`
2. Detects package manager (`pnpm` / `yarn` / `bun` / `npm`)
3. Runs **typecheck** — aborts on failure
4. Runs **lint** — warns but continues on failure
5. Runs **tests with coverage** — tries `test:cov`, `test:coverage`, `test:ci` — aborts on failure
6. Checks SonarQube connectivity via `/api/system/status`
7. Runs `npx sonar-scanner` with auto-detected coverage report path
8. Prints dashboard URL on success

**Optional flags:**
```bash
bash run_analysis.sh --skip-typecheck
bash run_analysis.sh --skip-lint
bash run_analysis.sh --skip-tests
```

**If the script fails:**
- Exit code 1 with clear error message (missing token, SonarQube down, tests failed)
- Fix the reported issue, then re-run

**If credentials are missing before running the script:** follow the Shared Setup section above to populate `.claude/.sonar-config.json` first.

### After the scan: confirm server-side processing finished

Query project-level metrics to confirm the CE task completed and get a baseline:

```bash
SONAR_TOKEN=<token> SONAR_HOST=<host> node "$CLAUDE_PROJECT_DIR/.claude/skills/sonar/scripts/sonar-project-metrics.mjs" [project-key]
```

Expected output (duplication example):
```json
{
  "duplicated_blocks": 0,
  "duplicated_files": 0,
  "duplicated_lines": 0,
  "duplicated_lines_density": 0
}
```

---

## Mode: --fix (Auto-Fix Issues)

### Phase 1: Fetch All Issues

```bash
python3 "$CLAUDE_PROJECT_DIR/.claude/skills/sonar/scripts/fetch_issues.py" \
  --host "$SONAR_HOST" \
  --token "$SONAR_TOKEN" \
  --project-key "$SONAR_PROJECT_KEY"
```

Outputs JSON with keys: `security`, `reliability`, `maintainability`, `hotspots`, `coverage`, `summary`.

**If `{"error": "UNAUTHORIZED"}`:** Use `AskUserQuestion` for new token. Update config and retry.
**If `{"error": "NOT_FOUND"}`:** Use `AskUserQuestion` for correct project key. Update config and retry.

### Phase 2: Display Issue Summary

```
## SonarQube Issue Summary — {project-key}

| Category                      | Count | Severity     |
|-------------------------------|-------|--------------|
| Security (Vulnerabilities)    | N     | 🔴 Critical  |
| Reliability (Bugs)            | N     | 🔴 High      |
| Security Hotspots (To Review) | N     | 🟠 Medium    |
| Maintainability (Code Smells) | N     | 🟡 Low       |
| Duplications                  | X%    | 🟡 Low       |
| Coverage                      | X%    | 🟡 Low       |

Total fixable issues: N
Starting fix loop...
```

### Phase 3: Fix Loop (Priority Order)

Re-run fetch after every 10 fixes or when a category clears.

#### 3a. Security Vulnerabilities (HIGHEST)

For each from `security.issues`:
1. Invoke `Skill("devkit:fix")` in `--deep` mode
2. Context: `"Fix SonarQube VULNERABILITY in {file} at line {line}: {message} (Rule: {rule}, Severity: {severity})"`
3. After all: re-fetch to confirm count = 0 before moving on

#### 3b. Reliability Bugs

For each from `reliability.issues`:
1. Invoke `Skill("devkit:fix")` in standard mode
2. Context: `"Fix SonarQube BUG in {file} at line {line}: {message} (Rule: {rule})"`
3. Group issues in the same file into one fix call

#### 3c. Security Hotspots

Hotspots require human judgment.

For each in `hotspots.issues`:
1. Use `AskUserQuestion`: `"Security Hotspot at {file}:{line} — {message} (Probability: {vulnerability_probability}). Real issue or false positive?"`
2. Real issue → `Skill("devkit:fix")` with `--deep`
3. False positive → note it; user marks reviewed in SonarQube manually

#### 3d. Maintainability (Code Smells)

For each from `maintainability.issues`:
1. Group by file — fix all smells in one file per call
2. Simple smells (naming, unused vars): `Skill("devkit:fix")` with `--quick`
3. Complexity/duplication smells: `Skill("devkit:fix")` standard mode
4. Context: `"Fix SonarQube CODE_SMELL in {file}: {list of issues with lines}"`

#### 3e. Duplications

Duplications MUST always reach exactly 0% — no exceptions, regardless of threshold.

**Step 1: Get current duplication metrics from SonarQube**

```bash
SONAR_TOKEN=<token> SONAR_HOST=<host> node "$CLAUDE_PROJECT_DIR/.claude/skills/sonar/scripts/sonar-project-metrics.mjs" [project-key]
```

Target: `duplicated_blocks = 0`, `duplicated_files = 0`, `duplicated_lines = 0`, `duplicated_lines_density = 0`.

**Step 2: Find duplication candidates locally (fast, no Sonar needed)**

```bash
node "$CLAUDE_PROJECT_DIR/.claude/skills/sonar/scripts/find-local-dup-candidates.mjs" [src-dir] [window-size]
```

Defaults: `src-dir=src`, `window-size=8`. Prioritize:
- Repeated arrays (tour steps, prompt configs, route actions)
- Repeated empty-state / CTA JSX blocks
- Repeated icon/status markup

**Step 3: Drill into a specific file**

```bash
SONAR_TOKEN=<token> SONAR_HOST=<host> node "$CLAUDE_PROJECT_DIR/.claude/skills/sonar/scripts/sonar-file-metrics.mjs" src/path/to/file.tsx
```

**Step 4: Fix with smallest shared abstraction** (YAGNI + KISS + DRY)

Preferred fixes:
1. Extract a small helper/factory for repeated objects
2. Extract a tiny local component for repeated JSX
3. Reuse existing shared primitives before adding new ones

Avoid: broad architecture rewrites, behavior changes just to satisfy Sonar, abstractions used only once.

**Step 5: Re-verify locally, then re-scan**

```bash
pnpm typecheck && pnpm lint   # or equivalent
pnpm sonar                    # or run_analysis.sh
```

Re-run `sonar-project-metrics.mjs` to confirm `duplicated_blocks = 0`. Repeat until zero.

#### 3f. Coverage

Coverage gaps require new tests — not a code fix:
1. Invoke `Skill("devkit:test")` for the project
2. Target: coverage ≥ `COVERAGE_THRESHOLD` (default 85%)
3. Focus on uncovered files from coverage data

### Phase 4: Iteration & Completion

After each batch, re-run fetch and show progress:

```
## Progress Update

| Category          | Before | After | Remaining |
|-------------------|--------|-------|-----------|
| Security          | 5      | 0     | ✅ 0      |
| Reliability       | 12     | 3     | 🔴 3      |
| Maintainability   | 48     | 20    | 🟡 20     |
| Hotspots          | 2      | 0     | ✅ 0      |
| Coverage          | 62%    | 71%   | 🟡 <80%   |
| Duplications      | 8.3%   | 4.1%  | 🔴 must be 0%    |
```

**Done when:** all counts = 0 AND coverage ≥ threshold AND duplications = 0% (duplications must always reach exactly 0% — no exceptions).

**Stuck detection:** No progress after 3 consecutive iterations on a category →
Use `AskUserQuestion`: `"Unable to auto-fix {N} {category} issues after 3 attempts. Skip this category, review manually, or try a different approach?"`

### Phase 5: Final Report

```
## ✅ SonarQube Fix Complete — {project-key}

| Category        | Before | After  |
|-----------------|--------|--------|
| Security        | 5      | 0      |
| Reliability     | 12     | 0      |
| Maintainability | 48     | 0      |
| Hotspots        | 2      | 0      |
| Coverage        | 62%    | 83%    |
| Duplications    | 8.3%   | 0%     |

Total issues fixed: N
```

---

## Configuration

`.claude/.sonar-config.json` full schema:
```json
{
  "SONAR_HOST": "https://sonarqube.yourcompany.com",
  "SONAR_TOKEN": "squ_xxxxxxxxxxxx",
  "SONAR_PROJECT_KEY": "my-project",
  "COVERAGE_THRESHOLD": 85
}
```

`COVERAGE_THRESHOLD` defaults to 85 if not set.

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/run_analysis.sh` | Run typecheck + lint + tests + sonar-scanner (--run mode) |
| `scripts/fetch_issues.py` | Fetch and categorize all SonarQube issues via REST API (--fix mode) |
| `scripts/sonar-project-metrics.mjs` | Query project-level duplication metrics from SonarQube REST API |
| `scripts/sonar-file-metrics.mjs` | Query file-level duplication metrics (`sonar-file-metrics.mjs src/path/to/file.tsx`) |
| `scripts/find-local-dup-candidates.mjs` | Find local duplication candidates without Sonar (`find-local-dup-candidates.mjs [src-dir] [window-size]`) |

## References

| File | Content |
|------|---------|
| `references/sonarqube-api.md` | SonarQube REST API endpoints, authentication, field reference |

## Related Skills

- `devkit:fix` — Core fixing engine used for each issue
- `devkit:test` — Used to improve coverage
- `devkit:security --mode security-audit` — Complementary STRIDE+OWASP audit (code-level)
- `devkit:security --mode security-scan` — Fast secret/vulnerability scan
