# ADR-0008: PostgreSQL Persistence and Migration Architecture

## Status

Accepted

## Date

2026-08-02

## Context

Phase 2 defined technology-neutral repository contracts for Party, Customer,
Product, Agreement, Account, and Ledger. It also established that repository
interfaces remain owned by the Application Layer while their implementations
belong to the Infrastructure Layer.

Phase 3 must persist the existing workflows without exposing database records
to the Domain or Application Layer. The solution also needs deterministic
schema evolution, reliable local development, and integration tests against a
real database.

EPOS therefore needs an explicit decision covering the database technology,
access approach, migration ownership, schema constraints, and verification
strategy.

## Decision

EPOS will use PostgreSQL as the relational database for the Phase 3 persistence
implementation.

The Infrastructure Layer will:

- Use the `pg` driver and explicit parameterized SQL.
- Implement the repository interfaces owned by
  `@epos/enterprise-application`.
- Translate between private database row types and domain aggregates through
  dedicated mappers.
- Keep PostgreSQL types, records, queries, and errors inside the Infrastructure
  Layer.
- Manage connections through a shared PostgreSQL connection pool with explicit
  startup and shutdown behavior.
- Use immutable, sequential, forward-only SQL migration files.
- Record applied migrations and their checksums in a schema-migration history
  table.
- Serialize migration execution with a PostgreSQL advisory lock.
- Execute each migration in a transaction when PostgreSQL permits it.
- Apply migrations through an explicit command rather than automatically when
  the package is imported.
- Enforce structural data integrity with primary keys, foreign keys, unique
  constraints, non-null constraints, and check constraints.
- Verify repositories, migrations, constraints, and lifecycle management with
  integration tests against a real PostgreSQL instance.

The initial schema will contain one table for each existing aggregate:

- parties
- customers
- products
- agreements
- accounts
- ledgers

Relationships will follow the implemented domain model:

```text
Party → Customer → Agreement → Account → Ledger
                    ↑
                  Product
```

Identifiers will use PostgreSQL `uuid`. Status, type, category, and segment
values will use text columns protected by check constraints. Database
constraints protect storage integrity; they do not replace domain lifecycle
rules.

The PostgreSQL image used locally and in continuous integration will be pinned
to an approved major version. The `latest` tag will not be used.

## Rationale

PostgreSQL provides transactions, relational constraints, mature operational
support, and the consistency guarantees needed by the current banking
foundation.

Explicit SQL is appropriate because the Phase 3 repository contracts are small
and deliberate. It keeps query and transaction behavior visible, avoids a
second persistence object model, and prevents ORM-specific entities from
crossing architectural boundaries.

Forward-only SQL migrations make production changes explicit and auditable.
Checksums detect accidental modification of migrations that have already been
applied, while an advisory lock prevents concurrent runners from racing.

Real PostgreSQL integration tests are necessary because mocks cannot verify SQL
syntax, constraints, transaction behavior, migration behavior, or connection
lifecycle.

## Consequences

### Positive

- Domain and Application packages remain independent of database technology.
- Persistence behavior is explicit and reviewable.
- Relational integrity is enforced close to stored data.
- Local and CI environments exercise the same database technology.
- Schema history is deterministic and auditable.
- Repository contracts remain unchanged and retain Application Layer ownership.

### Trade-offs

- Explicit SQL and mapping require more handwritten code than an ORM.
- Migrations require disciplined ordering and immutability.
- Integration tests are slower and require a running PostgreSQL instance.
- Database constraints and domain rules must be kept semantically aligned
  without duplicating application workflows.

## Alternatives Considered

### Alternative 1: Use an Object-Relational Mapper

**Decision:** Rejected for Phase 3

**Reason:**

The current persistence surface is small, and an ORM would introduce entity
metadata, lifecycle behavior, and abstraction cost without a demonstrated need.
This decision can be revisited if future query complexity justifies it.

### Alternative 2: Use an In-Memory Database for Integration Tests

**Decision:** Rejected

**Reason:**

An in-memory substitute cannot faithfully verify PostgreSQL SQL, constraints,
locking, transactions, or migrations.

### Alternative 3: Run Migrations Automatically at Package Import

**Decision:** Rejected

**Reason:**

Package import must not mutate external state. Migration execution should be an
explicit operational action with visible failure handling.

### Alternative 4: Store Aggregates as Unstructured JSON Documents

**Decision:** Rejected

**Reason:**

The implemented model has clear relationships and structural constraints that
benefit from relational representation. JSON-only storage would weaken those
guarantees and make relational queries harder.

## Implications

Phase 3 repository implementations must use parameterized queries and must not
return raw rows. Sensitive connection information and SQL parameter values must
not appear in public error messages.

Docker Compose will provide local PostgreSQL support. GitHub Actions will run a
PostgreSQL service container and execute the same migrations before integration
tests.

Kafka, Redis, ledger postings, balances, reversals, reconciliation, HTTP
controllers, and API error mapping are unaffected and remain outside Phase 3.

## References

- `docs/architecture/application-layer-architecture.md`
- `docs/architecture/adr/ADR-0007-application-layer-boundaries.md`
- `docs/architecture/infrastructure-layer-architecture.md`
- `program/phase-reviews/phase-2-exit-review.md`
