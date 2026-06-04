# Test Cases Format

Format for defining API test cases that will be used to generate test specs.

## File Location

```
./test-tasks/playwright/{task-id}/test-cases/api/test-cases.md
```

## Structure

Test cases are organized by type in markdown sections with tables.

### Happy Path Tests

```markdown
## Happy Path

| Test ID | Endpoint | Method | Expected Status | Description |
|---------|----------|--------|-----------------|-------------|
| TC-API-001 | /api/users | POST | 201 | Create user with valid data |
| TC-API-002 | /api/users | GET | 200 | List all users |
| TC-API-003 | /api/users/{id} | GET | 200 | Get user by ID |
| TC-API-004 | /api/users/{id} | PUT | 200 | Update user |
| TC-API-005 | /api/users/{id} | DELETE | 204 | Delete user |
```

**Fields:**
- `Test ID` - Unique identifier (TC-API-XXX)
- `Endpoint` - API endpoint path
- `Method` - HTTP method (GET, POST, PUT, PATCH, DELETE)
- `Expected Status` - Expected HTTP status code
- `Description` - What the test does

### Validation Tests

```markdown
## Validation

| Test ID | Endpoint | Method | Expected Status | Description |
|---------|----------|--------|-----------------|-------------|
| TC-API-VAL-001 | /api/users | POST | 400 | Reject missing email |
| TC-API-VAL-002 | /api/users | POST | 400 | Reject invalid email format |
| TC-API-VAL-003 | /api/users | POST | 400 | Reject short password |
| TC-API-VAL-004 | /api/users | POST | 400 | Reject empty name |
| TC-API-VAL-005 | /api/users/{id} | PUT | 400 | Reject invalid user ID |
```

### Security Tests

```markdown
## Security

| Test ID | Endpoint | Method | Expected Status | Description |
|---------|----------|--------|-----------------|-------------|
| TC-API-SEC-001 | /api/users | POST | 400 | Reject XSS in name field |
| TC-API-SEC-002 | /api/users | POST | 400 | Reject SQL injection in email |
| TC-API-SEC-003 | /api/users | POST | 400 | Reject command injection |
| TC-API-SEC-004 | /api/users/{id} | GET | 401 | Reject unauthorized access |
| TC-API-SEC-005 | /api/users/{id} | DELETE | 403 | Reject forbidden delete |
```

### Performance Tests

```markdown
## Performance

| Test ID | Endpoint | Method | Expected Status | Description |
|---------|----------|--------|-----------------|-------------|
| TC-API-PERF-001 | /api/users | POST | 201 | Create user in <500ms |
| TC-API-PERF-002 | /api/users | GET | 200 | List users in <250ms |
| TC-API-PERF-003 | /api/users/{id} | GET | 200 | Get user in <100ms |
| TC-API-PERF-004 | /api/users/{id} | PUT | 200 | Update user in <300ms |
| TC-API-PERF-005 | /api/users/{id} | DELETE | 204 | Delete user in <200ms |
```

### Integration Tests

```markdown
## Integration

| Test ID | Endpoint | Method | Expected Status | Description |
|---------|----------|--------|-----------------|-------------|
| TC-API-INT-001 | /api/users | POST | 201 | Create user then retrieve |
| TC-API-INT-002 | /api/users | POST | 201 | Create user, update, then delete |
| TC-API-INT-003 | /api/posts | POST | 201 | Create post with user reference |
```

## Complete Example

```markdown
# API Test Cases

## Happy Path

| Test ID | Endpoint | Method | Expected Status | Description |
|---------|----------|--------|-----------------|-------------|
| TC-API-001 | /api/users | POST | 201 | Create user with valid data |
| TC-API-002 | /api/users | GET | 200 | List all users |
| TC-API-003 | /api/users/{id} | GET | 200 | Get user by ID |
| TC-API-004 | /api/users/{id} | PUT | 200 | Update user |
| TC-API-005 | /api/users/{id} | DELETE | 204 | Delete user |

## Validation

| Test ID | Endpoint | Method | Expected Status | Description |
|---------|----------|--------|-----------------|-------------|
| TC-API-VAL-001 | /api/users | POST | 400 | Reject missing email |
| TC-API-VAL-002 | /api/users | POST | 400 | Reject invalid email format |
| TC-API-VAL-003 | /api/users | POST | 400 | Reject short password |
| TC-API-VAL-004 | /api/users | POST | 400 | Reject empty name |
| TC-API-VAL-005 | /api/users/{id} | PUT | 400 | Reject invalid user ID |

## Security

| Test ID | Endpoint | Method | Expected Status | Description |
|---------|----------|--------|-----------------|-------------|
| TC-API-SEC-001 | /api/users | POST | 400 | Reject XSS in name field |
| TC-API-SEC-002 | /api/users | POST | 400 | Reject SQL injection in email |
| TC-API-SEC-003 | /api/users | POST | 400 | Reject command injection |
| TC-API-SEC-004 | /api/users/{id} | GET | 401 | Reject unauthorized access |
| TC-API-SEC-005 | /api/users/{id} | DELETE | 403 | Reject forbidden delete |

## Performance

| Test ID | Endpoint | Method | Expected Status | Description |
|---------|----------|--------|-----------------|-------------|
| TC-API-PERF-001 | /api/users | POST | 201 | Create user in <500ms |
| TC-API-PERF-002 | /api/users | GET | 200 | List users in <250ms |
| TC-API-PERF-003 | /api/users/{id} | GET | 200 | Get user in <100ms |
| TC-API-PERF-004 | /api/users/{id} | PUT | 200 | Update user in <300ms |
| TC-API-PERF-005 | /api/users/{id} | DELETE | 204 | Delete user in <200ms |

## Integration

| Test ID | Endpoint | Method | Expected Status | Description |
|---------|----------|--------|-----------------|-------------|
| TC-API-INT-001 | /api/users | POST | 201 | Create user then retrieve |
| TC-API-INT-002 | /api/users | POST | 201 | Create user, update, then delete |
```

## Test ID Naming Convention

- **Happy Path**: `TC-API-XXX` (e.g., TC-API-001, TC-API-002)
- **Validation**: `TC-API-VAL-XXX` (e.g., TC-API-VAL-001, TC-API-VAL-002)
- **Security**: `TC-API-SEC-XXX` (e.g., TC-API-SEC-001, TC-API-SEC-002)
- **Performance**: `TC-API-PERF-XXX` (e.g., TC-API-PERF-001, TC-API-PERF-002)
- **Integration**: `TC-API-INT-XXX` (e.g., TC-API-INT-001, TC-API-INT-002)

## Best Practices

1. **One Test Per Row** - Each row is one test case
2. **Clear Descriptions** - Describe what the test validates
3. **Realistic Scenarios** - Base on actual user workflows
4. **Cover Edge Cases** - Include boundary conditions
5. **Security Focus** - Include common attack vectors
6. **Performance Baselines** - Set realistic performance expectations
7. **Integration Flows** - Include multi-step workflows

## Test Coverage Guidelines

- **Happy Path**: 70% of tests (valid inputs, expected success)
- **Validation**: 15% of tests (invalid inputs, required fields)
- **Security**: 10% of tests (XSS, SQL injection, auth)
- **Performance**: 5% of tests (response time assertions)
- **Integration**: Bonus (multi-step flows)

## Filtering

When running generation command, you can filter by test type:

```bash
# Generate only happy path tests
/qakit:playwright:automate-api-refactored --task=test-api --type=happy-path

# Generate only validation tests
/qakit:playwright:automate-api-refactored --task=test-api --type=validation

# Generate only security tests
/qakit:playwright:automate-api-refactored --task=test-api --type=security

# Generate only performance tests
/qakit:playwright:automate-api-refactored --task=test-api --type=performance

# Generate all tests (default)
/qakit:playwright:automate-api-refactored --task=test-api --type=all
```

## Validation

Test cases should:
- ✅ Have unique Test IDs
- ✅ Have valid endpoints
- ✅ Have valid HTTP methods
- ✅ Have valid status codes (100-599)
- ✅ Have clear descriptions
- ✅ Be organized by type
- ✅ Follow naming convention
