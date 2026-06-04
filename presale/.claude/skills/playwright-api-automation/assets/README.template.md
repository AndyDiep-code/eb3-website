# API Test Suite

Auto-generated API test automation from network capture data.

## Overview

This test suite provides comprehensive API testing coverage including:
- **Happy Path Tests** - Valid inputs, expected success responses
- **Validation Tests** - Invalid inputs, required fields, data types
- **Security Tests** - XSS, SQL injection, authentication checks
- **Performance Tests** - Response time assertions
- **Integration Tests** - Multi-step API flows

## Test Organization

```
tests/api/
├── {EndpointName}.spec.ts    # Test specs per endpoint
├── fixtures/
│   ├── {endpoint}-request-data.json      # Request payloads
│   ├── {endpoint}-response-schema.json   # Response schemas
│   └── test-data.ts                      # Typed test data
├── utils/
│   ├── api-client.ts          # API request client
│   ├── assertion-helpers.ts   # Custom assertions
│   ├── auth-helpers.ts        # Authentication utilities
│   └── test-data-generator.ts # Data generators
└── README.md                  # This file
```

## Running Tests

### Run all API tests
```bash
npm test -- api/
```

### Run by test type
```bash
# Happy path tests only
npm run test:api:happy-path

# Validation tests only
npm run test:api:validation

# Security tests only
npm run test:api:security

# Performance tests only
npm run test:api:performance

# Integration tests only
npm run test:api:integration
```

### Run by endpoint
```bash
# Tests for specific endpoint
npm run test:api:users
npm run test:api:posts
```

### Run with filters
```bash
# Run specific test file
npm test -- api/Users.spec.ts

# Run tests matching pattern
npm test -- api/ -g "happy-path"

# Run with specific reporter
npm test -- api/ --reporter=html
```

## Environment Setup

Create `.env` file in project root:

```env
API_BASE_URL=http://localhost:3000
API_TIMEOUT=30000
AUTH_TOKEN=your-test-token
```

Or use `.env.example` as template:
```bash
cp .env.example .env
```

## Test Data

Test data is organized by endpoint and test type:

```typescript
import { testData } from './fixtures/test-data';

// Valid data
testData.users.valid

// Invalid data
testData.users.invalid.missingRequired
testData.users.invalid.wrongType

// Edge cases
testData.users.edgeCases.emptyString
testData.users.edgeCases.maxLength

// Security payloads
testData.users.security.xssPayload
testData.users.security.sqlInjection
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
  const body = await response.json();
  expect(body.id).toBeDefined();
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

// Assert content type
expectContentType(response, 'application/json');

// Assert JSON path value
await expectBodyPath(response, 'user.id', 123);
```

## Adding New API Tests

1. **Add test case to test-cases.md**
   ```markdown
   | TC-API-002 | /api/users | POST | 201 | Create user with email |
   ```

2. **Run generation command**
   ```bash
   /qakit:playwright:automate-api-refactored --task=test-api
   ```

3. **Tests are auto-generated** in `{EndpointName}.spec.ts`

## Adding New Endpoints

1. **Capture network traffic** for new endpoint
2. **Update network-calls.json** with new endpoint data
3. **Define test cases** in test-cases.md
4. **Run generation command** to generate tests

## Test Naming Convention

- **Happy Path**: `TC-API-XXX` (e.g., TC-API-001)
- **Validation**: `TC-API-VAL-XXX` (e.g., TC-API-VAL-001)
- **Security**: `TC-API-SEC-XXX` (e.g., TC-API-SEC-001)
- **Performance**: `TC-API-PERF-XXX` (e.g., TC-API-PERF-001)
- **Integration**: `TC-API-INT-XXX` (e.g., TC-API-INT-001)

## Debugging Tests

### View network requests
```bash
npm test -- api/ --debug
```

### Generate trace for failed test
```bash
npm test -- api/ --trace on
```

### View test report
```bash
npm test -- api/ --reporter=html
open playwright-report/index.html
```

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

## Troubleshooting

### Tests fail with "API_BASE_URL not set"
- Create `.env` file with `API_BASE_URL=http://localhost:3000`

### Tests fail with authentication errors
- Verify `AUTH_TOKEN` in `.env`
- Check token expiration
- Regenerate token if needed

### Performance tests timeout
- Check API server performance
- Increase timeout in `.env` if needed
- Review performance baselines

## CI/CD Integration

### GitHub Actions
```yaml
- name: Run API tests
  run: npm run test:api
```

### GitLab CI
```yaml
test:api:
  script:
    - npm run test:api
```

## Reports

Test results are reported with Allure metadata:
- Epic: @API
- Feature: @{Resource}
- Story: @{Action}
- Severity: critical, high, medium, low

View Allure report:
```bash
npm test -- api/ --reporter=allure
allure serve allure-results
```

## Support

For issues or questions:
1. Check test logs: `npm test -- api/ --debug`
2. Review test data: `tests/api/fixtures/test-data.ts`
3. Check API documentation: `references/`
