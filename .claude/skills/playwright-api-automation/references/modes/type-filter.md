# TYPE FILTER MODE - Generate Tests of Specific Type

Generate tests for a specific test type only.

## Overview

This mode filters test cases to only include a specific test type, then generates tests for those cases only. Useful for focusing on specific testing concerns like security or performance.

## Terminal Output Standards

```bash
CYAN='\033[1;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
RED='\033[0;31m'; GRAY='\033[0;90m'; WHITE='\033[1;37m'; NC='\033[0m'
```

Header: `API Automate — Type Filter`. Step pattern `[X/13]`. At STEP 13, output the following as **Claude text response**:

```
**🎉 API automation generated (type filter)**

| | |
|---|---|
| **Task** | {TASK_ID} |
| **Type** | {TEST_TYPE} |
| **Endpoints** | {ENDPOINT_COUNT} |
| **Output** | `./tests/playwright/tests/api/` |

→ **Next:** `/qakit:playwright:api-execute --task={TASK_ID}`
```

## Test Types

- **happy-path** (70%) - Valid inputs, expected success responses
- **validation** (15%) - Invalid inputs, required fields, data types
- **security** (10%) - XSS, SQL injection, authentication, authorization
- **performance** (5%) - Response time assertions from captured baselines
- **all** (default) - All test types

## Prerequisites

- Task exists: `./test-tasks/playwright/{task-id}/`
- Network capture exists: `./test-tasks/playwright/{task-id}/locators/*/network-calls.json`
- API test cases exist: `./test-tasks/playwright/{task-id}/test-cases/api/test-cases.md`
- Automation project initialized: `./tests/playwright/package.json`

## Step-by-Step Process

### STEP 1: Parse Input
Extract `--task=TASK-ID` (REQUIRED) and `--type=TYPE` (REQUIRED for this mode).

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
- Extract all endpoints
- Extract schema detection, call sequences, performance data
- Store all endpoints (no filtering)

### STEP 5: Parse Test Cases
- Read `./test-tasks/playwright/{task-id}/test-cases/api/test-cases.md`
- Parse test case sections:
  - `## Happy Path` - Extract if type=happy-path
  - `## Validation` - Extract if type=validation
  - `## Security` - Extract if type=security
  - `## Performance` - Extract if type=performance
- **FILTER by test type** - Keep only matching type
- Store filtered test cases

### STEP 6-12: Generate Files
Same as default mode, but only for filtered test cases.

### STEP 13: Show Summary
Print results with filtered test case count.

## Example: Generate Only Security Tests

Command:
```bash
/qakit:playwright:automate-api-refactored --task=test-api-001 --type=security
```

Output:
```
✅ Generated API test automation (type filter: security)
📁 Output: ./tests/playwright/tests/api/
📊 Endpoints: 12
📄 Test Specs: 12 files
🧪 Test Cases: 30 (security only)
   Happy Path: 0
   Validation: 0
   Security: 30
   Performance: 0
   Integration: 0
```

Generated test specs will only include security tests:
- TC-API-SEC-001: Should reject XSS payload in name field
- TC-API-SEC-002: Should reject SQL injection in email field
- TC-API-SEC-003: Should reject unauthorized access
- etc.

## Example: Generate Only Validation Tests

Command:
```bash
/qakit:playwright:automate-api-refactored --task=test-api-001 --type=validation
```

Generated test specs will only include validation tests:
- TC-API-VAL-001: Should return 400 when email is missing
- TC-API-VAL-002: Should return 400 when password is too short
- TC-API-VAL-003: Should return 400 when email format is invalid
- etc.

## Example: Generate Only Performance Tests

Command:
```bash
/qakit:playwright:automate-api-refactored --task=test-api-001 --type=performance
```

Generated test specs will only include performance tests:
- TC-API-PERF-001: POST /api/users should respond in <500ms
- TC-API-PERF-002: GET /api/users should respond in <200ms
- TC-API-PERF-003: PUT /api/users/{id} should respond in <300ms
- etc.

## Output Files Structure

```
./tests/playwright/
├── tests/api/
│   ├── CreateUser.spec.ts (security tests only)
│   ├── ListUsers.spec.ts (security tests only)
│   ├── UpdateUser.spec.ts (security tests only)
│   └── README.md
├── utils/
│   ├── api-client.ts
│   ├── assertion-helpers.ts
│   ├── auth-helpers.ts
│   └── test-data-generator.ts
└── fixtures/
    ├── create-user-request-data.json
    ├── create-user-response-schema.json
    └── test-data.ts
```

## Related Documentation

[See: Test Data Generation](../guides/test-data-generation.md)
[See: Test Spec Template](../formats/test-spec-template.md)
