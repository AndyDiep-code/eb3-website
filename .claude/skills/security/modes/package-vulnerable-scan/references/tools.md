# Tool Reference — package-vulnerable-scan

Background on the vulnerability data sources used by this skill.

---

## pnpm audit (always used)

- **Backend**: npm/GitHub advisory ecosystem (GHSA-*)
- **Output**: JSON with `advisories` map + `metadata.vulnerabilities` counts
- **Pros**: ships with pnpm, no install, no token, knows project's resolution graph
- **Cons**: misses CVEs that exist in NVD but haven't been propagated to GHSA yet

```bash
pnpm audit --json
pnpm audit --audit-level=high   # filter
pnpm audit --prod                # skip devDependencies
pnpm audit --fix                 # try semver-safe auto-fix
```

### Audit JSON structure (pnpm 8+)

```json
{
  "advisories": {
    "1234": {
      "id": 1234,
      "module_name": "lodash",
      "severity": "high",
      "vulnerable_versions": "<4.17.21",
      "patched_versions": ">=4.17.21",
      "title": "Prototype Pollution",
      "url": "https://github.com/advisories/GHSA-xxxx",
      "cves": ["CVE-2021-23337"],
      "github_advisory_id": "GHSA-jf85-cpcp-j695",
      "overview": "...",
      "references": "...",
      "findings": [{ "version": "4.17.20", "paths": ["..."] }]
    }
  },
  "metadata": {
    "vulnerabilities": { "info": 0, "low": 1, "moderate": 2, "high": 3, "critical": 0 }
  },
  "actions": [
    { "action": "update", "module": "lodash", "target": "4.17.21", "resolves": [...] }
  ]
}
```

---

## osv-scanner (full mode only)

- **Backend**: OSV.dev — Google's open-source vulnerability aggregator
- **Sources aggregated**: NVD aliases, GHSA, RustSec, GoVulnDB, PyPI Advisory DB, Maven Central, OSS-Fuzz, Android, ConanCenter, and more
- **Distribution**: Go binary, single executable, no runtime dependencies
- **Pros**: broader coverage than GHSA alone; catches CVEs that NVD has indexed but GHSA hasn't propagated yet
- **Cons**: needs install (handled by skill via cached binary in `~/.cache/devkit/`)

```bash
osv-scanner scan --lockfile=pnpm-lock.yaml --format=json
osv-scanner scan --recursive ./       # auto-detect lockfiles
```

### When OSV adds value over pnpm audit

- Native module deps (Rust/Go binaries shipped via npm) — RustSec/GoVulnDB only in OSV
- Recently disclosed CVEs (NVD indexes faster than GHSA in some cases)
- Cross-ecosystem aliases (e.g., a CVE that affects both npm and pypi versions)
- Pre-release security review where you want maximum coverage

### When pnpm audit alone is enough

- Daily/CI scans
- Monorepo with all-JS deps
- When fast feedback matters more than coverage breadth

---

## Vulnerability Database Background

For deeper understanding of the ecosystem:

| Database | URL | Maintained by | Coverage |
|----------|-----|---------------|----------|
| **NVD** | nvd.nist.gov | NIST (US) | All software, authoritative CVE source |
| **GHSA** | github.com/advisories | GitHub | OSS ecosystems (npm, pypi, maven, etc.) |
| **OSV.dev** | osv.dev | Google | Aggregator: NVD + GHSA + 5 ecosystem DBs |
| **CVE** | cve.mitre.org | MITRE | ID-issuing authority for vulnerabilities |
| **CISA KEV** | cisa.gov/kev | CISA (US) | Known Exploited Vulnerabilities catalog |

**Flow**: Researcher → MITRE assigns CVE → NVD enriches with CVSS/CPE → GHSA imports for OSS ecosystems → OSV.dev aggregates all of the above.

---

## Severity Levels (CVSS)

CVSS v3.1 score → label mapping used by both pnpm audit and osv-scanner:

| Score | Label | Default action |
|-------|-------|----------------|
| 9.0-10.0 | critical | Block release, fix immediately |
| 7.0-8.9 | high | Fix this sprint |
| 4.0-6.9 | moderate | Fix next sprint |
| 0.1-3.9 | low | Note only, no urgent action |
| 0.0 | none/info | Skip |

The skill's scoring rubric (in SKILL.md) builds on CVSS severity but adds reachability + exploit maturity for more realistic prioritization.

---

## Project-specific notes

This repo: **pnpm + Turborepo monorepo** with workspaces at `apps/*` and `packages/*`. Always run `pnpm audit` at root — it covers all workspaces via the lockfile.

Workspace packages (`workspace:*` in version) are NOT external deps and won't appear in audit results:
- `@drisk-ai/auth`, `@drisk-ai/chart`, `@drisk-ai/chatbot`
- `@drisk-ai/design-system`, `@drisk-ai/export-file`
- `@drisk-ai/helper`, `@drisk-ai/infinite-load-query`
- `@drisk-ai/layout`, `@drisk-ai/list`, `@drisk-ai/table`, `@drisk-ai/ui`
