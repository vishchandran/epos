# ADR-0002 — Adopt Monorepo Architecture for EPOS

## Status

Accepted

## Date

2026-07-05

## Context

EPOS will evolve into an enterprise banking platform containing multiple business domains, platform services, shared libraries, infrastructure definitions, documentation, and governance artifacts.

The platform is expected to include independently deployable applications such as payments, trade finance, FX, customer management, identity, reporting, and operations capabilities.

A repository strategy is required before building the engineering foundation.

## Decision

EPOS will use a **monorepo architecture**.

All applications, platform services, shared packages, infrastructure code, documentation, and program artifacts will live inside the single `epos` repository.

The repository will be organized around:

- `apps/` for deployable applications
- `packages/` for shared libraries
- `platform/` for shared platform capabilities
- `infrastructure/` for Docker, Kubernetes, Terraform, and deployment assets
- `docs/` for architecture and engineering documentation
- `program/` for roadmap, release, governance, and delivery artifacts

Applications inside the monorepo may still be deployed independently.

## Consequences

Benefits:

- One source of truth for the EPOS platform
- Easier sharing of common libraries
- Consistent engineering standards
- Easier cross-domain refactoring
- Unified CI/CD strategy
- Centralized documentation and governance
- Better fit for a single-engineer long-term platform program

Trade-offs:

- Requires clear folder organization
- Requires workspace/build tooling
- CI/CD must avoid rebuilding everything unnecessarily
- Repository may become large over time
- Strong conventions are needed to prevent disorder

## Notes

Monorepo does not mean all services deploy together.

Each deployable application can still have its own container image, Kubernetes deployment, environment configuration, scaling policy, and release workflow.

Future ADRs may define the package manager, build system, workspace structure, and CI/CD strategy.
