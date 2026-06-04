# Playwright API Automation Skill

Generates comprehensive API test automation from network capture data and test case definitions.

## Overview

This skill implements the complete logic for generating Playwright API test specs, utilities, fixtures, and documentation from:
- **Network capture data** - Real API interactions with 4 enhancements
- **Test case definitions** - Organized by test type (happy path, validation, security, performance)

## What It Does

Transforms network capture data and test cases into:
- ✅ API test specs (one per endpoint)
- ✅ API client utility with request builder
- ✅ Test fixtures (request/response data)
- ✅ Assertion helpers & test data generators
- ✅ npm scripts for running tests by type
- ✅ Comprehensive test documentation

## Quick Start

```bash
# Generate all test types
/qakit:playwright:automate-api-refactored --task=test-api

# Generate only happy path tests
/qakit:playwright:automate-api-refactored --task=test-api --type=happy-path

# Filter specific endpoint
/qakit:playwright:automate-api-refactored --task=test-api --endpoint=/api/users
```

## Architecture

### Command
- **File**: `automate-api-refactored.md`
- **Purpose**: Light entry point (30 lines)
- **Content**: Description, arguments, quick start examples

### Skill
- **File**: `SKILL.md`
- **Purpose**: Implementation (400+ lines)
- **Content**: 13-step generation logic

### Assets
Code templates for generation:
- `api-client.ts` - Base API client
- `assertion-helpers.ts` - Custom assertions
- `auth-helpers.ts` - Auth utilities
- `test-data-generator.ts` - Data generators
- `test.spec.template.ts` - Test spec template
- `README.template.md` - Documentation template

### References
Documentation and schemas:
- `network-capture-format.md` - Network capture schema
- `test-cases-format.md` - Test cases format
- `playwright-config-example.ts` - Config example

## Implementation Steps

1. **Parse Input** - Extract and validate command arguments
2. **Validate Task** - Check prerequisites (network capture, test cases)
3. **Detect Path** - Find automation project path
4. **Parse Network** - Extract endpoints, schemas, sequences, performance
5. **Parse Test Cases** - Extract test cases by type
6. **Generate API Client** - Create request builder utility
7. **Generate Utilities** - Create assertion, auth, data generator helpers
8. **Generate Fixtures** - Create test data and schemas
9. **Generate Specs** - Create test specs per endpoint
10. **Generate Guide** - Create API test documentation
11. **Update package.json** - Add npm scripts
12. **Update Fixtures Index** - Export all test data
13. **Show Summary** - Display results and next steps

## Test Coverage

Generated tests cover:
- **Happy Path** (70%) - Valid inputs, expected success
- **Validation** (15%) - Invalid inputs, required fields
- **Security** (10%) - XSS, SQL injection, auth
- **Performance** (5%) - Response time assertions
- **Integration** (bonus) - Multi-step flows

## Network Capture Format

Expected 4 enhancements in `network-calls.json`:

1. **Endpoint Inventory** - Grouped by resource
2. **Schema Detection** - Request/response models
3. **Call Sequences** - Integration flows
4. **Performance Timing** - Baseline assertions

See `references/network-capture-format.md` for details.

## Test Cases Format

Test cases organized by type in markdown:

```markdown
## Happy Path
| Test ID | Endpoint | Method | Expected Status | Description |

## Validation
| Test ID | Endpoint | Method | Expected Status | Description |

## Security
| Test ID | Endpoint | Method | Expected Status | Description |

## Performance
| Test ID | Endpoint | Method | Expected Status | Description |
```

See `references/test-cases-format.md` for details.

## Generated Output

```
./tests/playwright/
├── tests/api/
│   ├── {EndpointName}.spec.ts
│   ├── fixtures/
│   │   ├── {endpoint}-request-data.json
│   │   ├── {endpoint}-response-schema.json
│   │   └── test-data.ts
│   ├── utils/
│   │   ├── api-client.ts
│   │   ├── assertion-helpers.ts
│   │   ├── auth-helpers.ts
│   │   └── test-data-generator.ts
│   └── README.md
├── package.json (updated with npm scripts)
└── playwright.config.ts
```

## Usage Examples

### Run all API tests
```bash
npm test -- api/
```

### Run by test type
```bash
npm run test:api:happy-path
npm run test:api:validation
npm run test:api:security
npm run test:api:performance
```

### Run by endpoint
```bash
npm run test:api:users
npm run test:api:posts
```

## API Client Usage

```typescript
import { ApiClient } from './utils/api-client';

test('example', async ({ request }) => {
  const apiClient = new ApiClient(request);
  
  // Set auth token
  apiClient.setAuthToken('your-token');
  
  // Make requests
  const response = await apiClient.post('/api/users', { name: 'John' });
  
  // Check response
  expect(response.status()).toBe(201);
});
```

## Assertion Helpers

```typescript
import { 
  matchSchema, 
  expectStatus, 
  expectHeader,
  expectContentType,
  expectBodyPath 
} from './utils/assertion-helpers';

// Validate response matches schema
await matchSchema(response, userSchema);

// Assert HTTP status
expectStatus(response, 200);

// Assert header value
expectHeader(response, 'content-type', 'application/json');

// Assert JSON path value
await expectBodyPath(response, 'user.id', 123);
```

## Test Data Generation

```typescript
import { TestDataGenerator } from './utils/test-data-generator';

// Generate valid data
const validData = TestDataGenerator.generateValidData(schema);

// Generate invalid data
const invalidData = TestDataGenerator.generateMissingRequired(schema, 'email');

// Generate edge cases
const edgeCases = TestDataGenerator.generateEdgeCases(schema);

// Generate security payloads
const securityPayloads = TestDataGenerator.generateSecurityPayloads(schema);
```

## Prerequisites

- Task with network capture: `./test-tasks/playwright/{task-id}/locators/*/network-calls.json`
- API test cases: `./test-tasks/playwright/{task-id}/test-cases/api/test-cases.md`
- Playwright project initialized: `./tests/playwright/`

## Error Handling

The skill validates:
- ✅ Task exists
- ✅ Network capture files exist
- ✅ Test cases defined
- ✅ Playwright project initialized
- ✅ Valid arguments

If validation fails, provides helpful error messages and suggests fixes.

## Performance Baselines

Performance thresholds are based on captured network data:

```json
{
  "/api/users": {
    "p95": 250,
    "p99": 500
  }
}
```

Tests assert response times are within these baselines.

## Allure Reporting

All tests include Allure metadata:
- Epic: @API
- Feature: @{Resource}
- Story: @{Action}
- Severity: critical, high, medium, low

View Allure report:
```bash
npm test -- api/ --reporter=allure
allure serve allure-results
```

## Best Practices

1. **Capture Real Traffic** - Use actual user interactions
2. **Include All Endpoints** - Capture all API endpoints
3. **Multiple Calls** - Capture multiple calls for accurate performance data
4. **Include Error Cases** - Capture error responses
5. **Extract Response Data** - Use extractPath to link related calls
6. **Accurate Schemas** - Ensure schemas match actual structure
7. **Performance Baselines** - Capture realistic performance data

## Support

For issues or questions:
1. Check test logs: `npm test -- api/ --debug`
2. Review test data: `tests/api/fixtures/test-data.ts`
3. Check references: `references/`
4. Review generated specs: `tests/api/{EndpointName}.spec.ts`

## Files

- `SKILL.md` - Main skill implementation (13 steps)
- `assets/` - Code templates
- `references/` - Documentation and schemas
- `README.md` - This file
