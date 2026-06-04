import { Page, Locator } from '@playwright/test';

/**
 * Page Object Template
 * 
 * This is a template for generating Page Objects.
 * Replace {PageName} with actual page name.
 * Replace {elementName} with actual element names.
 */
export class {PageName} {
  readonly page: Page;

  // ============================================
  // LOCATORS
  // ============================================

  readonly {elementName1}: Locator;
  readonly {elementName2}: Locator;
  readonly {elementName3}: Locator;

  // ============================================
  // CONSTRUCTOR
  // ============================================

  constructor(page: Page) {
    this.page = page;
    this.{elementName1} = page.locator('{selector1}');
    this.{elementName2} = page.locator('{selector2}');
    this.{elementName3} = page.locator('{selector3}');
  }

  // ============================================
  // ACTION METHODS
  // ============================================

  // {ElementName1} - textbox
  async fill{ElementName1}(value: string): Promise<void> {
    await this.{elementName1}.fill(value);
  }

  async clear{ElementName1}(): Promise<void> {
    await this.{elementName1}.clear();
  }

  async get{ElementName1}Value(): Promise<string | null> {
    return await this.{elementName1}.inputValue();
  }

  // {ElementName2} - button
  async click{ElementName2}(): Promise<void> {
    await this.{elementName2}.click();
  }

  async is{ElementName2}Enabled(): Promise<boolean> {
    return await this.{elementName2}.isEnabled();
  }

  // {ElementName3} - checkbox
  async check{ElementName3}(): Promise<void> {
    await this.{elementName3}.check();
  }

  async uncheck{ElementName3}(): Promise<void> {
    await this.{elementName3}.uncheck();
  }

  async is{ElementName3}Checked(): Promise<boolean> {
    return await this.{elementName3}.isChecked();
  }

  // ============================================
  // ASSERTION METHODS
  // ============================================

  async is{ElementName1}Visible(): Promise<boolean> {
    return await this.{elementName1}.isVisible();
  }

  async is{ElementName2}Visible(): Promise<boolean> {
    return await this.{elementName2}.isVisible();
  }

  async get{ElementName3}Text(): Promise<string> {
    return await this.{elementName3}.textContent() || '';
  }
}
