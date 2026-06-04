# Plan Creation & Organization

## Directory Structure

### Plan Location

Use `Plan dir:` from `## Naming` section injected by hooks. This is the full computed path.

**Example:** `.claude/tasks/AUTH-001/plan/` or `ai_docs/feature/MRR-1453/`

### File Organization

IN CURRENT WORKING PROJECT DIRECTORY:
```
./.claude/tasks/[task-id]/
├── README.md                              # Task summary
├── requirements/                           # Task requirements (read first)
│   ├── functional.md
│   ├── non-functional.md
│   └── ...
├── research/                              # Pre-existing from capture-requirement/brainstorm
│   └── ...                               # (Read-only during planning)
├── reports/                              # Agent reports
│   ├── researcher-01-report.md
│   ├── researcher-02-report.md
│   └── ...
└── plan/                                  # Implementation plan
    ├── plan.md                            # Overview access point
    ├── phase-01-setup-environment.md       # Setup environment
    ├── phase-02-implement-database.md      # Database models
    ├── phase-03-implement-api-endpoints.md # API endpoints
    ├── phase-04-implement-ui-components.md # UI components
    ├── phase-05-implement-authentication.md # Authentication
    ├── phase-06-write-tests.md              # Tests (optional)
    ├── phase-XX-code-review.md             # MANDATORY final phase
    └── ...
```

### Task Hydration

After creating plan.md and phase files, hydrate tasks (unless `--no-tasks`):
1. TaskCreate per phase with `addBlockedBy` dependency chain
2. Add critical step tasks for high-risk items
3. See `task-management.md` for patterns and cook handoff protocol

### Active Plan State Tracking

See SKILL.md "Active Plan State" section for full rules. Key points:
- Check `## Plan Context` injected by hooks for active/suggested/none state
- After creating plan: `node .claude/scripts/set-active-task.cjs {task-id}`
- Active plans use plan-specific reports path; suggested plans use default path

## File Structure

### Overview Plan (plan.md)

**IMPORTANT:** All plan.md files MUST include YAML frontmatter. See `output-standards.md` for schema.

**Example plan.md structure:**
```markdown
---
title: "Feature Implementation Plan"
description: "Add user authentication with OAuth2 support"
status: pending
priority: P1
effort: 8h
issue: 123
branch: kai/feat/oauth-auth
tags: [auth, backend, security]
created: 2025-12-16
---

# Feature Implementation Plan

## Overview

Brief description of what this plan accomplishes.

## Phases

| # | Phase | Status | Effort | Link |
|---|-------|--------|--------|------|
| 1 | Setup | Pending | 2h | [phase-01](./phase-01-setup.md) |
| 2 | Implementation | Pending | 4h | [phase-02](./phase-02-impl.md) |
| 3 | Testing | Pending | 2h | [phase-03](./phase-03-test.md) |

<!-- IMPORTANT: Link text MUST be human-readable names (not filenames).
     Bad:  [phase-01-setup.md](./phase-01-setup.md)
     Good: [Setup Environment](./phase-01-setup.md) -->

## Dependencies

- List key dependencies here
```

**Guidelines:**
- Keep generic and under 80 lines
- List each phase with status/progress
- Link to detailed phase files
- Key dependencies

### Phase Files (phase-XX-name.md)
Fully respect the `./docs/development-rules.md` file.
Each phase file should contain:

**Context Links**
- Links to related reports, files, documentation

**Overview**
- Priority
- Current status
- Brief description

**Key Insights**
- Important findings from research
- Critical considerations

**Requirements**
- Functional requirements
- Non-functional requirements

**Architecture**
- System design
- Component interactions
- Data flow

**Related Code Files**
- List of files to modify
- List of files to create
- List of files to delete

**Implementation Steps**
- Detailed, numbered steps
- Specific instructions

**Todo List**
- Checkbox list for tracking

**Success Criteria**
- Definition of done
- Validation methods

**Risk Assessment**
- Potential issues
- Mitigation strategies

**Security Considerations**
- Auth/authorization
- Data protection

**Next Steps**
- Dependencies
- Follow-up tasks

### Deep / TDD Extensions

When `--deep` is used, add:
- a file inventory table with action, rough size, and test impact
- a test scenario matrix for critical, high, and medium paths
- a dependency map that calls out links to other phases

When `--tdd` is used, add:
- a **Tests Before** section for regression coverage written first
- a **Refactor** section describing the protected code changes
- a **Tests After** section for new behavior introduced in that phase
- a regression gate listing the compile/test command that must pass
