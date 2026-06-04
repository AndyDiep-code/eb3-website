# SonarQube REST API Reference

Quick reference for the `fetch_issues.py` script and manual API calls.

## Authentication

SonarQube uses HTTP Basic Auth with the token as the username and an empty password:

```bash
# Header format
Authorization: Basic base64(TOKEN:)

# curl example
curl -u "YOUR_TOKEN:" https://sonar.company.com/api/issues/search?...
```

## Key Endpoints

### System Status
```
GET /api/system/status
```
Returns `{ "status": "UP" }` when running. Used by `--run` mode to verify connectivity.

### Issues Search
```
GET /api/issues/search
```

| Parameter | Values | Description |
|-----------|--------|-------------|
| `componentKeys` | `my-project` | Project key |
| `types` | `BUG,VULNERABILITY,CODE_SMELL` | Issue types (comma-separated) |
| `resolved` | `false` | Only open issues |
| `severities` | `BLOCKER,CRITICAL,MAJOR,MINOR,INFO` | Filter by severity |
| `ps` | 1–500 | Page size (max 500) |
| `p` | 1, 2, ... | Page number |

**Issue type mapping:**
| SonarQube Type | DevKit Category |
|----------------|-----------------|
| `VULNERABILITY` | Security |
| `BUG` | Reliability |
| `CODE_SMELL` | Maintainability |

**Severity levels (highest to lowest):**
`BLOCKER` → `CRITICAL` → `MAJOR` → `MINOR` → `INFO`

### Security Hotspots
```
GET /api/hotspots/search
```

| Parameter | Values | Description |
|-----------|--------|-------------|
| `projectKey` | `my-project` | Project key |
| `status` | `TO_REVIEW` | Only unreviewed hotspots |
| `ps` | 1–500 | Page size |
| `p` | 1, 2, ... | Page number |

**Hotspot vulnerability probabilities:** `HIGH`, `MEDIUM`, `LOW`

### Measures (Coverage & Duplications)
```
GET /api/measures/component
```

| Parameter | Values | Description |
|-----------|--------|-------------|
| `component` | `my-project` | Project key |
| `metricKeys` | comma-separated list | Metrics to fetch |

**Useful metric keys:**
| Metric Key | Description |
|------------|-------------|
| `coverage` | Line coverage % |
| `duplicated_lines_density` | Duplication % |
| `duplicated_blocks` | Number of duplicate blocks |
| `uncovered_lines` | Number of uncovered lines |
| `security_rating` | A/B/C/D/E rating |
| `reliability_rating` | A/B/C/D/E rating |
| `sqale_rating` | Maintainability rating (A–E) |

### Quality Gate Status
```
GET /api/qualitygates/project_status?projectKey=my-project
```

Returns `{ "projectStatus": { "status": "OK" | "WARN" | "ERROR" } }`

## Issue Object Fields

Key fields returned by `/api/issues/search`:

```json
{
  "key": "AYx...",
  "type": "BUG",
  "component": "my-project:src/utils/parser.ts",
  "line": 42,
  "message": "Refactor this method to reduce its Cognitive Complexity",
  "severity": "CRITICAL",
  "rule": "typescript:S3776",
  "effort": "1h",
  "tags": ["brain-overload"],
  "status": "OPEN",
  "author": "dev@company.com"
}
```

The `component` field includes the project key prefix — strip it to get the file path:
```python
file_path = component.split(":", 1)[1]  # "src/utils/parser.ts"
```

## Common Error Codes

| HTTP Code | Meaning | Action |
|-----------|---------|--------|
| 401 | Unauthorized | Token invalid or expired — generate new token |
| 403 | Forbidden | Token lacks project permissions |
| 404 | Not Found | Project key incorrect or project deleted |
| 429 | Rate Limited | Too many requests — add delay between calls |

## Token Generation

1. Log into SonarQube
2. Go to: **My Account → Security → Generate Tokens**
3. Name: `devkit-sonar`
4. Type: `User Token`
5. Expiration: set per your security policy

## Finding Your Project Key

```bash
# From sonar-project.properties
grep sonar.projectKey sonar-project.properties

# From sonar-scanner.properties
grep sonar.projectKey sonar-scanner.properties

# Or via API (lists all accessible projects)
curl -u "TOKEN:" "https://sonar.company.com/api/projects/search?ps=500"
```

## sonar-scanner Parameters (--run mode)

| Parameter | Description |
|-----------|-------------|
| `-Dsonar.host.url` | SonarQube server URL |
| `-Dsonar.projectKey` | Project key |
| `-Dsonar.token` | Authentication token |
| `-Dsonar.sources` | Source directories (e.g. `src`) |
| `-Dsonar.exclusions` | Glob patterns to exclude |
| `-Dsonar.tests` | Test directories |
| `-Dsonar.test.inclusions` | Test file patterns |
| `-Dsonar.typescript.lcov.reportPaths` | LCOV coverage report path |
| `-Dsonar.javascript.lcov.reportPaths` | LCOV coverage report path (JS) |
| `-Dsonar.python.coverage.reportPaths` | XML coverage for Python |
| `-Dsonar.java.coveragePlugin` | `jacoco` for Java |
| `-Dsonar.qualitygate.wait` | `true` to block until quality gate resolves |
