import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { {PageName} } from './{PageName}.page';

/**
 * Test Spec Template
 * 
 * This is a template for generating Test Specs.
 * Replace {PageName} with actual page name.
 * Replace TC-XXX with actual test case ID.
 */
test.describe('{PageName}', () => {
  let {pageName}: {PageName};

  test.beforeEach(async ({ page }) => {
    {pageName} = new {PageName}(page);
    await allure.description('{PageName} test suite');
  });

  test('TC-XXX: Test Case Title', {
    tag: [
      '@smoke',           // Type tag
      '@module',          // Module tag
      '@critical',        // Priority tag
      '@test-001',        // Task tag
      '@{PageName}'       // Page tag
    ]
  }, async ({ page }) => {
    // Add test metadata
    test.info().annotations.push(
      { type: 'priority', description: 'high' },
      { type: 'type', description: 'smoke' },
      { type: 'module', description: 'module-name' }
    );

    // ARRANGE: Prepare preconditions
    await test.step('Step 1: Prepare', async () => {
      // Setup code
      // Example: await page.goto('/page-url');
    });

    // ACT: Perform main action
    await test.step('Step 2: Action', async () => {
      // Action code
      // Example: await {pageName}.clickButton();
    });

    // ASSERT: Verify outcome
    await test.step('Step 3: Verify', async () => {
      // Assertion code
      // Example: await expect(element).toBeVisible();
    });

    // Attach screenshot
    await page.screenshot({ path: 'test-results/tc-xxx.png' });
  });
});
