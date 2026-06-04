<!--
Usage: /devkit:docs --mode capture-knowledge [entry-point]
Example: /devkit:docs --mode capture-knowledge src/services/auth.service.ts
Example: /devkit:docs --mode capture-knowledge "handleUserLogin function"
Example: /devkit:docs --mode capture-knowledge "/api/v1/users"
-->

Enable Ultrathink

**Report Protocol**: Follow ./.claude/CLAUDE.md "Sub-Agent Report Generation" protocol before spawning subagents.

# Capture Knowledge

Analyze code from any entry point and generate comprehensive documentation with visual diagrams.

## Use Cases

- **Onboarding** - Help new developers understand complex systems
- **Documentation** - Generate comprehensive system documentation
- **Debugging** - Understand complete execution flows
- **Refactoring** - Get full context before making changes
- **Knowledge Base** - Create searchable documentation

## ⚠️ Plan Before Executing

**Always create a structured plan and get user approval before making changes.**

1. Analyze the entry point and show analysis plan
2. Present findings and documentation structure
3. Show the knowledge document outline before creating
4. Ask for confirmation before writing files
5. Never create documentation without user approval

## Important: Ask for Clarification

**If anything is unclear, DO NOT GUESS. Ask the user:**

- "What is the specific entry point you want to analyze?"
- "What's the purpose of this analysis? (onboarding, debugging, refactoring)"
- "How deep should I go? (surface level, detailed, exhaustive)"
- "Are there any areas I should focus on or skip?"
- "Should I include external dependencies in the analysis?"

Use AskUserQuestion tool when you need more context before proceeding.

---

## Step 1: Gather Context

Use AskUserQuestion to collect:

**Question 1: Entry Point**
- question: "What is the entry point you want to analyze?"
- header: "Entry Point"
- options:
  - File (e.g., src/services/auth.ts)
  - Folder (e.g., src/modules/payments/)
  - Function (e.g., calculateTotalPrice)
  - API Endpoint (e.g., POST /api/users)
  - Other (I'll specify)

**Question 2: Purpose**
- question: "Why are you capturing this knowledge?"
- header: "Purpose"
- options:
  - Onboarding (Understanding the system)
  - Documentation (Creating/updating docs)
  - Debugging (Investigating an issue)
  - Refactoring (Planning changes)
  - Knowledge transfer (Team sharing)

**Question 3: Depth**
- question: "How deep should the analysis go?"
- header: "Depth"
- options:
  - Surface (Overview, main components)
  - Standard (Core logic, direct dependencies)
  - Deep (Full dependency tree, edge cases)
  - Exhaustive (Everything, including internals)

**Question 4: Focus Areas**
- question: "Any specific areas to focus on?"
- header: "Focus"
- multiSelect: true
- options:
  - Business logic
  - Data flow
  - Error handling
  - Performance
  - Security
  - Dependencies

If user provides entry point directly via $PROMPT, parse it and proceed.

## Step 2: Validate Entry Point

**IMPORTANT:** Read ALL files regardless of extension. Users may provide context in various formats (`.md`, `.json`, `.txt`, `.yaml`, `.png`, etc.)

Based on the entry point type:

**For Files:**
```bash
ls -la [file-path]
```
- Confirm file exists
- Identify language and framework

**For Folders:**
```bash
# List ALL files in the folder (not just specific extensions)
ls -la [folder-path]/
find [folder-path] -type f | head -30
```
- List structure and key files
- Read ALL file types (code, configs, docs, JSON, YAML, etc.)

**For Functions:**
```bash
grep -rn "function [name]\|const [name]\|def [name]\|public [name]" src/ --include="*.ts" --include="*.js" --include="*.py"
```
- Find function definition
- Handle multiple matches by asking user

**For API Endpoints:**
```bash
grep -rn "@Get\|@Post\|@app.route\|router\." src/ | grep -i "[endpoint]"
```
- Locate route handler

**If not found:**
- Suggest alternatives with fuzzy matching
- Ask user to clarify

## Step 3: Collect Source Context

Read the primary file/module and extract:

1. **Purpose** - What does this code do?
2. **Exports** - What does it expose?
3. **Key Patterns** - Design patterns, conventions used
4. **Signature** - For functions: parameters, return types, generics
5. **Error Handling** - How errors are managed
6. **Essential Snippets** - Key code sections (avoid large dumps)

**For Folders:**
- List directory structure
- Identify entry points and main modules
- Note configuration files

**For Functions/APIs:**
- Capture full signature
- Document parameters with types
- Note return values and errors
- Extract docstrings/comments

## Step 4: Analyze Dependencies

Build dependency graph up to depth 3:

```bash
# Find imports in the file
grep -E "^import|^from|require\(" [file-path]
```

**Track:**
- Internal imports (project code)
- External packages (node_modules, pip packages)
- Services (databases, APIs, queues)
- Generated code (to potentially exclude)

**Categorize:**
| Category | Examples |
|----------|----------|
| Direct imports | ./utils, ../services |
| Framework | @nestjs, express, fastapi |
| Database | prisma, typeorm, sqlalchemy |
| External APIs | axios calls, fetch |
| Utils | lodash, moment, uuid |

**Avoid loops:** Track visited nodes during traversal.

## Step 5: Synthesize Explanation

Draft comprehensive analysis:

### Overview
- Purpose and responsibility
- Language, framework, patterns
- High-level behavior description

### Implementation Details
- Core logic walkthrough
- Key algorithms or business rules
- State management approach
- Data transformations

### Execution Flow
- Entry → Processing → Output
- Conditional branches
- Async/await patterns
- Event handlers

### Quality Considerations
- **Error Handling:** How failures are managed
- **Performance:** Potential bottlenecks, optimizations
- **Security:** Input validation, auth checks
- **Testing:** Existing tests, coverage gaps

### Risks & Improvements
- Technical debt identified
- Potential bugs or edge cases
- Suggested refactoring opportunities

## Step 6: Create Documentation

**Normalize name to kebab-case:**
- `calculateTotalPrice` → `calculate-total-price`
- `src/services/auth.ts` → `auth-service`
- `POST /api/users` → `post-api-users`

**Create documentation file:**

Path: `docs/knowledge-{name}.md`

**Documentation Template:**

```markdown
# Knowledge: [Entry Point Name]

> Auto-generated knowledge capture for [entry point]
> Generated: [date]

## Overview

[Purpose and high-level description]

## Entry Point

- **Type:** [File / Folder / Function / API]
- **Path:** `[path]`
- **Language:** [language]
- **Framework:** [framework]

## Implementation Details

### Core Logic

[Detailed explanation of how it works]

### Key Components

| Component | Purpose |
|-----------|---------|
| [name] | [description] |

### Execution Flow

\`\`\`mermaid
flowchart TD
    A[Entry] --> B{Condition}
    B -->|Yes| C[Process]
    B -->|No| D[Skip]
    C --> E[Output]
    D --> E
\`\`\`

## Dependencies

### Internal

| Module | Purpose |
|--------|---------|
| [path] | [description] |

### External

| Package | Version | Purpose |
|---------|---------|---------|
| [name] | [version] | [description] |

### Dependency Graph

\`\`\`mermaid
graph LR
    A[Entry Point] --> B[Service A]
    A --> C[Service B]
    B --> D[Database]
    C --> E[External API]
\`\`\`

## Data Flow

\`\`\`mermaid
sequenceDiagram
    participant Client
    participant Handler
    participant Service
    participant Database

    Client->>Handler: Request
    Handler->>Service: Process
    Service->>Database: Query
    Database-->>Service: Result
    Service-->>Handler: Response
    Handler-->>Client: Result
\`\`\`

## Quality Analysis

### Error Handling
[How errors are handled]

### Performance Considerations
[Bottlenecks, optimizations]

### Security Notes
[Auth, validation, vulnerabilities]

## Risks & Technical Debt

- [ ] [Risk or debt item 1]
- [ ] [Risk or debt item 2]

## Suggested Improvements

1. [Improvement 1]
2. [Improvement 2]

## Related Knowledge

- [Link to related knowledge docs]

## Metadata

| Property | Value |
|----------|-------|
| Analyzed | [timestamp] |
| Depth | [depth level] |
| Files Touched | [count] |
| Analysis Duration | [time] |

## Next Steps

- [ ] Review this documentation
- [ ] Address identified risks
- [ ] Capture related entry points
```

**Write the file** using Write tool with actual findings.

## Step 7: Resolve Open Questions

**IMPORTANT:** Before completing, ALL open questions MUST be resolved.

1. **Check for open questions** discovered during analysis
2. **If questions exist:**
   - Use `AskUserQuestion` tool to ask user about each question
   - Present options when applicable with recommendation
   - Update the documentation file with answers
   - Add clarifications to relevant sections
   - Repeat until no open questions remain

3. **Resolution loop:**
   ```
   WHILE open_questions.length > 0:
     - Pick the most critical question
     - Use AskUserQuestion with clear options
     - Update docs/knowledge-[name].md with answer
     - Remove question from open list
   ```

4. **Only proceed to summary when ALL questions are resolved**

## Step 8: Review & Next Actions

Display summary:

```
════════════════════════════════════════════════════════════════════
                    KNOWLEDGE CAPTURED SUCCESSFULLY
════════════════════════════════════════════════════════════════════

Documentation Created:
   docs/knowledge-[name].md

Analysis Summary:
   - Entry Point: [type] - [path]
   - Files Analyzed: [count]
   - Dependencies Found: [count]
   - Depth: [level]

Key Insights:
   - [Insight 1]
   - [Insight 2]
   - [Insight 3]

Questions Resolved: [count] questions answered during session

Suggested Next Captures:
   - /devkit:docs --mode capture-knowledge [related-entry-1]
   - /devkit:docs --mode capture-knowledge [related-entry-2]

Review the generated documentation for accuracy!
════════════════════════════════════════════════════════════════════
```

Use AskUserQuestion:
- question: "Would you like to capture knowledge for any related entry points?"
- header: "Continue?"
- options:
  - Yes, capture [suggested entry point 1]
  - Yes, capture [suggested entry point 2]
  - No, I'm done for now

If user selects "Yes", repeat the process for the selected entry point.

---

## Begin Now

If entry point provided via $PROMPT, start with Step 2 (Validate).
Otherwise, start with Step 1 (Gather Context) to collect information.
