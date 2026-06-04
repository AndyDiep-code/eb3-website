import { Page, Locator } from '@playwright/test';

/**
 * Base Page Object
 * 
 * Base class for all page objects with common methods.
 * All page objects should extend this class.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ============================================
  // NAVIGATION METHODS
  // ============================================

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async gotoUrl(baseUrl: string, path: string): Promise<void> {
    await this.page.goto(`${baseUrl}${path}`);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  // ============================================
  // ASSERTION HELPERS
  // ============================================

  async assertVisible(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }

  async assertHidden(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'hidden' });
  }

  async assertText(locator: Locator, text: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    const content = await locator.textContent();
    if (!content?.includes(text)) {
      throw new Error(`Expected text "${text}" not found in element`);
    }
  }

  async assertValue(locator: Locator, value: string): Promise<void> {
    const inputValue = await locator.inputValue();
    if (inputValue !== value) {
      throw new Error(`Expected value "${value}" but got "${inputValue}"`);
    }
  }

  // ============================================
  // SCREENSHOT METHODS
  // ============================================

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `test-results/${name}.png` });
  }

  async takeElementScreenshot(locator: Locator, name: string): Promise<void> {
    await locator.screenshot({ path: `test-results/${name}.png` });
  }

  // ============================================
  // UTILITY METHODS
  // ============================================

  async waitForElement(locator: Locator, timeout: number = 5000): Promise<void> {
    await locator.waitFor({ timeout });
  }

  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }
}
