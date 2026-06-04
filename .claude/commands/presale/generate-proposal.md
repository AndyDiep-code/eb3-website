---
description: Generate quick development proposal (5-10 pages) for enterprise client with timeline and cost estimation
argument-hint: [client-name] | [project-scope] | [budget-range]
allowed-tools: Read, Write, Bash, Glob, Grep, Task, Skill, AskUserQuestion, WebSearch
---

<!--
Usage: /presale:generate-proposal [client-name] [project-scope]
Example: /presale:generate-proposal "PURESHROOMS" "e-commerce migration"
Example: /presale:generate-proposal "FinTech Startup" "lending platform"
Example: /presale:generate-proposal "HealthCare Corp" "patient portal"
-->

Ultrathink

# Quick Development Proposal Generation

Generate 5-10 page development proposal with executive summary, technical approach, timeline, and cost estimation.

## Skills Applied
- **chief-architect-presale** - Proposal structure and content
- **plan** - Timeline and resource planning
- **research** - Market rates and technology context

## Agents Used
- **solution-architect** - Technical content and architecture
- **project-manager** - Timeline and team composition

---

## Phase 1: Input Collection

### Client & Project Information

If $ARGUMENTS provided, parse:
- `$1`: Client name
- `$2`: Project scope/description
- `$3`: Budget range (optional)

```
Question: What's the client and project?
Header: Client
Options:
  - I'll provide client name and project details
  - Use existing solution blueprint
  - Start fresh (interview mode)
```

### Budget Range

```
Question: What's the target budget range?
Header: Budget
Options:
  - $20K - $50K (Small project, 8-12 weeks)
  - $50K - $100K (Medium project, 12-20 weeks)
  - $100K - $200K (Large project, 20-30 weeks)
  - $200K+ (Enterprise project, 6+ months)
  - Client will determine (present options)
```

### Target Audience

```
Question: Who is the primary reader?
Header: Audience
Options:
  - CEO/CFO (Business focus, ROI emphasis)
  - CTO/CIO (Technical depth, architecture)
  - Procurement (Cost breakdown, SLAs)
  - Mixed (All stakeholders)
```

---

## Phase 2: Load Skills & Context

**Activate Skills:**

```
Skill("chief-architect-presale")
Skill("plan")
```

**Check Existing Assets:**

```bash
# Check for existing solution blueprint
ls ./docs/presale/[client-slug]/ 2>/dev/null

# Check for analysis report
ls ./docs/presale/analysis/ 2>/dev/null
```

---

## Phase 3: Proposal Framework

### Proposal Structure (5-10 Pages)

```
════════════════════════════════════════════════════════════════════
                    📋 PROPOSAL OUTLINE
════════════════════════════════════════════════════════════════════

PAGE 1: EXECUTIVE SUMMARY (1 page)
  - Client challenge
  - Proposed solution
  - Key benefits (3-5 bullets)
  - Investment summary
  - Timeline overview

PAGES 2-4: TECHNICAL APPROACH (2-3 pages)
  - Solution overview
  - Architecture diagram
  - Technology stack (table)
  - Integration points
  - Security & compliance

PAGES 5-6: IMPLEMENTATION PLAN (1-2 pages)
  - Phase breakdown
  - Timeline visualization
  - Team composition
  - Milestones & deliverables

PAGES 7-8: COST ESTIMATION (1-2 pages)
  - Development costs (by phase)
  - Infrastructure costs
  - Ongoing maintenance
  - Payment schedule
  - Investment summary

PAGES 9-10: SUCCESS & NEXT STEPS (1-2 pages)
  - Success criteria
  - Risk mitigation
  - Why us (differentiators)
  - Immediate next steps
  - Contact information

════════════════════════════════════════════════════════════════════
```

---

## Phase 4: Content Generation

### 1. Executive Summary

```markdown
## Executive Summary

### Client Challenge
[2-3 sentences describing the problem and business impact]

### Proposed Solution
[2-3 sentences describing the solution approach]

### Key Benefits
- **[Benefit 1]:** [Quantified value]
- **[Benefit 2]:** [Quantified value]
- **[Benefit 3]:** [Quantified value]

### Investment & Timeline
| Category | Value |
|----------|-------|
| **Initial Development** | $[X] - $[Y] |
| **Timeline** | [N] weeks |
| **Ongoing (Monthly)** | $[X] |
| **Expected ROI** | [X]% |
```

### 2. Technical Approach

```markdown
## Technical Approach

### Solution Overview
[Paragraph describing the solution architecture]

### Architecture

┌─────────────────────────────────────────┐
│            [Frontend]                   │
└───────────────────┬─────────────────────┘
                    │
┌───────────────────▼─────────────────────┐
│            [API Layer]                  │
└─────┬─────────────┬─────────────────────┘
      │             │
┌─────▼───┐   ┌─────▼───┐
│[Database]│   │[Services]│
└─────────┘   └─────────┘

### Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | [Tech] | [Why] |
| Backend | [Tech] | [Why] |
| Database | [Tech] | [Why] |
| Hosting | [Tech] | [Why] |

### Integrations
- [Integration 1]: [Purpose]
- [Integration 2]: [Purpose]

### Security & Compliance
- [Requirement 1]
- [Requirement 2]
```

### 3. Implementation Plan

```markdown
## Implementation Plan

### Phased Approach

#### Phase 1: Discovery & Design (Weeks 1-2)
- Requirements validation
- Architecture design
- Team onboarding
**Deliverables:** Technical specification, architecture diagrams

#### Phase 2: MVP Development (Weeks 3-10)
- Core features development
- API implementation
- Frontend development
**Deliverables:** Working MVP, staging environment

#### Phase 3: Testing & Optimization (Weeks 11-12)
- QA testing
- Performance optimization
- Security audit
**Deliverables:** Test reports, production-ready application

#### Phase 4: Launch & Support (Week 13+)
- Data migration
- Production deployment
- Training & documentation
**Deliverables:** Live application, user documentation

### Timeline Visualization

Week 1-2:   ████ Discovery
Week 3-10:  ████████████████████████████████ Development
Week 11-12: ████ Testing
Week 13+:   ████ Launch
            └──────────────────────────────────┘
            Total: 13-16 weeks

### Team Composition

| Role | Allocation | Responsibility |
|------|------------|----------------|
| Solution Architect | 10% | Architecture, technical decisions |
| Tech Lead | 100% | Team leadership, code reviews |
| Senior Developers | 200% (2 FTE) | Core development |
| Frontend Developer | 100% | UI implementation |
| QA Engineer | 50% | Testing, quality assurance |
| DevOps | 25% | Infrastructure, deployment |
| Project Manager | 25% | Coordination, communication |
```

### 4. Cost Estimation

```markdown
## Cost Estimation

### Development Costs

| Phase | Duration | Cost |
|-------|----------|------|
| Discovery & Design | 2 weeks | $[X] |
| MVP Development | 8 weeks | $[X] |
| Testing & Optimization | 2 weeks | $[X] |
| Launch & Support | 2 weeks | $[X] |
| **Total Development** | **14 weeks** | **$[TOTAL]** |

### Infrastructure Costs (Monthly)

| Service | Cost/Month |
|---------|------------|
| Hosting | $[X] |
| Third-party services | $[X] |
| Monitoring | $[X] |
| **Total Monthly** | **$[TOTAL]** |

### Maintenance & Support (Optional)

| Package | Hours/Month | Cost/Month |
|---------|-------------|------------|
| Basic | 10 hrs | $[X] |
| Standard | 20 hrs | $[X] |
| Premium | 40 hrs | $[X] |

### Investment Summary

| Category | Year 1 | Year 2 | Year 3 |
|----------|--------|--------|--------|
| Development | $[X] | - | - |
| Infrastructure | $[X] | $[X] | $[X] |
| Maintenance | $[X] | $[X] | $[X] |
| **Total** | **$[X]** | **$[X]** | **$[X]** |
| **3-Year TCO** | | | **$[TOTAL]** |

### Payment Schedule

| Milestone | % | Amount | Trigger |
|-----------|---|--------|---------|
| Project Kickoff | 30% | $[X] | Contract signed |
| MVP Delivery | 40% | $[X] | MVP approved |
| Production Launch | 25% | $[X] | Go-live complete |
| Warranty End | 5% | $[X] | 30 days post-launch |
```

### 5. Success Criteria & Next Steps

```markdown
## Success Criteria

### Technical Metrics

| Metric | Target |
|--------|--------|
| Page Load Time | < 2.0s |
| API Response Time | < 200ms |
| Uptime | 99.9% |
| Error Rate | < 0.1% |

### Business Metrics

| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| [Metric 1] | [X] | [Y] | 3 months |
| [Metric 2] | [X] | [Y] | 6 months |

## Why [Your Company]

- **[Differentiator 1]:** [Description]
- **[Differentiator 2]:** [Description]
- **[Differentiator 3]:** [Description]

### Relevant Experience
- [Case study 1]: [Brief result]
- [Case study 2]: [Brief result]

## Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| [Risk 1] | Medium | High | [Strategy] |
| [Risk 2] | Low | Medium | [Strategy] |

## Next Steps

1. **This Week:** Review proposal, schedule follow-up
2. **Week 2:** Technical deep-dive session
3. **Week 3:** Contract negotiation
4. **Week 4:** Project kickoff

**Contact:**
[Name], [Title]
[Email] | [Phone]
[Calendar link]
```

---

## Phase 5: Output & Save

### Output Location

```bash
# Create output directory
mkdir -p ./docs/presale/[client-slug]

# Generate filename
TIMESTAMP=$(date +%y%m%d)
FILENAME="proposal-${TIMESTAMP}.md"
```

### Save Proposal

Write to: `./docs/presale/[client-slug]/proposal-[date].md`

---

## Phase 6: Summary

```
════════════════════════════════════════════════════════════════════
            ✅ PROPOSAL GENERATED
════════════════════════════════════════════════════════════════════

CLIENT: [client-name]
PROJECT: [project-scope]
BUDGET RANGE: $[min] - $[max]

OUTPUT:
  📄 ./docs/presale/[client-slug]/proposal-[date].md

PROPOSAL SECTIONS:
  ✓ Executive Summary (1 page)
  ✓ Technical Approach (2-3 pages)
  ✓ Implementation Plan (1-2 pages)
  ✓ Cost Estimation (1-2 pages)
  ✓ Success Criteria & Next Steps (1-2 pages)

TOTAL PAGES: [X] pages

NEXT STEPS:
  1. Review and customize proposal
  2. Add client-specific details
  3. Prepare presentation version
  4. Schedule client meeting

SUPPORTING DOCUMENTS:
  → /presale:generate-solution for detailed blueprint
  → /presale:generate-case-study for similar projects

════════════════════════════════════════════════════════════════════
```

---

## Important Notes

- **IMPORTANT:** Keep proposal to 5-10 pages (concise but comprehensive)
- **IMPORTANT:** Quantify all benefits and costs
- **IMPORTANT:** Tailor language to primary audience
- **IMPORTANT:** Include clear next steps and call-to-action
- **IMPORTANT:** Reference relevant case studies
- **IMPORTANT:** Provide budget range (not fixed quote)
- **IMPORTANT:** Include contingency in cost estimates
