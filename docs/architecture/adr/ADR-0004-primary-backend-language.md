# ADR-0004 — Primary Backend Language

## Status

Accepted

## Date

2026-07-05

## Context

EPOS will evolve into an enterprise banking platform with multiple backend services, platform capabilities, APIs, integrations, and operational tools.

The primary backend language must support:

- enterprise API development
- cloud-native services
- strong developer productivity
- maintainability across a large codebase
- shared types and contracts
- testing and automation
- long-term extensibility

## Decision

EPOS will use **TypeScript** as the primary backend language.

TypeScript will be the default language for backend APIs, platform services, shared packages, and internal tooling unless another language is justified by a specific architectural need.

Other languages may still be introduced later where appropriate, such as Python for AI/ML workloads or Go for infrastructure-oriented tooling.

## Consequences

Benefits:

- Strong typing improves maintainability.
- API and domain contracts can be expressed clearly.
- Better IDE support and refactoring safety.
- High developer productivity.
- Strong ecosystem for APIs, testing, tooling, and cloud-native development.
- Good fit for a monorepo with shared packages.

Trade-offs:

- Requires TypeScript compiler and build configuration.
- Requires learning TypeScript type system.
- Runtime still depends on JavaScript execution through Node.js.
- Not ideal for every workload, especially some high-performance or AI/ML use cases.

## Notes

This ADR establishes TypeScript as the default backend language, not the only permitted language.

Future ADRs will define the engineering toolchain, runtime, package manager, build system, testing framework, and CI/CD strategy.
