# REST Request Design

> Consistent path formats and naming conventions.

## Resource Naming

```bash
# GOOD: Plural nouns, lowercase with dashes
GET /api/users
GET /api/app-setups
GET /api/service-instances

# BAD: Verbs, singular, mixed case
GET /api/getUser
GET /api/user
POST /api/createOrder
GET /api/AppSetups
```

## Actions Pattern

```bash
# Special actions under standard prefix
POST /resources/{resource_id}/actions/{action}

# Examples
POST /runs/{run_id}/actions/stop
POST /apps/{app_id}/actions/restart
POST /dynos/{dyno_id}/actions/scale
```

## Attribute Naming

```json
// Lowercase with underscores (JavaScript-friendly)
{
  "service_class": "first",
  "created_at": "2012-01-01T12:00:00Z",
  "owner_email": "user@example.com"
}
```

## Non-ID Dereferencing

```bash
# Support both ID and name
GET /apps/97addcf0-c182-4f6a-9b3f-1a4b2c3d4e5f  # UUID
GET /apps/www-prod                                # Name

# NEVER accept only names (IDs must always work)
```

## Minimize Path Nesting

```bash
# BAD: Deep nesting
/orgs/{org_id}/apps/{app_id}/dynos/{dyno_id}

# GOOD: Flatter structure (max 2 levels)
/orgs/{org_id}           # Organization
/orgs/{org_id}/apps      # Scoped collection
/apps/{app_id}           # Direct app access
/apps/{app_id}/dynos     # Scoped collection
/dynos/{dyno_id}         # Direct dyno access
```

## HTTP Methods

| Method | Purpose | Idempotent |
|--------|---------|------------|
| GET | Retrieve resource(s) | Yes |
| POST | Create resource | No |
| PUT | Replace resource | Yes |
| PATCH | Partial update | No |
| DELETE | Remove resource | Yes |

## Request Bodies

```bash
# Accept JSON for POST/PUT/PATCH
curl -X POST https://api.example.com/apps \
    -H "Content-Type: application/json" \
    -d '{"name": "demoapp"}'
```

## Naming Conventions Summary

| Element | Convention | Example |
|---------|------------|---------|
| Paths | lowercase-dashes | `/app-setups` |
| Attributes | lowercase_underscores | `created_at` |
| Resource IDs | UUID 8-4-4-4-12 | `01234567-89ab-cdef-0123-456789abcdef` |
| Timestamps | ISO8601 UTC | `2012-01-01T12:00:00Z` |
