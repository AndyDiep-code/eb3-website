# AI Prompt: GraphQL Test Case Generation

Use this prompt context when generating test cases in STEP 6 of generate.md.

## Context to Provide AI

1. Full introspection schema (from introspection.json)
2. List of all queries with args + return types
3. List of all mutations with args + return types
4. Auth patterns detected (which operations need tokens)
5. Login credentials (admin + user if available)

## GraphQL Testing Rules (AI must follow)

### Rule 1: HTTP 200 is NOT success in GraphQL
- Success = HTTP 200 + `data` exists + `errors` absent/empty
- Failure = HTTP 200 + `errors` array present
- NEVER check HTTP status code alone for GraphQL pass/fail

### Rule 2: Two types of errors
- **Validation errors** (before resolver): missing required arg, wrong type — returned as errors array
- **Resolver errors** (during execution): auth failed, not found, business logic violation

### Rule 3: Auth test pattern
```
No token → errors[0].message contains "Unauthorized" OR "Unauthenticated"
Wrong role → errors[0].message contains "Forbidden" OR "Access denied"
```

### Rule 4: Variable declarations
Always use named operations with variable declarations for testability:
```graphql
# GOOD — testable with variables
mutation CreatePayment($amount: Float!, $currency: String!) {
  createPayment(amount: $amount, currency: $currency) { id status }
}

# BAD — hardcoded values not reusable
mutation { createPayment(amount: 100, currency: "USD") { id } }
```

### Rule 5: Return field selection
Always select enough fields to assert on:
- Always include `id` if available
- Include status/state fields for business logic assertions
- Include relationship fields for RBAC tests

## Test Case Categories per Operation

For each operation, generate ALL of:

1. **Happy path (admin)**: valid args + admin token → data returned
2. **Happy path (user)** (if roles allow): valid args + user token → data returned
3. **No auth**: no token → errors present with auth message
4. **Wrong role** (if admin-only): user token → errors present with forbidden message
5. **Missing required arg**: omit one required arg → GraphQL validation error
6. **Invalid type** (if applicable): pass string for Int arg → validation error
7. **Not found** (for ID-based queries): use non-existent ID like "999999"
8. **Business logic** (infer from operation name): e.g. createPayment with negative amount

## Output Format per Test Case

```
### TC-GQL-{sequential_number}: {type} {operationName} — {scenario_name}

**Auth:** Bearer ADMIN_TOKEN | Bearer USER_TOKEN | none

**Query:**
mutation OperationName($var: Type!) {
  operationName(var: $var) {
    id
    relevantField
  }
}

**Variables:**
{"var": "value"}

**Expected:**
- data.operationName.id exists
- errors: absent

OR for error cases:
- errors[0].message contains "Unauthorized"
- data: null or absent
```
