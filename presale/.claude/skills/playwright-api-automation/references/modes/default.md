# DEFAULT MODE - Generate All API Tests

Generate all API tests for all endpoints with all test types.

## Overview

This mode generates complete API test automation for every endpoint found in the network capture, covering all test types: happy path, validation, security, performance, and integration tests.

## Terminal Output Standards

```bash
CYAN='\033[1;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
RED='\033[0;31m'; GRAY='\033[0;90m'; WHITE='\033[1;37m'; NC='\033[0m'
```

```bash
echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  API Automate — Default Mode         ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
```

Step pattern — use `[X/9]`:

```bash
echo -e "${YELLOW}⏳ [X/9] Step description...${NC}"
echo -e "${GREEN}✅ [X/9] Step description${NC}"
echo -e "${RED}❌ [X/9] Step description — FAILED${NC}"
echo -e "${GRAY}   ℹ  Per-endpoint: {METHOD} {PATH}${NC}"
```

Summary block at STEP 9:

At STEP 9, output the following as **Claude text response**:

```
**🎉 API automation generated**

| | |
|---|---|
| **Task** | {TASK_ID} |
| **Endpoints** | {ENDPOINT_COUNT} |
| **Specs** | {SPEC_COUNT} files |
| **Output** | `./tests/playwright/tests/api/` |

→ **Next:** `/qakit:playwright:api-execute --task={TASK_ID}`
```

## Prerequisites

- Task exists: `./test-tasks/playwright/{task-id}/`
- Network capture exists: `./test-tasks/playwright/{task-id}/locators/*/network-calls.json`
- API test cases exist: `./test-tasks/playwright/{task-id}/test-cases/api/test-cases.md`
- Automation project initialized: `./tests/playwright/package.json`

## Step-by-Step Process

### STEP 1: Parse Input
Extract `--task=TASK-ID` (REQUIRED). If missing, ask user via AskUserQuestion.

### STEP 2: Validate Task
- Check task directory exists
- Check network capture files exist
- Check API test cases file exists
- List all endpoints from network capture

### STEP 3: Detect Automation Path
- Read `./test-tasks/playwright/qakit.config.json` for `automationPath`
- If not found, use default: `./tests/playwright/`
- Verify project initialized

### STEP 4: Parse Network Capture
For each `network-calls.json`:
- Extract endpoint inventory (method, path, count, avgDuration)
- Extract schema detection (requestSchema, responseSchema)
- Extract call sequences (integration flows)
- Extract performance data (minDuration, maxDuration, averageDuration)
- Store all endpoints (no filtering in default mode)

### STEP 5: Parse Test Cases
- Read `./test-tasks/playwright/{task-id}/test-cases/api/test-cases.md`
- Parse all test case sections:
  - Happy Path tests
  - Validation tests
  - Security tests
  - Performance tests
- Store all test cases (no filtering in default mode)

### STEP 6: Generate API Client Utility
Create/Update `{AUTOMATION_PATH}/utils/api-client.ts`:
- Load template from `assets/api-client.ts`
- Include: get, post, put, patch, delete methods
- Header management, timeout, error handling

### STEP 7: Generate Test Utilities
Create/Update:
- `utils/assertion-helpers.ts` - matchSchema, expectStatus, expectContentType, expectBodyPath
- `utils/auth-helpers.ts` - generateAuthToken, setAuthHeader, clearAuthHeaders
- `utils/test-data-generator.ts` - Valid, invalid, edge case, security payload generators

### STEP 8: Generate Test Data Fixtures
For each endpoint:
- Create `tests/fixtures/{endpoint-name}-request-data.json` with valid/invalid/edge case/security payloads
- Create `tests/fixtures/{endpoint-name}-response-schema.json` with JSON Schema
- Generate `tests/fixtures/test-data.ts` with typed exports

### STEP 9: Generate Test Specs
For each endpoint:
- Create `tests/api/{EndpointName}.spec.ts`
- Generate happy path tests (TC-API-XXX)
- Generate validation tests (TC-API-VAL-XXX)
- Generate security tests (TC-API-SEC-XXX)
- Generate performance tests (TC-API-PERF-XXX)
- Generate integration tests (TC-API-INT-XXX)

### STEP 10: Generate API Test Guide
Create `tests/api/README.md` with:
- Overview of API tests
- Test organization
- How to run tests
- Environment setup
- Adding new tests

### STEP 11: Update package.json
Add npm scripts:
- `test:api` - Run all API tests
- `test:api:happy-path` - Happy path only
- `test:api:validation` - Validation only
- `test:api:security` - Security only
- `test:api:performance` - Performance only
- `test:api:integration` - Integration only

### STEP 12: Update Fixtures Index
Create/Update `tests/fixtures/index.ts` with exports of all test data and schemas.

### STEP 13: Show Summary
Print results with endpoint count, test spec count, test case breakdown.

## Example Output

```
✅ Generated API test automation
📁 Output: ./tests/playwright/tests/api/
📊 Endpoints: 12
📄 Test Specs: 12 files
🧪 Test Cases: 145
   Happy Path: 50
   Validation: 35
   Security: 25
   Performance: 20
   Integration: 15
🔧 Utilities: api-client, assertion-helpers, auth-helpers, test-data-generator
📦 Fixtures: 12 endpoints
```

## Output Files Structure

```
./tests/playwright/
├── tests/api/
│   ├── CreateUser.spec.ts
│   ├── ListUsers.spec.ts
│   ├── UpdateUser.spec.ts
│   └── README.md
├── utils/
│   ├── api-client.ts
│   ├── assertion-helpers.ts
│   ├── auth-helpers.ts
│   └── test-data-generator.ts
└── fixtures/
    ├── create-user-request-data.json
    ├── create-user-response-schema.json
    ├── list-users-request-data.json
    ├── list-users-response-schema.json
    └── test-data.ts
```

## Related Documentation

[See: Network Capture Integration](../guides/network-capture-integration.md)
[See: Test Data Generation](../guides/test-data-generation.md)
[See: API Client Template](../formats/api-client-template.md)
[See: Test Spec Template](../formats/test-spec-template.md)
