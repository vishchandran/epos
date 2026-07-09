# EPOS Domain Layer Architecture

**Document ID:** EPOS-ARCH-001  
**Version:** 1.0  
**Status:** Draft  
**Phase:** Phase 1 – Implementation Architecture

---

# 1. Purpose

This document defines how the approved enterprise domain model is translated into the EPOS codebase.

Business architecture defines **what** the platform represents.
The domain layer defines **how** those business concepts are organized in software.

The domain layer is responsible for protecting business rules from frameworks,
databases, transport protocols, and infrastructure concerns.

---

# 2. Architectural Principles

1. Business logic belongs in the domain layer.
2. APIs orchestrate use cases; they do not contain business rules.
3. Aggregate roots enforce consistency boundaries.
4. Repositories abstract persistence.
5. Value Objects model immutable business concepts.
6. Domain Events capture meaningful business facts.
7. Infrastructure depends on the domain, never the reverse.

---

# 3. Layered Architecture

```text
HTTP/API
    │
Application Layer
    │
Domain Layer
    │
Repository Interfaces
    │
Infrastructure
(PostgreSQL, Messaging, External APIs)
```

Dependencies always point downward.

---

# 4. Planned Package Structure

```text
apps/system-api/src/
├── application/
├── domain/
│   ├── identity/
│   ├── customer/
│   ├── product/
│   ├── agreement/
│   ├── account/
│   ├── transaction/
│   ├── ledger/
│   ├── channel/
│   └── branch/
├── infrastructure/
├── routes/
├── middleware/
├── validation/
└── config/
```

---

# 5. Bounded Context Layout

Each bounded context follows the same structure.

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

# 6. Domain Building Blocks

| Building Block | Responsibility                               |
| -------------- | -------------------------------------------- |
| Aggregate Root | Consistency boundary and business invariants |
| Entity         | Object with identity and lifecycle           |
| Value Object   | Immutable business concept without identity  |
| Repository     | Persistence abstraction                      |
| Domain Service | Business logic spanning aggregates           |
| Domain Event   | Business fact that occurred                  |

---

# 7. Responsibilities

## Aggregate Root

- Owns invariants
- Controls state changes
- Raises domain events

## Entity

- Has identity
- Lives within an aggregate

## Value Object

- Immutable
- Compared by value
- Encapsulates business meaning

## Repository

- Load aggregate
- Save aggregate

Repositories expose domain objects, not database rows.

---

# 8. Initial Aggregate Mapping

| Context     | Aggregate Root |
| ----------- | -------------- |
| Identity    | Party          |
| Customer    | Customer       |
| Product     | Product        |
| Agreement   | Agreement      |
| Account     | Account        |
| Transaction | Transaction    |
| Ledger      | Ledger         |
| Channel     | Channel        |
| Branch      | Branch         |

---

# 9. Initial Implementation Order

1. Identity (Party)
2. Customer
3. Product
4. Agreement
5. Account
6. Transaction
7. Ledger
8. Channel
9. Branch

Each implementation slice follows:

Business Rules → Tests → Domain → Application → API → Persistence.

---

# 10. Decisions

1. The domain layer is framework-independent.
2. Aggregate roots are the primary entry point for business operations.
3. Repository interfaces live in the domain layer; implementations live in infrastructure.
4. Business rules are never implemented in controllers or routes.
5. The approved enterprise domain model remains the source of truth for implementation.
