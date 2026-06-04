import * as jwt from 'jsonwebtoken';

export interface AuthCredentials {
  username?: string;
  email?: string;
  password: string;
  [key: string]: any;
}

export interface AuthToken {
  token: string;
  type: 'Bearer' | 'Basic' | 'Custom';
  expiresIn?: number;
}

/**
 * Generate a JWT auth token for testing
 */
export function generateAuthToken(
  credentials: AuthCredentials,
  secret: string = 'test-secret',
  expiresIn: string = '1h'
): AuthToken {
  const payload = {
    sub: credentials.email || credentials.username,
    ...credentials,
  };

  const token = jwt.sign(payload, secret, { expiresIn });

  return {
    token,
    type: 'Bearer',
    expiresIn: 3600, // 1 hour in seconds
  };
}

/**
 * Generate Basic auth header value
 */
export function generateBasicAuth(username: string, password: string): string {
  const credentials = `${username}:${password}`;
  const encoded = Buffer.from(credentials).toString('base64');
  return `Basic ${encoded}`;
}

/**
 * Set auth header in headers object
 */
export function setAuthHeader(
  headers: Record<string, string>,
  token: string,
  type: string = 'Bearer'
): Record<string, string> {
  return {
    ...headers,
    Authorization: `${type} ${token}`,
  };
}

/**
 * Clear auth headers from headers object
 */
export function clearAuthHeaders(
  headers: Record<string, string>
): Record<string, string> {
  const { Authorization, ...rest } = headers;
  return rest;
}

/**
 * Verify JWT token
 */
export function verifyAuthToken(
  token: string,
  secret: string = 'test-secret'
): any {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error(`Invalid token: ${error}`);
  }
}
