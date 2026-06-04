import { test, expect } from '@playwright/test';
import * as allure from 'allure-playwright';
import { ApiClient } from '../../utils/api-client';
import { testData } from '../fixtures/test-data';

test.describe('{ENDPOINT_NAME} - {METHOD}', () => {
  let apiClient: ApiClient;

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiClient(request);
    allure.epic('@API');
    allure.feature('@{RESOURCE}');
  });

  // Happy Path Tests
  test('TC-API-001: Should {action} with valid data (happy path)', async () => {
    allure.story('@{RESOURCE}Management');
    allure.severity('critical');
    allure.tags('smoke', 'regression');

    const payload = testData.{endpoint}.valid;
    const response = await apiClient.{method}('{endpoint}', payload);

    expect(response.status()).toBe({expectedStatus});
    const body = await response.json();
    expect(body).toMatchObject({
      id: expect.any(Number),
      createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T/),
    });
  });

  // Validation Tests
  test('TC-API-VAL-001: Should return 400 when required field is missing (validation)', async () => {
    allure.story('@InputValidation');
    allure.severity('high');
    allure.tags('regression');

    const invalidData = testData.{endpoint}.invalid.missingRequired;
    const response = await apiClient.{method}('{endpoint}', invalidData);

    expect(response.status()).toBe(400);
    const error = await response.json();
    expect(error.message).toMatch(/required|missing/i);
  });

  // Security Tests
  test('TC-API-SEC-001: Should reject XSS payload (security)', async () => {
    allure.story('@SecurityValidation');
    allure.severity('critical');
    allure.tags('security');

    const maliciousData = testData.{endpoint}.security.xssPayload;
    const response = await apiClient.{method}('{endpoint}', maliciousData);

    expect(response.status()).toBeLessThanOrEqual(400);
    const error = await response.json();
    expect(error.message).toMatch(/validation|sanitization|not allowed/i);
  });

  // Performance Tests
  test('TC-API-PERF-001: {METHOD} {endpoint} should respond in <{threshold}ms', async () => {
    allure.story('@PerformanceBaseline');
    allure.severity('medium');

    const payload = testData.{endpoint}.valid;
    const startTime = Date.now();
    const response = await apiClient.{method}('{endpoint}', payload);
    const duration = Date.now() - startTime;

    expect(duration).toBeLessThan({threshold});
    expect(response.status()).toBe({expectedStatus});
  });
});
