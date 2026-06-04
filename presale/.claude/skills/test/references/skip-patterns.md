# Test Skill: Skip Patterns

## Files to SKIP (no unit tests needed)

- `*.test.ts`, `*.spec.ts` (test files)
- `*.d.ts` (type definitions)
- `*.config.*` (configuration)
- `index.ts` (barrel files)
- Generated files
- Migration files
- Repository files (data access layer):
  - `repository/`, `repositories/` directories
  - `*.repository.ts`, `*.repository.js`
  - `*Repository.java`, `*Repository.kt`, `*Repository.cs`
  - `*_repository.py`, `*_repository.go`, `*_repository.rb`
  - `*Repository.php`, `*_repository.rs`, `*Repository.swift`
  - `*_repository.dart`, `*Repository.dart`

---

## Coverage Command (Per File)

Run coverage for a specific file, not the entire codebase:

```bash
npm test -- --coverage --collectCoverageFrom='path/to/file.ts'
```

Adapt to project test runner (jest, vitest, etc.) as needed.
