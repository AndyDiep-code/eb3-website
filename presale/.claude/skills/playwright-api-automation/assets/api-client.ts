import { APIRequestContext, APIResponse } from '@playwright/test';

export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body: any,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  constructor(
    private request: APIRequestContext,
    baseURL: string = process.env.API_BASE_URL || 'http://localhost:3000'
  ) {
    this.baseURL = baseURL;
  }

  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  clearAuthToken(): void {
    delete this.defaultHeaders['Authorization'];
  }

  async get(
    endpoint: string,
    options?: RequestOptions
  ): Promise<APIResponse> {
    const response = await this.request.get(
      `${this.baseURL}${endpoint}`,
      {
        headers: { ...this.defaultHeaders, ...options?.headers },
        timeout: options?.timeout || 30000,
      }
    );
    return response;
  }

  async post(
    endpoint: string,
    data: any,
    options?: RequestOptions
  ): Promise<APIResponse> {
    const response = await this.request.post(
      `${this.baseURL}${endpoint}`,
      {
        data,
        headers: { ...this.defaultHeaders, ...options?.headers },
        timeout: options?.timeout || 30000,
      }
    );
    return response;
  }

  async put(
    endpoint: string,
    data: any,
    options?: RequestOptions
  ): Promise<APIResponse> {
    const response = await this.request.put(
      `${this.baseURL}${endpoint}`,
      {
        data,
        headers: { ...this.defaultHeaders, ...options?.headers },
        timeout: options?.timeout || 30000,
      }
    );
    return response;
  }

  async patch(
    endpoint: string,
    data: any,
    options?: RequestOptions
  ): Promise<APIResponse> {
    const response = await this.request.patch(
      `${this.baseURL}${endpoint}`,
      {
        data,
        headers: { ...this.defaultHeaders, ...options?.headers },
        timeout: options?.timeout || 30000,
      }
    );
    return response;
  }

  async delete(
    endpoint: string,
    options?: RequestOptions
  ): Promise<APIResponse> {
    const response = await this.request.delete(
      `${this.baseURL}${endpoint}`,
      {
        headers: { ...this.defaultHeaders, ...options?.headers },
        timeout: options?.timeout || 30000,
      }
    );
    return response;
  }
}
