# ADR-0007: Application Layer Boundaries and Contracts

## Status

Accepted

## Date

2026-08-01

## Context

EPOS requires a layer that coordinates domain behavior while remaining independent of delivery mechanisms and infrastructure technologies. Without an explicit boundary, use cases can become coupled to HTTP controllers, database clients, or messaging systems, and business rules can drift out of the Domain Layer.

The platform also requires stable contracts for persistence, transactions, application input, and returned data before infrastructure implementations are introduced.

## Decision

EPOS will maintain a dedicated `@epos/enterprise-application` package between delivery adapters and the Enterprise Domain package.

The Application Layer will:

- Organize workflows as vertical slices within their bounded context.
- Define commands for state changes and queries for reads.
- Return application-owned results and DTOs rather than domain entities.
- Define repository interfaces required by its use cases.
- Invoke domain behavior for all business-rule decisions.
- Define technology-neutral application validation and errors.
- Define transaction contracts and use-case decorators without implementing database transactions.
- Expose supported contracts through package entry points.

The dependency direction is:

```text
API / Delivery → Application → Domain
Infrastructure → Application contracts
```

The Domain Layer must not import the Application Layer. The Application Layer must not import Express, database drivers, Kafka clients, ORMs, or cloud SDKs.

## Rationale

This structure keeps business behavior independent, makes workflows testable with in-memory collaborators, and allows persistence and delivery technologies to change without rewriting use cases.

Owning repository and transaction contracts in the Application Layer follows the dependency-inversion principle: the workflow defines what it needs, and infrastructure supplies the implementation.

Vertical slices keep commands, queries, results, orchestration, and tests close to the business operation they represent. Context-level and package-level entry points provide a stable public API while internal files remain implementation details.

## Consequences

### Positive

- Domain logic remains isolated from orchestration and technology.
- Use cases can be tested without databases or HTTP servers.
- Infrastructure implementations can be introduced incrementally.
- Public contracts are explicit and reviewable.
- Transaction ownership is defined before a database is selected.
- Bounded-context ownership remains visible as the repository grows.

### Trade-offs

- Additional command, query, result, repository, and error types increase file count.
- Mapping between domain objects and result DTOs introduces deliberate translation code.
- Runtime composition is required to connect use cases to infrastructure implementations.
- Transactions cannot execute atomically until Phase 3 supplies a concrete transaction manager.

## Alternatives Considered

### Alternative 1: Put Use Cases in the Domain Package

**Decision:** Rejected

**Reason:**

Repository access, transaction coordination, and external input models are application concerns. Combining them with domain behavior would weaken domain independence.

### Alternative 2: Put Use Cases in Express Controllers

**Decision:** Rejected

**Reason:**

This would couple business workflows to HTTP and make reuse from jobs, messaging consumers, or other channels difficult.

### Alternative 3: Define Repository Interfaces in Infrastructure

**Decision:** Rejected

**Reason:**

The consumer of a capability should own the contract. Infrastructure should implement application needs rather than dictate them.

### Alternative 4: Return Domain Entities Directly

**Decision:** Rejected

**Reason:**

Exposing domain entities would leak internal behavior and mutable state across boundaries and couple external consumers to domain evolution.

## Implications

Phase 3 must implement the repository and transaction contracts without changing their ownership. Phase 4 must map API requests and responses to application commands, queries, and results without moving orchestration into controllers.

New use cases must follow the same bounded-context vertical-slice structure and preserve the validation and error ownership defined by this decision.

## References

- `docs/architecture/application-layer-architecture.md`
- `docs/architecture/domain-layer-architecture.md`
- `docs/architecture/software-architecture.md`
- `packages/enterprise-application/`
