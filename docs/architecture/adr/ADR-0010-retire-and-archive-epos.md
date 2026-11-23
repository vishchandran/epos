# ADR-0010 — Retire and Archive EPOS

## Status

Accepted

## Date

2026-11-23

## Context

EPOS began as a hands-on initiative to explore enterprise banking architecture, distributed systems, cloud-native technology, and financial-services platform design. As its scope expanded toward a comprehensive banking platform, the engineering and governance overhead exceeded the initiative's original learning objectives.

Continuing the Release 1.0–7.0 roadmap would require sustained feature delivery, maintenance, dependency management, security review, and operational governance that no longer align with current priorities.

## Decision

EPOS is retired as an active development initiative and retained as an educational reference and portfolio of foundational engineering work.

- No further feature development or ongoing maintenance is planned.
- Completed phases and accepted technical ADRs remain historical records of the architecture implemented before retirement.
- Release 1.0 is archived as incomplete: phases -1 through 2 were completed, while phases 3 and 4 were not pursued.
- Releases 2.0–7.0 and proposed future business verticals were not started and have no active delivery dates.
- Future architecture learning will use focused architecture drills, independently scoped financial-services use cases, and small targeted prototypes.

## Consequences

- [ADR-0001](ADR-0001-epos-program-baseline.md) is superseded because its multi-year active-program decision no longer applies.
- The roadmap, release plan, phase logs, RAID register, and dependency matrix are archived and must be read as historical planning artifacts.
- Existing source code and documentation may be studied or reused as reference, but they are not production-ready and will not receive routine updates.
- Security and dependency automation may remain in the repository for archival integrity, but its presence does not imply active maintenance.
- New learning initiatives should be scoped independently rather than reopening the EPOS release roadmap by default.
