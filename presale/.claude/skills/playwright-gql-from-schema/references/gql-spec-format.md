# gql-spec.json Format

Output file: `test-tasks/playwright/{task-id}/test-cases/gql/gql-spec.json`

Consumed by `playwright-gql-supertest` to generate test files.
Designed to be generic — works for any GraphQL framework regardless of ID type (integer or UUID).

## Schema

```json
{
  "task": "{TASK_ID}",
  "endpoint": "http://localhost:4000/graphql",
  "framework": "graphql-yoga | apollo | hasura | auto",
  "generatedAt": "YYYY-MM-DD",
  "meta": {
    "loginMutation": "login",
    "tokenPath": "data.login.token",
    "tokenResponseKey": "token",
    "meQuery": "me",
    "userRoleField": "role",
    "adminRoleValue": "admin",
    "userListQuery": "users { id role }",
    "idType": "uuid | integer | auto"
  },
  "credentials": {
    "admin": {
      "query": "mutation { login(email: \"admin@example.com\", password: \"Admin123!\") { token } }"
    },
    "user": {
      "query": "mutation { login(email: \"user@example.com\", password: \"User123!\") { token } }"
    }
  },
  "operations": [
    {
      "type": "query",
      "name": "me",
      "auth": true,
      "roles": ["any"],
      "happyPathQuery": "{ me { id email role } }",
      "validVariables": {}
    },
    {
      "type": "mutation",
      "name": "login",
      "auth": false,
      "roles": [],
      "happyPathQuery": "mutation Login($email: String!, $password: String!) { login(email: $email, password: $password) { token user { id role } } }",
      "validVariables": { "email": "admin@example.com", "password": "Admin123!" }
    }
  ]
}
```

## Field Descriptions

| Field | Description | Example |
|-------|-------------|---------|
| `meta.loginMutation` | Name of mutation returning auth token | `"login"` |
| `meta.tokenPath` | Dot-path to token in full response | `"data.login.token"` |
| `meta.tokenResponseKey` | Actual key name in response object | `"token"` or `"access_token"` |
| `meta.meQuery` | Query to get current user info | `"me"` |
| `meta.userRoleField` | Field on User type holding role string | `"role"` |
| `meta.adminRoleValue` | Role value identifying admin | `"admin"`, `"ADMIN"` |
| `meta.userListQuery` | GraphQL query body to list users (for ID resolution) | `"users { id role }"` |
| `meta.idType` | Entity ID type — integer, uuid, or auto-detect | `"uuid"` |
| `credentials` | Map of role → login mutation query. **Add any role needed, not just admin/user** | |
| `credentials.admin.query` | Full mutation string to login as admin | |
| `credentials.user.query` | Full mutation string to login as regular user | |

## Multiple Credential Roles

Add entries beyond `admin` + `user` for projects with more roles:

```json
"credentials": {
  "admin": { "query": "mutation { login(email: \"admin@example.com\", password: \"Admin123!\") { token } }" },
  "alice": { "query": "mutation { login(email: \"alice@example.com\", password: \"Alice123!\") { token } }" },
  "bob":   { "query": "mutation { login(email: \"bob@example.com\",   password: \"Bob123!\")   { token } }" }
}
```

Skill 3 (`playwright-gql-supertest`) uses `getTokenForRole('alice')` to get any role's token.

## userListQuery — Critical for resolveEntityIds()

`meta.userListQuery` is used by Skill 3's `resolveEntityIds()` to discover actual user IDs at runtime.
This avoids hardcoded IDs that break when DB is reseeded.

Detection logic (auto-populated by Skill 2):
- Look for a Query field returning `[User]` or `[UserType]` (array of user objects)
- If not found (API doesn't expose user list), set to `""` — resolveEntityIds() will be skipped

```json
"userListQuery": "users { id role }"
```

## DYNAMIC_UUID_* Convention — For ID-sensitive validVariables

When an operation requires an entity ID (user ID, transaction ID, etc.) that can't be known at generation time, set `validVariables` to a `DYNAMIC_*` sentinel string:

```json
"validVariables": { "id": "DYNAMIC_UUID_USER" }
"validVariables": { "toUserId": "DYNAMIC_UUID_USER", "amount": 10.0 }
"validVariables": { "id": "DYNAMIC_UUID_TRANSACTION" }
```

**Skill 3 (`playwright-gql-supertest`) reads these sentinels and replaces them at runtime** using `resolveEntityIds(adminToken)`:
- `DYNAMIC_UUID_USER` → resolved via `meta.userListQuery`
- `DYNAMIC_UUID_TRANSACTION` → resolved via `transactions` query
- `DYNAMIC_UUID_PAYMENT_METHOD` → resolved via `paymentMethods` query

This ensures tests never hardcode IDs, even in gql-spec.json. The AI generating specs must use these sentinels for any operation requiring a live entity ID.

---

## idType — Important for ID-sensitive tests

```json
"idType": "uuid"       // UUIDs: "363402f4-e986-4ebf-..."
"idType": "integer"    // Integers: 1, 2, 3
"idType": "auto"       // Let resolveEntityIds() figure it out
```

Detection: look at ID field type in introspection (ID scalar resolves to string, but values vary).

## Detection Rules (auto-populated from introspection in Skill 2)

| Meta field | Detection logic |
|-----------|----------------|
| `loginMutation` | Mutation whose return type has token/access_token/jwt field |
| `tokenPath` | Build from mutation name: `data.{mutationName}.{tokenField}` |
| `tokenResponseKey` | The actual token field name (token, access_token, jwt) |
| `meQuery` | Query returning User type with name "me", "currentUser", "profile" |
| `userRoleField` | Field on User type with name "role", "userRole", "type" |
| `adminRoleValue` | Check enum values or default to "admin" |
| `userListQuery` | Query returning [User!]! or [User]  — check User list queries |
| `idType` | Check mutation responses — if ID looks like UUID, set "uuid"; else "integer" |
