# Brainstorm File Templates

Use these structures when creating requirement files in Phase 4.

## 01-functional.md
```markdown
# Functional Requirements

**Task:** [task-id]  **Last Updated:** YYYY-MM-DD

## User Stories

### US-001: [Story Title]
**As a** [user type] **I want** [action] **So that** [benefit]

**Acceptance Criteria:**
- [ ] [Criterion 1]
- [ ] [Criterion 2]

## Feature Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-001 | [Requirement] | High/Med/Low | Proposed |

## To Be Determined
- [Unclear requirements needing clarification]
```

## 02-non-functional.md
```markdown
# Non-Functional Requirements

**Task:** [task-id]  **Last Updated:** YYYY-MM-DD

## Performance
| Metric | Target | Notes |
|--------|--------|-------|
| Response Time | [target] | [context] |

## Security
- **Authentication:** [requirements]
- **Authorization:** [requirements]
- **Data Protection:** [requirements]

## Scalability
- [Scaling considerations]

## To Be Determined
- [Unclear NFRs needing clarification]
```

## 03-constraints.md
```markdown
# Technical Constraints

**Task:** [task-id]  **Last Updated:** YYYY-MM-DD

## Technology Constraints
| Category | Constraint | Reason |
|----------|------------|--------|

## Resource Constraints
- **Timeline:** [constraints]
- **Team:** [constraints]
- **Budget:** [constraints]

## To Be Determined
- [Unclear constraints needing clarification]
```

## 04-decisions.md
```markdown
# Architecture Decisions

**Task:** [task-id]  **Last Updated:** YYYY-MM-DD

## Decision Log

### DEC-001: [Decision Title]
**Date:** YYYY-MM-DD  **Status:** Accepted/Proposed

**Context:** [Why this decision was needed]
**Decision:** [What was decided]
**Alternatives Considered:** [What was rejected and why]
**Consequences:** [Impact of this decision]

## To Be Determined
- [Pending decisions]
```

## 05-risks.md
```markdown
# Risk Assessment

**Task:** [task-id]  **Last Updated:** YYYY-MM-DD

## Risk Matrix
| ID | Risk | Probability | Impact | Mitigation |
|----|------|-------------|--------|------------|
| R-001 | [Risk] | High/Med/Low | High/Med/Low | [Strategy] |

### R-001: [Risk Title]
**Description:** [What could go wrong]
**Mitigation:** [How to prevent/handle]
**Contingency:** [Plan B if risk occurs]

## To Be Determined
- [Risks needing further analysis]
```

## Brainstorm Session Notes (YYYYMMDD-brainstorm-topic.md)
```markdown
# Brainstorm: [Topic]

**Date:** YYYY-MM-DD  **Task:** [task-id]  **Question:** [question]

## Problem Statement
[Clear description of the problem]

## Approaches Evaluated

### Option 1: [Name]
**Pros:** ...
**Cons:** ...

### Option 2: [Name]
**Pros:** ...
**Cons:** ...

## Recommended Solution
[Final recommendation with rationale]

## Implementation Considerations
- ...

## Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|

## Questions Resolved
| Question | Decision | Rationale |
|----------|----------|-----------|
```
