# Test Summary Report Template (Enouvo Standard)

## Template — All Sections

| Section | Description |
| --- | --- |
| Project Name | Name of the project or module under test |
| Version / Release | Version number, sprint, or release name |
| Prepared By | QA responsible for the report |
| Date | Report generation date |
| Objective | Summary of what the testing aimed to validate |
| Scope of Testing | Features, modules, or functions tested in this cycle |
| Test Approach | Testing method used (Manual, Automation, Exploratory, etc.) |
| Test Environment | Environment details: URLs, browsers, OS, or devices |
| Summary of Execution | Overview of total tests executed and their results |
| Defect Summary | Overview of defects by severity and status |
| Metrics Summary | High-level process metrics (execution rate, blocked rate, etc.) |
| Test Deliverables | List of artifacts produced |
| Major Findings / Observations | Notable issues, risks, or blockers observed |
| Recommendations | Actions for improving quality or process next cycle |
| Sign-off Recommendation | Go / No-Go decision and rationale |
| Approved By | QA Lead / PM / PO |

## Example Test Summary Report

| Section | Example Content |
| --- | --- |
| Project Name | Example Web Portal - Authentication Module |
| Version / Release | Sprint 12 - Login Feature Enhancements |
| Prepared By | Jordan Lee (QA Lead) |
| Date | Nov 2, 2025 |
| Objective | Validate core authentication flows: login, logout, and password reset |
| Scope of Testing | Login with valid/invalid credentials, password reset, session timeout |
| Test Approach | Manual functional testing with regression suite; partial automation on smoke checks |
| Test Environment | https://staging.example.com — Chrome 128 / Edge 128 on Windows 11 |
| Summary of Execution | Total: 80 \| Executed: 80 (100%) \| Passed: 74 (92.5%) \| Failed: 4 (5%) \| Blocked: 2 (2.5%) |
| Defect Summary | Total: 10 \| Critical: 0 \| Major: 3 \| Minor: 5 \| Low: 2 — all Critical/Major resolved |
| Metrics Summary | Execution Rate: 100% \| Pass Rate: 92.5% \| Blocked: 2.5% \| Defect Density: 0.125/case |
| Test Deliverables | Test Plan, Test Cases, Defect Log, Daily QA Reports, Test Summary Report |
| Major Findings | 1. Password reset email delayed (SMTP queue) 2. Minor UI alignment on Edge 3. Env outage 1h Oct 28 |
| Recommendations | 1. Fix SMTP queue before prod release 2. Add Edge-specific regression cases |
| Sign-off Recommendation | ✅ Go — all Critical/Major defects resolved; minor issues tracked |
| Approved By | Jordan Lee (QA Lead), Avery Chen (PM) |

## When to Generate

- Generate **empty template** (pre-filled with project metadata) at sprint start
- Fill **Summary of Execution** and **Defect Summary** after test execution
- Complete **Sign-off Recommendation** before release
