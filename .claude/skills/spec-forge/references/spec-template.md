# Product Specification Template

Use this template exactly. Replace `[bracketed text]` with real content. Remove guidance notes
(lines starting with `>`) from the final output.

---

```markdown
# Product Specification: [Product Name]

> **Version**: [e.g. 1.0.0 — increment minor for updates, major for scope changes]
> **Status**: Draft | In Review | Approved
> **Last Updated**: YYYY-MM-DD
> **Sources**: [list SRC-IDs ingested]

---

## 1. Executive Summary

[2–4 sentences. What is this product? Who is it for? What problem does it solve?
Write for a non-technical stakeholder who needs to understand the scope in 30 seconds.]

---

## 2. Problem Statement

[What is the current situation? What pain does the client/user experience today?
What does success look like after this product exists? Be specific — avoid generic statements
like "improve efficiency". Prefer: "Currently, X takes 3 days manually; the target is same-day."]

---

## 3. Stakeholders & Personas

### Stakeholders

| Name / Role | Responsibility | Decision Authority |
|-------------|---------------|-------------------|
| [e.g. Product Owner — Jane] | [Approves scope changes] | [Final say on features] |

### User Personas

#### [Persona Name, e.g. "Operations Manager"]
- **Role**: [job title and context]
- **Goals**: [what they want to accomplish]
- **Pain points**: [what frustrates them today]
- **Technical comfort**: [low / medium / high]

> Add one persona block per distinct user type. Minimum 1, typically 2–4.

---

## 4. Functional Requirements

> Group requirements by domain/feature area. Each requirement gets a stable REQ-ID.
> Format: `**REQ-NNN** [requirement text] [Source: SRC-XXX]`
> Status badge: `[Draft]` `[Approved]` `[Deferred]`

### 4.1 [Domain Name, e.g. "User Authentication"]

**REQ-001** [Draft] The system shall allow users to register with email and password. [Source: SRC-001]

**REQ-002** [Draft] The system shall support password reset via email link, expiring after 24 hours. [Source: SRC-001]

### 4.2 [Next Domain]

**REQ-003** [Draft] ...

> Continue adding domains and requirements. Number sequentially across all domains.
> Never reuse or renumber IDs. Removed requirements: ~~REQ-042~~ [REMOVED: out of scope per SRC-004]

---

## 5. Non-Functional Requirements

### 5.1 Performance
**REQ-NNN** [Draft] [e.g. Page load time shall be under 2 seconds for 95th percentile on a 10 Mbps connection.] [Source: SRC-XXX]

### 5.2 Security
**REQ-NNN** [Draft] [e.g. All data in transit shall be encrypted using TLS 1.2 or higher.] [Source: SRC-XXX]

### 5.3 Scalability
**REQ-NNN** [Draft] [e.g. The system shall support up to 500 concurrent users without degradation.] [Source: SRC-XXX]

### 5.4 Accessibility
**REQ-NNN** [Draft] [e.g. The web interface shall meet WCAG 2.1 AA standards.] [Source: SRC-XXX]

### 5.5 Compliance & Data
**REQ-NNN** [Draft] [e.g. Personal data shall be stored in [region] to comply with [regulation].] [Source: SRC-XXX]

> Only include sections that have actual requirements. Remove empty sections.

---

## 6. Architecture Notes

> High-level technical direction from the requirements. Not a design doc — just constraints
> and preferences that affect architecture decisions.

- **Platform**: [web / mobile / desktop / API-only / hybrid]
- **Deployment**: [cloud provider, on-premise, SaaS]
- **Existing systems to integrate with**: [list]
- **Technology constraints**: [required languages, frameworks, or platforms]
- **Data residency**: [where data must be stored]

---

## 7. Data Model Notes

> Key entities and their relationships, as implied by the requirements. Not a full schema —
> just enough to understand the domain model.

- **[Entity]**: [brief description, key attributes]
- **[Entity]**: [brief description, key attributes]
- **Relationships**: [e.g. "A User has many Projects; a Project has many Tasks"]

---

## 8. Integrations

| System | Direction | Purpose | Auth Method |
|--------|-----------|---------|-------------|
| [e.g. Stripe] | Outbound | Payment processing | API key |
| [e.g. Salesforce] | Bidirectional | CRM sync | OAuth 2.0 |

> Remove this section if no integrations are required.

---

## 9. Constraints & Assumptions

### Constraints
- [Hard constraint, e.g. "Must use existing PostgreSQL database — no migration budget"]
- [Timeline constraint, e.g. "MVP must be ready by YYYY-MM-DD"]
- [Budget constraint if known]

### Assumptions
- [e.g. "Users have modern browsers (Chrome 90+, Firefox 88+, Safari 14+)"]
- [e.g. "Client will provide test data before development begins"]
- [Mark inferred assumptions: "[Inferred] Users have stable internet connectivity"]

---

## 10. Out of Scope

> Explicitly list what this product will NOT do. This prevents scope creep and sets
> clear expectations. Source each item if possible.

- [e.g. Mobile native apps — web-responsive only] [Source: SRC-002]
- [e.g. Multi-language / i18n support in v1] [Source: SRC-002]

---

## 11. Open Questions

> Items that need client clarification before or during development. Each question
> should reference the source of the ambiguity.

| # | Question | Source | Priority | Status |
|---|----------|--------|----------|--------|
| Q-001 | [e.g. Should users be able to delete their account, or only deactivate?] | SRC-001 | High | Open |
| Q-002 | [e.g. SRC-001 says 500 users max, SRC-003 says 2000 — which is correct?] | SRC-001, SRC-003 | High | Open |

---

## Changelog

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | YYYY-MM-DD | spec-forge | Initial spec from [list source files] |

> Append a new row on every incremental update. Never edit past entries.
```
