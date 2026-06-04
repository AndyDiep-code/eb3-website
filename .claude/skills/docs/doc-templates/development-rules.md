# Development Rules

<!--
AI TEMPLATE INSTRUCTIONS:
- Replace all {{PLACEHOLDER}} values with project-specific content
- Delete sections not applicable to the project
- Link to existing coding standards documents where available
- Remove this instruction block after customization
-->

> **Core Principles**: YAGNI (You Aren't Gonna Need It) · KISS (Keep It Simple, Stupid) · DRY (Don't Repeat Yourself)

---

## Quick Reference

| Rule | Guideline |
|------|-----------|
| **File Size** | < {{MAX_FILE_LINES}} lines (target: {{TARGET_FILE_LINES}}) |
| **Function Size** | < {{MAX_FUNCTION_LINES}} lines |
| **Nesting Depth** | Max {{MAX_NESTING_DEPTH}} levels |
| **Parameters** | Max {{MAX_PARAMS}} per function |
| **Commit Style** | {{COMMIT_STYLE}} |

---

## 1. Code Organization

### File Size Management

<!--
AI GUIDANCE: Adjust limits based on project complexity.
Typical ranges: 200-300 target, 500 max.
-->

- **Target**: Keep files under {{TARGET_FILE_LINES}} lines
- **Hard Limit**: {{MAX_FILE_LINES}} lines (must refactor if exceeded)
- **Exception**: Auto-generated files (clearly marked)

**When files grow too large:**
1. Extract utility functions to `{{UTILS_PATH}}/`
2. Split into focused components/modules
3. Use composition over inheritance
4. Create dedicated service classes for business logic

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| **Source Files** | {{FILE_NAMING_CONVENTION}} | `{{FILE_EXAMPLE}}` |
| **Test Files** | Match source + `.test`/`.spec` | `{{TEST_FILE_EXAMPLE}}` |
| **Constants** | `*.constants.{{EXT}}` | `app.constants.ts` |
| **Types** | `*.types.{{EXT}}` | `user.types.ts` |

---

## 2. Code Quality Standards

### Constants - No Magic Numbers/Strings

<!--
AI GUIDANCE: Always enforce this rule.
Magic values make code hard to maintain and understand.
-->

```{{PRIMARY_LANGUAGE}}
// ❌ Bad - Magic numbers and strings
if (user.age >= 18) { ... }
if (status === 'active') { ... }
setTimeout(callback, 3600000);

// ✅ Good - Named constants
// {{CONSTANTS_PATH}}
export const MINIMUM_ADULT_AGE = 18;
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
} as const;
export const ONE_HOUR_MS = 60 * 60 * 1000;

// Usage
if (user.age >= MINIMUM_ADULT_AGE) { ... }
if (status === USER_STATUS.ACTIVE) { ... }
setTimeout(callback, ONE_HOUR_MS);
```

### Utility Functions - Promote Reusability

```{{PRIMARY_LANGUAGE}}
// ❌ Bad - Duplicated logic
// file1.{{EXT}}
const fullName = `${user.firstName} ${user.lastName}`.trim();
// file2.{{EXT}}
const displayName = `${person.firstName} ${person.lastName}`.trim();

// ✅ Good - Utility function
// {{UTILS_PATH}}/string.utils.{{EXT}}
export function formatFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.trim();
}
```

### Naming Conventions

```{{PRIMARY_LANGUAGE}}
// ❌ Bad - Abbreviated/unclear names
const usr = getUser();
const btn = document.getElementById('submit');
const idx = items.findIndex(i => i.id === targetId);
const val = calculateTotal();
const cb = () => console.log('done');

// ✅ Good - Descriptive names
const currentUser = getUser();
const submitButton = document.getElementById('submit');
const targetIndex = items.findIndex(item => item.id === targetId);
const totalAmount = calculateTotal();
const onCompleteCallback = () => console.log('done');
```

### Error Handling

```{{PRIMARY_LANGUAGE}}
// ✅ Always use try-catch for fallible operations
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  logger.error('Operation failed', { error, context });
  throw new {{ERROR_CLASS}}('User-friendly message');
}
```

---

## 3. Task Management

<!--
AI GUIDANCE: Include if project uses task-based development.
Adjust folder structure to match project conventions.
-->

### Task Folder Structure

```
{{TASKS_PATH}}/{TASK-ID}/
├── README.md           # Task overview
├── requirements.md     # Requirements document
├── plan/
│   └── plan.md         # Implementation plan
└── reports/            # All reports
    └── {description}-{YYMMDD}.md
```

**Rules:**
- Use existing task folders - never create duplicates
- All reports go in `{{TASKS_PATH}}/{TASK-ID}/reports/`
- Report naming: `{description}-{YYMMDD}.md`

---

## 4. Git Workflow

### Commit Messages

<!--
AI GUIDANCE: Use Conventional Commits format.
Adjust types based on project needs.
-->

```
{{COMMIT_TYPE}}({{SCOPE}}): {{DESCRIPTION}}

# Types
feat:     New feature (minor version bump)
fix:      Bug fix (patch version bump)
docs:     Documentation only
style:    Formatting, no code change
refactor: Code restructuring
test:     Adding/updating tests
chore:    Maintenance tasks
perf:     Performance improvements

# Examples
feat(auth): add OAuth2 login support
fix(api): handle null response from payment gateway
docs(readme): update installation instructions
refactor(user): extract validation logic to separate module
```

### Pre-Commit Checklist

- [ ] Code compiles without errors
- [ ] Linting passes (`{{LINT_COMMAND}}`)
- [ ] No syntax errors
- [ ] No hardcoded secrets or credentials
- [ ] Meaningful commit message

### Pre-Push Checklist

- [ ] All tests pass (`{{TEST_COMMAND}}`)
- [ ] No failing tests ignored
- [ ] No `.env` files or secrets committed
- [ ] Branch is up to date with {{DEFAULT_BRANCH}}

---

## 5. Security Rules

### Never Commit

<!--
AI GUIDANCE: Always enforce these rules strictly.
-->

| Type | Examples |
|------|----------|
| **Secrets** | API keys, tokens, passwords |
| **Environment Files** | `.env`, `.env.local`, `.env.production` |
| **Credentials** | Database connection strings, SSH keys |
| **Personal Data** | PII, user data exports |

### Required Practices

- Use environment variables for all secrets
- Add sensitive patterns to `.gitignore`
- Use secret scanning in CI/CD
- Rotate credentials if accidentally committed

---

## 6. Testing Requirements

### Coverage Targets

| Type | Minimum |
|------|---------|
| **Unit Tests** | {{UNIT_COVERAGE}}% |
| **Integration Tests** | {{INTEGRATION_COVERAGE}}% |
| **Overall** | {{OVERALL_COVERAGE}}% |

### Testing Rules

- Write tests for new features before merging
- Never skip failing tests to pass CI
- Mock external dependencies
- Test error scenarios, not just happy paths
- Run full test suite before push

---

## 7. Code Review Standards

### Before Requesting Review

- [ ] Self-reviewed changes
- [ ] Tests added/updated
- [ ] Documentation updated (if needed)
- [ ] No commented-out code
- [ ] No TODO without ticket reference

### Review Focus Areas

| Priority | Focus |
|----------|-------|
| **High** | Security vulnerabilities, data handling |
| **High** | Logic correctness, edge cases |
| **Medium** | Performance implications |
| **Medium** | Code readability, maintainability |
| **Low** | Style consistency (if not auto-formatted) |

---

## 8. Documentation Rules

### When to Update Docs

- [ ] New feature implemented
- [ ] API endpoint added/changed
- [ ] Configuration changed
- [ ] Breaking changes introduced
- [ ] Bug fix with user impact

### Documentation Locations

| Type | Location |
|------|----------|
| **API Reference** | `{{API_DOCS_PATH}}` |
| **Architecture** | `{{ARCHITECTURE_DOCS_PATH}}` |
| **User Guide** | `{{USER_DOCS_PATH}}` |
| **Code Standards** | `{{STANDARDS_PATH}}` |

---

## 9. Implementation Rules

### Do

- Follow established architectural patterns
- Handle edge cases and error scenarios
- Write clean, readable, maintainable code
- Update existing files directly (no "enhanced" copies)
- Implement real code (no mocks/simulations in production)

### Don't

- Over-engineer solutions (YAGNI)
- Create duplicate functionality
- Ignore existing patterns in codebase
- Skip error handling
- Leave debug code in production

---

## 10. Tool Usage

<!--
AI GUIDANCE: Include relevant tools for the project.
Remove or add based on project stack.
-->

### CLI Tools

| Tool | Command | Purpose |
|------|---------|---------|
| **{{TOOL_1}}** | `{{TOOL_1_CMD}}` | {{TOOL_1_PURPOSE}} |
| **{{TOOL_2}}** | `{{TOOL_2_CMD}}` | {{TOOL_2_PURPOSE}} |
| **{{TOOL_3}}** | `{{TOOL_3_CMD}}` | {{TOOL_3_PURPOSE}} |

### Debugging

```bash
# {{DEBUG_TOOL_1}}
{{DEBUG_COMMAND_1}}

# {{DEBUG_TOOL_2}}
{{DEBUG_COMMAND_2}}
```

---

## Related Documentation

- [Code Standards]({{CODE_STANDARDS_PATH}}) - Detailed coding conventions
- [System Architecture]({{ARCHITECTURE_PATH}}) - Architecture decisions
- [Testing Guide]({{TESTING_GUIDE_PATH}}) - Testing strategies

---

## Enforcement

### Automated

| Check | Stage | Command |
|-------|-------|---------|
| **Linting** | Pre-commit | `{{LINT_COMMAND}}` |
| **Type Check** | Pre-commit | `{{TYPE_CHECK_COMMAND}}` |
| **Tests** | Pre-push | `{{TEST_COMMAND}}` |
| **Security Scan** | CI | `{{SECURITY_SCAN_COMMAND}}` |

### Manual

- Code review required for all PRs
- Architecture review for significant changes
- Security review for auth/data handling changes
