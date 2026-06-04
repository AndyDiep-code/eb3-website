---
name: devkit:solution-visual-brief
description: "Generate a comprehensive Solution Architecture Visual Brief from a client's technical brief or requirements document. Use this skill when: the user uploads a client brief, RFP, or requirements document and wants a full presale proposal with visual diagrams; when someone asks to 'create a visual brief', 'generate a proposal', 'analyze this client brief', 'create solution architecture from this document'; when the user provides a project brief and wants C4 diagrams, sequence diagrams, module breakdowns, feature lists, or customer discovery questions; or when building any presale/scoping response document with Mermaid diagrams. This skill produces a complete markdown document with verified data, Mermaid diagrams (flowcharts, sequence diagrams, C4 model, class diagrams), and business-focused customer discovery questions. Always use this skill for presale solution architecture work — it enforces data accuracy, source citations, and a proven document structure."
user-invocable: true
when_to_use: "Invoke to generate a solution architecture visual brief from a client brief or RFP."
category: plan
keywords: [solution, architecture, presale, diagrams, mermaid, brief]
---

# Solution Visual Brief Generator

Generate a complete Solution Architecture Visual Brief from a client's technical brief or requirements document. The output is a comprehensive markdown document with Mermaid diagrams ready for developer engagement and scoping.

## When to Use

- User uploads a client brief / RFP / technical requirements document
- User asks for a "visual brief", "solution architecture proposal", "presale proposal", "scoping document"
- User wants to transform a client document into a structured proposal with diagrams
- User needs C4 model, sequence diagrams, or module breakdowns from a requirements doc

## Step 1: Read Inputs

**Required input:** The client's brief (uploaded document — .docx, .pdf, or .md)

Read the client's document completely before starting. Extract every fact. Do NOT begin writing until you have read the entire source document.

## Step 2: Read the Template

Read the reference template before generating:

Load: `references/template.md`

This template defines the exact structure, section order, and content requirements for the output document.

## Step 3: Extract Facts from Client Brief

Before writing anything, create a mental inventory of every fact stated in the client's brief. Organize into:

1. **Client identity:** Name, location, industry, team size
2. **Current systems:** Every tool/system mentioned with its role
3. **Roles:** Every person/role mentioned with documented responsibilities
4. **Business data:** Every measurable data point (volumes, sizes, frequencies, failure rates)
5. **Friction points:** Every pain point / problem, in the client's priority order
6. **Modules / features requested:** What the client wants built, in their stated order
7. **Technical constraints:** Data residency, security, compliance, integration requirements
8. **Scoping response:** What the client explicitly asks the developer to respond with

**CRITICAL RULES:**
- Every data point in the output MUST be traceable to a specific section of the client's brief
- Use `v3 X.X` or `Brief Section X` format for source citations
- If a fact is NOT in the client's brief, do NOT include it
- If you add your own recommendation, ALWAYS label it as "our recommendation — not from client brief"

## Step 4: Generate the Document

Follow the template structure exactly. The section order is:

```
0. Project Introduction (10 sub-sections — all verified against brief)
1. User Flow — Business Lifecycle (overview flowchart + per-stage details + friction summary)
2. C4 Model (C1 system context + C2 containers + C3 components)
3. Platform Architecture (shared layers + modules diagram)
4. System Architecture Diagram (data residency boundary + all flows)
5. Modules (one detailed sub-section per module, each with sequence diagram)
   5.x Module Dependency & Build Roadmap
   5.x External System Integration Research (web search required)
   5.x AI Invocation Registry
   5.x Responsibility Matrix (Backend × Frontend × AI)
6. Dependency Matrix
7. Known Constraints & Open Questions (privacy table + customer discovery questions)
8. Feature List (shared platform + per-module + summary counts)
9. Scoping Response Checklist (client's requirements verbatim + our notes)
```

## Section-by-Section Instructions

### Section 0: Project Introduction

Must contain exactly these sub-sections:

| Sub-section | Content | Rules |
|---|---|---|
| The Client | Identity, location, industry, team size | Only facts from brief |
| Current Systems & Tools | Every system/tool with role, source citation, decommission notes | Table format |
| Client Roles | Every role with documented responsibilities | Only roles mentioned in brief |
| Key Business Data | Every measurable data point with value and source | Table with source column |
| The Problem — All Friction Points | Every pain point in client's priority order | Include current process + failure mode |
| The Solution | Platform concept, ecosystem, constraints | Quote brief where possible |
| Design Principle | Verbatim from brief if exists | Blockquote format |
| Technical Constraints | Every constraint with source | Table with source column |
| Product Outcomes | Module-by-module: what client gets vs what it replaces | Table format |
| Scoping Response Requested | Client's scoping items verbatim | Numbered list, add our notes in italics |

### Section 1: User Flow

- **1.1 Overview Flow:** Mermaid flowchart with subgraphs per stage. Each stage node shows key details from the brief. Module targets as annotated callout nodes with color coding (red = critical, yellow = high, blue = medium, green = resolved).
- **1.2 Stage Details:** One sub-section per business process stage from the brief. Include decision-tree flowcharts for stages with branching logic. Each stage ends with a blockquote callout identifying the module target.
- **1.3 Friction Point Summary:** Table with priority, stage, friction, frequency, module.

### Section 2: C4 Model

- **C1 — System Context:** Users + platform (single box) + all external systems. Use emoji for user roles (👤). Platform described in 2-3 lines.
- **C2 — Container Diagram:** Web app, backend API, shared services, AI service, database. Show technology choices. Label Reference Data as "part of Backend API" if applicable.
- **C3 — Component Diagram:** Zoom into backend API showing per-module controllers + core services. Show AI orchestration as a separate service if applicable. Add note clarifying which components belong where.

### Section 5: Modules

Every module follows this template:

```
### 5.[N] Module [N]: [Name]

**Priority:** #[N]
**Phase:** [N]
**AI required:** [Yes/No — which services]
**Key integration:** [External systems]

#### Description
[2-3 paragraphs: what it does, current pain, what changes]

#### [Current Workflow — if replacing existing process]
[Mermaid flowchart of current state with pain annotations]

#### Sequence Diagram
[Mermaid sequence diagram: user → platform → AI → external → audit]

#### [Data Schema — if producing structured output]
[Table or classDiagram]

#### [System Prompt Design — if using AI]
[Numbered list of prompt requirements from brief]

#### Key Rules
[Bullet list with source citations]

#### Open Questions for Client
[Table: ID, question, impact]
```

### Section 7: Customer Discovery Questions

Questions must be:
- **Business-focused, not technical** — the client is a domain expert, not an engineer
- **Grouped by topic** (A-J categories typical): Volumes, per-module workflows, existing systems, users/access, compliance, budget/timeline
- **Each question has "Why we need this"** explaining business impact in plain language
- **End with summary table** counting questions per category

### Section 8: Feature List

- Feature IDs: `P-XX` for shared platform, `M[N]-XX` for module-specific
- Every feature has: ID, description, layer/module, phase
- End with summary count table

## Mermaid Diagram Rules

These rules prevent rendering errors:

1. **Sequence diagrams:** NO `<br/>`, em dashes (`—`), or arrows (`→`) in participant names or message text. Use plain text only.
2. **Graph/flowchart diagrams:** `<br/>` IS allowed inside `["node text"]` — but NOT `→` or `—`
3. **All diagrams:** Use color-coded styles for visual grouping:
   - Critical/high priority: `fill:#FAEEDA,stroke:#854F0B,color:#412402` (warm)
   - Pain/risk: `fill:#FCEBEB,stroke:#A32D2D,color:#501313` (red)
   - Standard: `fill:#E6F1FB,stroke:#185FA5,color:#042C53` (blue)
   - AI services: `fill:#FAECE7,stroke:#993C1D,color:#4A1B0C` (orange)
   - Success/complete: `fill:#EAF3DE,stroke:#3B6D11,color:#173404` (green)
   - Auth/audit: `fill:#FBEAF0,stroke:#993556,color:#4B1528` (pink)
   - Future: `fill:#EEEDFE,stroke:#534AB7,color:#26215C` (purple)

## External Research

For external system integrations (e.g., the client's practice management API, calendar API, transcription service), use **web_search** to find:
- API documentation URLs
- Webhook/event availability
- Pricing / setup fees
- Rate limits and pagination
- Authentication methods
- Data residency options

Label all research findings as "**our independent research** — not from the client's brief."

## Pre-Delivery Verification

Before presenting the final document, verify:

| # | Check |
|---|---|
| 1 | Every module matches the client's priority order |
| 2 | Every data point has a source citation |
| 3 | No facts hallucinated — every claim traceable to brief |
| 4 | Our recommendations clearly labeled |
| 5 | Client's original options acknowledged (even if we chose one) |
| 6 | Scoping checklist matches client's brief verbatim |
| 7 | All Mermaid diagrams clean (no special chars in sequence diagrams) |
| 8 | No carryover from previous brief versions |
| 9 | Privacy/security requirements fully captured |
| 10 | Decommission requirements captured (if replacing systems) |
| 11 | Customer discovery questions are business-focused |
| 12 | Feature list covers all modules + shared platform |
| 13 | Responsibility matrix accounts for all modules |
| 14 | Dependency matrix covers all shared layers |

## Output

Save the final document to `./[Client_Name]_Visual_Brief.md` in the current working directory and present to user.
