<!--
Usage: /devkit:review --mode business --task [TASK-ID] [file-path | folder-path | --changed]
Purpose: Review code against business requirements, identify edge cases and logic gaps
Example: /devkit:review --mode business --task ABC-123 src/services/auth.service.ts
Example: /devkit:review --mode business --task ABC-123 src/features/checkout/
Example: /devkit:review --mode business --task ABC-123 --changed
Example: /devkit:review --mode business --task ABC-123 --changed staged
-->

Enable Ultrathink

## MANDATORY Report Generation

**NON-NEGOTIABLE**: ALL review commands MUST generate report files. Inline-only reports are NOT acceptable.

1. **Use Task ID**: The `--task [TASK-ID]` is required for this command. Use that TASK-ID for reports.

2. **Create Report Directory**:
   ```bash
   mkdir -p ./.claude/tasks/[TASK-ID]/reports
   ```

3. **Save Report File**: After review completion, ALWAYS save the final summary report to:
   - Path: `./.claude/tasks/[TASK-ID]/reports/business-review-summary-report.md`
   - Include: Business context, requirement coverage, gaps found, recommendations, traceability matrix

4. **Confirm Save**: At end of review, display:
   ```
   REPORT SAVED: ./.claude/tasks/[TASK-ID]/reports/business-review-summary-report.md
   ```

**FAILURE TO SAVE REPORT FILE = INCOMPLETE REVIEW**

# Business Logic Review

Review code against business requirements from task specification and identify gaps, edge cases, and potential issues.

**IMPORTANT**: This review focuses EXCLUSIVELY on BUSINESS LOGIC alignment. For code style/clean code review, use `/devkit:review --mode code` instead.

---

## Smart File Exclusion

Apply all exclusion patterns from `./.claude/rules/file-exclusion-patterns.md` to filter out non-reviewable files (tests, generated code, configs, dependencies, assets, etc.).

---

## Input Validation

### Validate Arguments

**Step 1: Extract Task ID (REQUIRED)**

Parse `--task [TASK-ID]` from args.

If `--task` not found:
  - Show error: "Task ID is required for business review"
  - Show usage: `/devkit:review --mode business --task [TASK-ID] [target]`
  - Use `AskUserQuestion` to get task ID
  - Do not proceed without task ID

If task-id provided:
  - Verify task exists: `test -d "./.claude/tasks/[TASK-ID]" && echo "EXISTS" || echo "MISSING"`

  If MISSING:
    - Show error: "Task not found: [TASK-ID]"
    - List available tasks: `ls -d ./.claude/tasks/*/ 2>/dev/null | head -10`
    - Use `AskUserQuestion` to ask for correct task-id
    - Do not proceed

**Step 2: Determine Review Target**

After removing `--task [TASK-ID]`, parse remaining arguments:

**If no target specified:**
  Use `AskUserQuestion`:
  - Specific file path
  - Folder/directory path
  - Git changed files (--changed)
  - All files from task plan

**If `--changed` specified:**
  Parse change scope:
  - `--changed` or `--changed all` → All uncommitted changes
  - `--changed staged` → Only staged files
  - `--changed HEAD~N` → Changes from last N commits

  Get changed files:
  ```bash
  git diff --name-only HEAD 2>/dev/null | grep -E "\.(ts|tsx|js|jsx|py|go|rs|java)$"
  ```

**If file path specified:** Validate file exists and read it.

**If folder path specified:** Find all code files in folder.

---

## Phase 1: Load Business Context

### Read Task Requirements

Load ALL requirement files from task:

```bash
ls -la ./.claude/tasks/[TASK-ID]/requirements/
```

Read critical files:
1. `./.claude/tasks/[TASK-ID]/requirements/01-functional.md` (Primary requirements)
2. `./.claude/tasks/[TASK-ID]/requirements/10-notes.md` (Decisions, constraints)
3. `./.claude/tasks/[TASK-ID]/plan/plan.md` (Implementation plan if exists)

### Extract Business Rules

From requirements, extract:
- **Functional Requirements (FR-xxx)**: What the system MUST do
- **Non-Functional Requirements (NFR-xxx)**: Performance, security constraints
- **Acceptance Criteria**: How to verify each requirement
- **Business Constraints**: Limitations, edge cases mentioned
- **Decisions**: Agreed approaches and rationale

```
════════════════════════════════════════════════════════════════════
                    BUSINESS CONTEXT LOADED
════════════════════════════════════════════════════════════════════

TASK: [TASK-ID]
TITLE: [Task title from requirements]

FUNCTIONAL REQUIREMENTS: [count]
  - FR-001: [description]
  - FR-002: [description]

NON-FUNCTIONAL REQUIREMENTS: [count]
  - NFR-001: [description]

KEY DECISIONS:
  - [Decision 1]

CONSTRAINTS:
  - [Constraint 1]

════════════════════════════════════════════════════════════════════
```

---

## Phase 2: Code Analysis Against Requirements

### For Each File, Analyze:

```
════════════════════════════════════════════════════════════════════
                    BUSINESS LOGIC ANALYSIS
════════════════════════════════════════════════════════════════════

FILE: [file path]
RELATED REQUIREMENTS: [FR-xxx, FR-yyy]

REQUIREMENT COVERAGE CHECK:

1. REQUIREMENT ALIGNMENT
   □ Does implementation match FR-xxx description?
   □ Does implementation satisfy acceptance criteria?
   □ Are all required behaviors implemented?
   □ Are optional features correctly omitted?

2. BUSINESS RULES VALIDATION
   □ Are business calculations correct?
   □ Are validation rules properly enforced?
   □ Are state transitions handled correctly?
   □ Are authorization rules implemented?

3. EDGE CASE COVERAGE
   □ Empty/null input handling?
   □ Boundary conditions (min/max values)?
   □ Error scenarios from requirements?
   □ Concurrent access scenarios?
   □ Timeout/failure handling?

4. DATA INTEGRITY
   □ Required fields validated?
   □ Data formats enforced?
   □ Referential integrity maintained?
   □ Transaction boundaries correct?

5. SECURITY REQUIREMENTS (if applicable)
   □ Authentication implemented per NFR?
   □ Authorization checks in place?
   □ Input sanitization complete?
   □ Sensitive data protected?

6. PERFORMANCE REQUIREMENTS (if applicable)
   □ NFR performance targets achievable?
   □ Pagination/limits implemented?
   □ Caching strategy aligned with requirements?

════════════════════════════════════════════════════════════════════
```

---

## Phase 3: Identify Gaps & Issues

```
════════════════════════════════════════════════════════════════════
                    BUSINESS LOGIC GAPS FOUND
════════════════════════════════════════════════════════════════════

SUMMARY:
  Total Files: [X]
  Files with Gaps: [Y]
  Total Issues: [Z]

GAPS BY SEVERITY:
  Critical: [count] - Requirement not implemented, business logic wrong
  Major: [count] - Partial implementation, missing edge cases
  Minor: [count] - Improvement suggestions, minor gaps

DETAILED GAPS:

[FILE: path/to/file.ts]

1. [CRITICAL] Missing Requirement Implementation
   Requirement: FR-003 - "Users must be able to cancel orders within 24 hours"
   Issue: No cancellation logic found in OrderService
   Impact: Core feature missing, users cannot cancel orders
   Suggested Fix: Implement cancelOrder() method with time validation

2. [MAJOR] Edge Case Not Handled
   Requirement: FR-001 - "Calculate order total with discounts"
   Issue: No handling for negative discount values (Line 45)
   Code: `const total = subtotal - discount;`
   Suggested Fix: Add validation: `Math.max(0, discount)` or throw error

MISSING EDGE CASES:
  - What happens when user submits empty cart?
  - What happens when payment fails mid-transaction?

UNCOVERED REQUIREMENTS:
  - FR-007: Wishlist functionality - No implementation found
  - FR-008: Order history pagination - Only returns all records

════════════════════════════════════════════════════════════════════
```

---

## Phase 4: Recommendations

Use `AskUserQuestion`:
```
Question: How should I proceed with the identified gaps?
Header: Fix Strategy
Options:
  - Generate fix suggestions for all gaps
  - Create new requirements for missing edge cases
  - Show detailed analysis for each gap
  - Export report to task folder
```

For each gap when generating fixes:
1. Show the current code
2. Explain the business requirement
3. Provide corrected implementation
4. Explain how fix satisfies requirement

---

## Phase 5: Final Report

### 5.1 Generate Report Content

```
════════════════════════════════════════════════════════════════════
                    BUSINESS REVIEW COMPLETE
════════════════════════════════════════════════════════════════════

TASK: [TASK-ID]
FILES REVIEWED: [X]

REQUIREMENT COVERAGE:
  Implemented: [X] of [Y] requirements
  Partial: [X] requirements
  Missing: [X] requirements

GAPS IDENTIFIED:
  Critical: [X]
  Major: [X]
  Minor: [X]

EDGE CASES MISSING: [X]

REQUIREMENT TRACEABILITY:
  | Requirement | Status | Files | Notes |
  |-------------|--------|-------|-------|
  | FR-001 | Implemented | auth.ts | - |
  | FR-002 | Partial | order.ts | Missing validation |
  | FR-003 | Missing | - | Not implemented |

NEXT STEPS:
  1. Fix critical gaps immediately
  2. Add edge case handling for major gaps
  3. Update requirements if new edge cases discovered
  4. Run /devkit:review --mode code for code style compliance

════════════════════════════════════════════════════════════════════
```

### 5.2 MANDATORY: Save Report to File

```bash
mkdir -p ./.claude/tasks/[TASK-ID]/reports
```

Save complete report to: `./.claire/tasks/[TASK-ID]/reports/business-review-summary-report.md`

Use the Write tool. Include: business context, all gaps, recommendations, traceability matrix.

### 5.3 Confirm Report Saved

```
REPORT SAVED: ./.claude/tasks/[TASK-ID]/reports/business-review-summary-report.md
```

---

## Quick Reference - Business Review Focus

During review, focus ONLY on:
1. **Requirement Coverage** - All FR/NFR items addressed
2. **Acceptance Criteria** - Each criterion verifiable in code
3. **Edge Cases** - Boundary conditions, empty states, error scenarios
4. **Business Rules** - Calculations, validations, business constraints
5. **Data Integrity** - Required fields, formats, transactions
6. **Business Workflows** - State transitions, process flows
7. **Domain Logic** - Business-specific behavior correctness

**NOT in scope** (use `/devkit:review --mode code` instead):
- Code style and formatting
- Naming conventions
- Function size/complexity
- SOLID principles
- General best practices
