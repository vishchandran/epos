# ADR-0005 — Engineering Toolchain

## Status

Accepted

## Date

2026-07-05

## Context

EPOS is being developed as a long-term enterprise engineering platform using a monorepo architecture.

A standardized engineering toolchain is required to provide a consistent developer experience, improve code quality, simplify dependency management, and support scalable builds across multiple applications and shared packages.

The selected toolchain should support modern cloud-native development while remaining simple enough for incremental adoption.

## Decision

EPOS will adopt the following engineering toolchain.

| Component | Technology | Purpose |
|----------|------------|---------|
| Runtime | Node.js (LTS) | Execute backend applications |
| Language | TypeScript | Primary backend language |
| Package Manager | pnpm | Dependency and workspace management |
| Build System | Turborepo | Monorepo builds and task orchestration |
| Compiler | TypeScript Compiler (tsc) | Compile TypeScript to JavaScript |
| Linter | ESLint | Static code analysis |
| Formatter | Prettier | Consistent code formatting |
| Version Control | Git | Source control |
| Repository Hosting | GitHub | Repository and collaboration |

## Rationale

This toolchain provides:

- Modern TypeScript development
- Efficient dependency management
- Scalable monorepo support
- Fast incremental builds
- Consistent coding standards
- Strong IDE integration
- Broad community adoption
- Excellent long-term maintainability

## Consequences

### Benefits

- Standardized development environment
- Faster builds through workspace caching
- Consistent formatting and linting
- Improved developer productivity
- Better support for large-scale repository growth

### Trade-offs

- Developers must learn additional tooling.
- Initial setup is more involved than a single-project repository.
- Toolchain maintenance is required as dependencies evolve.

## Notes

This ADR establishes the engineering toolchain only.

Future ADRs will define:

- Data Platform
- Event Platform
- Container Platform
- Cloud Platform
- CI/CD Strategy
- Observability Strategy