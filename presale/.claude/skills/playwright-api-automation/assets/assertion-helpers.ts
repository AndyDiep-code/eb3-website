import { APIResponse, expect } from '@playwright/test';
import Ajv from 'ajv';

const ajv = new Ajv();

export interface JsonSchema {
  type?: string;
  required?: string[];
  properties?: Record<string, any>;
  items?: any;
  [key: string]: any;
}

export async function matchSchema(
  response: APIResponse,
  schema: JsonSchema
): Promise<boolean> {
  const body = await response.json();
  const validate = ajv.compile(schema);
  const isValid = validate(body);
  
  if (!isValid) {
    throw new Error(
      `Response does not match schema. Errors: ${JSON.stringify(validate.errors)}`
    );
  }
  
  return isValid;
}

export function expectStatus(
  response: APIResponse,
  expectedStatus: number
): void {
  const actual = response.status();
  expect(actual).toBe(expectedStatus);
}

export function expectHeader(
  response: APIResponse,
  headerName: string,
  expectedValue: string
): void {
  const actual = response.headers()[headerName.toLowerCase()];
  expect(actual).toBe(expectedValue);
}

export function expectContentType(
  response: APIResponse,
  contentType: string
): void {
  const actual = response.headers()['content-type'] || '';
  expect(actual).toContain(contentType);
}

export async function expectBodyPath(
  response: APIResponse,
  path: string,
  expectedValue: any
): Promise<void> {
  const body = await response.json();
  const actual = getNestedValue(body, path);
  expect(actual).toEqual(expectedValue);
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}
