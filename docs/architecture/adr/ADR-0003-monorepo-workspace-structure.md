# ADR-0003 — Monorepo Workspace Structure

## Status

Accepted

## Date

2026-07-05

## Context

EPOS uses a monorepo architecture. The repository now needs a clear workspace structure that can support multiple deployable applications, shared packages, platform capabilities, infrastructure code, documentation, and program governance artifacts.

## Decision

EPOS will use the following top-level workspace structure:

```text
apps/
packages/
platform/
infrastructure/
docs/
program/
assets/
scripts/
```

- `apps/` contains independently deployable applications.
- `packages/` contains shared reusable libraries.
- `platform/` contains shared enterprise platform capabilities.
- `infrastructure/` contains Docker, Kubernetes, Terraform, and deployment assets.
- `docs/` contains architecture and engineering documentation.
- `program/` contains roadmap, release, RAID, dependency, and governance artifacts.
- `assets/` contains images and supporting static assets.
- `scripts/` contains automation scripts.

Placeholder folders such as `src/` and `services/` will be removed because EPOS will contain multiple applications, each with its own source structure.

## Consequences

Benefits:

- Clear separation between deployable applications and shared libraries
- Scales well as EPOS grows
- Supports independent application development and deployment
- Keeps documentation and governance artifacts separate from runtime code
- Provides a consistent structure for future phases

Trade-offs:

- More structure than a simple single-service repository
- Requires discipline to place code in the correct workspace
- Future tooling must support this workspace model

## Notes

This ADR defines the logical workspace structure only. Package management, build tooling, and CI/CD strategy will be defined in future ADRs.
