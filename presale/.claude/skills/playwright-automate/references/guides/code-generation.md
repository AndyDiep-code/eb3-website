# Code Generation Guide

Generate Test Specs from promoted test cases using existing Page Objects.

## Overview

The code generation process converts manual test documentation into executable TypeScript code:
- **Page Objects**: Generated from `locators.md` - Element locators with action methods
- **Test Specs**: Generated from `test-cases.md` - Test cases with step-by-step execution
- **Test Data**: Generated from `test-data.json` - Typed test data for tests
- **Fixtures**: Updated with page object registrations for test execution

## Page Object Generation

### Input Format

Page Objects are generated from `locators.md` markdown tables:

```markdown
## LoginPage

| Name | Ref | Role | Selector | Description |
|------|-----|------|----------|-------------|
| Username Input | username | textbox | input[name="username"] | Username field |
| Password Input | password | textbox | input[name="password"] | Password field |
| Login Button | loginBtn | button | button:has-text("Login") | Login submit button |
| Error Message | errorMsg | status | .error-message | Error message display |
```

### Generation Rules

1. **Class Name**: Page name (e.g., `LoginPage`)
2. **File Name**: `{PageName}.page.ts`
3. **Element Properties**: Convert Name to camelCase (e.g., `Username Input` → `usernameInput`)
4. **Locator**: Use Selector column
5. **Methods**: Generate based on Role column

### Role to Method Mapping

| Role | Methods Generated |
|------|-------------------|
| textbox | `fill()`, `clear()`, `getValue()` |
| button | `click()`, `isEnabled()`, `isVisible()` |
| checkbox | `check()`, `uncheck()`, `isChecked()` |
| radio | `select()`, `isSelected()` |
| combobox | `selectOption()`, `getSelectedOption()` |
| status | `getText()`, `isVisible()` |
| link | `click()`, `navigate()` |
| heading | `getText()`, `isVisible()` |

### Example Output

```typescript
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly errorMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginBtn = page.locator('button:has-text("Login")');
    this.errorMsg = page.locator('.error-message');
  }

  async fillUsername(value: string) {
    await this.usernameInput.fill(value);
  }

  async fillPassword(value: string) {
    await this.passwordInput.fill(value);
  }

  async clickLogin() {
    await this.loginBtn.click();
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMsg.textContent() || '';
  }

  async isErrorVisible(): Promise<boolean> {
    return await this.errorMsg.isVisible();
  }
}
```

See: [Page Object Template](../formats/page-object-template.md)

## Test Spec Generation

### Input Format

Test Specs are generated from `test-cases.md` markdown sections:

```markdown
## TC-001: Successful Login

| Field | Value |
|-------|-------|
| Priority | High |
| Type | smoke |
| Module | auth |

### Test Steps

| Step | Action | Element | Value | Expected Result |
|------|--------|---------|-------|-----------------|
| 1 | Navigate | - | /login | Login page loads |
| 2 | Fill | Username Input | user@example.com | Field filled |
| 3 | Fill | Password Input | password123 | Field filled |
| 4 | Click | Login Button | - | Dashboard page loads |
| 5 | Assert | Dashboard Title | - | "Welcome" visible |
```

### Generation Rules

1. **Test Name**: TC-XXX: Title (e.g., `Successful Login`)
2. **File Name**: `{PageName}.spec.ts`
3. **Tags**: Generated from Priority, Type, Module, Task
4. **Steps**: Each row becomes a `test.step()`
5. **Assertions**: Mapped to Playwright assertions
6. **AAA Pattern**: Arrange (setup) → Act (main action) → Assert (verify)

### Example Output

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

  test('TC-001: Successful Login', async ({ page }) => {
    test.info().annotations.push(
      { type: 'priority', description: 'high' },
      { type: 'type', description: 'smoke' },
      { type: 'module', description: 'auth' }
    );

    // Arrange
    await test.step('Navigate to login page', async () => {
      await page.goto('/login');
      await expect(page).toHaveTitle(/Login/);
    });

    // Act
    await test.step('Fill username', async () => {
      await loginPage.fillUsername('user@example.com');
    });

    await test.step('Fill password', async () => {
      await loginPage.fillPassword('password123');
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLogin();
    });

    // Assert
    await test.step('Verify dashboard loads', async () => {
      await expect(dashboardPage.welcomeTitle).toContainText('Welcome');
    });

    await page.screenshot({ path: 'test-results/tc-001.png' });
  });
});
```

See: [Test Spec Template](../formats/test-spec-template.md)

## Naming Conventions

### Page Objects
- **Class Name**: PascalCase (e.g., `LoginPage`, `DashboardPage`)
- **File Name**: `{PageName}.page.ts`
- **Properties**: camelCase (e.g., `usernameInput`, `loginBtn`)
- **Methods**: camelCase with verb prefix (e.g., `fillUsername()`, `clickLogin()`)

### Test Specs
- **File Name**: `{PageName}.spec.ts`
- **Test Name**: `TC-XXX: Title` (e.g., `TC-001: Successful Login`)
- **Test Steps**: Descriptive action names (e.g., `Fill username`, `Click login button`)

### Test Data
- **File Name**: `test-data-{task-id}.ts` (isolated per task — e.g., `test-data-test-login.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `VALID_USERNAME`, `INVALID_PASSWORD`)

## Flutter Web (CanvasKit) — Special Rules

When the locators.md or feature.md indicates the app is **Flutter Web (CanvasKit renderer)**, apply these rules:

### 1. Never use `locator('img')` for Flutter image elements

Flutter CanvasKit renders images directly on canvas — no `<img>` HTML elements exist in the DOM.

```typescript
// ❌ WRONG — will always timeout for Flutter canvas images
readonly logoImage: Locator = page.locator('img').first();

// ✅ SKIP — remove image locators from POM for Flutter apps
// Logo visibility is validated via screenshot only, not DOM assertion
```

**Rule:** If a locator in locators.md has role `img` and the app is Flutter Web, **do not generate `toBeVisible()` assertions for it** in test specs. Annotate with a comment instead.

### 2. Call enableFlutterAccessibility() in goto()

All Flutter Web page objects must override `goto()` and call `enableFlutterAccessibility()` after `networkidle`:

```typescript
override async goto(url = 'https://app.example.com/'): Promise<void> {
  await this.page.goto(url);
  await this.page.waitForLoadState('networkidle');
  await this.enableFlutterAccessibility(); // inherited from BasePage
}
```

### 3. Use role/text selectors, not CSS/XPath

Flutter semantic overlay exposes ARIA roles. Always prefer:

```typescript
// ✅ Works with Flutter accessibility overlay
page.getByRole('button', { name: 'Login with Microsoft' })
page.getByText('Welcome to Enoverse!')

// ❌ Won't work — no DOM structure in Flutter CanvasKit
page.locator('.btn-login')
page.locator('div.welcome-text')
```

### 4. Skip image assertions in test specs

When generating test specs for Flutter pages, skip `toBeVisible()` assertions for `img` role elements:

```typescript
// ✅ Correct — comment out, explain why
// Note: Flutter CanvasKit renders logos on canvas — no <img> DOM elements.
// Logo visibility is validated via screenshot attachment only.

// ✅ Assert functional elements instead
await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
await expect(page.getByText('Welcome!')).toBeVisible();
```

### 5. getByText for Flutter stat/count elements

Flutter Web renders stat groups (e.g. `"Total request 1"`, `"Pending 0"`) as **separate label + number ARIA elements**:

```yaml
# Flutter ARIA — label and number are SEPARATE elements
- generic: Total request   ← label
- generic: 1               ← number (different element!)
```

When generating locators or assertions for Flutter stat elements:

```typescript
// ❌ WRONG — no single element contains "Total request 1"
page.getByText(/Total request \d/)   // regex won't match
page.getByText('Total request 1')    // exact match won't find element

// ✅ CORRECT — target label element only (strip the number)
page.getByText('Total request')
page.getByText('Pending')
page.getByText('In Office')

// ✅ To assert the COUNT specifically, use containsText on parent
await expect(page.getByText('Pending')).toBeVisible();
await expect(page.getByText('Pending').locator('..').getByText('0')).toBeVisible();
```

**Rule:** For Flutter stat/count locators — use label text only, never `label + number` in one locator.

### 6. Re-enable accessibility after in-test page.goto()

When a test case step navigates with `page.goto()` directly (not via POM's `goto()`), Flutter accessibility overlay is reset. Must re-enable:

```typescript
// ❌ WRONG — accessibility overlay lost after raw page.goto()
await page.goto('/app/home');
await homePage.homeTabButton.waitFor({ state: 'visible' }); // will timeout

// ✅ CORRECT — use POM's goto() which re-enables accessibility
await homePage.goto();

// ✅ ALTERNATIVE — if raw timing is needed (e.g. performance tests)
await page.goto('/app/home');
await page.waitForLoadState('networkidle');
await (homePage as any).enableFlutterAccessibility();
await homePage.homeTabButton.waitFor({ state: 'visible' });
```

**Rule:** When generating test specs for Flutter Web:
- Prefer `pom.goto()` over `page.goto()` in test body steps
- If raw `page.goto()` is intentional (e.g. performance measurement, unauthenticated redirect), follow with `enableFlutterAccessibility()` call before any Flutter element interaction
- Exception: if the test expects a redirect to a non-Flutter page (e.g. login page HTML), no re-enable needed

### Detection: How to identify Flutter Web

The app is Flutter Web if locators.md or metadata.json contains:
- `Framework: Flutter Web (CanvasKit renderer)`
- ARIA snapshot has `flt-glass-pane` or `flt-semantics` elements
- Elements have refs like `[ref=e7]` from `playwright-cli snapshot`

---

## Auth State in Test Specs

When generating test specs, determine which auth pattern to apply based on what the page tests.

### Detection Rules

| Signal | Auth Pattern |
|--------|-------------|
| Page POM has `login*` / `signIn*` / `authenticate*` methods | Login test suite |
| Test case titles contain "login", "sign in", "sign out", "authenticate" | Login test suite |
| Module is `auth` AND tests cover the sign-in flow itself | Login test suite |
| All other pages (dashboard, profile, settings, etc.) | Post-auth test suite |

### Login Test Suite Pattern

Tests that verify the login flow must start **unauthenticated** — override the project storageState to empty:

```typescript
// ✅ Add at top of describe block — before test.describe()
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('LoginPage', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    // No loginWithMicrosoft() here — these tests ARE the login flow
  });
  // ...
});
```

**Why:** The project-level `storageState` from `auth.setup.ts` would skip the login page entirely. Login tests need a fresh unauthenticated browser.

### Post-Auth Test Suite Pattern

Tests that verify features AFTER login rely on `auth.setup.ts` — **do NOT** override storageState and do NOT call login methods in `beforeEach`:

```typescript
// ✅ No test.use() override — use project storageState from auth.setup.ts

test.describe('DashboardPage', () => {
  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    // auth.setup.ts already ran — just navigate
    await dashboardPage.goto();
  });
  // ...
});
```

**Why:** `auth.setup.ts` runs once and caches `.auth/state.json`. All post-login tests reuse that session — no login steps needed per test.

### ❌ Anti-Pattern: loginWithMicrosoft() in beforeEach

Never call `loginWithMicrosoft()` (or any login method) inside `beforeEach` of post-auth tests. This is redundant when `auth.setup.ts` is configured.

```typescript
// ❌ WRONG — redundant, slow, runs login for every test
test.beforeEach(async ({ page }) => {
  await loginPage.loginWithMicrosoft(email, password); // Remove this
  await dashboardPage.goto();
});

// ✅ CORRECT — auth.setup.ts handles this once
test.beforeEach(async ({ page }) => {
  await dashboardPage.goto(); // Already authenticated
});
```

---

## User Behavior Navigation Rule

**CRITICAL:** Generated specs MUST simulate real user behavior. Never use `page.goto(url)` to navigate to a non-entry-point page.

### Page Classification Table

This is the authoritative classification for the Enoverse app. Use this when generating any spec or POM.

| Page | Entry Point? | URL | Navigation to reach |
|------|-------------|-----|---------------------|
| `LoginWithMicrosoftPage` | ✅ Yes | `/login` | `loginPage.goto()` |
| `HomePage` | ✅ Yes | `/` | `homePage.goto()` |
| `NotificationPage` | ❌ No | `/notifications` | `homePage.notificationsTabButton.click()` |
| `SettingsPage` | ❌ No | `/settings` | `homePage.settingsTabButton.click()` |
| `AttendancePage` | ❌ No | `/app/attendance` | `homePage.attendanceAppCard.click()` |
| `ApprovalRequestsPage` | ❌ No | `/app/attendance` (tab) | AttendancePage → `approvalRequestsTab.click()` |
| `RelevantRequestPage` | ❌ No | `/app/attendance` (tab) | AttendancePage → `relevantRequestsTab.click()` |
| `CreateNewRequestRemotePage` | ❌ No | `/app/attendance/remote-upsert` | AttendancePage → banner button click |

**Detection rule for new pages:** If page URL starts with `/app/` or is a sub-path → navigation-only. If URL is `/` or `/login` → entry point.

### Entry Point vs Navigation-Only Pages

| Page Type | `goto()` | How to reach in tests |
|-----------|---------|----------------------|
| **Entry point** (login, home) | Uses `page.goto(url)` | Call `pom.goto()` |
| **Navigation-only** (attendance, notifications, settings) | Uses nav chain via `navigateTo()` | Call `pom.navigateTo()` OR click nav element |

**Detection:** A page is an entry point if users can reach it by typing a URL directly. All other pages must be reached via navigation.

### beforeEach Pattern for Non-Entry Pages

```typescript
// ❌ WRONG — bypasses Flutter router, skips user flow
test.beforeEach(async ({ page }) => {
  attendancePage = new AttendancePage(page);
  await page.goto('/app/attendance');  // NEVER DO THIS for nav-only pages
});

// ✅ CORRECT — simulate user navigating from home
test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  attendancePage = new AttendancePage(page);
  await homePage.goto();                              // entry point ✓
  await homePage.notificationsTabButton.click();      // user clicks nav
  // OR use navigateTo() if POM provides it:
  await attendancePage.navigateTo();                  // chains through home
});
```

### In-Test Navigation

```typescript
// ❌ WRONG — never navigate via URL mid-test for non-entry pages
await page.goto('/app/attendance');
await page.goto('/notifications');

// ✅ CORRECT — user clicks nav elements
await homePage.notificationsTabButton.click();
await attendancePage.attendanceAppCard.click();
await page.getByRole('tab', { name: 'Approval requests' }).click();
```

### navigateTo() Pattern in POMs

When generating or updating POMs for navigation-only pages, add `navigateTo()`:

```typescript
/** Navigate from HomePage via bottom nav — simulates user behavior */
async navigateTo(): Promise<void> {
  const homePage = new HomePage(this.page);
  await homePage.goto();
  await homePage.notificationsTabButton.click();
  await this.notificationsHeading.waitFor({ state: 'visible' });
  await this.enableFlutterAccessibility();
}
```

---

## Thin POM Rule — When to use POM methods vs direct locators

**POM method** (wrap in a named method on the Page Object):
- Actions with **≥2 steps** that belong together (e.g., `markAllAsRead()` = click button + confirm dialog)
- **Complex flows** with error handling or waits (e.g., `loginWithMicrosoft()`)
- Actions with **business meaning** used in multiple tests

**Direct locator** (use POM locator property directly in spec):
- **Single clicks** for navigation (e.g., `homePage.settingsTabButton.click()`)
- **Single fill/check** actions
- Actions done **once inline** with no reuse

```typescript
// ✅ POM method — multi-step, reused, has business meaning
await notificationPage.markAllAsRead();  // click button + confirm dialog

// ✅ Direct locator — single click, navigation action
await notificationPage.homeTabButton.click();
await homePage.notificationsTabButton.click();
```

The Page Object ALWAYS owns the locator. The spec decides whether to call it directly or through a method.

---

## Best Practices

1. **One Page Object per page**: Each page gets its own file
2. **Extend BasePage**: Always `extends BasePage` — inherits `enableFlutterAccessibility()`
3. **Descriptive element names**: Use clear names that describe the element's purpose
4. **Action methods**: Create methods for **multi-step or complex actions only** (thin POM rule above)
5. **Assertion methods**: Create methods for common assertions (isVisible, getText)
6. **Test data**: Extract test data to constants for reusability
7. **AAA Pattern**: Always follow Arrange-Act-Assert structure
8. **Step descriptions**: Use clear, business-level descriptions for test steps
9. **Screenshots**: Attach screenshots for debugging failed tests
10. **TypeScript check**: Run `tsc --noEmit` after generating all files — fix all errors before reporting done
11. **Auth state**: Login test suites → `test.use({ storageState: {} })`. Post-auth suites → no override, no login in beforeEach

See: [AAA Pattern Guide](aaa-pattern.md)
