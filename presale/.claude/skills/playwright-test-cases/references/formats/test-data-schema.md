# Test Data Schema

Test data fixture schema and examples for generating realistic test data for UI and API test cases.

## Overview

Test data schemas define the structure and constraints for generating test fixtures. They support multiple data types, validation rules, and relationships between fields.

## Schema Structure

```json
{
  "testDataSets": [
    {
      "name": "valid-user-data",
      "description": "Valid user registration data",
      "fields": {
        "firstName": {
          "type": "string",
          "minLength": 2,
          "maxLength": 50,
          "pattern": "^[a-zA-Z\\s-]+$",
          "examples": ["John", "Mary-Jane", "José"]
        },
        "email": {
          "type": "email",
          "pattern": "^[^@]+@[^@]+\\.[^@]+$",
          "examples": ["user@example.com", "test@domain.co.uk"]
        },
        "password": {
          "type": "string",
          "minLength": 8,
          "maxLength": 128,
          "pattern": "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$",
          "description": "Must contain uppercase, lowercase, digit, and special character"
        },
        "age": {
          "type": "integer",
          "minimum": 18,
          "maximum": 120,
          "examples": [25, 35, 50]
        },
        "country": {
          "type": "enum",
          "values": ["US", "UK", "CA", "AU", "DE", "FR"],
          "examples": ["US", "UK"]
        }
      }
    },
    {
      "name": "invalid-user-data",
      "description": "Invalid user data for negative testing",
      "fields": {
        "firstName": {
          "type": "string",
          "examples": ["", "A", "123", "@#$%"]
        },
        "email": {
          "type": "string",
          "examples": ["invalid", "user@", "@example.com", "user @example.com"]
        },
        "password": {
          "type": "string",
          "examples": ["short", "nouppercase123!", "NOLOWERCASE123!", "NoSpecial123"]
        }
      }
    }
  ]
}
```

## Field Types

| Type | Description | Examples |
|------|-------------|----------|
| `string` | Text data | "John", "test@example.com" |
| `integer` | Whole numbers | 25, 100, -5 |
| `number` | Decimal numbers | 3.14, 99.99 |
| `boolean` | True/false | true, false |
| `email` | Email format | "user@example.com" |
| `url` | URL format | "https://example.com" |
| `date` | ISO 8601 date | "2024-01-15" |
| `datetime` | ISO 8601 datetime | "2024-01-15T10:30:00Z" |
| `enum` | Predefined values | "US", "UK", "CA" |
| `array` | List of values | ["item1", "item2"] |
| `object` | Nested object | `{"key": "value"}` |

## Validation Rules

```json
{
  "fields": {
    "username": {
      "type": "string",
      "minLength": 3,
      "maxLength": 20,
      "pattern": "^[a-zA-Z0-9_-]+$",
      "required": true
    },
    "age": {
      "type": "integer",
      "minimum": 0,
      "maximum": 150,
      "required": false
    },
    "status": {
      "type": "enum",
      "values": ["active", "inactive", "pending"],
      "default": "pending"
    }
  }
}
```

## Relationships

Define relationships between test data sets:

```json
{
  "relationships": [
    {
      "name": "user-to-profile",
      "from": "valid-user-data",
      "to": "user-profile-data",
      "type": "one-to-one",
      "mapping": {
        "userId": "profileUserId"
      }
    },
    {
      "name": "user-to-orders",
      "from": "valid-user-data",
      "to": "order-data",
      "type": "one-to-many",
      "mapping": {
        "userId": "customerId"
      }
    }
  ]
}
```

## Example: Complete Test Data Schema

```json
{
  "testDataSets": [
    {
      "name": "valid-login-credentials",
      "description": "Valid credentials for login testing",
      "fields": {
        "email": {
          "type": "email",
          "examples": ["user@example.com", "admin@test.com"]
        },
        "password": {
          "type": "string",
          "minLength": 8,
          "examples": ["SecurePass123!", "TestPass456@"]
        }
      }
    },
    {
      "name": "invalid-login-credentials",
      "description": "Invalid credentials for negative testing",
      "fields": {
        "email": {
          "type": "string",
          "examples": ["invalid-email", "user@", ""]
        },
        "password": {
          "type": "string",
          "examples": ["short", "", "wrongpassword"]
        }
      }
    },
    {
      "name": "api-request-payload",
      "description": "API request payload structure",
      "fields": {
        "userId": {
          "type": "integer",
          "minimum": 1,
          "examples": [1, 100, 999]
        },
        "action": {
          "type": "enum",
          "values": ["create", "update", "delete"],
          "examples": ["create", "update"]
        },
        "timestamp": {
          "type": "datetime",
          "examples": ["2024-01-15T10:30:00Z"]
        }
      }
    }
  ]
}
```

## Usage in Test Cases

Reference test data schemas in test cases:

```markdown
## Test Case: User Registration

**Test Data**: [valid-user-data](../formats/test-data-schema.md#valid-user-data)

**Steps**:
1. Navigate to registration page
2. Fill form with data from valid-user-data
3. Submit form

**Expected Result**: User account created successfully
```

## Best Practices

- **Realistic Data**: Use realistic examples that match production patterns
- **Comprehensive Coverage**: Include valid, invalid, edge case, and boundary data
- **Clear Descriptions**: Document what each data set represents
- **Reusable Sets**: Create generic sets that work across multiple test cases
- **Validation Rules**: Define constraints that match application requirements
- **Relationships**: Document how data sets relate to each other
- **Examples**: Provide multiple examples for each field

[See: Test Case Generation Rules](../guides/test-case-generation-rules.md)
