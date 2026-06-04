# Tag System

Test tagging system for filtering and reporting.

## Overview

Tests are automatically tagged with multiple categories for filtering and reporting:
- **Type**: smoke, regression, critical
- **Priority**: critical, normal, minor
- **Module**: auth, checkout, search, etc.
- **Task**: test-001, test-002, etc.
- **Page**: LoginPage, DashboardPage, etc.

## Tag Categories

### Type Tags
Categorize tests by execution scope:

| Tag | Description | Use Case |
|-----|-------------|----------|
| @smoke | Quick sanity checks | Run before full suite |
| @regression | Comprehensive testing | Run on every commit |
| @critical | High priority tests | Run in CI/CD |

### Priority Tags
Categorize tests by business priority:

| Tag | Description | Severity |
|-----|-------------|----------|
| @critical | High priority | Must pass |
| @normal | Medium priority | Should pass |
| @minor | Low priority | Nice to pass |

### Module Tags
Categorize tests by feature module:

| Tag | Description | Example |
|-----|-------------|---------|
| @auth | Authentication module | Login, logout, password reset |
| @checkout | Checkout module | Cart, payment, order |
| @search | Search module | Search, filters, results |
| @profile | Profile module | User profile, settings |
| @dashboard | Dashboard module | Dashboard, widgets |

### Task Tags
Categorize tests by task ID:

| Tag | Description | Example |
|-----|-------------|---------|
| @test-001 | Task 001 | All tests for task 001 |
| @test-002 | Task 002 | All tests for task 002 |
| @test-003 | Task 003 | All tests for task 003 |

### Page Tags
Categorize tests by page:

| Tag | Description | Example |
|-----|-------------|---------|
| @LoginPage | LoginPage tests | All tests for LoginPage |
| @DashboardPage | DashboardPage tests | All tests for DashboardPage |
| @CheckoutPage | CheckoutPage tests | All tests for CheckoutPage |

## Auto-Generated Tags

Tags are automatically generated from test metadata:

```typescript
test('TC-001: Successful Login', {
  tag: [
    '@smoke',           // From Type field
    '@auth',            // From Module field
    '@critical',        // From Priority field
    '@test-001',        // From Task ID
    '@LoginPage'        // From Page name
  ]
}, async ({ page }) => {
  // Test implementation
});
```

## Tag Generation Rules

### From Type Field
```
Type: smoke → @smoke
Type: regression → @regression
Type: critical → @critical
```

### From Priority Field
```
Priority: High → @critical
Priority: Medium → @normal
Priority: Low → @minor
```

### From Module Field
```
Module: auth → @auth
Module: checkout → @checkout
Module: search → @search
```

### From Task ID
```
Task: test-001 → @test-001
Task: test-002 → @test-002
```

### From Page Name
```
Page: LoginPage → @LoginPage
Page: DashboardPage → @DashboardPage
```

## Running Tests by Tag

### Run by Type
```bash
# Run smoke tests
npm test -- --grep @smoke

# Run regression tests
npm test -- --grep @regression

# Run critical tests
npm test -- --grep @critical
```

### Run by Priority
```bash
# Run critical priority tests
npm test -- --grep @critical

# Run normal priority tests
npm test -- --grep @normal

# Run minor priority tests
npm test -- --grep @minor
```

### Run by Module
```bash
# Run auth module tests
npm test -- --grep @auth

# Run checkout module tests
npm test -- --grep @checkout

# Run search module tests
npm test -- --grep @search
```

### Run by Task
```bash
# Run task 001 tests
npm test -- --grep @test-001

# Run task 002 tests
npm test -- --grep @test-002
```

### Run by Page
```bash
# Run LoginPage tests
npm test -- --grep @LoginPage

# Run DashboardPage tests
npm test -- --grep @DashboardPage
```

## Combining Tags

### AND Logic (All tags must match)
```bash
# Smoke tests in auth module
npm test -- --grep "@smoke.*@auth"

# Critical tests in checkout module
npm test -- --grep "@critical.*@checkout"

# Regression tests for task 001
npm test -- --grep "@regression.*@test-001"
```

### OR Logic (Any tag can match)
```bash
# Smoke or critical tests
npm test -- --grep "@smoke|@critical"

# Auth or checkout modules
npm test -- --grep "@auth|@checkout"

# LoginPage or DashboardPage tests
npm test -- --grep "@LoginPage|@DashboardPage"
```

## Excluding Tests

### Exclude by Tag
```bash
# Run all tests except smoke
npm test -- --grep "^(?!.*@smoke)"

# Run all tests except critical
npm test -- --grep "^(?!.*@critical)"

# Run all tests except minor
npm test -- --grep "^(?!.*@minor)"
```

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Test Suite

on: [push, pull_request]

jobs:
  smoke-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm test -- --grep @smoke

  regression-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm test -- --grep @regression

  critical-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm test -- --grep @critical
```

### GitLab CI Example
```yaml
smoke-tests:
  script:
    - npm install
    - npm test -- --grep @smoke

regression-tests:
  script:
    - npm install
    - npm test -- --grep @regression

critical-tests:
  script:
    - npm install
    - npm test -- --grep @critical
```

## Common Tag Combinations

### Quick Sanity Check
```bash
# Run smoke tests only
npm test -- --grep @smoke
```

### Pre-Commit Check
```bash
# Run critical tests
npm test -- --grep @critical
```

### Full Regression
```bash
# Run all regression tests
npm test -- --grep @regression
```

### Module Testing
```bash
# Run all auth module tests
npm test -- --grep @auth

# Run all checkout module tests
npm test -- --grep @checkout
```

### Task Testing
```bash
# Run all tests for task 001
npm test -- --grep @test-001

# Run all tests for task 002
npm test -- --grep @test-002
```

## Best Practices

1. **Use consistent tags**: Follow the tag naming conventions
2. **Tag all tests**: Every test should have at least 5 tags
3. **Use meaningful tags**: Tags should describe the test purpose
4. **Organize by module**: Group related tests with module tags
5. **Track priority**: Use priority tags for test execution order
6. **Filter in CI/CD**: Use tags to run appropriate tests in CI/CD
7. **Monitor trends**: Use tags to track test quality over time
8. **Document tags**: Keep tag documentation up to date

## Tag Reference

### All Available Tags

**Type Tags**
- @smoke
- @regression
- @critical

**Priority Tags**
- @critical
- @normal
- @minor

**Module Tags**
- @auth
- @checkout
- @search
- @profile
- @dashboard
- (custom modules)

**Task Tags**
- @test-001
- @test-002
- @test-003
- (custom tasks)

**Page Tags**
- @LoginPage
- @DashboardPage
- @CheckoutPage
- (custom pages)

See: [Test Execution Guide](../guides/test-execution.md)
