# Test Spec Template

Exact format for Test Spec generation.

## Overview

Test Specs contain executable test cases following the Arrange-Act-Assert pattern. This template shows the exact structure for generated Test Specs.

## Complete Template

```typescript
import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { {PageName} } from './{PageName}.page';

test.describe('{PageName}', () => {
  let {pageName}: {PageName};

  test.beforeEach(async ({ page }) => {
    {pageName} = new {PageName}(page);
    await allure.description('{PageName} test suite');
  });

  test('TC-XXX: Test Case Title', async ({ page }) => {
    // Add test metadata
    test.info().annotations.push(
      { type: 'priority', description: 'high' },
      { type: 'type', description: 'smoke' },
      { type: 'module', description: 'auth' }
    );

    // ARRANGE: Prepare preconditions
    await test.step('Step 1: Prepare', async () => {
      // Setup code
    });

    // ACT: Perform main action
    await test.step('Step 2: Action', async () => {
      // Action code
    });

    // ASSERT: Verify outcome
    await test.step('Step 3: Verify', async () => {
      // Assertion code
    });

    // Attach screenshot
    await page.screenshot({ path: 'test-results/tc-xxx.png' });
  });
});
```

## Imports

```typescript
// Required imports
import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

// Page Object imports
import { LoginPage } from './LoginPage.page';
import { DashboardPage } from './DashboardPage.page';
```

## Auth State Pattern (choose one)

### Pattern A: Login test suite (tests the login flow itself)
```typescript
// Override project storageState — must start unauthenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('{PageName}', () => {
  test.beforeEach(async ({ page }) => {
    {pageName} = new {PageName}(page);
    await allure.description('{PageName} test suite');
    // No login call here — these tests ARE the login flow
  });
});
```

### Pattern B: Post-auth test suite (tests features after login)
```typescript
// No storageState override — rely on .auth/state.json from auth.setup.ts

test.describe('{PageName}', () => {
  test.beforeEach(async ({ page }) => {
    {pageName} = new {PageName}(page);
    await allure.description('{PageName} test suite');
    await {pageName}.goto(); // Already authenticated — no login needed
  });
});
```

**Detection:** Use Pattern A when the page tests the login/sign-in flow. Use Pattern B for all other pages.

---

## Test Structure

### Test Describe Block
```typescript
test.describe('{PageName}', () => {
  // All tests for this page
});
```

### Test BeforeEach Hook
```typescript
test.beforeEach(async ({ page }) => {
  {pageName} = new {PageName}(page);
  await allure.description('{PageName} test suite');
});
```

### Test Definition
```typescript
test('TC-XXX: Test Case Title', async ({ page }) => {
  // Test implementation
});
```

## Test Metadata

### Annotations
```typescript
test.info().annotations.push(
  { type: 'priority', description: 'high' },
  { type: 'type', description: 'smoke' },
  { type: 'module', description: 'auth' }
);
```

### Tags
```typescript
test('TC-001: Successful Login', {
  tag: ['@smoke', '@auth', '@critical', '@test-001', '@LoginPage']
}, async ({ page }) => {
  // Test implementation
});
```

## Test Steps

### Using test.step()
```typescript
await test.step('Step description', async () => {
  // Step implementation
});
```

### Step Naming
- **Format**: Descriptive action name
- **Example**: "Fill login form", "Click login button", "Verify dashboard loads"
- **Rule**: Use business-level language, not technical details

## Assertions

### Common Assertions
```typescript
// Element visibility
await expect(element).toBeVisible();
await expect(element).toBeHidden();

// Text content
await expect(element).toContainText('text');
await expect(element).toHaveText('exact text');

// Input value
await expect(input).toHaveValue('value');

// Element state
await expect(element).toBeEnabled();
await expect(element).toBeDisabled();
await expect(element).toBeChecked();

// Page state
await expect(page).toHaveURL('/dashboard');
await expect(page).toHaveTitle('Dashboard');
```

## Screenshots

### Attach Screenshot
```typescript
await page.screenshot({ path: 'test-results/tc-001.png' });
```

### Attach Screenshot on Failure
```typescript
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    await page.screenshot({ path: `test-results/${testInfo.title}.png` });
  }
});
```

## Complete Example

```typescript
import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { LoginPage } from './LoginPage.page';
import { DashboardPage } from './DashboardPage.page';

test.describe('LoginPage', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await allure.description('Login test suite');
  });

  test('TC-001: Successful Login', {
    tag: ['@smoke', '@auth', '@critical', '@test-001', '@LoginPage']
  }, async ({ page }) => {
    test.info().annotations.push(
      { type: 'priority', description: 'high' },
      { type: 'type', description: 'smoke' },
      { type: 'module', description: 'auth' }
    );

    // ARRANGE: Prepare preconditions
    await test.step('Navigate to login page', async () => {
      await page.goto('/login');
      await expect(page).toHaveTitle(/Login/);
    });

    const testData = {
      username: 'user@example.com',
      password: 'password123'
    };

    // ACT: Perform main action
    await test.step('Fill username', async () => {
      await loginPage.fillUsername(testData.username);
      await expect(loginPage.usernameInput).toHaveValue(testData.username);
    });

    await test.step('Fill password', async () => {
      await loginPage.fillPassword(testData.password);
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLogin();
    });

    // ASSERT: Verify outcome
    await test.step('Verify dashboard loads', async () => {
      await expect(page).toHaveURL('/dashboard');
    });

    await test.step('Verify welcome message', async () => {
      await expect(dashboardPage.welcomeTitle).toContainText('Welcome');
    });

    await test.step('Verify user menu visible', async () => {
      await expect(dashboardPage.userMenu).toBeVisible();
    });

    // Attach screenshot
    await page.screenshot({ path: 'test-results/tc-001-success.png' });
  });

  test('TC-002: Login with Invalid Credentials', {
    tag: ['@regression', '@auth', '@test-001', '@LoginPage']
  }, async ({ page }) => {
    test.info().annotations.push(
      { type: 'priority', description: 'high' },
      { type: 'type', description: 'regression' },
      { type: 'module', description: 'auth' }
    );

    // ARRANGE
    await test.step('Navigate to login page', async () => {
      await page.goto('/login');
    });

    const testData = {
      username: 'invalid@example.com',
      password: 'wrongpassword'
    };

    // ACT
    await test.step('Fill login form with invalid credentials', async () => {
      await loginPage.fillUsername(testData.username);
      await loginPage.fillPassword(testData.password);
      await loginPage.clickLogin();
    });

    // ASSERT
    await test.step('Verify error message displayed', async () => {
      await expect(loginPage.errorMsg).toBeVisible();
      await expect(loginPage.errorMsg).toContainText('Invalid credentials');
    });

    await test.step('Verify still on login page', async () => {
      await expect(page).toHaveURL('/login');
    });

    await page.screenshot({ path: 'test-results/tc-002-error.png' });
  });

  test('TC-003: Remember Me Functionality', {
    tag: ['@regression', '@auth', '@test-001', '@LoginPage']
  }, async ({ page }) => {
    test.info().annotations.push(
      { type: 'priority', description: 'medium' },
      { type: 'type', description: 'regression' },
      { type: 'module', description: 'auth' }
    );

    // ARRANGE
    await test.step('Navigate to login page', async () => {
      await page.goto('/login');
    });

    const testData = {
      username: 'user@example.com',
      password: 'password123'
    };

    // ACT
    await test.step('Fill login form', async () => {
      await loginPage.fillUsername(testData.username);
      await loginPage.fillPassword(testData.password);
    });

    await test.step('Check remember me', async () => {
      await loginPage.checkRememberMe();
      await expect(loginPage.rememberMeCheckbox).toBeChecked();
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLogin();
    });

    // ASSERT
    await test.step('Verify dashboard loads', async () => {
      await expect(page).toHaveURL('/dashboard');
    });

    await test.step('Verify remember me was saved', async () => {
      // Verify cookie or local storage
      const cookies = await page.context().cookies();
      const rememberMeCookie = cookies.find(c => c.name === 'remember_me');
      expect(rememberMeCookie).toBeDefined();
    });

    await page.screenshot({ path: 'test-results/tc-003-remember.png' });
  });
});
```

## Visual Assertions

### Visual Regression Testing
```typescript
await test.step('Verify login form appearance', async () => {
});
```

### Full Page Screenshot
```typescript
await test.step('Verify dashboard layout', async () => {
});
```

## Best Practices

1. **Use test.step()**: Break down each section into steps
2. **Descriptive names**: Use clear, business-level step names
3. **One assertion focus**: Each test should verify one main thing
4. **Independent tests**: Don't depend on other tests
5. **Test data**: Extract test data to constants
6. **Screenshots**: Attach screenshots for debugging
7. **Metadata**: Add priority, type, module annotations
8. **Tags**: Use tags for filtering and reporting

See: [AAA Pattern Guide](../guides/aaa-pattern.md)
