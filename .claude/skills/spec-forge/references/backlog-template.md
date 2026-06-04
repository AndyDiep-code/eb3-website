# Backlog Template

Use this template exactly. The backlog is the executable plan for developers — every story
must be small enough to complete in 1–5 days and ordered so a developer can work top-to-bottom.

---

## Ordering Heuristic

Apply this sequence when ordering stories across epics. Within each layer, order by dependency
(stories with no dependencies come first):

1. **Infrastructure** — auth, DB schema, core data models, deployment pipeline, env config
2. **Core domain logic** — business rules, state machines, calculations, validations
3. **Internal APIs / service layer** — REST/GraphQL endpoints, background jobs, event handlers
4. **UI / frontend** — screens, components, forms, navigation
5. **External integrations** — third-party APIs, webhooks, data imports/exports
6. **Polish & operations** — notifications, reporting, admin tools, analytics, error pages

---

## Complexity Sizing Guide

| Size | Duration | Examples |
|------|----------|---------|
| S | < 1 day | Add a field to a form, write a utility function, add a DB column |
| M | 1–3 days | Build a CRUD screen, implement an API endpoint with validation |
| L | 3–5 days | Build a complex feature with multiple states, integrate a third-party API |
| XL | > 5 days | Should be broken down further — flag and split before sprint planning |

---

## Acceptance Criteria Formats

Use **Given/When/Then** for behavior with clear preconditions:
```
Given [context/state]
When [action]
Then [expected outcome]
And [additional outcome]
```

Use **bullet list** for simpler requirements or UI specs:
```
- [ ] Field validates email format on blur
- [ ] Error message appears below the field
- [ ] Submit button is disabled until all required fields are valid
```

---

## Template

```markdown
# Product Backlog: [Product Name]

> **Version**: [matches PRODUCT_SPEC.md version]
> **Last Updated**: YYYY-MM-DD
> **Total Stories**: [N] | **Estimated Total**: [sum of story points or size buckets]

---

## Epic 1: [Epic Name — high-level capability, e.g. "User Authentication"]

> [1–2 sentences describing what this epic delivers and why it matters]
> **REQ coverage**: REQ-001, REQ-002, REQ-003

### Feature 1.1: [Feature Name, e.g. "Registration & Login"]

> [1 sentence describing this feature]

---

#### STORY-001: [Story Title, e.g. "User registration with email/password"]

**Persona**: [persona name from spec]
**Story**: As a [persona], I want to [goal] so that [benefit].
**Complexity**: S | M | L | XL
**Dependencies**: [] *(or list STORY-IDs)*
**Implementation order**: 1
**REQ refs**: REQ-001

**Acceptance Criteria**:
Given [context]
When [action]
Then [outcome]

---

#### STORY-002: [Story Title]

**Persona**: [persona name]
**Story**: As a [persona], I want to [goal] so that [benefit].
**Complexity**: M
**Dependencies**: [STORY-001]
**Implementation order**: 2
**REQ refs**: REQ-002

**Acceptance Criteria**:
- [ ] [criterion]
- [ ] [criterion]

---

### Feature 1.2: [Next Feature]

#### STORY-003: ...

---

## Epic 2: [Next Epic Name]

> [description]
> **REQ coverage**: REQ-010 – REQ-018

### Feature 2.1: ...

#### STORY-NNN: ...

---

## Removed Stories

> Stories removed from scope. Never delete — mark here for traceability.

- ~~STORY-042~~ [REMOVED 2026-05-18: client deprioritized reporting in v1 — see SRC-004]

---

## Implementation Order Summary

Quick reference for developers — ordered list of all stories:

| Order | Story ID | Title | Size | Epic |
|-------|----------|-------|------|------|
| 1 | STORY-001 | User registration | M | Auth |
| 2 | STORY-002 | Login flow | M | Auth |
| ... | | | | |
```
