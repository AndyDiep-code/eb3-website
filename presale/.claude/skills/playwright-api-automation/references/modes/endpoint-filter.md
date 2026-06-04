# ENDPOINT FILTER MODE - Generate Tests for Specific Endpoints

Generate tests for endpoints matching a specific pattern only.

## Overview

This mode filters the network capture to only include endpoints matching the provided pattern, then generates tests for those endpoints only. All POMs and utilities are still generated for all endpoints.

## Terminal Output Standards

```bash
CYAN='\033[1;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
RED='\033[0;31m'; GRAY='\033[0;90m'; WHITE='\033[1;37m'; NC='\033[0m'
```

Header: `API Automate — Endpoint Filter`. Step pattern `[X/13]`. At STEP 13, output the following as **Claude text response**:

```
**🎉 API automation generated (endpoint filter)**

| | |
|---|---|
| **Task** | {TASK_ID} |
| **Filter** | `{ENDPOINT_PATTERN}` |
| **Matched** | {MATCHED_COUNT} endpoints |
| **Output** | `./tests/playwright/tests/api/` |

→ **Next:** `/qakit:playwright:api-execute --task={TASK_ID}`
```

## Endpoint Pattern Syntax

- `/api/users/*` - All user endpoints
- `/api/auth/*` - All auth endpoints
- `POST /api/users` - Specific method + path
- `GET /api/users/{id}` - With path parameters
- `/api/payment/*/confirm` - Wildcard in middle

## Prerequisites

- Task exists: `./test-tasks/playwright/{task-id}/`
- Network capture exists: `./test-tasks/playwright/{task-id}/locators/*/network-calls.json`
- API test cases exist: `./test-tasks/playwright/{task-id}/test-cases/api/test-cases.md`
- Automation project initialized: `./tests/playwright/package.json`

## Step-by-Step Process

### STEP 1: Parse Input
Extract `--task=TASK-ID` (REQUIRED) and `--endpoint=PATTERN` (REQUIRED for this mode).

### STEP 2: Validate Task
- Check task directory exists
- Check network capture files exist
- Check API test cases file exist
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
- Parse all test case sections
- Store all test cases (no filtering - will be matched to endpoints in STEP 9)

### STEP 6-12: Generate Files
Same as default mode, but only for filtered endpoints.

### STEP 13: Show Summary
Print results with filtered endpoint count.

## Example Patterns and Results

### Pattern: `/api/users/*`
Matches:
- `POST /api/users` - Create user
- `GET /api/users` - List users
- `GET /api/users/{id}` - Get user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

Does NOT match:
- `POST /api/auth/login`
- `GET /api/products`

### Pattern: `POST /api/auth/*`
Matches:
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/refresh`

Does NOT match:
- `GET /api/auth/me`
- `POST /api/users`

### Pattern: `GET /api/users/{id}`
Matches:
- `GET /api/users/{id}` - Exact match

Does NOT match:
- `GET /api/users` - Different path
- `POST /api/users/{id}` - Different method

## Output Files Structure

```
./tests/playwright/
├── tests/api/
│   ├── CreateUser.spec.ts (generated - matches pattern)
│   ├── ListUsers.spec.ts (generated - matches pattern)
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

## Example Output

```
✅ Generated API test automation (endpoint filter)
📁 Output: ./tests/playwright/tests/api/
📊 Endpoints: 5 (filtered from 12)
📄 Test Specs: 5 files
🧪 Test Cases: 45
   Happy Path: 15
   Validation: 12
   Security: 10
   Performance: 5
   Integration: 3
```

## Related Documentation

[See: Network Capture Integration](../guides/network-capture-integration.md)
[See: API Client Template](../formats/api-client-template.md)
