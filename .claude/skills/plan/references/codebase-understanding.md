# Codebase Understanding Phase

**When to skip:** If provided with scout reports, skip this phase.

## Step 1: Read Task Requirements

Read ALL files in `./.claude/tasks/[task-id]/requirements/` (skip missing files):
- `01-functional.md` — functional requirements
- `02-non-functional.md` — performance, security, scalability
- `03-constraints.md` — technical constraints
- `04-decisions.md` — key decisions with rationale
- `05-risks.md` — identified risks and mitigations

Use `AskUserQuestion` for any unclear requirements. **DO NOT GUESS.**

## Step 2: Review Existing Research

Read ALL files in `./.claude/tasks/[task-id]/research/` (if empty, skip and continue).
Synthesize findings for planning context.

## Step 3: Auto-Detect Platform (do NOT ask user)

Analyze project to determine platform:
- **frontend**: React/Vue/Angular/Next.js in `package.json`; `src/components/`, `src/pages/`, `vite.config.*`, `.tsx/.jsx` files
- **backend**: Express/NestJS/Fastify in `package.json`; `src/controllers/`, `src/routes/`; `Dockerfile`; Python (`requirements.txt`, FastAPI/Django/Flask); Java (`pom.xml`, Spring Boot)
- **fullstack**: Both frontend + backend indicators present

Store as `platform: frontend | backend | fullstack` in plan metadata.

## Step 4: Auto-Detect API Approach (do NOT ask user)

Analyze project to determine approach. Load `references/api-patterns.md` for detection signals.
Store as `api-approach: schema-first | code-first | no-api` in plan metadata.

## Step 4b: Auto-Detect Database Migration Approach (do NOT ask user)

**Only run when the task involves database schema changes** (new tables, columns, indexes, relations, etc.).

Scan the project to classify the DB workflow:

| Signal | Approach |
|--------|----------|
| `prisma/migrations/` directory exists | `migration-based` (Prisma Migrate) |
| `prisma/schema.prisma` + no `migrations/` folder | `code-first-push` (Prisma db push) |
| `drizzle.config.*` + `drizzle/` or `migrations/` folder | `migration-based` (Drizzle Kit) |
| `drizzle-kit push` in `package.json` scripts (no migration folder) | `code-first-push` (Drizzle push) |
| `alembic/` directory or `alembic.ini` | `migration-based` (Alembic/Python) |
| `*/migrations/0*.py` pattern (Django) | `migration-based` (Django ORM) |
| `src/migrations/` + TypeORM config | `migration-based` (TypeORM) |
| `migrations/*.js` or `migrations/*.ts` (Knex/Sequelize) | `migration-based` (Knex/Sequelize) |
| `db/migrate/` (Rails) | `migration-based` (ActiveRecord) |
| `flyway.conf` or `liquibase.properties` | `migration-based` (Flyway/Liquibase) |
| Structured `*.sql` files in `migrations/`, `db/`, or `sql/` | `sql-first` |

Store as `db-approach: migration-based | code-first-push | sql-first | unknown` in plan metadata.

### ⚠️ Critical Rule — Migration-Based Projects

If `db-approach: migration-based`, **EVERY schema change MUST generate/create a migration file.**

- **NEVER** modify the schema file directly without a corresponding migration (e.g., do not edit `prisma/schema.prisma` alone and assume `db push` is acceptable).
- Plan phases must include a step: *"Generate migration file"* (e.g., `prisma migrate dev --name <name>`, `drizzle-kit generate`, `alembic revision --autogenerate`, `python manage.py makemigrations`).
- If task says "add a table" or "add a column" → the implementation step is **create migration**, not "edit schema and run push".
- Note the migration command for the detected ORM in the plan so implementers know exactly what to run.

### Code-First Push Projects

If `db-approach: code-first-push`, schema file edits are the primary change. Note this explicitly in the plan so implementers don't accidentally run `migrate dev` (which would lock the schema into migration history prematurely).

## Step 5: Analyze Project Documentation

ALWAYS read first:
1. `./docs/development-rules.md` — file conventions, dev rules, code quality
2. `./docs/codebase-summary.md` — project structure, architecture overview
3. `./docs/code-standards.md` — conventions, patterns, naming
4. `./docs/design-guidelines.md` (if exists) — design system, UI/UX
5. `./docs/system-architecture.md`, `project-overview-pdr.md`, `technical-documents.md`

**Only if `codebase-summary.md` unavailable or older than 3 days:** Use `/scout` to search codebase.

## Step 6: Identify Reusable Resources (CRITICAL)

Use `/scout` to find existing code BEFORE planning new implementations:
- Existing utils, helpers, services with similar functionality
- Existing components/modules that can be extended
- Existing patterns and conventions

**DO NOT create duplicates** — plan to extend/modify existing code.
**Follow existing patterns** — maintain codebase consistency.
Document all reusable resources in the plan for implementers.

## Best Practices

- Start with documentation before diving into code
- Use scouts for targeted file discovery
- Document patterns found for consistency
- Note any inconsistencies or technical debt
- Consider impact on existing features
