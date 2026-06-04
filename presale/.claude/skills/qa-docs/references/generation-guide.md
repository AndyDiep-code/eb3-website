# Generation Guide — How to Fill Each Section

Instructions for AI when generating test plan sections from source documents.

## Step 1: Source Analysis

Before filling any section, scan the source for:

```
EXTRACT:
- Feature names and modules (nouns: "Login page", "Cart", "Checkout flow")
- User actions (verbs: "user can...", "allow...", "support...")
- Acceptance criteria (patterns: "must", "should", "when...then...")
- Integrations (APIs, third-party services, databases mentioned)
- Exclusions ("out of scope", "not included", "future sprint", "will NOT")
- Environment hints (URLs, platforms, browser mentions)
- Team info (names, roles mentioned in the doc)
- Timeline hints (sprint name, dates, deadlines)
```

## Step 2: Section-by-Section Rules

### Project Name
- Use the `--project` argument directly.

### Version / Release
- Use `--sprint` if provided.
- If not provided: look for sprint number, release name, or version in source.
- Default: "Current Sprint"

### Objective / Purpose
- 1-2 sentences summarizing the main testing goal.
- Pattern: "Validate [features] for [user type], ensuring [quality goal]."
- Example: "Validate login, logout, and password reset for web users, ensuring secure and reliable access."

### Scope
- List all features extracted from source that WILL be tested.
- Format as comma-separated list or bullet points.
- Include integrations if mentioned (e.g., "Email notification via SendGrid").

### Out of Scope
- List anything explicitly excluded in source.
- Also infer: if source says "web only" → mobile is out of scope.
- Always add: "Performance testing" and "Security penetration testing" unless explicitly in scope.

### Test Approach / Strategy
- If source mentions automation → include it.
- Default approach: "Manual functional and regression testing. Smoke suite for deployment validation."
- Add: "Exploratory testing for edge cases."

### Test Levels
- Map features to levels:
  - Login/Auth → Integration, System, Acceptance
  - API endpoints → Unit, Integration
  - UI flows → System, Acceptance
  - End-to-end flows → System, Acceptance

### Test Types
- Infer from feature type:
  - Any feature → Functional, Regression
  - New deploy → Smoke
  - Auth/login → Security
  - Forms/inputs → Boundary, Negative
  - Cross-browser UI → Compatibility
  - Performance requirements → Performance

### Test Deliverables
- Default: "Test Plan, Test Cases, Defect Log, Test Summary Report"
- Add "Automation scripts" if automation is in scope.

### Test Environment
- Use `--env` if provided.
- Otherwise: "Staging environment (URL TBD)"
- Add browsers if mentioned in source.
- Add: "Test accounts required for authenticated flows."

### Test Data Management
- If auth is involved: "Seeded test accounts with various roles/permissions."
- If CRUD is involved: "Test data created and cleaned up per test run."
- Default: "Test data created per test case; cleaned after execution."

### Entry Criteria
Always include these 3:
1. Build deployed to test environment and accessible
2. Test environment stable (smoke check passed)
3. Test accounts and data prepared

### Exit Criteria
Always include these 3:
1. 100% planned test cases executed (or documented reason for skip)
2. No open Critical or Major severity defects
3. QA Lead sign-off obtained

### Roles & Responsibilities
- QA Lead: Test planning, review, reporting, sign-off
- QA Engineer(s): Test execution, defect logging
- Developer(s): Defect fixing, RCA, deployment support
- PM/PO: Requirement clarification, final sign-off
- Use `--prepared-by` as QA Lead name.

### Schedule / Timeline
- If sprint dates known: use them.
- If not: generate relative timeline:
  - Day 1-2: Test plan review + data setup
  - Day 3-N: Test execution (N = feature count × 0.5 days)
  - Last day: Regression + sign-off

### Risks & Mitigation
- Always generate these baseline risks:
  1. "Test environment instability → Monitor uptime; coordinate with DevOps on issues"
  2. "Late feature delivery → Reprioritize test cases; focus on critical paths first"
  3. "Unclear requirements → Raise in daily sync; document assumptions"
- Add feature-specific risks:
  - Third-party API → "API downtime or rate limits → Use mocks for unit/integration tests"
  - Auth flows → "Session/token issues in test env → Coordinate with backend team"
  - DB migrations → "Data inconsistency after migration → Verify data integrity checks"

### Communication Plan
- Default: "Daily QA status update in project Slack channel; weekly summary email to PM and stakeholders."
- Adjust channel name if mentioned in source.

### Approval / Sign-off
- Use `--prepared-by` as QA Lead.
- Add: "[PM/PO Name]" as second approver (or "PM/PO (TBD)" if not known).

## Test Case ID Format

```
{MODULE}-{FEATURE}-{NNN}

Examples:
  AUTH-LOGIN-001    → Authentication module, Login feature, case 1
  CART-ADD-001      → Cart module, Add to cart feature, case 1
  CHECKOUT-PAY-001  → Checkout module, Payment feature, case 1
  API-USER-001      → API module, User endpoint, case 1
```

## Severity / Priority Matrix

| Scenario | Severity | Priority |
|----------|----------|----------|
| Core flow blocked (can't login, can't checkout) | Critical | High |
| Major feature broken (wrong data, error on save) | Major | High |
| Minor UX issue (alignment, label wrong) | Minor | Normal |
| Cosmetic (color, spacing) | Low | Low |
| Performance degradation | Major | Normal |
| Security vulnerability | Critical | High |
