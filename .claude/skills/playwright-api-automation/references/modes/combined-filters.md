# COMBINED FILTERS - Generate Tests with Both Filters

Generate tests matching both endpoint pattern AND test type filters.

## Overview

This mode combines endpoint pattern filtering with test type filtering. Only endpoints matching the pattern AND test cases matching the type are generated.

## Terminal Output Standards

```bash
CYAN='\033[1;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
RED='\033[0;31m'; GRAY='\033[0;90m'; WHITE='\033[1;37m'; NC='\033[0m'
```

Header: `API Automate — Combined Filters`. Step pattern `[X/13]`. At STEP 13, output the following as **Claude text response**:

```
**🎉 API automation generated (combined filters)**

| | |
|---|---|
| **Task** | {TASK_ID} |
| **Endpoint** | `{ENDPOINT_PATTERN}` |
| **Type** | {TEST_TYPE} |
| **Matched** | {MATCHED_COUNT} endpoints |
| **Output** | `./tests/playwright/tests/api/` |

→ **Next:** `/qakit:playwright:api-execute --task={TASK_ID}`
```

## How Filters Combine

AND logic: `(endpoint matches pattern) AND (test type matches filter)`

Example:
- `--endpoint=/api/users/* --type=security`
- Generates: Security tests for all user endpoints only
- Does NOT generate: Happy path tests, validation tests, or tests for other endpoints

## Prerequisites

- Task exists: `./test-tasks/playwright/{task-id}/`
- Network capture exists: `./test-tasks/playwright/{task-id}/locators/*/network-calls.json`
- API test cases exist: `./test-tasks/playwright/{task-id}/test-cases/api/test-cases.md`
- Automation project initialized: `./tests/playwright/package.json`

## Step-by-Step Process

### STEP 1: Parse Input
Extract:
- `--task=TASK-ID` (REQUIRED)
- `--endpoint=PATTERN` (REQUIRED for this mode)
- `--type=TYPE` (REQUIRED for this mode)

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
- **FILTER by endpoint pattern** - Keep only matching endpoints
- Extract schema detection, call sequences, performance data
- Store filtered endpoints

### STEP 5: Parse Test Cases
- Read `./test-tasks/playwright/{task-id}/test-cases/api/test-cases.md`
- Parse test case sections
- **FILTER by test type** - Keep only matching type
- Store filtered test cases

### STEP 6-12: Generate Files
Same as default mode, but only for:
- Endpoints matching the pattern
- Test cases matching the type

### STEP 13: Show Summary
Print results with both filters applied.

## Examples

### Example 1: Security Tests for User Endpoints

Command:
```bash
/qakit:playwright:automate-api-refactored --task=test-api-001 \
  --endpoint=/api/users/* --type=security
```

Generates:
- Security tests for: CreateUser, ListUsers, GetUser, UpdateUser, DeleteUser
- Does NOT generate: Happy path, validation, performance tests
- Does NOT generate: Tests for /api/auth/*, /api/products/*, etc.

Output:
```
✅ Generated API test automation (combined filters)
📁 Output: ./tests/playwright/tests/api/
📊 Endpoints: 5 (filtered from 12)
📄 Test Specs: 5 files
🧪 Test Cases: 15 (security only)
   Happy Path: 0
   Validation: 0
   Security: 15
   Performance: 0
   Integration: 0
```

### Example 2: Validation Tests for Auth Endpoints

Command:
```bash
/qakit:playwright:automate-api-refactored --task=test-api-001 \
  --endpoint=POST /api/auth/* --type=validation
```

Generates:
- Validation tests for: Login, Logout, Refresh
- Does NOT generate: Happy path, security, performance tests
- Does NOT generate: Tests for /api/users/*, /api/products/*, etc.

Output:
```
✅ Generated API test automation (combined filters)
📁 Output: ./tests/playwright/tests/api/
📊 Endpoints: 3 (filtered from 12)
📄 Test Specs: 3 files
🧪 Test Cases: 12 (validation only)
   Happy Path: 0
   Validation: 12
   Security: 0
   Performance: 0
   Integration: 0
```

### Example 3: Performance Tests for Payment Endpoints

Command:
```bash
/qakit:playwright:automate-api-refactored --task=test-api-001 \
  --endpoint=/api/payment/* --type=performance
```

Generates:
- Performance tests for: CreatePayment, ProcessPayment, RefundPayment
- Does NOT generate: Happy path, validation, security tests
- Does NOT generate: Tests for other endpoints

Output:
```
✅ Generated API test automation (combined filters)
📁 Output: ./tests/playwright/tests/api/
📊 Endpoints: 3 (filtered from 12)
📄 Test Specs: 3 files
🧪 Test Cases: 6 (performance only)
   Happy Path: 0
   Validation: 0
   Security: 0
   Performance: 6
   Integration: 0
```

## Output Files Structure

```
./tests/playwright/
├── tests/api/
│   ├── CreateUser.spec.ts (security tests only)
│   ├── ListUsers.spec.ts (security tests only)
│   ├── GetUser.spec.ts (security tests only)
│   ├── UpdateUser.spec.ts (security tests only)
│   ├── DeleteUser.spec.ts (security tests only)
│   └── README.md
├── utils/
│   ├── api-client.ts
│   ├── assertion-helpers.ts
│   ├── auth-helpers.ts
│   └── test-data-generator.ts
└── fixtures/
    ├── create-user-request-data.json
    ├── list-users-request-data.json
    └── test-data.ts
```

## Related Documentation

[See: Network Capture Integration](../guides/network-capture-integration.md)
[See: Test Data Generation](../guides/test-data-generation.md)
[See: Test Spec Template](../formats/test-spec-template.md)
