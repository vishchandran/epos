# ADR-0005 — Engineering Toolchain

## Status

Accepted — Amended

## Date

2026-07-05

## Last Amended

2026-07-28

## Context

EPOS is being developed as a long-term enterprise engineering platform using a monorepo architecture.

A standardized engineering toolchain is required to provide a consistent developer experience, improve code quality, simplify dependency management, and support builds across multiple applications and shared packages.

The toolchain should remain simple during the early stages of the program. Additional orchestration and caching tools should be introduced only when repository scale and build performance justify their operational cost.

## Decision

EPOS will adopt the following engineering toolchain.

| Component          | Technology                       | Purpose                                   |
| ------------------ | -------------------------------- | ----------------------------------------- |
| Runtime            | Node.js LTS                      | Execute backend applications              |
| Language           | TypeScript                       | Primary backend language                  |
| Package Manager    | pnpm                             | Dependency and workspace management       |
| Workspace Model    | pnpm workspaces                  | Manage monorepo applications and packages |
| Task Orchestration | pnpm recursive workspace scripts | Run builds, tests, and linting            |
| Compiler           | TypeScript Compiler (`tsc`)      | Compile TypeScript to JavaScript          |
| Linter             | ESLint                           | Static code analysis                      |
| Formatter          | Prettier                         | Consistent code formatting                |
| Test Framework     | Vitest                           | Automated testing                         |
| Version Control    | Git                              | Source control                            |
| Repository Hosting | GitHub                           | Repository and collaboration              |

Turborepo is not required for the initial EPOS monorepo.

It may be introduced later if repository growth creates a demonstrated need for:

- Local and remote task caching
- A formal task dependency graph
- Faster selective builds
- More advanced affected-package execution
- Improved CI performance across many workspaces

Adoption of Turborepo or another orchestration tool must be supported by measured need and recorded through a future ADR.

## Rationale

pnpm workspaces already provide the capabilities EPOS currently requires:

- Monorepo workspace discovery
- Workspace dependency linking
- Recursive script execution
- Dependency-aware package execution
- Centralized dependency management
- Workspace filtering

Using pnpm alone keeps the initial toolchain understandable and reduces configuration overhead.

This follows the EPOS engineering principles of simplicity, maintainability, incremental evolution, and introducing complexity only when justified.

## Consequences

### Benefits

- Simple initial monorepo configuration
- Fewer tools and configuration files
- Lower maintenance overhead
- Consistent workspace dependency management
- Build orchestration remains adequate for the current repository size
- Turborepo can still be adopted later without changing the monorepo architecture

### Trade-offs

- No remote build cache
- Less advanced task-graph visualization
- CI may run more work than necessary as the repository grows
- Build performance must be monitored as more applications and packages are added

## Adoption Triggers

A dedicated build orchestrator should be reconsidered when one or more of the following occur:

1. Local or CI build times become materially disruptive.
2. The repository contains enough workspaces that recursive execution becomes inefficient.
3. Remote caching would produce measurable CI savings.
4. Task dependencies become difficult to manage with package scripts.
5. Reliable affected-package execution becomes a delivery requirement.

## Amendment

The original decision selected Turborepo as the monorepo build system.

On 2026-07-28, the decision was amended to use pnpm recursive workspace scripts as the initial task-orchestration mechanism. Turborepo became an optional future capability whose adoption requires demonstrated need and a separate architectural decision.
