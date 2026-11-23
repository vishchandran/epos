# EPOS Dependency Matrix

> **Archive status — Retired November 2026.** This matrix is closed and retained as a record of dependencies satisfied during active development. No new delivery dependencies will be tracked.

## Purpose

The Dependency Matrix identifies and tracks dependencies that may impact the successful planning, delivery, and operation of the EPOS program.

Dependencies may exist between releases, phases, architecture decisions, platform capabilities, business domains, infrastructure, or external systems.

During active development, this document was reviewed throughout the program lifecycle and updated as new dependencies emerged.

---

# Dependency Matrix

| ID      | Release | Dependency Type | Description                | Depends On                     | Impact if Unavailable        | Owner | Status   |
| ------- | ------- | --------------- | -------------------------- | ------------------------------ | ---------------------------- | ----- | -------- |
| DEP-001 | 1.0     | Program         | Engineering implementation | Technology & Platform Baseline | Phase 0 cannot begin         | EPOS  | Complete |
| DEP-002 | 1.0     | Architecture    | Engineering implementation | Architecture Principles        | Design inconsistency         | EPOS  | Complete |
| DEP-003 | 1.0     | Architecture    | Engineering implementation | Engineering Standards          | Inconsistent implementation  | EPOS  | Complete |
| DEP-004 | 1.0     | Governance      | Phase 0 execution          | Release 1.0 Plan               | No approved release baseline | EPOS  | Complete |
| DEP-005 | 1.0     | Governance      | Phase 0 execution          | ADR-0001                       | No architectural baseline    | EPOS  | Complete |

---

# Dependency Types

- Program
- Release
- Phase
- Architecture
- Platform
- Service
- Infrastructure
- Security
- Data
- External

---

# Status Definitions

| Status      | Description                                 |
| ----------- | ------------------------------------------- |
| Planned     | Dependency identified but not yet satisfied |
| In Progress | Dependency is actively being addressed      |
| Complete    | Dependency has been satisfied               |
| Blocked     | Dependency is preventing progress           |

---

# Review Cadence

The Dependency Matrix should be reviewed:

- At the start of each release
- At the start of each phase
- During architecture reviews
- During release planning
- Before Production Readiness Reviews (PRRs)
- Whenever a new dependency is introduced

---

# Revision History

| Version | Date          | Description                    |
| ------- | ------------- | ------------------------------ |
| **1.0** | July 5, 2026  | Initial Dependency Matrix      |
| **1.1** | November 2026 | Archived on program retirement |
