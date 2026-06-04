# Docs: Init

Initialize documentation structure using `.claude/skills/docs/doc-templates/` as the source of truth.

## Usage

`/devkit:docs --mode init [project-type]`

## Templates Reference

All documentation MUST strictly follow these templates located in `.claude/skills/docs/doc-templates/`:

| Template | Output | Purpose |
|----------|--------|---------|
| `project-overview-pdr.md` | `docs/project-overview-pdr.md` | Product Development Requirements |
| `codebase-summary.md` | `docs/codebase-summary.md` | Technical overview & stats |
| `code-standards.md` | `docs/code-standards.md` | Project-specific coding conventions |
| `system-architecture.md` | `docs/system-architecture.md` | System design & architecture |
| `technical-documents.md` | `docs/technical-documents.md` | C4 diagrams, deployment, setup |
| `development-rules.md` | `docs/development-rules.md` | Development workflow rules |

## Generated Structure

```
docs/
├── project-overview-pdr.md   # From template - fill all {{PLACEHOLDER}}
├── codebase-summary.md       # From template - fill all {{PLACEHOLDER}}
├── code-standards.md         # From template - fill all {{PLACEHOLDER}}
├── system-architecture.md    # From template - fill all {{PLACEHOLDER}}
├── technical-documents.md    # From template - fill all // TODO:
└── development-rules.md      # From template - fill all {{PLACEHOLDER}}
```

---

## Execution Strategy (Token-Optimized)

**CRITICAL**: Follow this exact order to minimize token consumption.

### Phase 1: Setup
1. Copy `.claude/.repomixignore` to project root (if exists)
2. Run `repomix` to generate `./repomix-output.xml`

### Phase 2: Batch Context Loading (Read ALL at once)

Read all files in a SINGLE parallel batch BEFORE writing any documentation:

**Templates** (read all 6 in parallel):
- `.claude/skills/docs/doc-templates/project-overview-pdr.md`
- `.claude/skills/docs/doc-templates/codebase-summary.md`
- `.claude/skills/docs/doc-templates/code-standards.md`
- `.claude/skills/docs/doc-templates/system-architecture.md`
- `.claude/skills/docs/doc-templates/technical-documents.md`
- `.claude/skills/docs/doc-templates/development-rules.md`

**Source files** (read in same batch):
- `./repomix-output.xml` (codebase compaction)
- `./package.json` (project metadata)
- `./README.md` (existing content to update)
- `./.env.example` or similar config files (if exists)

### Phase 3: Analyze Codebase

Scan the project to detect:
- **Project Type**: Web app, API, library, CLI, monorepo
- **Tech Stack**: Languages, frameworks, databases, cloud services
- **Structure**: Directory layout, module organization
- **Dependencies**: Key packages and integrations
- **Patterns**: Architecture patterns, coding conventions

### Phase 4: Generate Documentation

For each template, strictly follow this process:

1. **Copy template structure exactly** - Preserve all sections
2. **Replace ALL `{{PLACEHOLDER}}` values** with detected/analyzed content
3. **Fill ALL `// TODO:` markers** with project-specific information
4. **Remove inapplicable sections** - Delete sections marked optional if not relevant
5. **Keep AI GUIDANCE comments** for future reference (or remove after filling)

Write docs in this order:
1. `docs/codebase-summary.md` (from repomix output)
2. `docs/project-overview-pdr.md`
3. `docs/code-standards.md`
4. `docs/system-architecture.md`
5. `docs/technical-documents.md`
6. `docs/development-rules.md`
7. `docs/design-guidelines.md` (if applicable)
8. Update `README.md` (keep under 300 lines)

**IMPORTANT**: Do NOT re-read any files during this phase. Use only the context loaded in Phase 2.

---

## Template Placeholder Rules

### MUST Replace

All `{{PLACEHOLDER}}` values must be replaced with actual content:

```markdown
# Before
**Project Name**: {{PROJECT_NAME}}
**Version**: {{VERSION}}

# After
**Project Name**: MyApp
**Version**: 1.0.0
```

### MUST Fill

All `// TODO:` markers must be filled with project-specific content:

```markdown
# Before
// TODO: Describe main type of users

# After
- Admin users: System administrators with full access
- Regular users: Standard application users
```

### Section Removal

Remove entire sections if not applicable (marked in AI GUIDANCE):

```markdown
<!-- AI GUIDANCE: Remove this section if project has no database -->
## Database Schema
...
```

### TODO Markers for Manual Input

Use for information that cannot be auto-detected:

```markdown
## External Systems

// TODO: List external services and integrations
| System | Purpose | Integration Details |
|--------|---------|---------------------|
| ... | ... | ... |
```

---

## Delegation

Use `docs-manager` agent to analyze the codebase and execute the above strategy with Structured Context Protocol:

**Generate Task ID**: `docs-generation-YYMMDD-HHmm` (use `bash -c 'date +%y%m%d-%H%M'` for date)

```
Task(subagent_type="docs-manager", prompt="
---
context:
  task-id: docs-generation-YYMMDD-HHmm
---

[task description summary]
")
```

**Report Protocol**: Follow ./.claude/CLAUDE.md "Sub-Agent Report Generation" protocol before spawning subagents.

---

## Output

```
✅ DOCS INITIALIZED FROM TEMPLATES
════════════════════════════════════════

docs/
├── ✅ project-overview-pdr.md (from template)
├── ✅ codebase-summary.md (from template)
├── ✅ code-standards.md (from template)
├── ✅ system-architecture.md (from template)
├── ✅ technical-documents.md (from template)
└── ✅ development-rules.md (from template)

PLACEHOLDERS FILLED: 142/150
TODO MARKERS: 8 (require manual input)

NEXT STEPS:
1. Review generated docs for accuracy
2. Fill remaining TODO markers
3. Add project-specific diagrams
4. Run /devkit:docs --mode update after code changes
════════════════════════════════════════
```

---

## Validation Checklist

Before completing:

- [ ] All `{{PLACEHOLDER}}` replaced with actual values
- [ ] All `// TODO:` filled or marked for manual completion
- [ ] No empty sections (remove or add TODO)
- [ ] Tech stack correctly identified
- [ ] Architecture patterns documented
- [ ] C4 diagrams creation done base on project context.
- [ ] Related Documentation links are valid
- [ ] Development setup steps are complete

**IMPORTANT**: Do not start implementing until planning is complete.
