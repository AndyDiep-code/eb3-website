---
description: Analyze codebase to extract domain model, architecture patterns, and technical insights for presale documentation
argument-hint: [source-path] | [focus-areas]
allowed-tools: Read, Write, Bash, Glob, Grep, Task, Skill, AskUserQuestion
---

<!--
Usage: /presale:analyze [source-path] [focus-areas]
Example: /presale:analyze ./src "e-commerce,subscriptions,payments"
Example: /presale:analyze ../legacy-app
Example: /presale:analyze . "authentication,api-design"
-->

# Codebase Analysis for Presale Documentation

Analyze source code to extract insights for solution blueprints, migration proposals, and technical documentation.

## Skills Applied
- **chief-architect-presale** - Domain solution design expertise
- **repomix** - Codebase summary generation
- **research** - Best practices and industry context
- **scout** - File and pattern discovery

## Agents Used
- **solution-architect** - Technical analysis and documentation

---

## Phase 1: Input Validation

### Determine Source Path

If $ARGUMENTS provided, parse:
- `$1`: Source path (default: current directory `.`)
- `$2`: Focus areas (comma-separated, optional)

```
Question: What should I analyze?
Header: Source
Options:
  - Current project (.)
  - Specify path (I'll provide it)
  - External project (clone first)
```

### Validate Path

```bash
# Check if path exists
ls -la $SOURCE_PATH 2>/dev/null || echo "Path not found"
```

---

## Phase 2: Generate Codebase Summary

**Apply:** `repomix` skill

### Generate Compaction

```bash
# Ensure .repomixignore is in place
cp .claude/.repomixignore $SOURCE_PATH/.repomixignore 2>/dev/null || true

# Generate codebase summary
cd $SOURCE_PATH && repomix --output ./repomix-output.xml
```

### Extract Key Metrics

```
════════════════════════════════════════════════════════════════════
                    📊 CODEBASE METRICS
════════════════════════════════════════════════════════════════════

FILES:
  Total: [count]
  Source: [count] ([languages])
  Tests: [count]
  Config: [count]

LINES OF CODE:
  Total: [count]
  Source: [count]
  Comments: [count]
  Test: [count]

DEPENDENCIES:
  Production: [count]
  Development: [count]
  Key frameworks: [list]

════════════════════════════════════════════════════════════════════
```

---

## Phase 3: Architecture Analysis

**Use:** `/scout "prompt"` for pattern discovery

### Discover Architecture Patterns

```
SEARCH PATTERNS:
  - Configuration files (package.json, tsconfig, docker-compose, etc.)
  - Entry points (main, index, app, server)
  - API routes/controllers
  - Database models/schemas
  - Service layers
  - Authentication/authorization
  - External integrations
```

### Architecture Assessment

```
════════════════════════════════════════════════════════════════════
                    🏗️ ARCHITECTURE ANALYSIS
════════════════════════════════════════════════════════════════════

PATTERN: [Monolith | Microservices | Serverless | Hybrid]

LAYERS:
  ┌─────────────────────────────────────────┐
  │ Presentation: [React/Vue/Angular/...]   │
  ├─────────────────────────────────────────┤
  │ API: [REST/GraphQL/gRPC]                │
  ├─────────────────────────────────────────┤
  │ Business Logic: [Services/Handlers]     │
  ├─────────────────────────────────────────┤
  │ Data Access: [ORM/Repository]           │
  ├─────────────────────────────────────────┤
  │ Database: [PostgreSQL/MongoDB/...]      │
  └─────────────────────────────────────────┘

INTEGRATIONS:
  - [Integration 1]: [Purpose]
  - [Integration 2]: [Purpose]

CONCERNS:
  - Authentication: [Method]
  - Authorization: [Method]
  - Caching: [Strategy]
  - Logging: [Approach]

════════════════════════════════════════════════════════════════════
```

---

## Phase 4: Domain Model Extraction

**Apply:** `chief-architect-presale` skill

### Identify Domain Entities

```
════════════════════════════════════════════════════════════════════
                    📋 DOMAIN MODEL
════════════════════════════════════════════════════════════════════

CORE ENTITIES:
  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
  │   [Entity1] │────▶│  [Entity2]  │────▶│  [Entity3]  │
  │  - field1   │     │  - field1   │     │  - field1   │
  │  - field2   │     │  - field2   │     │  - field2   │
  └─────────────┘     └─────────────┘     └─────────────┘

RELATIONSHIPS:
  - [Entity1] → [Entity2]: [relationship type]
  - [Entity2] → [Entity3]: [relationship type]

BUSINESS RULES:
  - [Rule 1]: [Description]
  - [Rule 2]: [Description]

WORKFLOWS:
  1. [Workflow 1]: [Steps]
  2. [Workflow 2]: [Steps]

════════════════════════════════════════════════════════════════════
```

---

## Phase 5: Technical Debt Assessment

### Identify Pain Points

```
════════════════════════════════════════════════════════════════════
                    ⚠️ TECHNICAL DEBT
════════════════════════════════════════════════════════════════════

SEVERITY: HIGH
  - [Issue 1]: [Description]
    Impact: [Business impact]
    Recommendation: [Fix]

SEVERITY: MEDIUM
  - [Issue 2]: [Description]
    Impact: [Business impact]
    Recommendation: [Fix]

SEVERITY: LOW
  - [Issue 3]: [Description]
    Impact: [Business impact]
    Recommendation: [Fix]

MODERNIZATION OPPORTUNITIES:
  1. [Opportunity 1]: [Benefit]
  2. [Opportunity 2]: [Benefit]

════════════════════════════════════════════════════════════════════
```

---

## Phase 6: Generate Analysis Report

### Output Location

```bash
# Create output directory
mkdir -p ./docs/presale/analysis/$(date +%Y%m%d)
```

### Report Structure

```markdown
# Codebase Analysis Report

## Executive Summary
[2-3 paragraphs summarizing key findings]

## 1. Project Overview
- Technology Stack
- Architecture Pattern
- Key Dependencies

## 2. Domain Model
- Core Entities
- Relationships
- Business Rules

## 3. Architecture Assessment
- Current State
- Strengths
- Weaknesses

## 4. Technical Debt
- Critical Issues
- Improvement Opportunities
- Modernization Path

## 5. Integration Points
- External Services
- APIs
- Data Sources

## 6. Recommendations
- Quick Wins
- Strategic Improvements
- Migration Considerations

## Appendices
- File Structure
- Dependency List
- Metrics Summary
```

---

## Phase 7: Summary

```
════════════════════════════════════════════════════════════════════
            ✅ ANALYSIS COMPLETE
════════════════════════════════════════════════════════════════════

SOURCE ANALYZED: $SOURCE_PATH

OUTPUTS:
  📄 ./docs/presale/analysis/[date]/analysis-report.md
  📄 ./repomix-output.xml (codebase compaction)

KEY FINDINGS:
  - Architecture: [pattern]
  - Tech Stack: [summary]
  - Domain Entities: [count]
  - Technical Debt: [severity assessment]
  - Integration Points: [count]

NEXT STEPS:
  1. Review analysis report
  2. Run /presale:generate-solution to create solution blueprint
  3. Run /presale:generate-proposal for client proposal

RECOMMENDED COMMANDS:
  → /presale:generate-solution "[client-name]"
  → /presale:generate-case-study "[project-name]"
  → /presale:generate-proposal "[client-name]"

════════════════════════════════════════════════════════════════════
```

---

## Important Notes

- **IMPORTANT:** Use `repomix` skill to generate codebase summary first
- **IMPORTANT:** Focus analysis on areas relevant to presale (not implementation details)
- **IMPORTANT:** Quantify findings (LOC, file counts, dependency counts)
- **IMPORTANT:** Identify both strengths and weaknesses objectively
- **IMPORTANT:** Extract domain model for solution design
