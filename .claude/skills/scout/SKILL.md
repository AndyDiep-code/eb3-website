---
name: scout
description: "Fast codebase scouting using parallel Explore subagents. Use for file discovery, task context gathering, quick searches across directories."
user-invocable: false
when_to_use: "Invoke for fast file discovery and codebase orientation."
category: dev-tools
keywords: [codebase, scouting, file-discovery, search]
version: 1.0.0
---

# Scout

Fast, token-efficient codebase scouting using parallel Explore subagents to find files needed for tasks.

## When to Use

- Beginning work on feature spanning multiple directories
- User mentions needing to "find", "locate", or "search for" files
- Starting debugging session requiring file relationships understanding
- User asks about project structure or where functionality lives
- Before changes that might affect multiple codebase parts

## Quick Start

1. Analyze user prompt to identify search targets
2. Use a wide range of Grep and Glob patterns to find relevant files and estimate scale of the codebase
3. Spawn parallel Explore subagents with divided directories
4. Collect results into concise report

## Workflow

### 1. Detect Tech Stack (REQUIRED — do this before any search)

Run this one-liner to identify the project's language/framework BEFORE using any file globs:

```bash
ls *.sln *.csproj go.mod Cargo.toml pom.xml build.gradle pyproject.toml requirements.txt package.json 2>/dev/null | head -5
```

Then select the correct file extensions for **all** subsequent Grep/Glob calls:

| Detected marker | Use globs |
|-----------------|-----------|
| `*.sln`, `*.csproj` | `**/*.{cs,vb,csproj,sln}` |
| `go.mod` | `**/*.go` |
| `Cargo.toml` | `**/*.rs` |
| `pom.xml`, `build.gradle` | `**/*.{java,kt}` |
| `pyproject.toml`, `requirements.txt` | `**/*.py` |
| `package.json`, `tsconfig.json` | `**/*.{ts,tsx,js,jsx}` |

**NEVER default to JS/TS patterns (`*.{ts,tsx,js,jsx,json}`) without checking the stack first.**
Pass the detected globs explicitly in every subagent prompt.

### 2. Analyze Task
- Parse user prompt for search targets
- Identify key directories, patterns, file types, lines of code
- Determine optimal SCALE value of subagents to spawn

### 3. Divide and Conquer
- Split codebase into logical segments per agent
- Assign each agent specific directories or patterns
- Ensure no overlap, maximize coverage

### 4. Register Scout Tasks
- **Skip if:** Agent count ≤ 2 (overhead exceeds benefit)
- **Skip if:** Task tools unavailable (VSCode extension) — use `TodoWrite` instead
- `TaskList` first — check for existing scout tasks in session
- If not found, `TaskCreate` per agent with scope metadata
- See `references/task-management-scouting.md` for patterns and examples

### 5. Spawn Parallel Explore Subagents

See `references/internal-scouting.md` for details.

**Notes:**
- `TaskUpdate` each task to `in_progress` before spawning its agent (skip if Task tools unavailable)
- Prompt detailed instructions for each subagent with exact directories or files it should read
- Remember that each subagent has less than 200K tokens of context window
- Amount of subagents to-be-spawned depends on the current system resources available and amount of files to be scanned
- Each subagent must return a detailed summary report to a main agent

### 6. Collect Results
- Timeout: 3 minutes per agent (skip non-responders)
- `TaskUpdate` completed tasks; log timed-out agents in report (skip if Task tools unavailable)
- Aggregate findings into single report
- List unresolved questions at end

## Report Format

```markdown
# Scout Report

## Relevant Files
- `path/to/file.ts` - Brief description
- ...

## Unresolved Questions
- Any gaps in findings
```

## References

- `references/internal-scouting.md` - Using Explore subagents
- `references/task-management-scouting.md` - Claude Task patterns for scout coordination

## Workflow Position

**Typically precedes:** `/devkit:debug` (debug after scouting), `/devkit:fix` (fix after locating code), `/devkit:code-review` (scout edge cases before review)
**Related:** `/devkit:debug` (investigate after scouting), `/devkit:brainstorm` (explore after scouting)
