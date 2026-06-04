# Test Execution Guide

Run generated tests with filtering and reporting.

## Overview

Execute generated test specs with various filtering options and generate Allure reports.

## Installation

### Prerequisites
```bash
# Install Node.js dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Running Tests

### Run All Tests
```bash
# Run all tests
npm test

# Run all tests in headed mode (see browser)
npm test -- --headed

# Run all tests in UI mode (interactive)
npm test -- --ui
```

### Run by Type Tag

**Smoke Tests** (quick sanity checks)
```bash
npm test -- --grep @smoke
```

**Regression Tests** (comprehensive testing)
```bash
npm test -- --grep @regression
```

**Critical Tests** (high priority)
```bash
npm test -- --grep @critical
```

### Run by Module Tag

**Authentication Module**
```bash
npm test -- --grep @auth
```

**Checkout Module**
```bash
npm test -- --grep @checkout
```

**Search Module**
```bash
npm test -- --grep @search
```

### Run by Task Tag

**Task 001**
```bash
npm test -- --grep @test-001
```

**Task 002**
```bash
npm test -- --grep @test-002
```

### Run by Page Tag

**LoginPage Tests**
```bash
npm test -- --grep @LoginPage
```

**DashboardPage Tests**
```bash
npm test -- --grep @DashboardPage
```

## Combining Tags

### AND Logic (All tags must match)
```bash
# Smoke tests in auth module
npm test -- --grep "@smoke.*@auth"

# Critical tests in checkout module
npm test -- --grep "@critical.*@checkout"
```

### OR Logic (Any tag can match)
```bash
# Smoke or critical tests
npm test -- --grep "@smoke|@critical"

# Auth or checkout modules
npm test -- --grep "@auth|@checkout"
```

## Excluding Tests

### Exclude by Tag
```bash
# Run all tests except smoke
npm test -- --grep "^(?!.*@smoke)"

# Run all tests except critical
npm test -- --grep "^(?!.*@critical)"
```

### Exclude by File
```bash
# Run all tests except LoginPage
npm test -- --ignore "**/LoginPage.spec.ts"
```

## Other Options

### Run in Specific Browser
```bash
# Run in Chrome
npm test -- --project=chromium

# Run in Firefox
npm test -- --project=firefox

# Run in Safari
npm test -- --project=webkit
```

### Run in Parallel
```bash
# Run tests in parallel (default)
npm test

# Run tests sequentially
npm test -- --workers=1
```

### Run with Specific Timeout
```bash
# Set timeout to 60 seconds
npm test -- --timeout=60000
```

### Run with Retries
```bash
# Retry failed tests 3 times
npm test -- --retries=3
```

### Run Specific Test File
```bash
# Run only LoginPage tests
npm test -- LoginPage.spec.ts

# Run only DashboardPage tests
npm test -- DashboardPage.spec.ts
```

### Run Specific Test
```bash
# Run specific test by name
npm test -- --grep "TC-001: Successful Login"
```

## Reporting

### Generate Allure Report
```bash
# Run tests and generate Allure report
npm test

# View Allure report
npx allure serve allure-results
```

### Report Features
- Test execution timeline
- Test results summary
- Failed test details
- Screenshots and logs
- Test history
- Trend analysis

### Allure Report Structure
```
allure-results/
├── test-results/
│   ├── TC-001.png (screenshot)
│   ├── TC-002.png (screenshot)
│   └── ...
├── allure-report/
│   ├── index.html
│   ├── data/
│   └── ...
```

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npx playwright install
      - run: npm test
      - uses: actions/upload-artifact@v2
        if: always()
        with:
          name: allure-results
          path: allure-results/
```

### GitLab CI Example
```yaml
test:
  image: mcr.microsoft.com/playwright:v1.40.0-focal
  script:
    - npm install
    - npm test
  artifacts:
    paths:
      - allure-results/
    reports:
      junit: allure-results/junit.xml
```

## Common Commands

### Quick Reference
```bash
# Run all tests
npm test

# Run smoke tests
npm test -- --grep @smoke

# Run auth module tests
npm test -- --grep @auth

# Run specific test file
npm test -- LoginPage.spec.ts

# Run in headed mode
npm test -- --headed

# Run in UI mode
npm test -- --ui

# View Allure report
npx allure serve allure-results

# Run with retries
npm test -- --retries=3

# Run sequentially
npm test -- --workers=1
```

## Debugging Failed Tests

### View Test Output
```bash
# Run with verbose output
npm test -- --reporter=verbose
```

### Debug Specific Test
```bash
# Run in debug mode
npx playwright test --debug

# Run specific test in debug mode
npx playwright test LoginPage.spec.ts --debug
```

### View Screenshots
Screenshots are automatically attached to failed tests in the Allure report.

### View Logs
Logs are available in the Allure report for each test.

## Best Practices

1. **Run smoke tests first**: Quick sanity checks before full suite
2. **Use tags effectively**: Organize tests by type, module, priority
3. **Run in parallel**: Faster execution (default behavior)
4. **Generate reports**: Always generate Allure reports for visibility
5. **Monitor trends**: Use Allure history to track test quality
6. **Exclude flaky tests**: Mark and investigate flaky tests
7. **Use retries wisely**: Retries can hide flaky tests
8. **Automate in CI/CD**: Run tests automatically on every commit

See: [AAA Pattern Guide](aaa-pattern.md)
