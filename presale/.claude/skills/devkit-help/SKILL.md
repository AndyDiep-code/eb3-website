---
name: devkit:help
description: "AI-Devkit usage guide — discover commands, skills, workflows naturally."
user-invocable: true
when_to_use: "Invoke to discover AI-Devkit commands, skills, and workflows."
argument-hint: "[category|command|task description]"
category: dev-tools
keywords: [devkit, help, commands, skills, guide, reference]
---

# Devkit Help

All-in-one AI-DevKit guide. Run the script and present output based on type markers.

## Intent Validation

The script uses keyword matching with smart weighting. After getting results, **validate** against these heuristics:

| Sentence Pattern | Primary Intent | Example |
|------------------|----------------|---------|
| `[action verb] my [object]` | The action verb | "commit my changes" → git |
| `[context] [subject noun]` | The subject noun | "setup notifications" → notifications |
| `[noun] [noun]` | Last noun (topic) | "discord webhook" → notifications |

**Action verbs** (high intent when first): fix, test, commit, push, build, create, review, deploy, run, check, find, plan, refactor

**Context words** (low intent, modify subject): setup, add, start, new, my, the, configure

**Override script only if:** result clearly mismatches the sentence pattern above. Otherwise trust the algorithm.


## Pre-Processing

**IMPORTANT: Always translate `$ARGUMENTS` to English before passing to script.**

The Python script only understands English keywords. If `$ARGUMENTS` is in another language:
1. Translate `$ARGUMENTS` to English
2. Pass the translated English string to the script

## Execution

```bash
python .claude/skills/devkit-help/scripts/helper.py "$ARGUMENTS"
```

## Output Type Detection

The script outputs a type marker on the first line: `@OUTPUT_TYPE:<type>`

**Read this marker and adjust your presentation accordingly:**

### `@OUTPUT_TYPE:comprehensive-docs`

Full documentation (config, schema, setup guides).

**Presentation:**
1. Show the **COMPLETE** script output verbatim - every section, every code block
2. **THEN ADD** helpful context:
   - Real-world usage examples ("For example, if you're working on multiple projects...")
   - Common gotchas and tips ("Watch out for: ...")
   - Practical scenarios ("This is useful when...")
3. End with a specific follow-up question

**Example enhancement after showing full output:**
```
## Additional Tips

**When to use global vs local config:**
- Use global (~/.claude/) for personal preferences like language, issue prefix style
- Use local (./.claude/) for project-specific paths, naming conventions

**Common setup for teams:**
Each team member sets their locale globally, but projects share local config via git.

Need help setting up a specific configuration?
```

### `@OUTPUT_TYPE:category-guide`

Workflow guides for command categories (fix, spec, review, frontend, etc.).

**Presentation:**
1. Show the complete workflow and command list
2. **ADD** practical context:
   - When to use this workflow vs alternatives
   - Real example: "If you encounter a bug in authentication, start with..."
   - Transition tips between commands
3. Offer to help with a specific task

### `@OUTPUT_TYPE:command-details`

Single command documentation.

**Presentation:**
1. Show full command info from script
2. **ADD**:
   - Concrete usage example with realistic input
   - When this command shines vs alternatives
   - Common flags or variations
3. Offer to run the command for them

### `@OUTPUT_TYPE:search-results`

Search matches for a keyword.

**Presentation:**
1. Show all matches from script
2. **HELP** user navigate:
   - Group by relevance if many results
   - Suggest most likely match based on context
   - Offer to explain any specific command
3. Ask what they're trying to accomplish

### `@OUTPUT_TYPE:task-recommendations`

Task-based command suggestions.

**Presentation:**
1. Show recommended commands from script
2. **EXPLAIN** the reasoning:
   - Why these commands fit the task
   - Suggested order of execution
   - What each step accomplishes
3. Offer to start with the first recommended command

## Key Principle

**Script output = foundation. Your additions = value-add.**

Never replace or summarize the script output. Always show it fully, then enhance with your knowledge and context.

## Important: Correct Workflows

**Spec Workflow** (complex features that require brainstorming - if you only have a vague idea, use this):
- `/devkit:task` → `/devkit:requirement --mode brainstorm` → `/devkit:plan` → (optional) `/devkit:review --mode plan` → `/devkit:implement` → `/devkit:test`

**Spec Workflow** (complex features with unclear requirements - need deep analysis):
- `/devkit:task` → `/devkit:requirement --mode capture` → `/devkit:plan` → (optional) `/devkit:review --mode plan` → `/devkit:implement` → `/devkit:test`

**Spec Workflow** (updating existing task requirements with new changes):
- `/devkit:requirement --mode update [task-id] [changes]` → `/devkit:plan [task-id]` → `/devkit:implement` → `/devkit:test`

**Spec-Lite Workflow** (quick small tasks):
- `/devkit:task --mode lite` → `/devkit:plan --mode lite` → `/devkit:implement --mode lite` → `/devkit:test`

**Fix Workflow**:
- `/devkit:fix` for quick fixes, `/devkit:fix --mode deep` for complex issues
- Use `/devkit:debug` first if cause is unknown

**Code Quality**:
- `/devkit:review --mode code` for code review

- **`/devkit:cook`**: Standalone - plans internally, no separate `/plan` needed

- **NEVER** suggest `/devkit:plan` → `/devkit:cook` (cook has its own planning)

**IMPORTANT**: Skill `devkit:task` is the only skill that can be used to create a new task. User should provide a task-id for this to work. (eg. `devkit:task AIDEVKIT-001`)

## Version & Changelog

Users can ask about the AI-DevKit version and see recent changes using these keywords:
- `version`, `v`, `what version`, `devkit version`
- `changelog`, `changes`, `what's new`, `updates`, `release notes`

Example: `/devkit:help version` or `/devkit:help changelog`

This will display the current version from `.claude/settings.json` (env.AI_DEVKIT_VERSION) and the last 2 changelog entries from `.claude/CHANGELOG.md`.