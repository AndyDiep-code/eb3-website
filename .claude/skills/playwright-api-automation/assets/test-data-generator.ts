/**
 * Test Data Generator
 * Generates valid, invalid, and security test payloads for API testing
 */

export interface TestDataSet {
  valid: any;
  invalid: Record<string, any>;
  edgeCases: Record<string, any>;
  security: Record<string, any>;
}

export class TestDataGenerator {
  /**
   * Generate valid test data from schema
   */
  static generateValidData(schema: any): any {
    const data: any = {};

    if (schema.properties) {
      for (const [key, prop] of Object.entries(schema.properties)) {
        data[key] = this.generateValueForType(prop as any);
      }
    }

    return data;
  }

  /**
   * Generate invalid test data (missing required fields)
   */
  static generateMissingRequired(schema: any, fieldToOmit: string): any {
    const data = this.generateValidData(schema);
    delete data[fieldToOmit];
    return data;
  }

  /**
   * Generate invalid test data (wrong type)
   */
  static generateWrongType(schema: any, field: string, wrongType: string): any {
    const data = this.generateValidData(schema);
    
    switch (wrongType) {
      case 'string':
        data[field] = 'not-a-number';
        break;
      case 'number':
        data[field] = 'not-a-number';
        break;
      case 'boolean':
        data[field] = 'not-a-boolean';
        break;
      case 'array':
        data[field] = 'not-an-array';
        break;
      case 'object':
        data[field] = 'not-an-object';
        break;
      default:
        data[field] = null;
    }

    return data;
  }

  /**
   * Generate edge case test data
   */
  static generateEdgeCases(schema: any): Record<string, any> {
    return {
      emptyString: this.generateWithEmptyStrings(schema),
      maxLength: this.generateWithMaxLength(schema),
      minValue: this.generateWithMinValue(schema),
      maxValue: this.generateWithMaxValue(schema),
      nullValues: this.generateWithNullValues(schema),
      specialCharacters: this.generateWithSpecialCharacters(schema),
    };
  }

  /**
   * Generate security test payloads
   */
  static generateSecurityPayloads(schema: any): Record<string, any> {
    return {
      xssPayload: this.generateXSSPayload(schema),
      sqlInjection: this.generateSQLInjectionPayload(schema),
      commandInjection: this.generateCommandInjectionPayload(schema),
      pathTraversal: this.generatePathTraversalPayload(schema),
      xmlInjection: this.generateXMLInjectionPayload(schema),
    };
  }

  /**
   * Generate complete test data set
   */
  static generateTestDataSet(schema: any): TestDataSet {
    return {
      valid: this.generateValidData(schema),
      invalid: {
        missingRequired: this.generateMissingRequired(schema, Object.keys(schema.properties || {})[0]),
        wrongType: this.generateWrongType(schema, Object.keys(schema.properties || {})[0], 'string'),
      },
      edgeCases: this.generateEdgeCases(schema),
      security: this.generateSecurityPayloads(schema),
    };
  }

  // Private helper methods

  private static generateValueForType(prop: any): any {
    switch (prop.type) {
      case 'string':
        return prop.format === 'email' ? 'test@example.com' : 'test-value';
      case 'number':
        return 42;
      case 'integer':
        return 1;
      case 'boolean':
        return true;
      case 'array':
        return [];
      case 'object':
        return {};
      default:
        return null;
    }
  }

  private static generateWithEmptyStrings(schema: any): any {
    const data: any = {};
    if (schema.properties) {
      for (const key of Object.keys(schema.properties)) {
        data[key] = '';
      }
    }
    return data;
  }

  private static generateWithMaxLength(schema: any): any {
    const data: any = {};
    if (schema.properties) {
      for (const [key, prop] of Object.entries(schema.properties)) {
        const p = prop as any;
        if (p.type === 'string' && p.maxLength) {
          data[key] = 'x'.repeat(p.maxLength + 1);
        } else {
          data[key] = this.generateValueForType(p);
        }
      }
    }
    return data;
  }

  private static generateWithMinValue(schema: any): any {
    const data: any = {};
    if (schema.properties) {
      for (const [key, prop] of Object.entries(schema.properties)) {
        const p = prop as any;
        if ((p.type === 'number' || p.type === 'integer') && p.minimum !== undefined) {
          data[key] = p.minimum - 1;
        } else {
          data[key] = this.generateValueForType(p);
        }
      }
    }
    return data;
  }

  private static generateWithMaxValue(schema: any): any {
    const data: any = {};
    if (schema.properties) {
      for (const [key, prop] of Object.entries(schema.properties)) {
        const p = prop as any;
        if ((p.type === 'number' || p.type === 'integer') && p.maximum !== undefined) {
          data[key] = p.maximum + 1;
        } else {
          data[key] = this.generateValueForType(p);
        }
      }
    }
    return data;
  }

  private static generateWithNullValues(schema: any): any {
    const data: any = {};
    if (schema.properties) {
      for (const key of Object.keys(schema.properties)) {
        data[key] = null;
      }
    }
    return data;
  }

  private static generateWithSpecialCharacters(schema: any): any {
    const data: any = {};
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (schema.properties) {
      for (const key of Object.keys(schema.properties)) {
        data[key] = specialChars;
      }
    }
    return data;
  }

  private static generateXSSPayload(schema: any): any {
    const data: any = {};
    const xssPayloads = [
      '<script>alert("xss")</script>',
      '<img src=x onerror=alert("xss")>',
      '"><script>alert("xss")</script>',
      '<svg onload=alert("xss")>',
    ];
    if (schema.properties) {
      for (const key of Object.keys(schema.properties)) {
        data[key] = xssPayloads[0];
      }
    }
    return data;
  }

  private static generateSQLInjectionPayload(schema: any): any {
    const data: any = {};
    const sqlPayloads = [
      "'; DROP TABLE users; --",
      "' OR '1'='1",
      "1' UNION SELECT NULL--",
      "admin'--",
    ];
    if (schema.properties) {
      for (const key of Object.keys(schema.properties)) {
        data[key] = sqlPayloads[0];
      }
    }
    return data;
  }

  private static generateCommandInjectionPayload(schema: any): any {
    const data: any = {};
    const cmdPayloads = [
      '; rm -rf /',
      '| cat /etc/passwd',
      '`whoami`',
      '$(whoami)',
    ];
    if (schema.properties) {
      for (const key of Object.keys(schema.properties)) {
        data[key] = cmdPayloads[0];
      }
    }
    return data;
  }

  private static generatePathTraversalPayload(schema: any): any {
    const data: any = {};
    const pathPayloads = [
      '../../../etc/passwd',
      '..\\..\\..\\windows\\system32',
      '....//....//....//etc/passwd',
    ];
    if (schema.properties) {
      for (const key of Object.keys(schema.properties)) {
        data[key] = pathPayloads[0];
      }
    }
    return data;
  }

  private static generateXMLInjectionPayload(schema: any): any {
    const data: any = {};
    const xmlPayloads = [
      '<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><foo>&xxe;</foo>',
      '<![CDATA[<script>alert("xss")</script>]]>',
    ];
    if (schema.properties) {
      for (const key of Object.keys(schema.properties)) {
        data[key] = xmlPayloads[0];
      }
    }
    return data;
  }
}
