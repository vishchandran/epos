# ADR-0009: Transaction Context and Domain Rehydration

## Status

Accepted

## Date

2026-08-02

## Context

The Application Layer defines this transaction contract:

```typescript
export interface TransactionManager {
  run<T>(operation: () => Promise<T>): Promise<T>;
}
```

The callback deliberately receives no database client. Repositories must still
participate in the same transaction so a workflow involving multiple reads and
writes either completes fully or leaves no partial persistence.

Phase 3 must also reconstruct domain aggregates from stored state. Rehydration
is different from creating a new aggregate or performing a business lifecycle
transition. For example, loading a closed Ledger by opening it and calling
`close()` would replay business behavior and could later produce duplicate
domain events.

An aggregate is a group of related domain objects treated as one consistency
boundary, with an aggregate root as its entry point. Rehydrating an aggregate
means reconstructing that complete business object from persisted state so it
behaves like the existing object that was stored, not like a newly created one.

Account and Ledger currently initialize with their starting status and do not
provide a direct way to restore later persisted states. A consistent,
technology-neutral rehydration policy is therefore required.

## Decision

The PostgreSQL transaction manager will associate one checked-out PostgreSQL
client with the current asynchronous execution context.

During `TransactionManager.run()` it will:

1. Acquire a client from the connection pool.
2. Begin a PostgreSQL transaction.
3. Make the client available through an infrastructure-owned asynchronous
   transaction context.
4. Execute the application callback.
5. Commit when the callback succeeds.
6. Roll back when the callback fails.
7. Always release the client.

Repositories will use the context-bound client when a transaction is active and
the shared connection pool otherwise. Neither the Domain nor the Application
Layer will import or receive a PostgreSQL client.

A nested `run()` call will join the existing transaction. Phase 3 will not
introduce nested savepoint semantics because no current workflow requires an
independently recoverable inner transaction.

Each aggregate will provide an explicit, technology-neutral rehydration factory.
The factory will:

- Accept the complete persisted domain state.
- Restore that state without invoking lifecycle operations.
- Preserve domain invariants and value-object construction.
- Avoid raising new domain events.
- Contain no database row types, SQL, or infrastructure dependencies.

Infrastructure mappers will construct value objects and call the aggregate
rehydration factory. They will fail loudly if stored data cannot form a valid
domain object.

## Rationale

The transaction context preserves the simple Phase 2 contract while ensuring
that repositories invoked inside one use case share the same physical database
transaction.

Consider opening an account. The application first loads its Agreement and then
saves the new Account. Both operations must use the same transaction. Passing a
PostgreSQL client through commands, use cases, or repository interfaces would
couple the Application Layer to infrastructure and violate ADR-0007.

Explicit rehydration distinguishes two different intentions:

- Creation asks the domain to establish a new object in its initial state.
- Rehydration restores an object that already completed earlier business
  transitions.

Keeping this distinction prevents persistence from pretending that historical
business actions are occurring again. It also allows historical data to be
loaded after creation or lifecycle rules evolve, while still requiring the
persisted values to form a valid aggregate.

## Consequences

### Positive

- Existing Application transaction contracts remain unchanged.
- Multiple repositories can participate in one atomic transaction.
- PostgreSQL clients do not leak into inner layers.
- Commit, rollback, and resource ownership are centralized.
- Persisted aggregate state is restored without replaying domain behavior.
- Future domain events will not be duplicated merely by loading an aggregate.

### Trade-offs

- Asynchronous context is implicit and requires focused integration tests.
- Repository behavior depends on whether a transaction context is active.
- Rehydration adds a second, deliberately restricted aggregate construction
  path.
- Joining nested transactions means an inner operation cannot commit or roll
  back independently.

## Alternatives Considered

### Alternative 1: Pass a PostgreSQL Client into the Callback

**Decision:** Rejected

**Reason:**

This would require changing the technology-neutral Application contract and
would expose a database concept to use cases or repository interfaces.

### Alternative 2: Give Every Repository Operation Its Own Transaction

**Decision:** Rejected

**Reason:**

Separate transactions cannot guarantee atomicity across a workflow involving
multiple repository operations.

### Alternative 3: Reconstruct State by Replaying Domain Methods

**Decision:** Rejected

**Reason:**

Replaying transitions confuses historical restoration with new business
behavior. It may violate changed transition rules or produce duplicate side
effects and domain events.

### Alternative 4: Mutate Private Aggregate Fields from Infrastructure

**Decision:** Rejected

**Reason:**

Bypassing aggregate encapsulation would make persisted state unsafe and couple
infrastructure to private implementation details.

### Alternative 5: Use Savepoints for Every Nested Transaction

**Decision:** Rejected for Phase 3

**Reason:**

No current use case requires partial recovery inside an outer transaction.
Savepoints would add semantics and failure modes without an approved need.

## Implications

Transaction integration tests must prove successful commit, failure rollback,
multi-repository atomicity, nested joining, and client release on every path.

Mapper and repository tests must round-trip every supported aggregate state,
including non-initial Account and Ledger states. Invalid persisted state must be
reported as an infrastructure persistence failure rather than silently changed.

Rehydration factories are narrowly scoped Domain Layer changes required to
support persistence. They must not contain database-specific logic or weaken
domain validation.

## References

- `docs/architecture/adr/ADR-0007-application-layer-boundaries.md`
- `docs/architecture/infrastructure-layer-architecture.md`
- `packages/enterprise-application/src/shared/transactions/TransactionManager.ts`
- `packages/enterprise-application/src/shared/transactions/TransactionalUseCase.ts`
