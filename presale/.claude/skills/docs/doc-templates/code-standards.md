# Code Standards & Codebase Structure

<!--
AI TEMPLATE INSTRUCTIONS:
- Replace all {{PLACEHOLDER}} values with project-specific content
- Delete sections not applicable to the project
- Add project-specific sections as needed
- Remove this instruction block after customization
-->

**Last Updated**: {{DATE}}
**Version**: {{VERSION}}
**Applies To**: {{PROJECT_NAME}}

---

## Overview

This document defines **project-specific** coding standards, file organization patterns, and configuration requirements for {{PROJECT_NAME}}.

> **Scope**: This document covers project-specific conventions only. For universal coding principles (YAGNI, KISS, DRY, SOLID, naming conventions, error handling, testing, security), see **[Development Rules](./development-rules.md)**.

---

## Quick Reference

| Category | Standard |
|----------|----------|
| **Primary Language** | {{PRIMARY_LANGUAGE}} |
| **Framework** | {{FRAMEWORK}} |
| **Package Manager** | {{PACKAGE_MANAGER}} |
| **Test Framework** | {{TEST_FRAMEWORK}} |
| **Linter/Formatter** | {{LINTER_FORMATTER}} |
| **Node Version** | {{NODE_VERSION}} |
| **File Line Limit** | 200-300 (target), 500 (max) |

---

## 1. Directory Structure

<!--
AI GUIDANCE: Adapt this structure to match project type:
- Frontend: src/components, src/pages, src/hooks, src/styles
- Backend: src/controllers, src/services, src/models, src/routes
- Fullstack: src/client, src/server, src/shared
- Monorepo: packages/, apps/
-->

```
{{PROJECT_ROOT}}/
├── src/                         # Source code
│   ├── {{PRIMARY_MODULE}}/      # Main module
│   ├── {{SECONDARY_MODULE}}/    # Secondary module
│   ├── shared/                  # Shared utilities
│   │   ├── constants/           # Application constants
│   │   ├── types/               # TypeScript types/interfaces
│   │   ├── utils/               # Utility functions
│   │   └── hooks/               # Shared hooks (if frontend)
│   └── index.{{EXT}}            # Entry point
├── tests/                       # Test suites
│   ├── unit/                    # Unit tests
│   ├── integration/             # Integration tests
│   └── e2e/                     # End-to-end tests
├── docs/                        # Documentation
├── scripts/                     # Build/deploy scripts
├── .github/                     # GitHub workflows
├── {{CONFIG_FILES}}             # Configuration files
└── README.md
```

### Feature-Based Organization (Recommended)

<!--
AI GUIDANCE: Use feature-based structure for larger projects.
Each feature is self-contained with its own components, hooks, services.
-->

```
src/features/
├── {{FEATURE_1}}/
│   ├── components/              # Feature-specific components
│   ├── hooks/                   # Feature-specific hooks
│   ├── services/                # Feature-specific services
│   ├── types/                   # Feature-specific types
│   ├── utils/                   # Feature-specific utilities
│   ├── {{FEATURE_1}}.test.{{EXT}}
│   └── index.{{EXT}}            # Public exports
├── {{FEATURE_2}}/
└── {{FEATURE_3}}/
```

---

## 2. File Naming Conventions

### Source Files

| Type | Convention | Example |
|------|------------|---------|
| **Components** | PascalCase | `UserProfile.tsx`, `OrderList.vue` |
| **Hooks** | camelCase with `use` prefix | `useAuth.ts`, `useFetch.ts` |
| **Services** | camelCase with `.service` suffix | `user.service.ts`, `api.service.ts` |
| **Utilities** | camelCase with `.util` or descriptive | `date.util.ts`, `formatters.ts` |
| **Types/Interfaces** | camelCase with `.types` suffix | `user.types.ts`, `api.types.ts` |
| **Constants** | camelCase with `.constants` suffix | `app.constants.ts` |
| **Tests** | Match source with `.test` or `.spec` | `UserProfile.test.tsx` |
| **Styles** | Match component or `.module` suffix | `UserProfile.module.css` |

### Configuration Files

| File | Purpose |
|------|---------|
| `{{CONFIG_FILE_1}}` | {{CONFIG_PURPOSE_1}} |
| `{{CONFIG_FILE_2}}` | {{CONFIG_PURPOSE_2}} |
| `.env.example` | Environment variable template |
| `.gitignore` | Git exclusions |

---

## 3. Code Style

### Formatting

<!--
AI GUIDANCE: Adjust based on project's linter/formatter config.
Common options: Prettier, ESLint, Biome, dprint
-->

| Rule | Value |
|------|-------|
| **Indentation** | {{INDENT_SIZE}} spaces |
| **Line Length** | {{LINE_LENGTH}} characters max |
| **Quotes** | {{QUOTE_STYLE}} |
| **Semicolons** | {{SEMICOLON_STYLE}} |
| **Trailing Commas** | {{TRAILING_COMMA_STYLE}} |

### Imports Order

<!--
AI GUIDANCE: Define import ordering based on project conventions.
Most formatters can auto-sort imports.
-->

```{{PRIMARY_LANGUAGE}}
// 1. External dependencies (node_modules)
import {{ external_lib }} from '{{external_lib}}';

// 2. Internal aliases (@/, ~/, etc.)
import {{ internal_module }} from '@/{{path}}';

// 3. Relative imports (parent directories first)
import {{ parent_module }} from '../{{path}}';
import {{ sibling_module }} from './{{path}}';

// 4. Type imports (if using TypeScript)
import type { {{Type}} } from './{{path}}';

// 5. Style imports
import './{{styles}}';
```

---

## 4. Naming Conventions

### Variables & Functions

<!--
AI GUIDANCE: Adjust conventions based on primary language:
- JavaScript/TypeScript: camelCase
- Python: snake_case
- Go: camelCase (unexported), PascalCase (exported)
- Rust: snake_case
-->

| Type | Convention | Example |
|------|------------|---------|
| **Variables** | camelCase | `userName`, `isActive`, `itemCount` |
| **Functions** | camelCase + verb | `getUser()`, `calculateTotal()`, `handleSubmit()` |
| **Boolean** | `is/has/can/should` prefix | `isValid`, `hasPermission`, `canEdit` |
| **Constants** | SCREAMING_SNAKE_CASE | `MAX_RETRIES`, `API_BASE_URL` |
| **Enums** | PascalCase | `UserRole`, `OrderStatus` |
| **Classes** | PascalCase | `UserService`, `OrderRepository` |
| **Interfaces** | PascalCase (no `I` prefix) | `User`, `ApiResponse` |
| **Types** | PascalCase | `UserCreateInput`, `OrderFilter` |

### API Endpoints

<!--
AI GUIDANCE: Include if project has API. Adjust based on API style (REST, GraphQL, etc.)
-->

```
# REST Conventions
GET    /api/{{resources}}              # List
GET    /api/{{resources}}/:id          # Get one
POST   /api/{{resources}}              # Create
PUT    /api/{{resources}}/:id          # Update (full)
PATCH  /api/{{resources}}/:id          # Update (partial)
DELETE /api/{{resources}}/:id          # Delete

# Nested Resources
GET    /api/{{parent}}/:parentId/{{child}}
```

### Database Schema

<!--
AI GUIDANCE: Include if project has database. Adjust based on ORM/database conventions.
-->

| Type | Convention | Example |
|------|------------|---------|
| **Tables** | snake_case, plural | `users`, `order_items` |
| **Columns** | snake_case | `created_at`, `user_id` |
| **Primary Keys** | `id` or `{{table}}_id` | `id`, `user_id` |
| **Foreign Keys** | `{{referenced_table}}_id` | `user_id`, `order_id` |
| **Indexes** | `idx_{{table}}_{{column}}` | `idx_users_email` |
| **Timestamps** | `created_at`, `updated_at` | ISO 8601 format |

---

## 5. Component Standards

<!--
AI GUIDANCE: Include for frontend projects. Adjust based on framework (React, Vue, Svelte, etc.)
-->

### Component Structure

```{{COMPONENT_LANGUAGE}}
// 1. Imports
// 2. Types/Interfaces
// 3. Constants
// 4. Component definition
// 5. Hooks
// 6. Handlers
// 7. Render helpers (if needed)
// 8. Return/render
```

### Component Guidelines

- **One component per file** (co-located sub-components allowed)
- **Props interface** defined above component
- **Default exports** for page components, **named exports** for reusable components
- **Keep components under 200 lines**; extract logic to hooks/utils

---

## 6. Error Handling

### Error Response Format

<!--
AI GUIDANCE: Define consistent error format for APIs.
-->

```json
{
  "error": {
    "code": "{{ERROR_CODE}}",
    "message": "Human-readable message",
    "details": {},
    "requestId": "{{REQUEST_ID}}"
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `{{ERROR_CODE_1}}` | {{STATUS_1}} | {{DESCRIPTION_1}} |
| `{{ERROR_CODE_2}}` | {{STATUS_2}} | {{DESCRIPTION_2}} |
| `VALIDATION_ERROR` | 400 | Invalid input data |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `INTERNAL_ERROR` | 500 | Server error |

---

## 7. Testing Standards

### Test File Location

<!--
AI GUIDANCE: Choose co-located or centralized based on project preference.
-->

**Option A: Co-located (Recommended for components)**
```
src/features/auth/
├── LoginForm.tsx
├── LoginForm.test.tsx    # Co-located test
└── LoginForm.stories.tsx # Storybook (if applicable)
```

**Option B: Centralized (Recommended for integration/e2e)**
```
tests/
├── unit/
├── integration/
└── e2e/
```

### Test Naming

```{{PRIMARY_LANGUAGE}}
describe('{{ModuleName}}', () => {
  describe('{{methodName}}', () => {
    it('should {{expected_behavior}} when {{condition}}', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

### Coverage Requirements

| Type | Minimum Coverage |
|------|------------------|
| **Unit Tests** | {{UNIT_COVERAGE}}% |
| **Integration Tests** | {{INTEGRATION_COVERAGE}}% |
| **Overall** | {{OVERALL_COVERAGE}}% |

---

## 8. Git Conventions

### Branch Naming

```
{{BRANCH_PREFIX}}/{{TICKET_ID}}-{{SHORT_DESCRIPTION}}

# Examples
feature/ABC-123-user-authentication
bugfix/ABC-456-fix-login-redirect
hotfix/ABC-789-security-patch
```

### Commit Messages

<!--
AI GUIDANCE: Use Conventional Commits format.
-->

```
{{TYPE}}({{SCOPE}}): {{DESCRIPTION}}

# Types: feat, fix, docs, style, refactor, test, chore
# Examples:
feat(auth): add OAuth2 login support
fix(api): handle null response from payment gateway
docs(readme): update installation instructions
```

### Pull Request Template

```markdown
## Summary
{{BRIEF_DESCRIPTION}}

## Changes
- {{CHANGE_1}}
- {{CHANGE_2}}

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if UI changes)
{{SCREENSHOTS}}
```

---

## 9. Environment Configuration

### Required Environment Variables

<!--
AI GUIDANCE: List all required env vars. Never include actual secrets.
-->

| Variable | Description | Required |
|----------|-------------|----------|
| `{{ENV_VAR_1}}` | {{DESCRIPTION_1}} | Yes |
| `{{ENV_VAR_2}}` | {{DESCRIPTION_2}} | Yes |
| `{{ENV_VAR_3}}` | {{DESCRIPTION_3}} | No |

### Environment Files

```
.env.example     # Template (committed)
.env.local       # Local development (git-ignored)
.env.test        # Test environment (git-ignored)
.env.production  # Production (git-ignored, use secrets manager)
```

---

## 10. Documentation Standards

### Required Documentation

| Document | Location | Purpose |
|----------|----------|---------|
| README.md | Root | Project overview, setup, usage |
| CHANGELOG.md | Root | Version history |
| API Documentation | `docs/api/` | API reference |
| Architecture | `docs/` | System design decisions |

### Code Comments

```{{PRIMARY_LANGUAGE}}
// Use sparingly - code should be self-documenting

// GOOD: Explains WHY
// Cache invalidated after 5 min due to external API rate limits
const CACHE_TTL = 5 * 60 * 1000;

// BAD: Explains WHAT (obvious from code)
// Set cache TTL to 5 minutes
const CACHE_TTL = 5 * 60 * 1000;
```

---

## 11. CI/CD Requirements

### Pre-Commit Checks

- [ ] Linting passes
- [ ] Type checking passes
- [ ] Unit tests pass
- [ ] No secrets in code

### Pre-Merge Checks

- [ ] All CI checks pass
- [ ] Code review approved
- [ ] Branch up to date with {{DEFAULT_BRANCH}}
- [ ] No merge conflicts

### Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Feature flags set correctly
- [ ] Monitoring/alerting configured

---

## 12. Exceptions & Deviations

When deviating from standards, document with:

```{{PRIMARY_LANGUAGE}}
/**
 * EXCEPTION: {{RULE_VIOLATED}}
 * REASON: {{JUSTIFICATION}}
 * APPROVED_BY: {{APPROVER}}
 * DATE: {{DATE}}
 * TODO: {{REMEDIATION_PLAN}} (if applicable)
 */
```

---

## References

### Internal
- [Development Rules](./development-rules.md) - Universal coding principles
- [System Architecture](./system-architecture.md) - System design
- [API Documentation](./api-docs.md) - API reference

### External
- [{{FRAMEWORK}} Documentation]({{FRAMEWORK_URL}})
- [{{LANGUAGE}} Style Guide]({{LANGUAGE_STYLE_URL}})
- [Conventional Commits](https://conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
