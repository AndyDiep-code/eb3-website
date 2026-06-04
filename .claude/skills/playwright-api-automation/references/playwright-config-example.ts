import { defineConfig, devices } from '@playwright/test';

/**
 * Example Playwright configuration for API testing
 * 
 * This config is optimized for API test automation with:
 * - Allure reporting
 * - Multiple browser support
 * - Parallel execution
 * - Retry logic
 * - Custom timeouts
 */

export default defineConfig({
  testDir: './tests',
  
  // Test execution settings
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Reporting
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['allure-playwright'],
  ],
  
  // Global settings
  use: {
    // Base URL for API requests
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000',
    
    // Request timeout
    httpCredentials: undefined,
    
    // Trace settings
    trace: 'on-first-retry',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Video on failure
    video: 'retain-on-failure',
  },
  
  // Global timeout settings
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  
  // Projects for different scenarios
  projects: [
    {
      name: 'api-tests',
      testMatch: '**/api/**/*.spec.ts',
      use: {
        // API-specific settings
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      },
    },
    
    {
      name: 'api-tests-auth',
      testMatch: '**/api/**/*.spec.ts',
      use: {
        // With authentication
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${process.env.AUTH_TOKEN || ''}`,
        },
      },
    },
  ],
  
  // Web server configuration (if needed)
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
