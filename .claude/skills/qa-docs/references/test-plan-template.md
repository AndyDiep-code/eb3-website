# Test Plan Template (Enouvo Standard)

## Template — All Sections

| Section | Description |
| --- | --- |
| Project Name | Name of the product or feature under test |
| Version / Release | Version number or sprint / release name |
| Prepared By | QA owner(s) preparing the plan |
| Date | Date of creation / last update |
| Objective / Purpose | The main testing goal — what QA intends to validate |
| Scope | What will be tested (features, modules, integrations, etc.) |
| Out of Scope | Features, data, or areas excluded from testing |
| Test Approach / Strategy | High-level overview of how testing will be executed (manual, exploratory, automation, etc.) |
| Test Levels | Unit, Integration, System, UAT — specify which apply to this scope |
| Test Types | Functional, Regression, Smoke, Compatibility, etc. |
| Test Deliverables | Test Plan, Test Cases, Defect Reports, Test Summary, Metrics |
| Test Environment | URL, devices, browsers, data setup, configurations |
| Test Data Management | Data sources and how they will be created / handled |
| Entry Criteria | Preconditions to begin testing (e.g., build deployed, environment stable) |
| Exit Criteria | Conditions for completing testing (e.g., no high-severity defects, all planned tests executed) |
| Roles & Responsibilities | QA Lead, Testers, Developers, PM — who does what |
| Schedule / Timeline | Planned testing period with milestones |
| Risks & Mitigation | Known risks that could affect testing (environment delays, unclear requirements, etc.) |
| Communication Plan | How progress and issues will be reported (daily sync, Slack, email, Test Summary) |
| Approval / Sign-off | QA Lead, PM/PO — for review and final approval |

## Example Test Plan

| Section | Example Content |
| --- | --- |
| Project Name | Example Web Portal - User Authentication |
| Version / Release | Sprint 12 - Login Feature Enhancements |
| Prepared By | Jordan Lee (QA Lead) |
| Date | Oct 25, 2025 |
| Objective / Purpose | Validate login, logout, and password reset functionalities for Web users, ensuring secure and reliable access flow. |
| Scope | Login with valid/invalid credentials, password reset, session timeout, "Remember Me" function |
| Out of Scope | Social login (Google, Facebook), mobile app login |
| Test Approach / Strategy | Functional and regression tests executed manually. Smoke suite to validate deployments. Automation suite to run on stable builds. |
| Test Levels | Integration, System, Acceptance |
| Test Types | Functional, Regression, Smoke, Usability |
| Test Deliverables | Test Plan, Test Cases, Defect Log, Test Summary Report, QA Metrics Dashboard |
| Test Environment | https://staging.example.com on Chrome 128 / Edge 128 / Windows 11 |
| Test Data Management | Use of seeded test accounts; auto-cleanup after execution |
| Entry Criteria | Deployed build v1.12.0 available on staging; test accounts active; smoke check passed |
| Exit Criteria | 100% smoke coverage, >= 95% regression execution, no open Critical/Major bugs |
| Roles & Responsibilities | QA Lead - Planning & Reporting; QA - Execution & Defect Logging; Dev - Fixing & RCA; PM - Sign-off |
| Schedule / Timeline | Test Execution: Oct 26-30; Regression: Oct 31-Nov 1; Sign-off: Nov 2 |
| Risks & Mitigation | Risk: Environment downtime → Notify DevOps immediately & retest; Risk: Late story delivery → Adjust test priority dynamically |
| Communication Plan | Daily QA sync via Slack #project-auth, weekly report email to PM and stakeholders |
| Approval / Sign-off | Jordan Lee (QA Lead), Avery Chen (PM) |

## Tips for a Strong Test Plan

- Keep it traceable — link stories or JIRA tickets for each module
- Balance scope — list what is NOT tested to manage expectations
- Write in plain language — PM, Dev, or client should understand it
- Review early — share draft plans before build release
- Maintain version control — treat as a living document updated per release
