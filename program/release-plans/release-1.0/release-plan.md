# Release 1.0 Plan

> **Final status: Retired incomplete — November 2026**
>
> This plan is archived. Phases -1 through 2 were completed. Phases 3 and 4 were not pursued after EPOS retired, so Release 1.0 did not meet its original completion or exit criteria. See [ADR-0010](../../../docs/architecture/adr/ADR-0010-retire-and-archive-epos.md).

## Overview

Release 1.0 establishes the engineering, domain, application, persistence, and service-integration foundation for EPOS.

The objective of this release is to create the governed software architecture required to model enterprise banking domains and progressively expose them through reliable application and integration boundaries.

---

# Release Summary

| Item                         | Value                      |
| ---------------------------- | -------------------------- |
| **Release**                  | 1.0                        |
| **Release Name**             | Enterprise Foundation      |
| **Final Status**             | Retired incomplete         |
| **Planned Start**            | July 5, 2026               |
| **Former Target Completion** | October 2026 _(Tentative)_ |
| **Estimated Duration**       | ~4 Months                  |

> **Historical note:** October 2026 was the tentative planning target during active development. The release retired incomplete and no replacement completion date is planned.

---

# Release Objective

Build a production-inspired enterprise foundation spanning engineering standards, Domain modeling, Application Layer orchestration, infrastructure adapters, and enterprise service integration.

---

# Scope

Release 1.0 includes the following phases:

|  Phase | Focus                          | Status        |
| -----: | ------------------------------ | ------------- |
| **-1** | Technology & Platform Baseline | ✅ Complete   |
|  **0** | Engineering Foundation         | ✅ Complete   |
|  **1** | Enterprise Domain Modeling     | ✅ Complete   |
|  **2** | Application Layer              | ✅ Complete   |
|  **3** | Infrastructure Layer           | ⏹ Not pursued |
|  **4** | Enterprise Service Integration | ⏹ Not pursued |

---

# Deliverables

At the completion of Release 1.0, EPOS should include:

- Technology & Platform Baseline
- Architecture Principles
- Engineering Standards
- Architecture Decision Records (ADRs)
- Program Governance
- Enterprise Domain Model
- Application Layer use cases and contracts
- Infrastructure and persistence adapters
- Enterprise APIs and service-integration boundaries

---

# Out of Scope

The following capabilities are intentionally deferred to future releases:

- Production-ready customer servicing
- Production-ready accounts and ledger operations
- Payments
- Cards
- FX & Treasury
- Trade Finance
- Lending
- Wealth Management
- Risk Management
- Compliance
- Reporting & Analytics
- AI Platform
- Enterprise Operations

---

# Assumptions

These were the assumptions used during active delivery. They are retained for historical context and are no longer active program assumptions.

- EPOS was designed as a long-term engineering program.
- Development followed a release-based delivery model.
- The roadmap represented the active planning baseline.
- Learning and implementation occurred concurrently.
- Architecture decisions could evolve as the platform matured.
- Documentation was maintained alongside implementation.

---

# Constraints

- Development is performed alongside regular professional commitments.
- Budget is self-funded.
- Initial infrastructure will leverage free or low-cost resources where practical.
- Delivery dates are planning estimates and may change.
- Engineering quality takes precedence over feature quantity.

---

# Dependencies

Release 1.0 depends on:

- Technology & Platform Baseline
- Architecture Principles
- Engineering Standards
- Development Environment
- Program Governance

> Detailed dependencies are maintained within the Dependency Matrix.

---

# Risks

High-level release risks include:

- Scope expansion
- Technology complexity
- Timeline variance
- Learning curve associated with new technologies

> Detailed risks, assumptions, issues, and dependencies are maintained within the RAID Log.

---

# Success Criteria

These criteria are retained as the original release baseline. They were not fully met before program retirement.

Release 1.0 is considered complete when:

- All planned phases have been completed.
- All planned deliverables have been completed.
- Architecture documentation is current.
- Engineering documentation is current.
- Core platform foundation is operational.
- Production Readiness Review (PRR) has been completed.
- Release retrospective has been completed.

---

# Exit Criteria

Release 1.0 can be formally closed when:

- All release objectives have been achieved.
- Critical issues have been resolved or formally accepted.
- Architecture Review has been completed.
- Production Readiness Review has been completed.
- Lessons Learned have been documented.
- Release approval has been obtained.

---

# Related Documents

- `program/core-roadmap.md`
- `docs/architecture/core-architecture-principles.md`
- `docs/architecture/core-engineering-standards.md`
- `docs/architecture/adr/`
- `program/governance/raid-log.md`
- `program/governance/dependency-matrix.md`

---

# Revision History

| Version | Date           | Description                                         |
| ------- | -------------- | --------------------------------------------------- |
| **1.0** | July 5, 2026   | Initial Release 1.0 plan                            |
| **1.1** | August 1, 2026 | Aligned Phases 2–4 with active implementation scope |
| **1.2** | August 1, 2026 | Recorded completion of Phase 2                      |
| **1.3** | November 2026  | Archived release as retired incomplete              |
