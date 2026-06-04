# Error Handling

Error scenarios and recovery strategies.

## Overview

Error handling ensures the skill gracefully handles missing prerequisites, invalid inputs, and project state issues.

## Error Scenarios

### 1. Missing Task ID

**Error**: Task ID not provided

**Message**:
```
❌ Task ID is required
Please provide the Task ID (e.g., test-api-001) to generate API tests for:
```

**Recovery**:
- Use `AskUserQuestion` to request Task ID from user
- Store response as {task-id}
- Continue with validation

### 2. Task Not Found

**Error**: Task directory does not exist

**Message**:
```
❌ Task not found: ./test-tasks/playwright/{task-id}/
Available tasks:
  - test-api-001
  - test-api-002
  - test-ui-001
```

**Recovery**:
- List available tasks in `./test-tasks/playwright/`
- Ask user to provide valid task ID
- Stop execution

### 3. Missing Network Capture

**Error**: Network capture file not found

**Message**:
```
❌ Network capture not found: ./test-tasks/playwright/{task-id}/locators/*/network-calls.json
Run the locators capture command first:
  /qakit:playwright:capture-network --task={task-id}
```

**Recovery**:
- Suggest running locators capture command
- Stop execution

### 4. Missing Test Cases

**Error**: API test cases file not found

**Message**:
```
❌ API test cases not found: ./test-tasks/playwright/{task-id}/test-cases/api/test-cases.md
Create test cases file with:
  ## Happy Path
  | Test ID | Endpoint | Method | Expected Status | Description |
  |---------|----------|--------|-----------------|-------------|
  | TC-API-001 | /api/users | POST | 201 | Create user |
```

**Recovery**:
- Provide template for test cases file
- Stop execution

### 5. Project Not Initialized

**Error**: Automation project not initialized

**Message**:
```
❌ Automation project not initialized: ./tests/playwright/
Run the init-automation command first:
  /qakit:playwright:init-automation
```

**Recovery**:
- Suggest running init-automation command
- Stop execution

### 6. Invalid Endpoint Pattern

**Error**: Endpoint pattern does not match any endpoints

**Message**:
```
❌ No endpoints match pattern: /api/invalid/*
Available endpoints:
  - POST /api/users
  - GET /api/users
  - GET /api/users/{id}
  - PUT /api/users/{id}
  - DELETE /api/users/{id}
  - POST /api/auth/login
  - POST /api/auth/logout
```

**Recovery**:
- List available endpoints
- Ask user to provide valid pattern
- Stop execution

### 7. Invalid Test Type

**Error**: Test type not recognized

**Message**:
```
❌ Invalid test type: {type}
Valid test types:
  - happy-path
  - validation
  - security
  - performance
  - all (default)
```

**Recovery**:
- List valid test types
- Ask user to provide valid type
- Stop execution

### 8. No Test Cases for Type

**Error**: No test cases found for specified type

**Message**:
```
⚠️  No test cases found for type: {type}
Available test types in test cases:
  - happy-path (5 cases)
  - validation (3 cases)
  - security (0 cases)
  - performance (2 cases)
```

**Recovery**:
- List available test types with counts
- Ask user to choose different type or use 'all'
- Continue with other types if combined filter

### 9. No Endpoints for Pattern

**Error**: No endpoints match the pattern

**Message**:
```
⚠️  No endpoints match pattern: {pattern}
Generating tests for all endpoints instead.
```

**Recovery**:
- Fall back to all endpoints
- Continue generation

### 10. Network Capture Missing Enhancements

**Error**: Network capture missing required enhancements

**Message**:
```
⚠️  Network capture missing enhancements:
  - Endpoint inventory: ✓
  - Schema detection: ✗
  - Call sequences: ✗
  - Performance timing: ✗

Run locators capture with network analysis enabled:
  /qakit:playwright:capture-network --task={task-id} --analyze
```

**Recovery**:
- Warn user about missing enhancements
- Continue with available data
- Generate tests with limited functionality

## Validation Checks

### Pre-Generation Checks

1. **Task Exists**
   - Check: `./test-tasks/playwright/{task-id}/` exists
   - Error: Task not found

2. **Network Capture Exists**
   - Check: `./test-tasks/playwright/{task-id}/locators/*/network-calls.json` exists
   - Error: Network capture not found

3. **Test Cases Exist**
   - Check: `./test-tasks/playwright/{task-id}/test-cases/api/test-cases.md` exists
   - Error: Test cases not found

4. **Project Initialized**
   - Check: `./tests/playwright/package.json` exists
   - Error: Project not initialized

5. **Endpoint Pattern Valid**
   - Check: Pattern matches at least 1 endpoint
   - Error: No endpoints match pattern

6. **Test Type Valid**
   - Check: Type is one of: happy-path, validation, security, performance, all
   - Error: Invalid test type

## User Prompts

### Missing Task ID

```
Question: "Please provide the Task ID (e.g., test-api-001) to generate API tests for:"
Input: User enters task ID
Action: Continue with validation
```

### Invalid Endpoint Pattern

```
Question: "No endpoints match pattern '{pattern}'. Choose an action:
  1. Use different pattern
  2. Generate for all endpoints
  3. Cancel"
Input: User selects option
Action: Continue or stop
```

### Invalid Test Type

```
Question: "Invalid test type '{type}'. Choose a valid type:
  1. happy-path
  2. validation
  3. security
  4. performance
  5. all"
Input: User selects option
Action: Continue with selected type
```

## Recovery Strategies

### Strategy 1: Ask User

Use `AskUserQuestion` to get user input for:
- Missing task ID
- Invalid endpoint pattern
- Invalid test type

### Strategy 2: Suggest Fix

Provide command to fix issue:
- Missing network capture: Run capture command
- Missing test cases: Create test cases file
- Project not initialized: Run init-automation

### Strategy 3: Fall Back

Use default or alternative:
- No endpoints match pattern: Use all endpoints
- No test cases for type: Use all types
- Missing enhancements: Continue with available data

### Strategy 4: Stop

Stop execution when:
- Task not found
- Network capture not found
- Test cases not found
- Project not initialized

## Related Documentation

[See: Default Mode](../modes/default.md)
[See: Endpoint Filter Mode](../modes/endpoint-filter.md)
