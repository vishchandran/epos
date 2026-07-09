# EPOS Domain Implementation Map

**Document ID:** EPOS-DOM-005  
**Version:** 1.0  
**Status:** Draft  
**Phase:** Phase 1 – Enterprise Domain Modeling

---

# 1. Purpose

This document maps the business architecture of EPOS to its future implementation.

It bridges:

Business Capability → Bounded Context → Aggregate → TypeScript Module

No implementation decisions in this document introduce new business concepts. They simply translate the approved domain model into an implementation roadmap.

---

# 2. Mapping Principles

1. Business architecture drives implementation.
2. One bounded context maps to one domain module.
3. Each aggregate has one aggregate root.
4. APIs invoke application services; they do not bypass the domain.
5. Persistence follows aggregate boundaries.

---

# 3. Capability Mapping

| Business Capability     | Bounded Context | Aggregate Root | Initial Module |
| ----------------------- | --------------- | -------------- | -------------- |
| Register Party          | Identity        | Party          | identity       |
| Create Customer         | Customer        | Customer       | customer       |
| Create Product          | Product         | Product        | product        |
| Create Agreement        | Agreement       | Agreement      | agreement      |
| Open Account            | Account         | Account        | account        |
| Authorize Transaction   | Transaction     | Transaction    | transaction    |
| Post Ledger Entry       | Ledger          | Ledger         | ledger         |
| Record Channel Activity | Channel         | Channel        | channel        |
| Maintain Branch         | Branch          | Branch         | branch         |

---

# 4. Planned Package Structure

```text
apps/system-api/src/domain/
├── identity/
├── customer/
├── product/
├── agreement/
├── account/
├── transaction/
├── ledger/
├── channel/
└── branch/
```

Each directory will eventually contain:

```text
<context>/
├── aggregates/
├── entities/
├── value-objects/
├── events/
├── repositories/
├── services/
└── index.ts
```

---

# 5. Aggregate Responsibilities

| Aggregate Root | Primary Responsibility |
| -------------- | ---------------------- |
| Party          | Enterprise identity    |
| Customer       | Banking relationship   |
| Product        | Product rules          |
| Agreement      | Contract lifecycle     |
| Account        | Operational servicing  |
| Transaction    | Transaction lifecycle  |
| Ledger         | Accounting truth       |
| Channel        | Origin metadata        |
| Branch         | Physical location      |

---

# 6. Implementation Sequence

1. Identity
2. Customer
3. Product
4. Agreement
5. Account
6. Transaction
7. Ledger
8. Channel
9. Branch

Each module should follow:

Business Analysis → Domain Model → Tests → Implementation → API → Persistence.

---

# 7. Decisions

1. Modules follow bounded context boundaries.
2. Aggregate roots are the primary entry points into the domain.
3. Future APIs will orchestrate domain services rather than contain business logic.
4. This document is an implementation roadmap and must remain aligned with the core enterprise domain model.
