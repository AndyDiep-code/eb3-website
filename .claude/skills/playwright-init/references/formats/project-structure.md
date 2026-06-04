# Project Structure

Generated project directory structure.

## Overview

The Enouvo Playwright template creates a complete project structure with all necessary files and directories for automation testing.

## Complete Directory Tree

```
./tests/playwright/
├── playwright.config.ts                     # Main Playwright configuration
├── package.json                             # Dependencies and scripts
├── tsconfig.json                            # TypeScript configuration
├── .env.example                             # Environment variables template
├── .eslintrc.json                           # ESLint configuration
├── .mcp.json.example                        # MCP server config template
├── AGENTS.md                                # AI agents documentation
├── README.md                                # Project documentation
│
├── tests/                                   # Test files
│   ├── auth.setup.ts                        # Auth state setup (runs once)
│   ├── fixtures/                            # Custom Playwright fixtures
│   │   ├── index.ts                         # Fixture exports
│   │   └── test-data.ts                     # Test data
│   ├── api/                                 # API tests (browserless)
│   │   ├── README.md                        # API test guide
│   │   └── example.spec.ts                  # Example API test
│   └── ui/                                  # UI tests (browser-based)
│       ├── README.md                        # UI test guide
│       └── example.spec.ts                  # Example UI test
│
├── pages/                                   # Page Object Model
│   ├── base.page.ts                         # Base page class
│   ├── login.page.ts                        # Login page example
│   └── dashboard.page.ts                    # Dashboard page example
│
├── utils/                                   # Utility helpers
│   ├── api-helpers.ts                       # API request utilities
│   ├── data-factory.ts                      # Test data generators
│   ├── env.ts                               # Environment variable loader
│   ├── timeouts.ts                          # Timeout constants
│   ├── logger.ts                            # Logging utilities
│   └── index.ts                             # Re-exports
│
├── postman/                                 # Postman collections
│   ├── README.md                            # Postman guide
│   └── api-collection.json                  # API collection
│
├── ai/                                      # AI agent configurations
│   ├── agents/                              # AI agents
│   │   ├── qa-orchestrator.md               # QA orchestrator agent
│   │   ├── test-generator.md                # Test generator agent
│   │   └── ...                              # Other agents
│   └── skills/                              # AI skills
│       ├── playwright-cli.md                # Playwright CLI skill
│       ├── mcp-scout.md                     # MCP scout skill
│       └── ...                              # Other skills
│
├── docs/                                    # Documentation
│   ├── README.md                            # Main documentation
│   ├── setup.md                             # Setup guide
│   ├── running-tests.md                     # How to run tests
│   ├── page-objects.md                      # Page Object Model guide
│   ├── test-data.md                         # Test data guide
│   └── troubleshooting.md                   # Troubleshooting guide
│
├── node_modules/                            # Installed dependencies
│   ├── @playwright/
│   ├── typescript/
│   ├── allure-playwright/
│   └── ...
│
├── .playwright/                             # Playwright cache
│   └── browsers/                            # Downloaded browsers
│
├── test-results/                            # Test results (generated)
│   ├── index.html                           # HTML report
│   └── ...
│
└── allure-results/                          # Allure results (generated)
    ├── *.json                               # Test results
    └── ...
```

## Key Directories

### tests/
Contains all test files organized by type:
- **auth.setup.ts**: Authentication setup (runs once, caches state)
- **fixtures/**: Custom Playwright fixtures and test data
- **api/**: API tests (no browser required)
- **ui/**: UI tests (browser-based)

### pages/
Page Object Model implementation:
- **base.page.ts**: Base class with common methods
- **{PageName}.page.ts**: Individual page objects

### utils/
Utility functions and helpers:
- **api-helpers.ts**: API request utilities
- **data-factory.ts**: Test data generators
- **env.ts**: Environment variable loader
- **timeouts.ts**: Timeout constants

### ai/
AI agent configurations:
- **agents/**: AI agent definitions
- **skills/**: AI skill definitions

### docs/
Project documentation:
- Setup and installation guides
- How to run tests
- Page Object Model guide
- Test data guide
- Troubleshooting

## Generated Directories

These directories are created during test execution:

### test-results/
HTML test report generated by Playwright reporter

### allure-results/
Allure test results (JSON files) for Allure reporting

### .playwright/
Playwright cache including downloaded browsers

## Configuration Files

### playwright.config.ts
Main Playwright configuration:
- Browser configuration
- Test timeout settings
- Reporter configuration
- Base URL
- Retry settings

### package.json
Project dependencies and scripts:
- @playwright/test
- typescript
- allure-playwright
- eslint, prettier
- Custom npm scripts

### tsconfig.json
TypeScript configuration:
- Compiler options
- Module resolution
- Type checking

### .env.example
Environment variables template:
- Base URL
- API credentials
- Test data
- Browser settings

## File Descriptions

### auth.setup.ts
Runs once before all tests to set up authentication state. Caches auth state in `.auth/state.json` for reuse.

### base.page.ts
Base page class with common methods:
- Navigation
- Element interaction
- Assertions
- Logging

### test-data.ts
Centralized test data:
- User credentials
- Test URLs
- Test data objects
- Constants

### api-helpers.ts
API request utilities:
- HTTP methods (GET, POST, PUT, DELETE)
- Header management
- Response parsing
- Error handling

### data-factory.ts
Test data generators:
- User data factory
- Product data factory
- Order data factory
- Custom data generators

### env.ts
Environment variable loader:
- Load from .env file
- Provide defaults
- Type-safe access

## Related Documentation

[See: Config Schema](../formats/config-schema.md)
