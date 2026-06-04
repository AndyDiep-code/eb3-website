# Capture Requirement Output Templates

Use when generating knowledge artifacts in Phase 5.

## 06-summary.md
```markdown
# Requirements Summary: [task-id]

**Generated:** YYYY-MM-DD  **Status:** Complete | Needs Clarification

## Overview
[Brief summary of what this task aims to achieve]

## Functional Requirements
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-001 | ... | High/Med/Low | Defined/Unclear |

## Non-Functional Requirements
| ID | Category | Requirement | Target |
|----|----------|-------------|--------|
| NFR-001 | Performance | ... | < 200ms |

## Constraints
- ...

## Dependencies
- Internal: ...
- External: ...

## Open Questions
- [ ] ...
```

## 07-technical-specs.md
```markdown
# Technical Specifications: [task-id]

**Generated:** YYYY-MM-DD

## Architecture Considerations
[Based on requirements analysis]

## Data Requirements
- Inputs: ...
- Outputs: ...
- Storage: ...

## Integration Points
| System | Type | Protocol | Notes |
|--------|------|----------|-------|

## Security
- Authentication: ...
- Authorization: ...
- Data protection: ...

## Performance
- Latency: ...
- Throughput: ...
- Scalability: ...

## Error Handling
| Scenario | Expected Behavior |
|----------|------------------|
```

## 08-acceptance-criteria.md
```markdown
# Acceptance Criteria: [task-id]

**Generated:** YYYY-MM-DD

## Feature: [Feature Name]

### Scenario 1: [Happy Path]
**Given** [precondition]
**When** [action]
**Then** [expected result]

### Scenario 2: [Edge Case]
**Given** [precondition]
**When** [action]
**Then** [expected result]

### Scenario 3: [Error Case]
**Given** [precondition]
**When** [action]
**Then** [expected result]

## Validation Checklist
- [ ] All functional requirements have acceptance criteria
- [ ] Edge cases are covered
- [ ] Error scenarios are defined
- [ ] Performance criteria are measurable
```

## 09-implementation-notes.md
```markdown
# Implementation Notes: [task-id]

**Generated:** YYYY-MM-DD

## Suggested Approach
[Based on requirements and constraints]

## Key Considerations
- ...

## Potential Challenges
| Challenge | Mitigation |
|-----------|------------|

## Recommended Order
1. [First step]
2. [Second step]
3. ...

## Documentation Needs
- [ ] API docs
- [ ] User guide
- [ ] Technical docs
```
