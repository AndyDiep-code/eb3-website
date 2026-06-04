# Claude Code Configuration

AI-assisted development toolkit for Claude Code with multi-agent workflows, specialized skills, development commands, and automation hooks.

## Quick Start

```bash
# 1. Copy to your project
cp -r ai-devkit/.claude your-project/

# 2. Initialize documentation
/devkit:docs --mode init

# 3. Use skills
/devkit:task ABC-123
/devkit:implement ABC-123
/devkit:review --mode code --changed
```

## Structure

```
.claude/
├── commands/                       # Slash commands
│   ├── devkit/                    # AI DevKit commands
│   │   ├── docs/                  # Documentation commands
│   │   ├── fix/                   # Bug fixing (fast, hard)
│   │   ├── review/                # Code review (code, business)
│   │   ├── spec/                  # Spec-Driven Development
│   │   ├── spec-lite/             # Lightweight workflow
│   │   └── ...                    # Core commands (debug, help, research, scout, test)
│   └── presale/                   # Presale documentation commands
│
├── agents/                         # Specialized agents
│
├── skills/                         # Knowledge modules
│
├── doc-templates/                  # Documentation templates
│
├── rules/                          # Development rules & workflows
│
├── hooks/                          # Automation hooks
│
└── settings.local.json            # Local settings (hooks config)
```

## Commands

### Quick Reference

| Command | Description |
|---------|-------------|
| `/devkit:help` | List all devkit skills with descriptions |
| `/scout` | Codebase exploration |

### Core Commands

| Command | Description |
|---------|-------------|
| `/devkit:debug [issue]` | Systematic 7-step debugging |
| `/devkit:help` | List all devkit skills with descriptions |
| `/devkit:research [topic]` | Deep research with reports |
| `/scout [target]` | Fast parallel codebase search |
| `/devkit:test [task-id\|file-path]` | Create comprehensive tests with 100% coverage |

### Git Tools

| Skill | Description |
|-------|-------------|
| `/devkit:worktree [feature]` | Create isolated git worktree for parallel development |

### Spec-Driven Development (Full)

| Skill | Description |
|-------|-------------|
| `/devkit:task [task]` | Create a new task specification |
| `/devkit:requirement --mode brainstorm [task-id]` | Brainstorm feature requirements |
| `/devkit:requirement --mode capture [task-id]` | Analyze requirements and generate knowledge artifacts |
| `/devkit:requirement --mode update [task-id] [changes]` | Update existing requirements with new content |
| `/devkit:plan [task-id]` | Research and create implementation plan |
| `/devkit:implement [task-id]` | Implement from specification |
| `/devkit:cook [task-id]` | Step-by-step feature implementation |

### Spec Lite (Small Tasks)

Lightweight workflow for small tasks - no research, max 4 phases, token-efficient.

| Skill | Description |
|-------|-------------|
| `/devkit:task --mode lite [task-id] [desc]` | Create lightweight task with requirements.md |
| `/devkit:plan --mode lite [task-id]` | Quick planning (auto-detects stack, finds reusable resources) |
| `/devkit:implement --mode lite [task-id]` | Implement all phases, batch code review after all files created |

**Key Features:**
- **Simplified structure**: Just `requirements.md` and `plan.md` (no reports/subfolders)
- **Resource reuse**: Scout finds existing utils/services/patterns to reuse
- **Auto-detect stack**: Automatically detects platform and API approach
- **Batch code review**: Reviews ALL files at once after implementation complete
- **Separate testing**: Testing handled via `/devkit:test` for focused coverage

### Quality & Review

| Skill | Description |
|-------|-------------|
| `/devkit:review --mode code [scope]` | Code review with multi-dimensional analysis (`--diff`, `--changed`, `--codebase`, `--skip-db`, `--skip-perf`, `--skip-security` supported) |
| `/devkit:review --mode business [scope]` | Business logic review against requirements |
| `/devkit:review --mode plan [task-id \| plan-path]` | Validate plan with critical questions interview before implementation |
> **→ [Code Review Guide](../../guide/workflows/CODE_REVIEW.md)** - Comprehensive documentation on all review skills, options, and workflows.

| Skill | Description |
|-------|-------------|
| `/devkit:fix [issue]` | Quick fix for common issues |
| `/devkit:fix --mode deep [issue]` | Complex issue resolution |

### Documentation

| Skill | Description |
|-------|-------------|
| `/devkit:docs --mode init` | Initialize doc structure |
| `/devkit:docs --mode update` | Update existing docs |
| `/devkit:docs --mode summarize` | Summarize code/docs |
| `/devkit:docs --mode capture-knowledge [entry]` | Generate docs with diagrams |

### Presale Commands

Commands for generating professional presale documentation. See [Presale Guide](../../guide/presale/PRESALE_GUIDE.md) for complete workflow.

| Command | Description |
|---------|-------------|
| `/presale` | Main workflow orchestrator (interactive) |
| `/presale:analyze [path]` | Analyze codebase for domain model and architecture |
| `/presale:generate-solution [client] [industry]` | Generate solution blueprint |
| `/presale:generate-proposal [client] [scope]` | Generate 5-10 page proposal |
| `/presale:generate-case-study [project] [client]` | Generate marketing case study |
| `/presale:help` | Display presale commands help |

## Agents

| Agent | Purpose |
|-------|---------|
| `brainstormer` | Requirements gathering and brainstorming |
| `code-reviewer` | Code review and quality analysis |
| `code-simplifier` | Code refactoring and cleanup |
| `context-manager` | Context and memory management |
| `database-admin` | Database administration and optimization |
| `debugger` | Systematic debugging and issue resolution |
| `docs-manager` | Documentation management |
| `fullstack-developer` | Full-stack development and implementation |
| `performance-engineer` | Performance optimization and bottleneck analysis |
| `planner` | Research-backed planning and analysis |
| `project-manager` | Project oversight and coordination |
| `researcher` | Deep research with source analysis |
| `security-agent` | Security vulnerability analysis |
| `solution-architect` | Solution architecture and system design |
| `tester` | Test execution and validation |
| `ui-ux-designer` | UI/UX design and wireframing |

## Skills

| Skill | Description |
|-------|-------------|
| **Core Development** | |
| `backend-development` | Backend patterns, security, APIs, testing |
| **Specialized** | |
| `api-design-principles` | REST/GraphQL API design patterns |
| `agent-browser` | Browser and desktop automation |
| `enouvo-docs-generator` | Markdown to PDF/DOCX with Enouvo branding |
| **Quality & Process** | |
| `code-review` | AI & human review practices |
| `review` | Consolidated review (code, plan, security, business) |
| `debug` | 4-phase systematic debugging |
| `plan` | Technical solution planning |
| `problem-solving` | 5 techniques for complex problems |
| `research` | Systematic research methodology |
| `sequential-thinking` | Structured multi-step problem solving |
| **Documentation & Tools** | |
| `docs` | Project documentation (init, update, summarize, capture-knowledge) |
| `docs-seeker` | Documentation via llms.txt and context7 |
| `repomix` | Repository packaging for AI analysis |
| `scout` | Fast parallel codebase exploration |
| **Presale & Sales** | |
| `chief-architect-presale` | Enterprise presale documentation and solution architecture |
| **New & Specialized** | |
| `devkit-help` | AI-Devkit usage guide |
| `media-processing` | Media processing with FFmpeg, ImageMagick, RMBG |
| `monorepo-management` | Monorepo patterns and tools |
| `requirement` | Requirements management (brainstorm, capture, update) |
| `skill-creator` | Create or update Claude skills |
| `task` | Task folder initialization |
| `implement` | Multi-phase task implementation |
| `worktree` | Isolated git worktree for parallel development |

*60+ specialized skills available covering UI/UX, security, performance, and domain-specific expertise*

## Documentation Templates

| Template | Description |
|----------|-------------|
| `code-standards.md` | Coding standards and best practices template |
| `codebase-summary.md` | Comprehensive codebase overview template |
| `development-rules.md` | Senior developer engineering best practices |
| `project-overview-pdr.md` | Project overview in PDR (Project Design Review) format |
| `system-architecture.md` | System architecture documentation template |
| `technical-documents.md` | Technical documents index and organization template |

These templates are used by documentation commands (e.g., `/docs:init`, `/docs:update`) to generate consistent, comprehensive project documentation.

## Workflows

| Workflow | Description |
|----------|-------------|
| `primary-workflow` | Main development workflow |
| `development-rules` | Development rules and standards |
| `documentation-management` | Documentation management workflow |
| `orchestration-protocol` | Multi-agent orchestration |
| `skill-auto-activation` | **Automatic skill activation based on file types and task signals** |
| `storage-path-convention` | Standardized file storage structure for multi-agent workflows |

## Hooks

Automation hooks that enhance Claude Code behavior. Configured in `settings.json`.

| Hook | Event | Description |
|------|-------|-------------|
| `session-init.cjs` | SessionStart | Writes DEVKIT_* env vars for task context |
| `executable_force-agent-skills-eval.sh` | UserPromptSubmit | Enforces delegation-first workflow: evaluates agents → skills → manual |
| `dev-rules-reminder.cjs` | UserPromptSubmit | Injects development rules, modularization guidelines, and catalog commands |
| `improve-prompt.cjs` | UserPromptSubmit | Asks clarifying questions when user input is vague (bypass with `*`, `/`, `#` prefixes) |
| `usage-context-awareness.cjs` | UserPromptSubmit, PostToolUse | Token usage tracking and context awareness |
| `subagent-init.cjs` | SubagentStart | Injects naming patterns and context to subagents |
| `team-context-inject.cjs` | SubagentStart | Injects team-specific context for agent teams |
| `cook-after-plan-reminder.cjs` | SubagentStop (Plan) | Reminds to use cook skill after planning |
| `task-completed-handler.cjs` | TaskCompleted | Logs task completions and injects progress context |
| `teammate-idle-handler.cjs` | TeammateIdle | Injects available task context when teammate goes idle |
| `descriptive-name.cjs` | PreToolUse (Write) | Enforces descriptive file naming conventions |
| `web-search.cjs` | PreToolUse (WebSearch) | Enhances web search queries |
| `scout-block.cjs` | PreToolUse (Bash\|Glob\|Grep\|Read\|Edit\|Write) | Blocks access to directories in `.scoutignore` |
| `privacy-block.cjs` | PreToolUse (Bash\|Glob\|Grep\|Read\|Edit\|Write) | Blocks access to sensitive files (.env, credentials, keys) unless approved |

### Force Agent/Skills Evaluation Hook

Triggered on every user prompt. Injects a mandatory delegation sequence reminder:
1. **Evaluate Agents** - Scan available subagent_types for matches
2. **Evaluate Skills** - If no agent fits, scan available skills
3. **Activate** - Use Task tool or Skill tool based on evaluation
4. **Implement** - Proceed only after delegation decision

Key rules enforced:
- Max 3 concurrent agents per wave
- Each task must be self-contained (no inter-task dependencies)
- Sub-agents inherit skill awareness

### Improve Prompt Hook

Triggered on every user prompt. Asks clarifying questions when the user's input is vague or ambiguous. Helps ensure clear requirements before implementation.

**Bypass prefixes** (to skip clarification):
- `*` - Force immediate execution
- `/` - Slash commands bypass automatically
- `#` - Comment-style bypass

### Dev Rules Reminder Hook

Non-blocking hook triggered on every user prompt (debounced). Injects:
- Links to development rules workflow file
- Markdown file organization reminders (plans/, docs/)
- Catalog generation commands for skills and commands
- YAGNI, KISS, DRY principle enforcement
- Modularization guidelines (kebab-case naming, check existing modules)

Automatically skips injection if recently reminded (checks last 150 lines of transcript).

### Scout Block Hook

**Blocking** hook triggered before file and bash operations. Prevents access to:
- Directories listed in `.claude/.scoutignore` (node_modules, __pycache__, .git, dist, build by default)
- Bash commands that access blocked directories (cd, ls, cat, etc.)

**Allows**: Build commands (npm build, pnpm build, yarn build, npm run build)

Cross-platform support: Windows (PowerShell), Unix (Bash), WSL.

Configure blocked patterns by editing `.claude/.scoutignore`.

### Privacy Block Hook

**Blocking** hook triggered before file and bash operations. Prevents access to sensitive files:
- `.env`, `.env.local`, `.env.production`
- `credentials.json`, `secrets.yaml`
- `*.pem`, `*.key`, `id_rsa`, `id_ed25519`

**Safe patterns** (automatically allowed):
- `.env.example`, `.env.sample`, `.env.template`

**Approval flow**: If access is blocked, ask user for permission. If approved, retry with `APPROVED:` prefix (e.g., `Read "APPROVED:.env"`).

## Getting Started

### Initialize Documentation

```bash
/devkit:docs --mode init
```

This analyzes your codebase and creates documentation in `./docs/`:
- `project-overview-pdr.md` - Project overview
- `codebase-summary.md` - Codebase analysis
- `code-standards.md` - Coding standards
- `system-architecture.md` - Architecture docs

### Typical Workflow

```bash
# 1. Create task specification
/devkit:task ABC-123

# 2. Plan implementation
/devkit:plan ABC-123

# 3. Implement from plan
/devkit:implement ABC-123

# 4. Create tests with 100% coverage
/devkit:test ABC-123

# 5. Review code
/devkit:review --mode code
```

---

## Setup Scripts

The `setup/` directory contains automated installation scripts for Claude Code plugins and MCP servers.

### Quick Install

```bash
# macOS/Linux - Install all plugins and MCP servers
./setup/setup.sh

# Windows PowerShell
.\setup\setup.ps1
```

### What Gets Installed

| Component | Description |
|-----------|-------------|
| **context7** | Up-to-date library documentation (MCP) |
| **sequential-thinking** | Structured problem-solving (MCP) |
| **codegraph** | Codebase knowledge graph for code exploration and impact analysis (MCP) |

### Script Options

```bash
# Install specific components
./setup/setup.sh --mcp        # MCP servers only (context7, sequential-thinking)
./setup/setup.sh --codegraph  # CodeGraph codebase knowledge graph

# Diagnostics and troubleshooting
./setup/setup.sh --status     # Check status of all components
./setup/setup.sh --diagnose   # Run diagnostics on all components
./setup/setup.sh --fix        # Auto-fix issues in all components
```

### Directory Structure

```
setup/
├── setup.sh                    # Main entry point (macOS/Linux)
├── setup.ps1                   # Main entry point (Windows)
└── dependencies/
    ├── setup-mcp-servers.sh/.ps1     # MCP servers installer
    └── setup-codegraph.sh            # CodeGraph knowledge graph setup
```

### After Installation

1. Start a new Claude Code session to activate the plugins
2. Use `mem-search` skill to search past sessions
3. Run `bunx ccusage@latest` to track usage and costs
4. context7, sequential-thinking, and codegraph are available as MCP tools
