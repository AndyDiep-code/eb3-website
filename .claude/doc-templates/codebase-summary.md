# Codebase Summary

<!--
AI TEMPLATE INSTRUCTIONS:
- Replace all {{PLACEHOLDER}} values with project-specific content
- Delete sections not applicable to the project (e.g., Agent System for non-AI projects)
- Run codebase analysis to populate file statistics
- Remove this instruction block after customization
-->

**Last Updated**: {{DATE}}
**Version**: {{VERSION}}

---

## Overview

{{PROJECT_NAME}} is {{PROJECT_DESCRIPTION}}.

**Purpose**: {{PRIMARY_PURPOSE}}
**Target Users**: {{TARGET_USERS}}
**Status**: {{PROJECT_STATUS}}

---

## Quick Stats

| Metric | Value |
|--------|-------|
| **Total Files** | {{TOTAL_FILES}} |
| **Total Lines** | {{TOTAL_LINES}} |
| **Primary Language** | {{PRIMARY_LANGUAGE}} |
| **Framework** | {{FRAMEWORK}} |
| **Test Coverage** | {{TEST_COVERAGE}}% |

---

## Project Structure

<!--
AI GUIDANCE: Generate this from actual project structure.
Use `tree -L 3 -I 'node_modules|.git|dist'` or similar.
-->

```
{{PROJECT_ROOT}}/
├── src/                          # Source code
│   ├── {{MODULE_1}}/             # {{MODULE_1_DESCRIPTION}}
│   ├── {{MODULE_2}}/             # {{MODULE_2_DESCRIPTION}}
│   └── {{MODULE_3}}/             # {{MODULE_3_DESCRIPTION}}
├── tests/                        # Test suites
├── docs/                         # Documentation
├── {{CONFIG_DIR}}/               # Configuration
└── {{OTHER_DIRS}}/               # Other directories
```

---

## Tech Stack

### Runtime & Core

| Category | Technology | Version |
|----------|------------|---------|
| **Runtime** | {{RUNTIME}} | {{RUNTIME_VERSION}} |
| **Language** | {{LANGUAGE}} | {{LANGUAGE_VERSION}} |
| **Framework** | {{FRAMEWORK}} | {{FRAMEWORK_VERSION}} |
| **Package Manager** | {{PACKAGE_MANAGER}} | {{PM_VERSION}} |

### Key Dependencies

<!--
AI GUIDANCE: List only major dependencies that define the architecture.
Group by purpose: UI, State, API, Database, Testing, etc.
-->

| Category | Package | Purpose |
|----------|---------|---------|
| **{{CATEGORY_1}}** | {{PACKAGE_1}} | {{PURPOSE_1}} |
| **{{CATEGORY_2}}** | {{PACKAGE_2}} | {{PURPOSE_2}} |
| **{{CATEGORY_3}}** | {{PACKAGE_3}} | {{PURPOSE_3}} |

### Dev Dependencies

| Tool | Purpose |
|------|---------|
| {{DEV_TOOL_1}} | {{DEV_PURPOSE_1}} |
| {{DEV_TOOL_2}} | {{DEV_PURPOSE_2}} |
| {{DEV_TOOL_3}} | {{DEV_PURPOSE_3}} |

---

## Core Components

<!--
AI GUIDANCE: Document the main architectural components.
Focus on high-level modules, not individual files.
-->

### 1. {{COMPONENT_1_NAME}}

**Location**: `{{COMPONENT_1_PATH}}/`
**Purpose**: {{COMPONENT_1_PURPOSE}}

Key files:
- `{{KEY_FILE_1}}` - {{KEY_FILE_1_DESC}}
- `{{KEY_FILE_2}}` - {{KEY_FILE_2_DESC}}

### 2. {{COMPONENT_2_NAME}}

**Location**: `{{COMPONENT_2_PATH}}/`
**Purpose**: {{COMPONENT_2_PURPOSE}}

Key files:
- `{{KEY_FILE_1}}` - {{KEY_FILE_1_DESC}}
- `{{KEY_FILE_2}}` - {{KEY_FILE_2_DESC}}

### 3. {{COMPONENT_3_NAME}}

**Location**: `{{COMPONENT_3_PATH}}/`
**Purpose**: {{COMPONENT_3_PURPOSE}}

---

## Entry Points

<!--
AI GUIDANCE: Document main entry points for different personas.
-->

### For Users
| File | Purpose |
|------|---------|
| `README.md` | Project overview and quick start |
| `{{USER_ENTRY_1}}` | {{USER_ENTRY_1_DESC}} |
| `{{USER_ENTRY_2}}` | {{USER_ENTRY_2_DESC}} |

### For Developers
| File | Purpose |
|------|---------|
| `{{DEV_ENTRY_1}}` | {{DEV_ENTRY_1_DESC}} |
| `{{DEV_ENTRY_2}}` | {{DEV_ENTRY_2_DESC}} |
| `{{CONFIG_FILE}}` | Main configuration |

### For CI/CD
| File | Purpose |
|------|---------|
| `{{CI_FILE_1}}` | {{CI_PURPOSE_1}} |
| `{{CI_FILE_2}}` | {{CI_PURPOSE_2}} |

---

## Data Flow

<!--
AI GUIDANCE: Describe how data flows through the system.
Include for: APIs, state management, database interactions.
-->

```
{{DATA_FLOW_DIAGRAM}}

Example:
User Input → Controller → Service → Repository → Database
                ↓
           Validation
                ↓
           Response ← Transform ← Query Result
```

### Key Data Paths

1. **{{FLOW_1_NAME}}**: {{FLOW_1_DESCRIPTION}}
2. **{{FLOW_2_NAME}}**: {{FLOW_2_DESCRIPTION}}
3. **{{FLOW_3_NAME}}**: {{FLOW_3_DESCRIPTION}}

---

## API Overview

<!--
AI GUIDANCE: Include for projects with APIs. Remove for frontend-only.
-->

### Endpoints Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `{{METHOD_1}}` | `{{ENDPOINT_1}}` | {{ENDPOINT_1_DESC}} |
| `{{METHOD_2}}` | `{{ENDPOINT_2}}` | {{ENDPOINT_2_DESC}} |
| `{{METHOD_3}}` | `{{ENDPOINT_3}}` | {{ENDPOINT_3_DESC}} |

### Authentication
- **Method**: {{AUTH_METHOD}}
- **Token Location**: {{TOKEN_LOCATION}}
- **Expiration**: {{TOKEN_EXPIRATION}}

---

## Database Schema

<!--
AI GUIDANCE: Include for projects with databases. Remove otherwise.
-->

### Tables/Collections Overview

| Table | Purpose | Key Relations |
|-------|---------|---------------|
| `{{TABLE_1}}` | {{TABLE_1_PURPOSE}} | {{TABLE_1_RELATIONS}} |
| `{{TABLE_2}}` | {{TABLE_2_PURPOSE}} | {{TABLE_2_RELATIONS}} |
| `{{TABLE_3}}` | {{TABLE_3_PURPOSE}} | {{TABLE_3_RELATIONS}} |

### Entity Relationships

```
{{ER_DIAGRAM}}

Example:
User (1) ──────< (N) Order
Order (1) ─────< (N) OrderItem
OrderItem (N) >───── (1) Product
```

---

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `{{ENV_VAR_1}}` | {{REQUIRED_1}} | {{ENV_DESC_1}} |
| `{{ENV_VAR_2}}` | {{REQUIRED_2}} | {{ENV_DESC_2}} |
| `{{ENV_VAR_3}}` | {{REQUIRED_3}} | {{ENV_DESC_3}} |

### Configuration Files

| File | Purpose |
|------|---------|
| `{{CONFIG_FILE_1}}` | {{CONFIG_PURPOSE_1}} |
| `{{CONFIG_FILE_2}}` | {{CONFIG_PURPOSE_2}} |

---

## Scripts & Commands

### Development

```bash
{{DEV_COMMAND_1}}    # {{DEV_DESC_1}}
{{DEV_COMMAND_2}}    # {{DEV_DESC_2}}
{{DEV_COMMAND_3}}    # {{DEV_DESC_3}}
```

### Testing

```bash
{{TEST_COMMAND_1}}   # {{TEST_DESC_1}}
{{TEST_COMMAND_2}}   # {{TEST_DESC_2}}
```

### Build & Deploy

```bash
{{BUILD_COMMAND}}    # {{BUILD_DESC}}
{{DEPLOY_COMMAND}}   # {{DEPLOY_DESC}}
```

---

## Testing Strategy

### Test Types

| Type | Location | Coverage Target |
|------|----------|-----------------|
| **Unit** | `{{UNIT_TEST_PATH}}` | {{UNIT_COVERAGE}}% |
| **Integration** | `{{INT_TEST_PATH}}` | {{INT_COVERAGE}}% |
| **E2E** | `{{E2E_TEST_PATH}}` | {{E2E_COVERAGE}}% |

### Key Test Suites

- `{{TEST_SUITE_1}}` - {{TEST_SUITE_1_DESC}}
- `{{TEST_SUITE_2}}` - {{TEST_SUITE_2_DESC}}

---

## File Statistics

<!--
AI GUIDANCE: Generate using repomix or cloc.
Update when significant changes occur.
-->

### By Language

| Language | Files | Lines | % of Codebase |
|----------|-------|-------|---------------|
| {{LANG_1}} | {{LANG_1_FILES}} | {{LANG_1_LINES}} | {{LANG_1_PCT}}% |
| {{LANG_2}} | {{LANG_2_FILES}} | {{LANG_2_LINES}} | {{LANG_2_PCT}}% |
| {{LANG_3}} | {{LANG_3_FILES}} | {{LANG_3_LINES}} | {{LANG_3_PCT}}% |

### Largest Files

<!--
AI GUIDANCE: Flag files that may need refactoring (>300 lines).
-->

| File | Lines | Notes |
|------|-------|-------|
| `{{LARGE_FILE_1}}` | {{LINES_1}} | {{NOTES_1}} |
| `{{LARGE_FILE_2}}` | {{LINES_2}} | {{NOTES_2}} |
| `{{LARGE_FILE_3}}` | {{LINES_3}} | {{NOTES_3}} |

---

## Integration Points

<!--
AI GUIDANCE: Document external services and third-party integrations.
-->

### External Services

| Service | Purpose | Config Location |
|---------|---------|-----------------|
| {{SERVICE_1}} | {{SERVICE_1_PURPOSE}} | `{{SERVICE_1_CONFIG}}` |
| {{SERVICE_2}} | {{SERVICE_2_PURPOSE}} | `{{SERVICE_2_CONFIG}}` |

### Webhooks / Events

| Event | Trigger | Handler |
|-------|---------|---------|
| {{EVENT_1}} | {{TRIGGER_1}} | `{{HANDLER_1}}` |
| {{EVENT_2}} | {{TRIGGER_2}} | `{{HANDLER_2}}` |

---

## Security Considerations

### Authentication & Authorization
- **Auth Method**: {{AUTH_METHOD}}
- **Session Handling**: {{SESSION_HANDLING}}
- **Permission Model**: {{PERMISSION_MODEL}}

### Sensitive Data
| Data Type | Storage | Protection |
|-----------|---------|------------|
| {{DATA_TYPE_1}} | {{STORAGE_1}} | {{PROTECTION_1}} |
| {{DATA_TYPE_2}} | {{STORAGE_2}} | {{PROTECTION_2}} |

### Security Headers / Middleware
- {{SECURITY_ITEM_1}}
- {{SECURITY_ITEM_2}}

---

## Performance Considerations

### Caching Strategy
- **Cache Layer**: {{CACHE_LAYER}}
- **TTL**: {{CACHE_TTL}}
- **Invalidation**: {{CACHE_INVALIDATION}}

### Known Bottlenecks
| Area | Issue | Mitigation |
|------|-------|------------|
| {{BOTTLENECK_1}} | {{ISSUE_1}} | {{MITIGATION_1}} |

---

## Deployment

### Environments

| Environment | URL | Branch |
|-------------|-----|--------|
| **Development** | {{DEV_URL}} | `{{DEV_BRANCH}}` |
| **Staging** | {{STAGING_URL}} | `{{STAGING_BRANCH}}` |
| **Production** | {{PROD_URL}} | `{{PROD_BRANCH}}` |

### Deployment Process

1. {{DEPLOY_STEP_1}}
2. {{DEPLOY_STEP_2}}
3. {{DEPLOY_STEP_3}}

---

## Known Issues & Tech Debt

<!--
AI GUIDANCE: Document known issues, workarounds, and planned improvements.
-->

| Issue | Impact | Planned Resolution |
|-------|--------|-------------------|
| {{ISSUE_1}} | {{IMPACT_1}} | {{RESOLUTION_1}} |
| {{ISSUE_2}} | {{IMPACT_2}} | {{RESOLUTION_2}} |

---

## Related Documentation

| Document | Purpose |
|----------|---------|
| [Code Standards](./code-standards.md) | Coding conventions |
| [System Architecture](./system-architecture.md) | Architecture decisions |
| [API Documentation](./api-docs.md) | API reference |
| [Deployment Guide](./deployment-guide.md) | Deployment procedures |

---

## Glossary

<!--
AI GUIDANCE: Define project-specific terms and acronyms.
-->

| Term | Definition |
|------|------------|
| {{TERM_1}} | {{DEFINITION_1}} |
| {{TERM_2}} | {{DEFINITION_2}} |
| {{TERM_3}} | {{DEFINITION_3}} |

