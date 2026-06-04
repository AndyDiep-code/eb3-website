# Skill Auto-Activation Workflow

## Purpose

Central reference for automatic skill activation based on file types, task types, and technology signals. All agents MUST consult this workflow when handling implementation tasks.

## File Extension → Skill Mapping

### Frontend Files

| Extension                         | Auto-Activate Skills                                        |
| --------------------------------- | ----------------------------------------------------------- |
| `.tsx`, `.jsx`                    | `react-best-practices`                                      |

### Backend Files

| Extension            | Auto-Activate Skills                              |
| -------------------- | ------------------------------------------------- |
| `.ts` (non-frontend) | `backend-development`, `nodejs`                   |
| `.js` (non-frontend) | `backend-development`, `nodejs`                   |
| `.py`                | `backend-development`                             |
| `.go`                | `backend-development`                             |
| `.rs`                | `backend-development`                             |
| `.java`, `.kt`       | `backend-development`                             |
| `.rb`                | `backend-development`                             |
| `.cs`, `.vb`         | `backend-development`                             |
| `.csproj`, `.sln`    | `backend-development`                             |

### Database Files

| Extension/Pattern         | Auto-Activate Skills                              |
| ------------------------- | ------------------------------------------------- |
| `.sql`                    | `postgres-best-practices`                         |
| `.prisma`                 | `backend-development`                             |
| `schema.*`, `migration.*` | `postgres-best-practices`                         |
| `.graphql`, `.gql`        | `api-design-principles`                           |

### Configuration Files

| Extension/Pattern                  | Auto-Activate Skills        |
| ---------------------------------- | --------------------------- |
| `turbo.json`, `nx.json`            | `monorepo-management`       |
| `pnpm-workspace.yaml`              | `monorepo-management`       |
| `*.csproj`, `*.sln`, `nuget.config` | `backend-development`      |

### Document Files

| Extension/Pattern              | Auto-Activate Skills        |
| ------------------------------ | --------------------------- |
| `.md` (reports)                | `enouvo-docs-generator`     |
| `docs.json`, `mint.json`       | `mintlify`                  |
| `*.mdx` (Mintlify docs)        | `mintlify`                  |

### Test Files

| Pattern                                | Auto-Activate Skills                 |
| -------------------------------------- | ------------------------------------ |
| `*.test.*`, `*.spec.*`                 | Primary skill + `debug`              |
| `__tests__/*`                          | Primary skill + `debug`              |
| `*.e2e.*`, `cypress/*`, `playwright/*` | `debug`                              |

### AI/Claude Configuration Files

| Pattern                           | Auto-Activate Skills                                     |
| --------------------------------- | -------------------------------------------------------- |
| `CLAUDE.md`, `.claude/*`          | `skill-creator`, `devkit-help`                           |
| `.claude/skills/*`                | `skill-creator`                                          |
| `mcp.json`, `mcp-servers/*`       | `use-mcp`                                                |
| `.claude/tasks/*` (plan files)    | `implement`, `task`, `requirement`                       |

### 3D/Graphics Files

| Extension/Pattern         | Auto-Activate Skills                 |
| ------------------------- | ------------------------------------ |

### Video/Media Files

| Extension/Pattern                        | Auto-Activate Skills                                       |
| ---------------------------------------- | ---------------------------------------------------------- |
| `/remotion/*`, `*.composition.tsx`       | `remotion`                                                 |
| `remotion.config.ts`, `Root.tsx`         | `remotion`, `react-best-practices`                         |
| `.mp4`, `.mov`, `.webm` (generation)     | `remotion`, `media-processing`                             |
| `.mp3`, `.wav`, `.flac` (audio)          | `media-processing`                                         |

### Authentication Files

| Extension/Pattern                        | Auto-Activate Skills                                       |
| ---------------------------------------- | ---------------------------------------------------------- |
| `auth.ts`                                | `backend-development`                                      |
| `/auth/*`, `**/auth/**`                  | `backend-development`                                      |

## Task Type → Skill Mapping

| Task Signal                    | Auto-Activate Skills                                      |
| ------------------------------ | --------------------------------------------------------- |
| API endpoints                  | `api-design-principles`, `backend-development`            |
| Authentication                 | `backend-development`                                     |
| Database operations            | `postgres-best-practices`                                 |
| Performance issues             | `debug`, `review`, `react-best-practices`                 |
| Security review / STRIDE / OWASP audit | `security` (mode: `security-audit`)               |
| Vulnerability scan / secrets / dep scan | `security` (mode: `security-scan`)               |
| Dependency CVE audit (npm)     | `security` (mode: `package-vulnerable-scan`)              |
| OSINT / threat intelligence    | `security` (mode: `cyber-threat-expert`)                           |
| Code review                    | `code-review`                                             |
| Database review                | `review`, `postgres-best-practices`                       |
| Documentation lookup           | `get-api-docs`                                            |
| Testing                        | `test`, `debug`                                           |
| Refactoring                    | Primary skill + `code-review`                             |
| Bug fixing                     | `fix`, `debug`                                            |
| Feature planning               | `plan`, `brainstorm`                                      |
| Architecture design            | `plan`, `chief-architect-presale`                         |
| Codebase exploration           | `scout`, `repomix`                                        |
| Problem solving                | `problem-solving`, `sequential-thinking`                  |
| Video creation/generation      | `remotion`                                                |
| Browser automation             | `agent-browser`                                           |
| Research tasks                 | `research`, `docs-seeker`                                 |
| MCP server management          | `use-mcp`                                                 |
| Skill/Command creation         | `skill-creator`                                           |
| Skill discovery                | `find-skills`                                             |
| Monorepo setup                 | `monorepo-management`                                     |
| Procedural guides/How-to       | `cook`, `plan`                                            |
| Project estimation/Presale     | `chief-architect-presale`, `plan`                         |
| Project tracking               | `project-management`                                      |
| Multi-agent collaboration      | `agent-team`                                                    |
| Clarification/consultation     | `ask`, `brainstorm`                                       |
| Documentation management       | `docs`, `docs-seeker`                                     |
| Documentation site (Mintlify)  | `mintlify`                                                |
| Requirements gathering         | `requirement`, `brainstorm`                               |
| Task initialization/setup      | `task`, `requirement`                                     |
| Multi-phase implementation     | `implement`, `cook`                                       |
| Parallel development           | `worktree`, `monorepo-management`                         |
| Output verbosity adjustment    | `coding-level`                                            |

## Technology Stack → Skill Mapping

| Technology                   | Auto-Activate Skills                                    |
| ---------------------------- | ------------------------------------------------------- |
| React, Next.js               | `react-best-practices`                                  |
| NestJS, Express              | `backend-development`, `nodejs`                         |
| Fastify, Hono                | `backend-development`, `nodejs`                         |
| Mintlify                     | `mintlify`                                              |
| FastAPI                      | `backend-development`                                   |
| Django, Flask                | `backend-development`                                   |
| ASP.NET Core, .NET           | `backend-development`                                   |
| PostgreSQL                   | `postgres-best-practices`                               |
| Redis                        | `backend-development`                                   |
| GraphQL                      | `api-design-principles`                                 |
| Turborepo, Nx                | `monorepo-management`                                   |
| Prisma, Drizzle              | `backend-development`                                   |
| Puppeteer, Playwright        | `agent-browser`                                         |
| Claude Code                  | `skill-creator`, `devkit-help`                          |
| MCP Servers                  | `use-mcp`                                               |
| Repomix                      | `repomix`                                               |
| Remotion                     | `remotion`, `react-best-practices`                      |
| FFmpeg                       | `media-processing`, `remotion`                          |
| ImageMagick                  | `media-processing`                                      |
| Stagehand, Browser Use       | `agent-browser`                                         |

## Detection Algorithm

When processing a task, agents MUST:

```
1. DETECT file extensions in scope
   └─ Match against "File Extension → Skill Mapping"

2. DETECT task type from user request
   └─ Match against "Task Type → Skill Mapping"

3. DETECT technologies from:
   - package.json dependencies
   - import statements
   - File patterns
   └─ Match against "Technology Stack → Skill Mapping"

4. ACTIVATE all matched skills via Skill tool
   └─ Skill("skill-name") for each match

5. PROCEED with implementation using activated skill knowledge
```

## Priority Rules

1. **Context matters**: `.tsx` in `/components/` = frontend, `.ts` in `/api/` = backend
2. **Stack detection**: Check `package.json`, `requirements.txt`, `go.mod` for context
3. **Multiple skills OK**: Activate all relevant skills, not just one
4. **Best practices skills**: Always add `*-best-practices` skills when available

## Utility Skills (Always Available)

These skills can be activated for any task type:

| Skill               | When to Use                                        |
| ------------------- | -------------------------------------------------- |
| `debug`         | Any bug, error, or unexpected behavior             |
| `code-review`       | Before PRs, after feature completion               |
| `plan`          | Multi-step features, architecture decisions        |
| `brainstorm`        | Ideation, exploring options                        |
| `research`          | Technology evaluation, best practices              |
| `sequential-thinking` | Complex multi-step reasoning                     |
| `problem-solving`   | When stuck, complexity spirals                     |
| `get-api-docs`      | Looking up library/API/SDK documentation via chub  |
| `fix`               | Bug reports, error messages, test failures         |
| `scout`             | File discovery, codebase exploration               |
| `cook`              | Step-by-step procedures, how-to guides, recipes    |
| `test`              | Test execution, coverage analysis, build verification  |
| `find-skills`       | Discovering and installing agent skills             |
| `project-management`| Project tracking, status updates, plan management  |
| `implement`         | Multi-phase task implementation with review gates  |
| `task`              | Initializing task folder structure                  |
| `requirement`       | Requirements gathering and analysis                 |
| `docs`              | Project documentation management                    |
| `worktree`          | Isolated git worktree for parallel development      |
| `coding-level`      | Adjusting output verbosity/explanation depth        |
| `nodejs`            | Node.js & TypeScript development (300+ patterns)    |

## Integration with Agents

All implementation agents should include this reference:

```markdown
## Skill Auto-Activation

Before implementation, consult `.claude/rules/skill-auto-activation.md`:

1. Match file extensions → activate skills
2. Match task type → activate skills
3. Match technology stack → activate skills
4. Proceed with skill knowledge active
```

## Anti-Patterns

-   ❌ Implementing without checking skill mappings
-   ❌ Activating only one skill when multiple match
-   ❌ Ignoring technology stack signals
-   ❌ Skipping skill activation for "simple" tasks
-   ❌ Forgetting utility skills like `debug` or `code-review`

## Examples

### Example 1: React Component Task

```
Files: src/components/Button.tsx
Task: "Add loading state to Button"

Detection:
- .tsx extension → react-best-practices
- React import → react-best-practices

Activate: react-best-practices
```

### Example 2: API Endpoint Task

```
Files: src/api/users/route.ts
Task: "Add pagination to users endpoint"

Detection:
- /api/ path → backend-development, api-design-principles
- Database query → postgres-best-practices

Activate: backend-development, api-design-principles, postgres-best-practices
```

### Example 3: Database Migration

```
Files: prisma/migrations/add_user_roles.sql
Task: "Add role-based access control"

Detection:
- .sql extension → postgres-best-practices
- Auth-related → backend-development

Activate: backend-development, postgres-best-practices
```

### Example 5: Claude Skill Creation

```
Files: .claude/skills/my-skill/SKILL.md
Task: "Create a new skill for X"

Detection:
- .claude/skills/ path → skill-creator
- SKILL.md pattern → skill-creator

Activate: skill-creator
```

### Example 6: Monorepo Setup

```
Files: turbo.json, packages/*
Task: "Set up shared dependencies"

Detection:
- turbo.json → monorepo-management
- packages/ structure → monorepo-management

Activate: monorepo-management
```

### Example 8: Video Creation Task

```
Files: src/remotion/IntroVideo.tsx
Task: "Create an introduction video about this project"

Detection:
- /remotion/ path → remotion
- Video creation keywords → remotion, react-best-practices

Activate: remotion, react-best-practices
```

### Example 10: Procedural/How-To Task

```
Task: "How do I set up a new monorepo with Turborepo?"

Detection:
- "How to" keywords → cook
- Monorepo keywords → monorepo-management
- Turborepo → monorepo-management

Activate: cook, monorepo-management
```


### Example 12: Browser Automation

```
Task: "Automate login flow testing with visual verification"

Detection:
- Browser automation keywords → agent-browser

Activate: agent-browser
```

### Example 13: C# / .NET Backend Task

```
Files: src/Api/Controllers/UserController.cs, MyApp.sln
Task: "Add pagination to the users API endpoint"

Detection:
- .cs extension → backend-development
- .sln file → backend-development
- ASP.NET Controller pattern → backend-development, api-design-principles

Activate: backend-development, api-design-principles

NOTE: Do NOT scan with JS/TS patterns (*.{ts,tsx,js,jsx,json}) for C# projects.
      Use *.{cs,vb,csproj,sln} globs instead.
```
