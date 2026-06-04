# System Architecture

<!--
AI TEMPLATE INSTRUCTIONS:
- Replace all {{PLACEHOLDER}} values with project-specific content
- Delete sections not applicable to the project
- Add ASCII diagrams for visual clarity
- Keep technical accuracy - this is a reference document
- Remove this instruction block after customization
-->

**Last Updated**: {{DATE}}
**Version**: {{VERSION}}
**Project**: {{PROJECT_NAME}}

---

## Overview

{{PROJECT_NAME}} implements {{ARCHITECTURE_SUMMARY}}.

**Primary Pattern**: {{PRIMARY_PATTERN}}
**Secondary Patterns**: {{SECONDARY_PATTERNS}}

---

## Design Philosophy

<!--
AI GUIDANCE: List 3-5 core architectural principles.
-->

| Principle | Description |
|-----------|-------------|
| **{{PRINCIPLE_1}}** | {{PRINCIPLE_1_DESC}} |
| **{{PRINCIPLE_2}}** | {{PRINCIPLE_2_DESC}} |
| **{{PRINCIPLE_3}}** | {{PRINCIPLE_3_DESC}} |

---

## High-Level Architecture

```
{{ARCHITECTURE_DIAGRAM}}

Example:
┌─────────────────────────────────────────────────────────────┐
│                        Clients                               │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                      │
│  │   Web   │  │ Mobile  │  │   CLI   │                      │
│  └────┬────┘  └────┬────┘  └────┬────┘                      │
└───────┼────────────┼────────────┼───────────────────────────┘
        │            │            │
        └────────────┼────────────┘
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Authentication │ Rate Limiting │ Request Routing    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────┬───────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                         │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐               │
│  │ Service A │  │ Service B │  │ Service C │               │
│  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘               │
└────────┼──────────────┼──────────────┼──────────────────────┘
         │              │              │
         └──────────────┼──────────────┘
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │ Database │  │  Cache   │  │  Queue   │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

---

## System Layers

### 1. Presentation Layer

**Purpose**: {{PRESENTATION_PURPOSE}}

| Component | Technology | Responsibility |
|-----------|------------|----------------|
| {{PRES_COMPONENT_1}} | {{PRES_TECH_1}} | {{PRES_RESP_1}} |
| {{PRES_COMPONENT_2}} | {{PRES_TECH_2}} | {{PRES_RESP_2}} |

### 2. Application Layer

**Purpose**: {{APPLICATION_PURPOSE}}

| Component | Technology | Responsibility |
|-----------|------------|----------------|
| {{APP_COMPONENT_1}} | {{APP_TECH_1}} | {{APP_RESP_1}} |
| {{APP_COMPONENT_2}} | {{APP_TECH_2}} | {{APP_RESP_2}} |
| {{APP_COMPONENT_3}} | {{APP_TECH_3}} | {{APP_RESP_3}} |

### 3. Domain Layer

**Purpose**: {{DOMAIN_PURPOSE}}

| Component | Responsibility |
|-----------|----------------|
| {{DOMAIN_COMPONENT_1}} | {{DOMAIN_RESP_1}} |
| {{DOMAIN_COMPONENT_2}} | {{DOMAIN_RESP_2}} |

### 4. Infrastructure Layer

**Purpose**: {{INFRA_PURPOSE}}

| Component | Technology | Responsibility |
|-----------|------------|----------------|
| {{INFRA_COMPONENT_1}} | {{INFRA_TECH_1}} | {{INFRA_RESP_1}} |
| {{INFRA_COMPONENT_2}} | {{INFRA_TECH_2}} | {{INFRA_RESP_2}} |

---

## Core Components

<!--
AI GUIDANCE: Document major architectural components.
Include purpose, location, key files, and dependencies.
-->

### {{COMPONENT_1_NAME}}

| Attribute | Value |
|-----------|-------|
| **Location** | `{{COMPONENT_1_PATH}}` |
| **Purpose** | {{COMPONENT_1_PURPOSE}} |
| **Technology** | {{COMPONENT_1_TECH}} |
| **Dependencies** | {{COMPONENT_1_DEPS}} |

**Key Files**:
- `{{COMPONENT_1_FILE_1}}` - {{COMPONENT_1_FILE_1_DESC}}
- `{{COMPONENT_1_FILE_2}}` - {{COMPONENT_1_FILE_2_DESC}}

### {{COMPONENT_2_NAME}}

| Attribute | Value |
|-----------|-------|
| **Location** | `{{COMPONENT_2_PATH}}` |
| **Purpose** | {{COMPONENT_2_PURPOSE}} |
| **Technology** | {{COMPONENT_2_TECH}} |
| **Dependencies** | {{COMPONENT_2_DEPS}} |

### {{COMPONENT_3_NAME}}

| Attribute | Value |
|-----------|-------|
| **Location** | `{{COMPONENT_3_PATH}}` |
| **Purpose** | {{COMPONENT_3_PURPOSE}} |
| **Technology** | {{COMPONENT_3_TECH}} |
| **Dependencies** | {{COMPONENT_3_DEPS}} |

---

## Data Architecture

### Data Storage

| Store | Type | Purpose | Technology |
|-------|------|---------|------------|
| **Primary Database** | {{DB_TYPE}} | {{DB_PURPOSE}} | {{DB_TECH}} |
| **Cache** | {{CACHE_TYPE}} | {{CACHE_PURPOSE}} | {{CACHE_TECH}} |
| **File Storage** | {{FILE_TYPE}} | {{FILE_PURPOSE}} | {{FILE_TECH}} |

### Data Models

<!--
AI GUIDANCE: Document core entities and relationships.
-->

```
{{DATA_MODEL_DIAGRAM}}

Example:
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│     User     │       │    Order     │       │   Product    │
├──────────────┤       ├──────────────┤       ├──────────────┤
│ id           │       │ id           │       │ id           │
│ email        │──┐    │ user_id      │──┐    │ name         │
│ name         │  │    │ status       │  │    │ price        │
│ created_at   │  │    │ total        │  │    │ stock        │
└──────────────┘  │    │ created_at   │  │    └──────────────┘
                  │    └──────────────┘  │           ▲
                  │           │          │           │
                  └───────────┘          └───────────┘
                    1:N                       N:M
```

### Data Flow

```
{{DATA_FLOW_DIAGRAM}}

Example:
Request → Validation → Business Logic → Repository → Database
                              ↓
                         Response ← Transform ← Query Result
```

---

## API Architecture

<!--
AI GUIDANCE: Include for projects with APIs.
-->

### API Design

| Attribute | Value |
|-----------|-------|
| **Style** | {{API_STYLE}} |
| **Format** | {{API_FORMAT}} |
| **Versioning** | {{API_VERSIONING}} |
| **Documentation** | {{API_DOCS}} |

### Endpoint Structure

```
{{API_ENDPOINT_STRUCTURE}}

Example:
{{API_BASE_URL}}
├── /auth
│   ├── POST /login
│   ├── POST /register
│   └── POST /refresh
├── /users
│   ├── GET /
│   ├── GET /:id
│   ├── PUT /:id
│   └── DELETE /:id
└── /{{RESOURCE}}
    └── ...
```

### Request/Response Flow

```
Client Request
    ↓
┌─────────────────┐
│   Middleware    │
│  ┌───────────┐  │
│  │   Auth    │  │
│  ├───────────┤  │
│  │  Logging  │  │
│  ├───────────┤  │
│  │Validation │  │
│  └───────────┘  │
└────────┬────────┘
         ↓
┌─────────────────┐
│   Controller    │
└────────┬────────┘
         ↓
┌─────────────────┐
│    Service      │
└────────┬────────┘
         ↓
┌─────────────────┐
│   Repository    │
└────────┬────────┘
         ↓
┌─────────────────┐
│    Database     │
└─────────────────┘
```

---

## Authentication & Authorization

### Authentication Flow

```
{{AUTH_FLOW_DIAGRAM}}

Example:
┌────────┐      ┌────────┐      ┌────────┐      ┌────────┐
│ Client │─────▶│  Auth  │─────▶│ Verify │─────▶│  Token │
│        │      │ Server │      │ Creds  │      │ Issue  │
└────────┘      └────────┘      └────────┘      └────────┘
    │                                               │
    │◀──────────────── JWT Token ──────────────────┘
    │
    ▼
┌────────┐      ┌────────┐      ┌────────┐
│  API   │─────▶│ Verify │─────▶│ Access │
│Request │      │ Token  │      │Granted │
└────────┘      └────────┘      └────────┘
```

### Authorization Model

| Attribute | Value |
|-----------|-------|
| **Model** | {{AUTH_MODEL}} |
| **Roles** | {{AUTH_ROLES}} |
| **Permissions** | {{AUTH_PERMISSIONS}} |

---

## Integration Architecture

### External Services

| Service | Purpose | Protocol | Auth |
|---------|---------|----------|------|
| {{EXT_SERVICE_1}} | {{EXT_PURPOSE_1}} | {{EXT_PROTOCOL_1}} | {{EXT_AUTH_1}} |
| {{EXT_SERVICE_2}} | {{EXT_PURPOSE_2}} | {{EXT_PROTOCOL_2}} | {{EXT_AUTH_2}} |

### Event-Driven Integration

<!--
AI GUIDANCE: Include if using message queues or event bus.
-->

```
{{EVENT_ARCHITECTURE}}

Example:
┌──────────┐     ┌──────────────┐     ┌──────────┐
│ Producer │────▶│ Message Queue│────▶│ Consumer │
└──────────┘     └──────────────┘     └──────────┘
                        │
                        ▼
              ┌──────────────────┐
              │  Event Handlers  │
              │  ┌────────────┐  │
              │  │  Handler A │  │
              │  ├────────────┤  │
              │  │  Handler B │  │
              │  └────────────┘  │
              └──────────────────┘
```

---

## Security Architecture

### Security Layers

| Layer | Controls |
|-------|----------|
| **Network** | {{NETWORK_SECURITY}} |
| **Application** | {{APP_SECURITY}} |
| **Data** | {{DATA_SECURITY}} |
| **Infrastructure** | {{INFRA_SECURITY}} |

### Security Controls

<!--
AI GUIDANCE: Document specific security measures.
-->

| Control | Implementation |
|---------|----------------|
| **Authentication** | {{AUTH_IMPL}} |
| **Authorization** | {{AUTHZ_IMPL}} |
| **Encryption** | {{ENCRYPTION_IMPL}} |
| **Input Validation** | {{VALIDATION_IMPL}} |
| **Secrets Management** | {{SECRETS_IMPL}} |

### Threat Mitigation

| Threat | Mitigation |
|--------|------------|
| {{THREAT_1}} | {{MITIGATION_1}} |
| {{THREAT_2}} | {{MITIGATION_2}} |
| {{THREAT_3}} | {{MITIGATION_3}} |

---

## Scalability Architecture

### Horizontal Scaling

```
{{HORIZONTAL_SCALING_DIAGRAM}}

Example:
                    ┌─────────────────┐
                    │  Load Balancer  │
                    └────────┬────────┘
           ┌─────────────────┼─────────────────┐
           ▼                 ▼                 ▼
    ┌────────────┐    ┌────────────┐    ┌────────────┐
    │ Instance 1 │    │ Instance 2 │    │ Instance N │
    └────────────┘    └────────────┘    └────────────┘
           │                 │                 │
           └─────────────────┼─────────────────┘
                             ▼
                    ┌─────────────────┐
                    │Shared Database  │
                    └─────────────────┘
```

### Vertical Scaling

| Resource | Current | Max |
|----------|---------|-----|
| **CPU** | {{CPU_CURRENT}} | {{CPU_MAX}} |
| **Memory** | {{MEM_CURRENT}} | {{MEM_MAX}} |
| **Storage** | {{STORAGE_CURRENT}} | {{STORAGE_MAX}} |

### Caching Strategy

| Cache Level | Technology | TTL | Purpose |
|-------------|------------|-----|---------|
| **Application** | {{APP_CACHE_TECH}} | {{APP_CACHE_TTL}} | {{APP_CACHE_PURPOSE}} |
| **Database** | {{DB_CACHE_TECH}} | {{DB_CACHE_TTL}} | {{DB_CACHE_PURPOSE}} |
| **CDN** | {{CDN_TECH}} | {{CDN_TTL}} | {{CDN_PURPOSE}} |

---

## Deployment Architecture

### Environments

| Environment | Purpose | URL |
|-------------|---------|-----|
| **Development** | {{DEV_PURPOSE}} | {{DEV_URL}} |
| **Staging** | {{STAGING_PURPOSE}} | {{STAGING_URL}} |
| **Production** | {{PROD_PURPOSE}} | {{PROD_URL}} |

### Infrastructure

```
{{INFRASTRUCTURE_DIAGRAM}}

Example:
┌─────────────────────────────────────────────────────┐
│                   Cloud Provider                     │
│  ┌───────────────────────────────────────────────┐  │
│  │                    VPC                         │  │
│  │  ┌─────────────┐  ┌─────────────────────────┐ │  │
│  │  │ Public      │  │ Private Subnet          │ │  │
│  │  │ Subnet      │  │  ┌─────┐  ┌─────┐      │ │  │
│  │  │  ┌─────┐    │  │  │ App │  │ App │      │ │  │
│  │  │  │ ALB │────┼──┼─▶│  1  │  │  2  │      │ │  │
│  │  │  └─────┘    │  │  └─────┘  └─────┘      │ │  │
│  │  └─────────────┘  │         │              │ │  │
│  │                   │         ▼              │ │  │
│  │                   │  ┌─────────────────┐   │ │  │
│  │                   │  │    Database     │   │ │  │
│  │                   │  └─────────────────┘   │ │  │
│  │                   └─────────────────────────┘ │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### CI/CD Pipeline

```
{{CI_CD_DIAGRAM}}

Example:
┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐
│  Push  │───▶│  Build │───▶│  Test  │───▶│ Deploy │───▶│ Verify │
└────────┘    └────────┘    └────────┘    └────────┘    └────────┘
                  │              │              │
                  ▼              ▼              ▼
             Artifacts      Coverage       {{DEPLOY_TARGET}}
```

---

## Monitoring & Observability

### Monitoring Stack

| Concern | Tool | Purpose |
|---------|------|---------|
| **Metrics** | {{METRICS_TOOL}} | {{METRICS_PURPOSE}} |
| **Logs** | {{LOGS_TOOL}} | {{LOGS_PURPOSE}} |
| **Traces** | {{TRACES_TOOL}} | {{TRACES_PURPOSE}} |
| **Alerts** | {{ALERTS_TOOL}} | {{ALERTS_PURPOSE}} |

### Key Metrics

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| {{METRIC_1}} | {{TARGET_1}} | {{THRESHOLD_1}} |
| {{METRIC_2}} | {{TARGET_2}} | {{THRESHOLD_2}} |
| {{METRIC_3}} | {{TARGET_3}} | {{THRESHOLD_3}} |

---

## Error Handling

### Error Strategy

| Layer | Strategy |
|-------|----------|
| **Presentation** | {{PRES_ERROR_STRATEGY}} |
| **Application** | {{APP_ERROR_STRATEGY}} |
| **Infrastructure** | {{INFRA_ERROR_STRATEGY}} |

### Recovery Patterns

| Pattern | Use Case |
|---------|----------|
| **Retry** | {{RETRY_USE_CASE}} |
| **Circuit Breaker** | {{CIRCUIT_BREAKER_USE_CASE}} |
| **Fallback** | {{FALLBACK_USE_CASE}} |
| **Timeout** | {{TIMEOUT_USE_CASE}} |

---

## Technology Stack Summary

### Core Technologies

| Category | Technology | Version |
|----------|------------|---------|
| **Runtime** | {{RUNTIME}} | {{RUNTIME_VERSION}} |
| **Language** | {{LANGUAGE}} | {{LANGUAGE_VERSION}} |
| **Framework** | {{FRAMEWORK}} | {{FRAMEWORK_VERSION}} |
| **Database** | {{DATABASE}} | {{DATABASE_VERSION}} |

### Supporting Technologies

| Category | Technology | Purpose |
|----------|------------|---------|
| {{SUPPORT_CAT_1}} | {{SUPPORT_TECH_1}} | {{SUPPORT_PURPOSE_1}} |
| {{SUPPORT_CAT_2}} | {{SUPPORT_TECH_2}} | {{SUPPORT_PURPOSE_2}} |
| {{SUPPORT_CAT_3}} | {{SUPPORT_TECH_3}} | {{SUPPORT_PURPOSE_3}} |

---

## Extension Points

<!--
AI GUIDANCE: Document how to extend the system.
-->

### Adding New {{EXTENSION_TYPE_1}}

1. {{EXTENSION_1_STEP_1}}
2. {{EXTENSION_1_STEP_2}}
3. {{EXTENSION_1_STEP_3}}

### Adding New {{EXTENSION_TYPE_2}}

1. {{EXTENSION_2_STEP_1}}
2. {{EXTENSION_2_STEP_2}}
3. {{EXTENSION_2_STEP_3}}

---

## Performance Considerations

### Optimization Strategies

| Area | Strategy |
|------|----------|
| **Database** | {{DB_OPTIMIZATION}} |
| **API** | {{API_OPTIMIZATION}} |
| **Frontend** | {{FRONTEND_OPTIMIZATION}} |
| **Network** | {{NETWORK_OPTIMIZATION}} |

### Performance Targets

| Metric | Target |
|--------|--------|
| **Response Time (P95)** | {{RESPONSE_TIME_TARGET}} |
| **Throughput** | {{THROUGHPUT_TARGET}} |
| **Availability** | {{AVAILABILITY_TARGET}} |
| **Error Rate** | {{ERROR_RATE_TARGET}} |

---

## Future Architecture Evolution

### Planned Improvements

| Area | Improvement | Timeline |
|------|-------------|----------|
| {{IMPROVEMENT_1_AREA}} | {{IMPROVEMENT_1_DESC}} | {{IMPROVEMENT_1_TIMELINE}} |
| {{IMPROVEMENT_2_AREA}} | {{IMPROVEMENT_2_DESC}} | {{IMPROVEMENT_2_TIMELINE}} |

### Technical Debt

| Item | Impact | Priority |
|------|--------|----------|
| {{DEBT_1}} | {{DEBT_1_IMPACT}} | {{DEBT_1_PRIORITY}} |
| {{DEBT_2}} | {{DEBT_2_IMPACT}} | {{DEBT_2_PRIORITY}} |

---

## Related Documentation

| Document | Purpose |
|----------|---------|
| [Project Overview](./project-overview-pdr.md) | Requirements and scope |
| [Codebase Summary](./codebase-summary.md) | Technical overview |
| [Code Standards](./code-standards.md) | Coding conventions |
| [API Documentation](./api-docs.md) | API reference |

---

## Unresolved Questions

1. **{{QUESTION_1}}**: {{QUESTION_1_CONTEXT}}
2. **{{QUESTION_2}}**: {{QUESTION_2_CONTEXT}}
3. **{{QUESTION_3}}**: {{QUESTION_3_CONTEXT}}
