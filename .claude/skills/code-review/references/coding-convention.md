# Development Rules

> **Senior Developer Engineering Best Practices**
> This document defines coding standards and best practices that apply across all programming languages and platforms.

---

## Module Index

This guide is organized into focused modules for easier navigation:

| # | Module | Topics |
|---|--------|--------|
| 1 | [Core Principles](./rules/01-core-principles.md) | YAGNI, KISS, DRY, SOLID |
| 2 | [Naming & Constants](./rules/02-naming-and-constants.md) | Naming conventions, magic values, consistency |
| 3 | [Function Design](./rules/03-function-design.md) | Size, parameters, utils, types, return values |
| 4 | [Error Handling](./rules/04-error-handling.md) | Errors, logging, security |
| 5 | [Testing](./rules/05-testing.md) | Test pyramid, best practices, naming |
| 6 | [Code Quality](./rules/06-code-quality.md) | Documentation, formatting, code review |
| 7 | [Architecture](./rules/07-architecture.md) | Organization, dependencies, module boundaries |
| 8 | [Performance & Security](./rules/08-performance-security.md) | Optimization, OWASP, secure coding |

---

## Quick Reference - The 15 Clean Code Rules

1. **Meaningful Names** - Names should tell a story and be searchable
2. **Single Responsibility** - Functions/classes do ONE thing well
3. **Keep Functions Small** - Under 30 lines, fit on screen
4. **Comments Explain Why** - Not what (code shows what)
5. **DRY** - Extract repeated logic, don't copy-paste
6. **Proper Error Handling** - Fail safe, use custom errors
7. **Clear Formatting** - Auto-format on save
8. **Keep Classes Small** - Under 200 lines
9. **Strong Types** - Be explicit, avoid `any`
10. **Minimal Dependencies** - Each is a maintenance burden
11. **Consistent Patterns** - Same style everywhere
12. **Testable Code** - TDD, dependency injection
13. **Clear Return Values** - Explicit types, avoid null
14. **KISS** - Simple beats clever
15. **Self-Documenting Code** - Read it aloud

---

## Pre-Commit Checklist

Before committing code, verify:

- [ ] No magic numbers or strings - all values in constants
- [ ] Descriptive variable and function names
- [ ] Functions follow single responsibility principle
- [ ] Proper error handling with meaningful messages
- [ ] Sensitive data not logged or exposed
- [ ] Tests written and passing
- [ ] No code duplication - utils extracted
- [ ] Code is readable without excessive comments
- [ ] Security considerations addressed
- [ ] Performance implications considered
- [ ] Types are explicit (no `any`)
- [ ] Dependencies are minimal and justified

---

## Sources & Further Reading

- [15 Clean Code Rules - Dev.to](https://dev.to/hadil/15-delightful-clean-code-rules-that-will-make-your-code-sparkle-30g7)
- [Clean Code Principles - Caltech](https://pg-p.ctme.caltech.edu/blog/coding/clean-code-principles)
- [Software Engineering Best Practices 2025](https://zencoder.ai/blog/software-engineering-best-practices)
- [SOLID, DRY, KISS Principles](https://scalastic.io/en/solid-dry-kiss/)
- [Naming Conventions Guide](https://www.theserverside.com/feature/A-guide-to-common-variable-naming-conventions)
- [Error Handling & Logging Checklist](https://www.iansresearch.com/resources/all-blogs/post/security-blog/2023/08/17/error-handling-and-logging-checklist)
- [Logging Best Practices](https://betterstack.com/community/guides/logging/logging-best-practices/)
- [OWASP Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
- [Unit Testing Best Practices - IBM](https://www.ibm.com/think/insights/unit-testing-best-practices)
- [Code Documentation Best Practices](https://blog.codacy.com/code-documentation)
- [SQL Query Optimization - DataCamp](https://www.datacamp.com/blog/sql-query-optimization)
- [Clean Code by Robert C. Martin](https://www.freecodecamp.org/news/how-to-write-clean-code/)
