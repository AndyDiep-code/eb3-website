---
description: Generate comprehensive solution blueprint from codebase analysis for enterprise client proposals
argument-hint: [client-name] | [industry] | [project-type]
allowed-tools: Read, Write, Bash, Glob, Grep, Task, Skill, AskUserQuestion, WebSearch, WebFetch
---

<!--
Usage: /presale:generate-solution [client-name] [industry]
Example: /presale:generate-solution "PURESHROOMS" "e-commerce"
Example: /presale:generate-solution "FinTech Startup" "fintech"
Example: /presale:generate-solution "HealthCare Corp" "healthtech"
-->

Ultrathink

# Solution Blueprint Generation

Generate comprehensive solution architecture documentation for enterprise client proposals.

## Skills Applied
- **chief-architect-presale** - Core solution design expertise
- **research** - Technology and market research
- **sequential-thinking** - Structured analysis approach
- **api-design-principles** - API architecture guidance

## Agents Used
- **solution-architect** - Primary document generation
- **researcher** - Technology research and best practices

---

## Phase 1: Input Collection

### Client Information

If $ARGUMENTS provided, parse:
- `$1`: Client name
- `$2`: Industry (e-commerce, fintech, healthtech, saas, marketplace)
- `$3`: Project type (migration, greenfield, modernization)

```
Question: What client is this solution for?
Header: Client
Options:
  - I'll provide client name
  - Use existing analysis (from /presale:analyze)
  - Generic template (fill in later)
```

### Gather Context

```
Question: What industry is the client in?
Header: Industry
Options:
  - E-Commerce / Retail
  - FinTech / Financial Services
  - HealthTech / Healthcare
  - SaaS / Enterprise Software
  - Marketplace / Platform
  - Other (I'll specify)
```

```
Question: What type of project is this?
Header: Project
Options:
  - Platform migration (existing → new)
  - Greenfield development (new system)
  - System modernization (refactor/upgrade)
  - Integration project (connect systems)
```

---

## Phase 2: Load Skills & References

**Activate Skills:**

```
Skill("chief-architect-presale")
Skill("research")
```

**Load Template:**

```bash
# Read solution blueprint template
cat .claude/skills/chief-architect-presale/templates/solution-blueprint-template.md
```

**Load Industry Reference:**

```bash
# Load industry-specific guidance based on $INDUSTRY
cat .claude/skills/chief-architect-presale/references/[industry]-solution-design.md
```

---

## Phase 3: Research Phase

**Spawn:** `researcher` agent

### Technology Research

```
Research the following for [CLIENT] [INDUSTRY] solution:

1. Industry best practices (2024-2025)
2. Recommended technology stack
3. Compliance requirements
4. Competitor solutions
5. Market benchmarks

Focus areas:
- Performance expectations
- Security requirements
- Scalability patterns
- Integration standards

generate_report: false
```

### Research Output

```
════════════════════════════════════════════════════════════════════
                    🔍 RESEARCH FINDINGS
════════════════════════════════════════════════════════════════════

INDUSTRY: [industry]

BEST PRACTICES:
  1. [Practice 1]
  2. [Practice 2]
  3. [Practice 3]

RECOMMENDED STACK:
  Frontend: [recommendation]
  Backend: [recommendation]
  Database: [recommendation]
  Infrastructure: [recommendation]

COMPLIANCE:
  - [Requirement 1]
  - [Requirement 2]

BENCHMARKS:
  - Performance: [metric]
  - Uptime: [metric]
  - Cost: [range]

════════════════════════════════════════════════════════════════════
```

---

## Phase 4: Solution Design

**Apply:** `chief-architect-presale` skill
**Apply:** `sequential-thinking` skill

### Thought 1: Current State Analysis

```
Analyze existing state:
- Current platform limitations
- Pain points and challenges
- Business impact of issues
- Technical constraints
```

### Thought 2: Proposed Architecture

```
Design target architecture:
- System context diagram
- Container diagram
- Key components
- Integration points
```

### Thought 3: Technology Selection

```
Select technology stack:
- Frontend framework
- Backend platform
- Database(s)
- Caching layer
- Cloud provider
- Third-party services

Each with rationale.
```

### Thought 4: Implementation Approach

```
Plan implementation:
- Phase 1: Discovery & Design
- Phase 2: MVP Development
- Phase 3: Testing & Optimization
- Phase 4: Launch & Support

With timeline and team composition.
```

### Thought 5: Risk Assessment

```
Identify risks:
- Technical risks
- Business risks
- Timeline risks
- Budget risks

With mitigation strategies.
```

---

## Phase 5: Generate Solution Blueprint

**Spawn:** `solution-architect` agent

### Document Structure

```markdown
# Solution Blueprint: [CLIENT NAME] [PROJECT NAME]

**Prepared For:** [Client Contact, Title]
**Prepared By:** [Your Company] Solution Architecture Team
**Date:** [Date]
**Version:** 1.0
**Confidential**

---

## Executive Summary

[2-3 paragraph overview]

**Client Challenge:**
[Pain points and business impact]

**Proposed Solution:**
[High-level solution approach]

**Key Benefits:**
- [Benefit 1 with metric]
- [Benefit 2 with metric]
- [Benefit 3 with metric]

**Investment & Timeline:**
- Initial Development: $[X]-$[Y] over [N] weeks
- Ongoing Operational: $[X]/month
- Expected ROI: [X]%

---

## 1. Current State Analysis
[From Phase 4, Thought 1]

## 2. Proposed Solution
[From Phase 4, Thought 2]

## 3. Technical Architecture
[From Phase 4, Thought 2 & 3]

## 4. Security & Compliance
[Industry-specific requirements]

## 5. Scalability & Performance
[Performance targets and scaling strategy]

## 6. Implementation Plan
[From Phase 4, Thought 4]

## 7. Team Composition
[Roles, allocation, rates]

## 8. Cost Estimation
[Detailed cost breakdown]

## 9. Risk Assessment
[From Phase 4, Thought 5]

## 10. Success Criteria
[KPIs and acceptance criteria]

## 11. Next Steps
[Immediate actions and decision points]

---

## Appendices
- Glossary
- Case Studies
- Team Profiles
- References
```

---

## Phase 6: Output & Save

### Output Location

```bash
# Create output directory
mkdir -p ./docs/presale/[client-slug]

# Generate filename with timestamp
TIMESTAMP=$(date +%y%m%d-%H%M)
FILENAME="solution-blueprint-${TIMESTAMP}.md"
```

### Save Document

Write to: `./docs/presale/[client-slug]/solution-blueprint-[date].md`

---

## Phase 7: Summary

```
════════════════════════════════════════════════════════════════════
            ✅ SOLUTION BLUEPRINT GENERATED
════════════════════════════════════════════════════════════════════

CLIENT: [client-name]
INDUSTRY: [industry]
PROJECT TYPE: [project-type]

OUTPUT:
  📄 ./docs/presale/[client-slug]/solution-blueprint-[date].md

DOCUMENT SECTIONS:
  ✓ Executive Summary
  ✓ Current State Analysis
  ✓ Proposed Solution
  ✓ Technical Architecture
  ✓ Security & Compliance
  ✓ Scalability & Performance
  ✓ Implementation Plan
  ✓ Team Composition
  ✓ Cost Estimation
  ✓ Risk Assessment
  ✓ Success Criteria

NEXT STEPS:
  1. Review and customize solution blueprint
  2. Add client-specific details and constraints
  3. Generate supporting documents:

RECOMMENDED COMMANDS:
  → /presale:generate-proposal "[client-name]"
  → /presale:generate-case-study "[similar-project]"

════════════════════════════════════════════════════════════════════
```

---

## Important Notes

- **IMPORTANT:** Always quantify benefits and metrics
- **IMPORTANT:** Use C4 model for architecture diagrams
- **IMPORTANT:** Include risk mitigation strategies
- **IMPORTANT:** Tailor language for target audience (CTO vs CEO)
- **IMPORTANT:** Reference similar case studies when available
- **IMPORTANT:** Verify cost estimates against current market rates
