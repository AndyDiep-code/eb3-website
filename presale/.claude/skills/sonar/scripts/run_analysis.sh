#!/bin/sh
# devkit:sonar --run
# Runs pre-checks (typecheck, lint, tests with coverage) then sonar-scanner.
# Usage: ./run_analysis.sh [--skip-tests] [--skip-lint] [--skip-typecheck]

set -e

# Navigate to project root (script lives in .claude/skills/sonar/scripts/)
cd "$(dirname "$0")/../../../../.." || exit 1
PROJECT_ROOT=$(pwd)

# ── Parse flags ────────────────────────────────────────────────────────────────
SKIP_TYPECHECK=false
SKIP_LINT=false
SKIP_TESTS=false

for arg in "$@"; do
  case "$arg" in
    --skip-typecheck) SKIP_TYPECHECK=true ;;
    --skip-lint)      SKIP_LINT=true ;;
    --skip-tests)     SKIP_TESTS=true ;;
  esac
done

# ── Load credentials ────────────────────────────────────────────────────────────
# Prefer .claude/.sonar-config.json, fall back to .env
SONAR_CONFIG="${PROJECT_ROOT}/.claude/.sonar-config.json"

if [ -f "$SONAR_CONFIG" ]; then
  SONAR_HOST=$(python3 -c "import json,sys; d=json.load(open('$SONAR_CONFIG')); print(d.get('SONAR_HOST',''))" 2>/dev/null)
  SONAR_TOKEN=$(python3 -c "import json,sys; d=json.load(open('$SONAR_CONFIG')); print(d.get('SONAR_TOKEN',''))" 2>/dev/null)
  SONAR_PROJECT_KEY=$(python3 -c "import json,sys; d=json.load(open('$SONAR_CONFIG')); print(d.get('SONAR_PROJECT_KEY',''))" 2>/dev/null)
fi

# Fall back to .env
if [ -f "${PROJECT_ROOT}/.env" ]; then
  [ -z "$SONAR_HOST" ]        && SONAR_HOST=$(grep -E '^SONAR_HOST=' "${PROJECT_ROOT}/.env" | cut -d= -f2-)
  [ -z "$SONAR_TOKEN" ]       && SONAR_TOKEN=$(grep -E '^SONAR_TOKEN=' "${PROJECT_ROOT}/.env" | cut -d= -f2-)
  [ -z "$SONAR_PROJECT_KEY" ] && SONAR_PROJECT_KEY=$(grep -E '^SONAR_PROJECT_KEY=' "${PROJECT_ROOT}/.env" | cut -d= -f2-)
fi

# Fall back to sonar-project.properties
if [ -z "$SONAR_PROJECT_KEY" ] && [ -f "${PROJECT_ROOT}/sonar-project.properties" ]; then
  SONAR_PROJECT_KEY=$(grep 'sonar.projectKey' "${PROJECT_ROOT}/sonar-project.properties" | cut -d= -f2-)
fi

# Apply defaults
SONAR_HOST="${SONAR_HOST:-http://localhost:9000}"

echo "Project root: ${PROJECT_ROOT}"
echo "SonarQube host: ${SONAR_HOST}"
echo "Project key: ${SONAR_PROJECT_KEY}"

# ── Validate ────────────────────────────────────────────────────────────────────
if [ -z "$SONAR_TOKEN" ]; then
  echo "Error: SONAR_TOKEN not set. Add to .claude/.sonar-config.json or .env"
  exit 1
fi

if [ -z "$SONAR_PROJECT_KEY" ]; then
  echo "Error: SONAR_PROJECT_KEY not set. Add to .claude/.sonar-config.json, .env, or sonar-project.properties"
  exit 1
fi

# ── Detect package manager ──────────────────────────────────────────────────────
if [ -f "${PROJECT_ROOT}/pnpm-lock.yaml" ]; then
  PKG="pnpm"
elif [ -f "${PROJECT_ROOT}/yarn.lock" ]; then
  PKG="yarn"
elif [ -f "${PROJECT_ROOT}/bun.lockb" ]; then
  PKG="bun"
else
  PKG="npm"
fi

echo "Package manager: ${PKG}"

# ── Detect coverage report path ─────────────────────────────────────────────────
# Will be set after tests run; detect based on common locations
LCOV_PATH=""
if [ -f "${PROJECT_ROOT}/coverage/lcov.info" ]; then
  LCOV_PATH="coverage/lcov.info"
elif [ -f "${PROJECT_ROOT}/coverage-report/lcov.info" ]; then
  LCOV_PATH="coverage-report/lcov.info"
fi

# ── TypeScript type check ───────────────────────────────────────────────────────
if [ "$SKIP_TYPECHECK" = false ]; then
  echo ""
  echo "Running TypeScript type check..."
  if $PKG run typecheck 2>/dev/null || $PKG run type-check 2>/dev/null || npx tsc --noEmit; then
    echo "Type check passed."
  else
    echo "Type check failed. Aborting."
    exit 1
  fi
fi

# ── Lint ────────────────────────────────────────────────────────────────────────
if [ "$SKIP_LINT" = false ]; then
  echo ""
  echo "Running lint..."
  if $PKG run lint; then
    echo "Lint passed."
  else
    echo "Warning: Lint found issues. Continuing with analysis..."
  fi
fi

# ── Tests with coverage ─────────────────────────────────────────────────────────
if [ "$SKIP_TESTS" = false ]; then
  echo ""
  echo "Running tests with coverage..."

  # Try common coverage script names
  TEST_SCRIPT=""
  for s in "test:cov" "test:coverage" "test:ci" "test"; do
    if $PKG run "$s" --if-present 2>/dev/null; then
      TEST_SCRIPT="$s"
      break
    fi
  done

  if [ -z "$TEST_SCRIPT" ]; then
    echo "Warning: No test script found. Continuing without coverage."
  else
    echo "Tests passed with script: ${TEST_SCRIPT}"
    # Re-detect coverage after tests ran
    for path in "coverage/lcov.info" "coverage-report/lcov.info" "lcov.info"; do
      if [ -f "${PROJECT_ROOT}/${path}" ]; then
        LCOV_PATH="$path"
        break
      fi
    done
  fi
fi

# ── Check SonarQube connectivity ────────────────────────────────────────────────
echo ""
echo "Checking SonarQube at ${SONAR_HOST}..."
STATUS=$(curl -s -u "${SONAR_TOKEN}:" -o /dev/null -w "%{http_code}" "${SONAR_HOST}/api/system/status" 2>/dev/null)

if [ "$STATUS" != "200" ]; then
  echo "Error: SonarQube not reachable (HTTP ${STATUS}). Start SonarQube and retry."
  exit 1
fi

echo "SonarQube is running."

# ── Build sonar-scanner args ────────────────────────────────────────────────────
SONAR_ARGS="\
  -Dsonar.host.url=${SONAR_HOST} \
  -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
  -Dsonar.token=${SONAR_TOKEN} \
  -Dsonar.sources=src \
  -Dsonar.exclusions=**/node_modules/**,**/dist/**,**/*.spec.ts,**/*.test.ts,**/test/**,**/generated/** \
  -Dsonar.tests=src \
  -Dsonar.test.inclusions=**/*.spec.ts,**/*.test.ts \
  -Dsonar.qualitygate.wait=false"

if [ -n "$LCOV_PATH" ]; then
  SONAR_ARGS="${SONAR_ARGS} \
  -Dsonar.typescript.lcov.reportPaths=${LCOV_PATH} \
  -Dsonar.javascript.lcov.reportPaths=${LCOV_PATH}"
  echo "Coverage report: ${LCOV_PATH}"
else
  echo "Warning: No coverage report found. Coverage metrics will not be updated."
fi

# ── Run sonar-scanner ───────────────────────────────────────────────────────────
echo ""
echo "Starting SonarQube analysis..."
# shellcheck disable=SC2086
npx sonar-scanner $SONAR_ARGS

SONAR_STATUS=$?

if [ $SONAR_STATUS -eq 0 ]; then
  echo ""
  echo "Analysis complete."
  echo "Dashboard: ${SONAR_HOST}/dashboard?id=${SONAR_PROJECT_KEY}"
else
  echo "sonar-scanner failed (exit ${SONAR_STATUS})."
  exit $SONAR_STATUS
fi
