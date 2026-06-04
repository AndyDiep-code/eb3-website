# Smart File Exclusion Patterns

> Shared exclusion patterns for code review and implementation commands.

**Use this pattern to exclude non-reviewable files from analysis.**

## Exclusion Pattern (Bash)

```bash
# ═══════════════════════════════════════════════════════════════════
# BASE EXCLUSIONS (always apply)
# ═══════════════════════════════════════════════════════════════════
EXCLUDE_PATTERN="(node_modules/|vendor/|\.git/|\.svn/|\.hg/)"
EXCLUDE_PATTERN+="|(/dist/|/build/|/out/|/target/|/bin/|/obj/)"
EXCLUDE_PATTERN+="|(\.next/|\.nuxt/|\.output/|\.vercel/|\.netlify/)"
EXCLUDE_PATTERN+="|(/coverage/|/\.nyc_output/|/htmlcov/)"

# ═══════════════════════════════════════════════════════════════════
# TEST FILE PATTERNS (all languages)
# ═══════════════════════════════════════════════════════════════════
# JavaScript/TypeScript
EXCLUDE_PATTERN+="|(\\.test\\.(js|ts|jsx|tsx|mjs|cjs)$)"
EXCLUDE_PATTERN+="|(\\.spec\\.(js|ts|jsx|tsx|mjs|cjs)$)"
EXCLUDE_PATTERN+="|(\\-test\\.(js|ts|jsx|tsx)$)"

# Python
EXCLUDE_PATTERN+="|(test_.*\\.py$|.*_test\\.py$)"
EXCLUDE_PATTERN+="|(conftest\\.py$|pytest\\.ini$)"

# Go
EXCLUDE_PATTERN+="|(_test\\.go$)"

# Java/Kotlin
EXCLUDE_PATTERN+="|(Test[A-Z].*\\.java$|.*Tests?\\.java$)"
EXCLUDE_PATTERN+="|(Test[A-Z].*\\.kt$|.*Tests?\\.kt$)"

# C#/.NET
EXCLUDE_PATTERN+="|(Test[A-Z].*\\.cs$|.*Tests?\\.cs$)"
EXCLUDE_PATTERN+="|(\\.Tests\\.csproj$)"

# Ruby
EXCLUDE_PATTERN+="|(_spec\\.rb$|_test\\.rb$)"
EXCLUDE_PATTERN+="|(spec_helper\\.rb$|test_helper\\.rb$)"

# PHP
EXCLUDE_PATTERN+="|(Test[A-Z].*\\.php$|.*Test\\.php$)"

# Rust
EXCLUDE_PATTERN+="|(_test\\.rs$|/tests/)"

# Swift
EXCLUDE_PATTERN+="|(Tests?\\.swift$|.*Tests\\.swift$)"

# Elixir
EXCLUDE_PATTERN+="|(_test\\.exs$)"

# Test directories (all languages)
EXCLUDE_PATTERN+="|(__tests__/|__mocks__/|__fixtures__/|__snapshots__/)"
EXCLUDE_PATTERN+="|(/tests?/|/spec/|/specs/|/fixtures/|/mocks/|/stubs/)"
EXCLUDE_PATTERN+="|(/test_data/|/testdata/|/test-data/)"

# ═══════════════════════════════════════════════════════════════════
# GENERATED/AUTO FILES
# ═══════════════════════════════════════════════════════════════════
# TypeScript/JavaScript
EXCLUDE_PATTERN+="|(\\.d\\.ts$|\\.d\\.mts$|\\.d\\.cts$)"
EXCLUDE_PATTERN+="|(\\.generated\\.(ts|js|tsx|jsx)$)"
EXCLUDE_PATTERN+="|(generated/|__generated__|/gen/|\\.gen\\.)"

# Protocol Buffers / gRPC
EXCLUDE_PATTERN+="|(\\.pb\\.go$|\\.pb\\.ts$|\\.pb\\.js$)"
EXCLUDE_PATTERN+="|(_pb2\\.py$|_pb2_grpc\\.py$)"
EXCLUDE_PATTERN+="|(\\.grpc\\.ts$|\\.grpc\\.js$)"

# GraphQL
EXCLUDE_PATTERN+="|(\\.graphql\\.ts$|\\.gql\\.ts$)"
EXCLUDE_PATTERN+="|(graphql\\.schema\\.json$)"

# OpenAPI / Swagger
EXCLUDE_PATTERN+="|(openapi\\.generated\\.|swagger\\.generated\\.)"

# ORM Generated
EXCLUDE_PATTERN+="|(Generated\\.java$|Generated\\.cs$|Generated\\.kt$)"
EXCLUDE_PATTERN+="|(/migrations/|/database/migrations/)"

# Lock files
EXCLUDE_PATTERN+="|(package-lock\\.json$|yarn\\.lock$|pnpm-lock\\.yaml$)"
EXCLUDE_PATTERN+="|(Gemfile\\.lock$|Cargo\\.lock$|poetry\\.lock$)"
EXCLUDE_PATTERN+="|(composer\\.lock$|go\\.sum$|mix\\.lock$)"
EXCLUDE_PATTERN+="|(packages\\.lock\\.json$|paket\\.lock$)"

# ═══════════════════════════════════════════════════════════════════
# CONFIG FILES
# ═══════════════════════════════════════════════════════════════════
# JavaScript/TypeScript ecosystem
EXCLUDE_PATTERN+="|(jest\\.config\\.|vitest\\.config\\.|karma\\.conf\\.)"
EXCLUDE_PATTERN+="|(webpack\\.config\\.|vite\\.config\\.|rollup\\.config\\.)"
EXCLUDE_PATTERN+="|(babel\\.config\\.|\.babelrc)"
EXCLUDE_PATTERN+="|(tsconfig.*\\.json$|jsconfig.*\\.json$)"
EXCLUDE_PATTERN+="|(eslint.*\\.(js|json|yaml|yml)$|\\.eslintrc)"
EXCLUDE_PATTERN+="|(prettier.*\\.(js|json|yaml|yml)$|\\.prettierrc)"
EXCLUDE_PATTERN+="|(tailwind\\.config\\.|postcss\\.config\\.)"
EXCLUDE_PATTERN+="|(next\\.config\\.|nuxt\\.config\\.|svelte\\.config\\.)"

# Python
EXCLUDE_PATTERN+="|(setup\\.py$|setup\\.cfg$|pyproject\\.toml$)"
EXCLUDE_PATTERN+="|(tox\\.ini$|\.flake8$|\.pylintrc$)"
EXCLUDE_PATTERN+="|(mypy\\.ini$|\\.mypy\\.ini$)"

# Go
EXCLUDE_PATTERN+="|(go\\.mod$|\\.golangci\\.)"

# Java/Kotlin
EXCLUDE_PATTERN+="|(pom\\.xml$|build\\.gradle$|build\\.gradle\\.kts$)"
EXCLUDE_PATTERN+="|(settings\\.gradle$|gradle\\.properties$)"

# .NET/C#
EXCLUDE_PATTERN+="|(\\.csproj$|\\.sln$|\\.fsproj$)"
EXCLUDE_PATTERN+="|(nuget\\.config$|Directory\\.Build\\.props$)"

# Ruby
EXCLUDE_PATTERN+="|(Rakefile$|Gemfile$|\\.rubocop\\.yml$)"

# PHP
EXCLUDE_PATTERN+="|(composer\\.json$|phpunit\\.xml$|\\.php-cs-fixer\\.)"

# Rust
EXCLUDE_PATTERN+="|(Cargo\\.toml$|build\\.rs$|clippy\\.toml$)"

# Docker/Container
EXCLUDE_PATTERN+="|(Dockerfile$|docker-compose.*\\.ya?ml$|\\.dockerignore$)"

# CI/CD
EXCLUDE_PATTERN+="|(\\.github/|\\.gitlab-ci\\.yml$|\\.circleci/)"
EXCLUDE_PATTERN+="|(Jenkinsfile$|\\.travis\\.yml$|azure-pipelines\\.yml$)"

# Editor/IDE
EXCLUDE_PATTERN+="|(\\.vscode/|\\.idea/|\\.vs/|\\.editorconfig$)"

# ═══════════════════════════════════════════════════════════════════
# ENVIRONMENT & SECRETS
# ═══════════════════════════════════════════════════════════════════
EXCLUDE_PATTERN+="|(\\.env$|\\.env\\..*|env\\.local$)"
EXCLUDE_PATTERN+="|(secrets?\\.|credentials\\.|\.secret$)"
EXCLUDE_PATTERN+="|(\\.pem$|\\.key$|\\.crt$|\\.p12$|\\.pfx$)"

# ═══════════════════════════════════════════════════════════════════
# DOCUMENTATION & ASSETS
# ═══════════════════════════════════════════════════════════════════
# Storybook
EXCLUDE_PATTERN+="|(\\.stories\\.(js|ts|jsx|tsx|mdx)$)"
EXCLUDE_PATTERN+="|(storybook/|\\.storybook/)"

# Documentation
EXCLUDE_PATTERN+="|(/docs?/.*\\.md$|/documentation/)"
EXCLUDE_PATTERN+="|(README\\.md$|CHANGELOG\\.md$|CONTRIBUTING\\.md$)"
EXCLUDE_PATTERN+="|(LICENSE$|LICENSE\\.md$|NOTICE$)"

# Assets (images, fonts, etc.)
EXCLUDE_PATTERN+="|(\\.png$|\\.jpg$|\\.jpeg$|\\.gif$|\\.svg$|\\.ico$)"
EXCLUDE_PATTERN+="|(\\.woff$|\\.woff2$|\\.ttf$|\\.eot$|\\.otf$)"
EXCLUDE_PATTERN+="|(\\.mp3$|\\.mp4$|\\.wav$|\\.webm$|\\.ogg$)"
EXCLUDE_PATTERN+="|(\\.pdf$|\\.zip$|\\.tar$|\\.gz$)"

# ═══════════════════════════════════════════════════════════════════
# MINIFIED & BUNDLED
# ═══════════════════════════════════════════════════════════════════
EXCLUDE_PATTERN+="|(\\.min\\.(js|css)$|\\.bundle\\.(js|css)$)"
EXCLUDE_PATTERN+="|(vendor\\.(js|css)$|chunk\\.)"
EXCLUDE_PATTERN+="|(\\.map$)"  # Source maps

# ═══════════════════════════════════════════════════════════════════
# PLATFORM-SPECIFIC
# ═══════════════════════════════════════════════════════════════════
# iOS/macOS
EXCLUDE_PATTERN+="|(Pods/|\\.xcworkspace/|\\.xcodeproj/)"
EXCLUDE_PATTERN+="|(Podfile\\.lock$|Cartfile\\.resolved$)"

# Android
EXCLUDE_PATTERN+="|(/gradle/|gradlew$|gradlew\\.bat$)"
EXCLUDE_PATTERN+="|(local\\.properties$|\\.gradle/)"

# Flutter/Dart
EXCLUDE_PATTERN+="|(pubspec\\.lock$|\\.dart_tool/)"
EXCLUDE_PATTERN+="|(\\.g\\.dart$|\\.freezed\\.dart$)"  # Generated

# React Native
EXCLUDE_PATTERN+="|(metro\\.config\\.)"

# Electron
EXCLUDE_PATTERN+="|(electron\\.config\\.)"
```

## Usage

When listing files for review, pipe through exclusion filter:

```bash
# Get changed files excluding non-reviewable
git diff --name-only HEAD 2>/dev/null | \
  grep -E "\.(ts|tsx|js|jsx|py|go|rs|java|kt|cs|rb|php|swift|ex|exs|sql)$" | \
  grep -v -E "$EXCLUDE_PATTERN"

# Find all code files excluding non-reviewable
find . -type f \( \
  -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o \
  -name "*.py" -o -name "*.go" -o -name "*.rs" -o -name "*.java" -o \
  -name "*.kt" -o -name "*.cs" -o -name "*.rb" -o -name "*.php" -o \
  -name "*.swift" -o -name "*.ex" -o -name "*.exs" -o -name "*.sql" \
\) 2>/dev/null | grep -v -E "$EXCLUDE_PATTERN"
```

## Language-Specific Patterns

| Language | Test Patterns | Generated | Config |
|----------|--------------|-----------|--------|
| **TypeScript/JS** | `*.test.ts`, `*.spec.ts` | `*.d.ts`, `*.generated.ts` | `*.config.ts`, `tsconfig.json` |
| **Python** | `test_*.py`, `*_test.py` | `*_pb2.py`, `*.pyi` | `pyproject.toml`, `setup.py` |
| **Go** | `*_test.go` | `*.pb.go`, `*_gen.go` | `go.mod` |
| **Java** | `*Test.java`, `*Tests.java` | `*Generated.java` | `pom.xml`, `build.gradle` |
| **Kotlin** | `*Test.kt`, `*Tests.kt` | `*Generated.kt` | `build.gradle.kts` |
| **C#/.NET** | `*Test.cs`, `*Tests.cs` | `*Generated.cs` | `*.csproj`, `*.sln` |
| **Ruby** | `*_spec.rb`, `*_test.rb` | - | `Gemfile`, `Rakefile` |
| **PHP** | `*Test.php` | - | `composer.json`, `phpunit.xml` |
| **Rust** | `*_test.rs`, `/tests/` | - | `Cargo.toml`, `build.rs` |
| **Swift** | `*Tests.swift` | - | `Package.swift` |
| **Elixir** | `*_test.exs` | - | `mix.exs` |
| **Dart/Flutter** | `*_test.dart` | `*.g.dart`, `*.freezed.dart` | `pubspec.yaml` |

## What Gets Excluded

| Category | Patterns | Reason |
|----------|----------|--------|
| **Dependencies** | `node_modules/`, `vendor/`, `Pods/` | Third-party code |
| **Build outputs** | `dist/`, `build/`, `target/`, `bin/`, `out/` | Generated during build |
| **Tests** | `*.test.*`, `*.spec.*`, `__tests__/`, `/tests/` | Test files (reviewed separately) |
| **Generated** | `*.generated.*`, `*.d.ts`, `*.pb.go`, `*.g.dart` | Auto-generated code |
| **Lock files** | `*.lock`, `*-lock.json`, `go.sum` | Dependency locks |
| **Config** | `*.config.*`, `tsconfig*`, `pom.xml`, `*.csproj` | Configuration files |
| **Environment** | `.env*`, `secrets*`, `*.pem`, `*.key` | Secrets (security risk) |
| **CI/CD** | `.github/`, `.gitlab-ci.yml`, `Jenkinsfile` | Pipeline configs |
| **Docs** | `*.stories.*`, `/docs/*.md`, `README.md` | Documentation |
| **Assets** | `*.png`, `*.jpg`, `*.woff`, `*.mp4` | Binary/media files |
| **Minified** | `*.min.js`, `*.bundle.js`, `*.map` | Compressed code |
| **IDE** | `.vscode/`, `.idea/`, `.vs/` | Editor settings |

## Supported Languages

This exclusion pattern covers:

- **Web**: TypeScript, JavaScript, JSX, TSX, HTML, CSS, SCSS
- **Backend**: Python, Go, Java, Kotlin, C#, Ruby, PHP, Rust, Elixir
- **Mobile**: Swift, Kotlin, Dart/Flutter, React Native
- **Systems**: Rust, Go, C, C++
- **Data**: SQL, GraphQL
- **Scripting**: Shell, PowerShell
