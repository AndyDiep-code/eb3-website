import { test as base, Page } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.page';
import { DashboardPage } from './pages/DashboardPage.page';

/**
 * Fixtures Template
 * 
 * Define custom fixtures for page objects and test data.
 * Extend this template with your page objects.
 */

type TestFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  testData: {
    validUsername: string;
    validPassword: string;
    invalidUsername: string;
    invalidPassword: string;
  };
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  testData: async ({}, use) => {
    const testData = {
      validUsername: 'user@example.com',
      validPassword: 'password123',
      invalidUsername: 'invalid@example.com',
      invalidPassword: 'wrongpassword'
    };
    await use(testData);
  }
});

export { expect } from '@playwright/test';
