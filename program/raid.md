# EPOS Program RAID Register

## Purpose

The RAID Register records the **Risks**, **Assumptions**, **Issues**, and **Dependencies** that may impact the successful delivery of the EPOS program.

This is a living governance document that is reviewed throughout the program lifecycle. Each entry is associated with the applicable release or marked as **Program** when it spans multiple releases.

---

# RAID Register

| ID    | Date Identified | Release | Type       | Description                                               | Priority | Impact | Probability | Owner | Action / Resolution                                             | Status   |
| ----- | --------------- | ------- | ---------- | --------------------------------------------------------- | -------- | ------ | ----------- | ----- | --------------------------------------------------------------- | -------- |
| R-001 | 2026-07-05      | 1.0     | Risk       | Scope expansion beyond approved Release 1.0 objectives    | High     | High   | Medium      | EPOS  | Enforce release scope and defer enhancements to future releases | Open     |
| R-002 | 2026-07-05      | 1.0     | Risk       | Technical complexity may increase implementation effort   | High     | High   | Medium      | EPOS  | Deliver incrementally and validate each phase before proceeding | Open     |
| R-003 | 2026-07-05      | 1.0     | Risk       | Learning new technologies may impact engineering velocity | Medium   | Medium | High        | EPOS  | Allocate learning time within each phase                        | Open     |
| A-001 | 2026-07-05      | Program | Assumption | EPOS follows a release-based delivery model               | Medium   | -      | -           | EPOS  | Review during release planning                                  | Active   |
| A-002 | 2026-07-05      | Program | Assumption | Documentation is maintained alongside implementation      | Medium   | -      | -           | EPOS  | Review during phase reviews                                     | Active   |
| A-003 | 2026-07-05      | Program | Assumption | Architecture decisions are documented through ADRs        | Medium   | -      | -           | EPOS  | Review ADRs during architecture governance                      | Active   |
| D-001 | 2026-07-05      | 1.0     | Dependency | Technology & Platform Baseline completed                  | High     | -      | -           | EPOS  | Phase -1 deliverable                                            | Complete |
| D-002 | 2026-07-05      | 1.0     | Dependency | Architecture Principles approved                          | High     | -      | -           | EPOS  | Required before engineering implementation                      | Complete |
| D-003 | 2026-07-05      | 1.0     | Dependency | Engineering Standards approved                            | High     | -      | -           | EPOS  | Required before engineering implementation                      | Complete |
| D-004 | 2026-07-05      | 1.0     | Dependency | Release 1.0 Plan approved                                 | High     | -      | -           | EPOS  | Required before Phase 0 execution                               | Complete |

---

# Review Cadence

The RAID Register should be reviewed:

- At the start of each release
- At the start and completion of each phase
- During sprint planning and sprint reviews
- During architecture reviews
- Before Production Readiness Reviews (PRRs)
- Whenever a significant risk, assumption, issue, or dependency changes

---

# Status Definitions

| Status      | Description                                  |
| ----------- | -------------------------------------------- |
| Open        | Identified and requires monitoring or action |
| Active      | Valid and currently applicable               |
| In Progress | Action is underway                           |
| Complete    | Successfully fulfilled or resolved           |
| Closed      | No longer applicable                         |

---

# Revision History

| Version | Date         | Description                   |
| ------- | ------------ | ----------------------------- |
| **1.0** | July 5, 2026 | Initial Program RAID Register |
