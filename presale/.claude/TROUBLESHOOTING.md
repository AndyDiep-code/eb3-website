# Troubleshooting Guide

## Quick Diagnostics

Before diving into specific issues, verify your setup manually:

1. Check directory structure exists: `ls -la .claude/`
2. Verify key files are present: `ls .claude/CLAUDE.md .claude/settings.local.json`
3. Test YAML syntax in commands: `head -20 .claude/commands/devkit/*.md`

This helps identify:
- Directory structure integrity
- YAML frontmatter syntax
- File naming conventions
- Required files presence

## Common Issues

### 1. Agent Failures

**Symptoms:**
- Agent doesn't complete task
- Agent returns incomplete results
- Agent loops indefinitely
- Agent reports "I don't have access to that tool"
- Agent stops mid-task without explanation

**Causes & Solutions:**

**Insufficient Context**
- **Problem:** Agent doesn't understand what to do
- **Solution:** Provide more specific instructions with examples
- **Example:** Instead of "fix the code", say "fix the authentication bug in src/auth.ts where tokens expire too early"

**Missing Skills**
- **Problem:** Agent lacks specialized knowledge
- **Solution:** Check agent has access to required skills in frontmatter
- **Example:**
  ```yaml
  skills:
    - backend-development
  ```

**Tool Restrictions**
- **Problem:** Agent can't use necessary tools
- **Solution:** Verify `allowed-tools` in command/agent configuration
- **Example:**
  ```yaml
  allowed-tools:
    - Read
    - Edit
    - Bash
    - Grep
  ```

**Timeout Issues**
- **Problem:** Task too complex for single agent execution
- **Solution:** Break task into smaller subtasks
- **Example:** Instead of "refactor entire codebase", create subtasks for each module

**Circular Dependencies**
- **Problem:** Agent delegates back to calling agent
- **Solution:** Define clear agent hierarchy and responsibilities in CLAUDE.md

**Context Overload**
- **Problem:** Too many files or too much information
- **Solution:** Use focused search patterns and limit scope
- **Example:** Use specific glob patterns like `src/auth/**/*.ts` instead of `**/*`

### 2. Skill Not Activating

**Symptoms:**
- Skill tool returns "skill not found"
- Skill output not appearing in agent response
- Agent doesn't use skill knowledge
- Skill listed but not executing

**Causes & Solutions:**

**Wrong Skill Name**
- **Problem:** Typo or incorrect skill identifier
- **Solution:** Check exact name in skills/ directory
- **Verification:**
  ```bash
  ls -la .claude/skills/
  ```
- **Note:** Skill names are case-sensitive and must match directory name

**Missing SKILL.md**
- **Problem:** Skill directory exists but lacks entry point
- **Solution:** Each skill needs SKILL.md file at root
- **Template:**
  ```markdown
  # Skill Name

  ## Description
  [What this skill does]

  ## When to Use
  [Trigger conditions]

  ## Resources
  - references/guide.md
  ```

**Skill Not in Catalog**
- **Problem:** Skill directory missing or misconfigured
- **Solution:** Ensure skill has proper SKILL.md with metadata
- **Example:**
  ```markdown
  # skills/backend-development/SKILL.md
  ---
  name: backend-development
  description: Backend system development
  version: 1.0.0
  ---
  ```

**Invalid Skill Structure**
- **Problem:** Missing required subdirectories or files
- **Solution:** Follow standard structure:
  ```
  skills/skill-name/
  ├── SKILL.md              # Entry point
  └── references/           # Supporting docs
      ├── guide.md
      └── examples.md
  ```

**Skill Description Too Vague**
- **Problem:** Claude doesn't know when to activate skill
- **Solution:** Write clear, specific descriptions in SKILL.md
- **Example:** "Use when optimizing SQL queries, designing indexes, or analyzing EXPLAIN plans"

### 3. Skill Invocation Errors

**Symptoms:**
- Skill not activated
- Arguments not parsed correctly
- YAML frontmatter errors

**Causes & Solutions:**

**Invalid YAML Syntax**
- **Problem:** Malformed frontmatter breaks skill parsing
- **Solution:** Validate YAML syntax
- **Common Issues:**
  - Missing closing `---`
  - Incorrect indentation (use 2 spaces)
  - Unquoted special characters
  - List items not properly formatted
- **Validation:**
  ```bash
  # Check YAML syntax
  python -c "import yaml; yaml.safe_load(open('.claude/skills/my-skill/SKILL.md').read().split('---')[1])"
  ```

**Missing Skill File**
- **Problem:** SKILL.md file doesn't exist
- **Solution:** Ensure skill directory has a SKILL.md
- **Verification:**
  ```bash
  ls -la .claude/skills/
  ```

**Wrong Skill Name**
- **Problem:** Skill invoked with wrong name
- **Solution:** Check the `name:` field in SKILL.md frontmatter — this is the canonical invocation
- **Example:** A skill with `name: devkit:review` is invoked as `/devkit:review`, not `/devkit:code-review`

**Missing Description**
- **Problem:** Skill not auto-activated for relevant tasks
- **Solution:** Add description in SKILL.md frontmatter
- **Example:**
  ```yaml
  ---
  description: Perform security-focused code review
  ---
  ```

**Argument Parsing Issues**
- **Problem:** Skill doesn't receive expected arguments
- **Solution:** Check `argument-hint` in frontmatter
- **Example:**
  ```yaml
  ---
  argument-hint: "[file-path] [--mode basic|detailed|comprehensive]"
  ---
  ```

**Conflicting Command Names**
- **Problem:** Multiple commands with same name
- **Solution:** Use unique names or organize in subdirectories
- **Example:** Instead of two `review.md`, use `review/code.md` and `review/docs.md`

### 4. Hook Failures

**Symptoms:**
- Hooks don't execute at expected lifecycle points
- Hook output not appearing in logs
- "Permission denied" errors
- Hooks execute but have no effect
- PreToolUse hooks not blocking when expected

**Causes & Solutions:**

**Not Executable**
- **Problem:** Hook script lacks execution permissions
- **Solution:** Make script executable
- **Fix:**
  ```bash
  chmod +x .claude/hooks/*.sh
  chmod +x .claude/hooks/*.cjs
  ```

**Wrong Path in Configuration**
- **Problem:** settings.local.json points to non-existent hook
- **Solution:** Verify hook paths in configuration
- **Example:**
  ```json
  {
    "hooks": {
      "UserPromptSubmit": [
        {
          "hooks": [
            {
              "type": "command",
              "command": "bash \"$CLAUDE_PROJECT_DIR\"/.claude/hooks/your-hook.sh"
            }
          ]
        }
      ],
      "PreToolUse": [
        {
          "matcher": "Bash|Glob|Grep|Read|Edit|Write",
          "hooks": [
            {
              "type": "command",
              "command": "node \"$CLAUDE_PROJECT_DIR\"/.claude/hooks/scout-block.cjs"
            }
          ]
        }
      ]
    }
  }
  ```

**Script Syntax Errors**
- **Problem:** Hook script has bugs
- **Solution:** Test script independently
- **Testing:**
  ```bash
  # Run hook directly to see errors
  echo '{"tool_name":"Read","tool_input":{}}' | node .claude/hooks/scout-block.cjs
  ```

**Missing Dependencies**
- **Problem:** Hook requires tools not installed
- **Solution:** Check script dependencies
- **Example:** If hook uses `jq`, ensure it's installed:
  ```bash
  which jq || brew install jq
  ```

**Wrong Interpreter**
- **Problem:** Script shebang incorrect or missing
- **Solution:** Add proper shebang line
- **Example:**
  ```bash
  #!/bin/bash
  # or
  #!/usr/bin/env node
  ```

**Hook Doesn't Return Properly**
- **Problem:** Hook exits with non-zero status unexpectedly
- **Solution:** Understand exit code meanings
- **Exit Codes:**
  - `0` - Success (non-blocking, allows continuation)
  - `2` - Blocked (for PreToolUse hooks, prevents tool execution)
- **Example:**
  ```bash
  #!/bin/bash
  # Your hook logic here
  exit 0  # Allow continuation
  # or
  exit 2  # Block the tool (PreToolUse only)
  ```

**PreToolUse Hook Not Blocking**
- **Problem:** Hook should block but tool executes anyway
- **Solution:** Ensure exit code is 2 and JSON output has `"continue": false`
- **Example:**
  ```javascript
  console.log(JSON.stringify({
    continue: false,
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      additionalContext: "Blocked: reason here"
    }
  }));
  process.exit(2);
  ```

**Wrong File Extension for Node.js Hooks**
- **Problem:** Node.js hooks fail with module errors
- **Solution:** Use `.cjs` extension for CommonJS modules
- **Fix:** Rename `hook.js` to `hook.cjs`

### 5. Orchestration Problems

**Symptoms:**
- Agents don't coordinate effectively
- Context lost between agent handoffs
- Circular delegation loops
- Duplicate work across agents
- Incomplete task completion

**Causes & Solutions:**

**Missing Task Storage**
- **Problem:** Agents can't share context
- **Solution:** Use unified path convention for task storage
- **Pattern:** `./.claude/tasks/[TASK-ID]/[PHASE]/YYMMDD-[agent]-[type].md`
- **Example:**
  ```
  .claude/tasks/auth-refactor/
  ├── plan/
  │   └── 251215-planner-plan.md
  ├── implementation/
  │   └── 251215-implementer-report.md
  └── review/
      └── 251215-reviewer-feedback.md
  ```

**No Report Handoff**
- **Problem:** Agents complete work but don't document outputs
- **Solution:** Agents must save reports to task directory
- **Template:**
  ```markdown
  # [Agent Name] Report

  ## Task
  [What was requested]

  ## Actions Taken
  [What was done]

  ## Outputs
  [Files created/modified]

  ## Next Steps
  [What should happen next]
  ```

**Unclear Delegation**
- **Problem:** Agents don't know who handles what
- **Solution:** Define explicit agent responsibilities in CLAUDE.md
- **Example:**
  ```markdown
  ## Agent Responsibilities

  - **planner**: Requirements analysis, architecture design
  - **implementer**: Implementation, testing
  - **reviewer**: Code review, quality checks
  ```

**Missing Orchestration Rules**
- **Problem:** No clear workflow defined
- **Solution:** Document orchestration patterns in CLAUDE.md
- **Example:**
  ```markdown
  ## Workflow

  1. User request → planner agent
  2. Planner creates plan → saves to tasks/[id]/plan/
  3. Implementer reads plan → implements → saves report
  4. Reviewer reads implementation → provides feedback
  ```

**Conflicting Agent Instructions**
- **Problem:** Multiple agents have overlapping responsibilities
- **Solution:** Ensure clear separation of concerns
- **Review:** Check agent frontmatter for duplicate responsibilities

**No Central Coordination**
- **Problem:** No agent manages overall workflow
- **Solution:** Designate orchestrator agent
- **Example:** Create `orchestrator` command that manages agent delegation

### 6. Storage Path Issues

**Symptoms:**
- Reports not found by other agents
- Outputs saved in wrong location
- Inconsistent file naming
- Duplicate files with different names
- Can't track task history

**Causes & Solutions:**

**Non-Standard Paths**
- **Problem:** Agents save files to arbitrary locations
- **Solution:** Follow storage path convention
- **Standard:** `./.claude/tasks/[TASK-ID]/[PHASE]/YYMMDD-[agent]-[type].md`

**Missing Task ID**
- **Problem:** Can't associate files with tasks
- **Solution:** Generate and use consistent task IDs
- **Example:** Use date + short description: `251215-auth-refactor`

**Wrong Phase Directory**
- **Problem:** Files saved in incorrect lifecycle phase
- **Solution:** Use standard phase names
- **Phases:**
  - `plan/` - Requirements, design, architecture
  - `implementation/` - Code changes, builds
  - `review/` - Code review, testing results
  - `deployment/` - Release notes, deployment logs

**Inconsistent Naming**
- **Problem:** Files don't follow naming convention
- **Solution:** Use format: `YYMMDD-[agent]-[type].md`
- **Examples:**
  - `251215-planner-plan.md`
  - `251215-implementer-implementation.md`
  - `251215-reviewer-feedback.md`

**No File Type Indicator**
- **Problem:** Can't tell what file contains
- **Solution:** Use descriptive type suffixes
- **Types:**
  - `-plan.md` - Planning documents
  - `-report.md` - Execution reports
  - `-feedback.md` - Review feedback
  - `-log.md` - Activity logs

**Reference Documentation:**
- See `rules/documentation-management.md` for storage path guidelines
- See `CLAUDE.md` for orchestration patterns

## Debugging Steps

### Step 1: Verify Setup Manually

Run manual checks to verify your setup:

```bash
# Check directory structure
ls -la .claude/

# Verify key directories exist
ls .claude/agents/ .claude/commands/devkit/ .claude/skills/

# Check YAML syntax in a command
python -c "import yaml; yaml.safe_load(open('.claude/commands/devkit/debug.md').read().split('---')[1])"
```

Expected results:
- All directories exist and contain expected files
- YAML parsing succeeds without errors
- Key files like CLAUDE.md and settings.local.json are present

If issues are found, address them before proceeding.

### Step 2: Check Specific Component

**Validate Individual Agent:**
```bash
# Check agent configuration
cat .claude/agents/my-agent.md

# Verify frontmatter
head -n 20 .claude/agents/my-agent.md
```

**Validate Individual Skill:**
```bash
# Check skill exists
ls -la .claude/skills/my-skill/

# Verify SKILL.md
cat .claude/skills/my-skill/SKILL.md
```

**Validate Individual Command:**
```bash
# Check command exists
cat .claude/commands/devkit/my-command.md

# Test YAML parsing
python -c "import yaml; print(yaml.safe_load(open('.claude/commands/devkit/my-command.md').read().split('---')[1]))"
```

**Check Configuration:**
```bash
# Validate settings JSON syntax
cat .claude/settings.local.json | jq .

# List agents
ls .claude/agents/

# List skills
ls .claude/skills/

# List commands
ls .claude/commands/devkit/
```

### Step 3: Test in Isolation

**Test Agent Independently:**
```markdown
# In Claude chat:
Use the [agent-name] agent to [specific task]

# Example:
Use the code-reviewer agent to review src/auth.ts for security issues
```

**Test Skill Activation:**
```markdown
# In Claude chat:
I need help with [skill domain]. Can you use the [skill-name] skill?

# Example:
I need help optimizing a slow SQL query. Can you use the sql-optimization-patterns skill?
```

**Test Command Execution:**
```bash
# Run command directly
/my-command arg1 arg2

# Example:
/code-review src/auth.ts --depth detailed
```

**Test Hook Execution:**
```bash
# Test UserPromptSubmit hook (bash)
./.claude/hooks/executable_force-agent-skills-eval.sh

# Test PreToolUse hook (node) with sample input
echo '{"tool_name":"Read","tool_input":{"file_path":"node_modules/test.js"}}' | node .claude/hooks/scout-block.cjs

# Check exit code
echo $?  # 0 = allowed, 2 = blocked (for PreToolUse)
```

### Step 4: Review Logs

**Check Task Outputs:**
```bash
# List recent task directories
ls -lt .claude/tasks/ | head -10

# View specific task history
find .claude/tasks/[task-id] -type f -name "*.md"

# Read agent reports
cat .claude/tasks/[task-id]/*/251215-*-report.md
```

**Check Command Execution:**
```bash
# If logging enabled in settings.local.json
cat .claude/logs/commands.log | grep "my-command"
```

**Check Hook Output:**
```bash
# If hooks redirect to log files
cat .claude/logs/hooks.log
```

**Check for Common Errors:**
```bash
# Search for error patterns
grep -r "error\|failed\|invalid" .claude/tasks/

# Check for incomplete tasks
find .claude/tasks -name "*-report.md" -exec grep -L "Next Steps" {} \;
```

### Step 5: Verify Dependencies

**Check Tool Availability:**
```bash
# Verify required tools installed
which jq python node npm git

# Check versions
python --version
node --version
```

**Check File Permissions:**
```bash
# Verify hooks are executable
ls -la .claude/hooks/

# Fix if needed
chmod +x .claude/hooks/*.sh
```

**Check Path Resolution:**
```bash
# Verify paths in settings.local.json
cat .claude/settings.local.json | jq '.paths'

# Check paths exist
ls -la [path-from-settings]
```

## Advanced Debugging

### Enable Verbose Logging

Add to `.claude/settings.local.json`:

```json
{
  "logging": {
    "level": "debug",
    "commands": true,
    "agents": true,
    "skills": true,
    "hooks": true
  }
}
```

### Debug Agent Behavior

Create a test command that exercises specific agent:

```markdown
---
description: Debug agent behavior
agent: my-agent
---

# Debug Test

Execute this specific task with verbose output:

[Test scenario]
```

### Trace Orchestration Flow

1. Enable task logging in each agent
2. Review task directory chronologically
3. Map agent handoffs and context flow
4. Identify where information is lost

### Validate Cross-References

Check for broken links between components:

```bash
# Find all skill references in agents
grep -r "skills:" .claude/agents/

# Find all agent references in commands
grep -r "agent:" .claude/commands/devkit/

# Verify references exist
ls .claude/agents/
ls .claude/skills/
```

## Getting Help

### Internal Resources

**Check Components:**
```bash
# List all agents
ls -la .claude/agents/*.md

# List all skills
ls -la .claude/skills/*/SKILL.md

# List all commands
find .claude/commands/devkit -name "*.md"
```

**Review Core Documentation:**
- `CLAUDE.md` - Orchestration patterns and workflows
- `rules/documentation-management.md` - File storage guidelines

**Check Cross-References Manually:**
```bash
# Find all skill references in agents
grep -r "skills:" .claude/agents/

# Verify references exist
ls .claude/skills/
```

### Community Resources

**Search Examples:**
- Check example configurations in templates/
- Review sample agents/skills/commands
- Study working orchestration patterns

**Documentation:**
- Read official Claude Code documentation
- Review template README files
- Check component-specific guides

### Reporting Issues

When seeking help, provide:

1. **Setup Verification:**
   ```bash
   # List all components
   ls -la .claude/agents/ .claude/commands/devkit/ .claude/skills/
   ```

2. **Component Configuration:**
   - Relevant agent/skill/command files
   - settings.local.json (redact sensitive data)

3. **Error Messages:**
   - Exact error text
   - Stack traces if available
   - Log file excerpts

4. **Context:**
   - What you're trying to accomplish
   - Steps taken before error
   - Expected vs actual behavior

5. **Environment:**
   - Claude Code version
   - Operating system
   - Project structure overview

## Prevention Best Practices

### Before Creating Components

1. Plan component responsibilities clearly
2. Check for existing similar components
3. Document component purpose and usage
4. Define integration points with other components

### During Development

1. Validate YAML syntax frequently
2. Test components in isolation
3. Document assumptions and dependencies
4. Follow naming conventions consistently

### After Changes

1. Run validation suite
2. Test full orchestration flow
3. Document changes in relevant guides

### Regular Maintenance

1. Review task outputs periodically
2. Clean up obsolete components
3. Update documentation as patterns evolve
4. Archive completed task directories

---

**Last Updated:** 2026-01-19
**Version:** 1.2
**Maintained By:** AI DevKit Team