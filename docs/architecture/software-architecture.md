# EPOS Software Architecture

## Purpose

This document provides the architectural evolution of the EPOS platform.

It is maintained throughout the life of the program and illustrates:

- The current production architecture
- The target architecture for the current release
- The long-term target architecture
- Architectural principles adopted
- Architectural patterns introduced
- Key architecture decisions and tradeoffs

---

# Current State Architecture

**Status:** Release 1 – Phase 2 (Complete)

The current implementation provides the engineering foundation, the Enterprise Domain package, and the completed Release 1 Application Layer scope.

![Current EPOS architecture](diagrams/software-architecture-current.svg)

### Current Capabilities

- Monorepo (pnpm workspaces)
- System API
- Health endpoints
- Readiness endpoints
- Enterprise Domain package
- Enterprise Application package
- Party Management, Customer, Product, Agreement, Account, and Ledger domain models
- Complete Phase 2 workflows across all six bounded contexts
- Commands, queries, results, DTOs, and repository interfaces
- Application validation and consistent application errors
- Transaction boundary contract and transactional use-case decorator
- Governed package entry points
- Build pipeline
- ADR governance
- Program governance

---

# Interim State Architecture

## After Release 1 – Enterprise Foundation

![Release 1 architecture](diagrams/software-architecture-release-1.svg)

### Release Deliverables

- Enterprise domain package
- Party model
- Customer model
- Product model
- Agreement model
- Account model
- Ledger model
- Reference data foundation
- Domain-driven implementation foundation
- Repository interface foundation
- Domain events foundation
- Pure domain layer independent of API, database, and infrastructure

---

## After Release 2 – Core Platform Services

![Release 2 architecture](diagrams/software-architecture-release-2.svg)

### Release Deliverables

- Configuration and secrets foundation
- Audit service
- Notification service foundation
- Document service foundation
- Workflow foundation
- Reference data services
- Platform service contracts
- Foundation for shared cross-domain services

---

## After Release 3 – Core Banking Platform

![Release 3 architecture](diagrams/software-architecture-release-3.svg)

### Release Deliverables

- Banking product foundation
- Account lifecycle
- Balance management
- Transaction model
- Ledger posting model
- Customer-account relationship
- Product-agreement-account linkage
- Core banking service foundation

---

## After Release 4 – Enterprise Banking Foundation

![Release 4 architecture](diagrams/software-architecture-release-4.svg)

### Release Deliverables

- Payments foundation
- Payment switch and routing foundation
- External payment network integration foundation
- Card platform foundation
- Channel platform foundation
- Internal operations portal
- REST API exposure for enterprise capabilities
- Foreign exchange foundation
- Trade finance foundation
- Risk and compliance foundation
- Backend-first channel enablement

---

## After Release 5 – Enterprise Banking Expansion & Distributed Platform

![Release 5 architecture](diagrams/software-architecture-release-5.svg)

### Release Deliverables

- Kafka/event streaming platform
- Outbox pattern implementation
- Retry framework
- Dead letter queue
- Saga orchestration foundation
- Distributed workflow support
- Advanced payments and settlement
- Advanced trade finance
- Advanced FX settlement
- Enterprise integration platform
- Idempotent transaction processing foundation

---

## After Release 6 – Platform Engineering & Reliability

![Release 6 architecture](diagrams/software-architecture-release-6.svg)

### Release Deliverables

- Observability platform
- Metrics and tracing
- Centralized logging
- CI/CD maturity
- Infrastructure automation
- Service mesh foundation
- High availability patterns
- Disaster recovery foundation
- Circuit breaker and bulkhead patterns
- Operational runbook foundation

---

## After Release 7 – Enterprise Intelligence & Operations

![Release 7 architecture](diagrams/software-architecture-release-7.svg)

### Release Deliverables

- Enterprise operations platform
- Enterprise certification platform
- AI platform
- EPOS control center
- Operational dashboards
- Enterprise analytics
- AI copilots
- Decision support
- Knowledge platform
- Unified enterprise operations view

### Target Capabilities

Enterprise Banking

- Customer Management
- Products
- Accounts
- Ledger
- Payments
- Cards
- Foreign Exchange
- Trade Finance

Enterprise Services

- Notifications
- Documents
- Reporting
- Workflow
- Audit

Platform

- Event Streaming
- Distributed Messaging
- Configuration
- Observability

Infrastructure

- Kubernetes
- PostgreSQL
- Redis
- Service Mesh

Enterprise Intelligence

- AI Copilot
- Operational Intelligence
- Enterprise Analytics

---

# Architecture Evolution

| Release | Architecture Evolution                       |
| ------- | -------------------------------------------- |
| **1.0** | Enterprise Domain Foundation                 |
| **2.0** | Core Platform Services                       |
| **3.0** | Core Banking Services                        |
| **4.0** | Enterprise Banking Capabilities              |
| **5.0** | Distributed Platform                         |
| **6.0** | Platform Engineering & Reliability           |
| **7.0** | Enterprise Intelligence & Unified Operations |

---

# Architecture Principles

- Domain-Driven Design
- Business-first modelling
- Clean Architecture
- Infrastructure independence
- Separation of concerns
- API-first integration
- Modular monorepo
- Incremental architecture evolution
- Contract-first design
- Single source of truth

---

# Architecture Patterns

| Pattern              | First Introduced | Status           |
| -------------------- | ---------------- | ---------------- |
| Entity               | Release 1        | ✅               |
| Value Object         | Release 1        | ✅               |
| Factory Method       | Release 1        | ✅               |
| Repository Pattern   | Release 1        | Contract Defined |
| Domain Events        | Release 1        | Planned          |
| Aggregate Root       | Release 1        | ✅               |
| Shared Kernel        | Release 1        | Not Introduced   |
| Transaction Boundary | Release 1        | Contract Defined |
| Unit of Work         | Release 1        | Planned          |
| Idempotency          | Release 4        | Planned          |
| Outbox Pattern       | Release 4        | Planned          |
| Event Streaming      | Release 5        | Planned          |
| Saga Pattern         | Release 5        | Planned          |
| Retry Pattern        | Release 5        | Planned          |
| Dead Letter Queue    | Release 5        | Planned          |
| CQRS                 | Release 5        | Planned          |
| Event Sourcing       | Release 5        | Planned          |
| Circuit Breaker      | Release 6        | Planned          |
| Bulkhead             | Release 6        | Planned          |
| Service Mesh         | Release 6        | Planned          |
| AI Copilot           | Release 7        | Planned          |

---

# Architecture Tradeoffs

| Decision                                     | Benefit                          | Tradeoff                             |
| -------------------------------------------- | -------------------------------- | ------------------------------------ |
| Monorepo                                     | Simplified dependency management | Larger repository                    |
| Business-first modelling                     | Stable enterprise model          | Slower initial development           |
| Domain-first implementation                  | Independent business logic       | More upfront design                  |
| Shared Kernel introduced through refactoring | Simpler learning path            | Later abstraction                    |
| API-first integration                        | Loose coupling                   | Additional interface management      |
| Event-driven architecture                    | Scalability and resilience       | Eventual consistency                 |
| Outbox Pattern                               | Reliable event publication       | Additional infrastructure components |
| Repository Pattern                           | Database independence            | Extra abstraction layer              |

---

## Migration-Aware Architecture Principles

EPOS is designed to support incremental enterprise modernization rather than one-time replacement.

Although migration infrastructure is introduced in later releases, all application and domain code should be developed with future migration, rollback, and coexistence in mind.

| Principle                   | Design Guideline                                                                                                                            | Introduced |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Business-first Domain       | Domain model remains independent of migration and infrastructure concerns.                                                                  | Release 1  |
| Infrastructure Independence | Domain layer shall not depend on databases, messaging platforms, or external systems.                                                       | Release 1  |
| Stable Business Identity    | Business entities use immutable identifiers to support coexistence and migration between legacy and modern platforms.                       | Release 1  |
| Explicit Business State     | Entity lifecycle is represented through explicit business states rather than implicit logic to enable controlled rollback.                  | Release 1  |
| Repository Abstraction      | Persistence is accessed through repository interfaces, allowing multiple storage implementations during migration.                          | Release 1  |
| Application Orchestration   | Transaction boundaries, migration logic, and infrastructure orchestration belong in the Application Layer rather than the Domain Layer.     | Release 1  |
| Feature-driven Deployment   | New capabilities should support progressive enablement through configuration or feature flags.                                              | Release 4  |
| Migration Routing           | Requests should be capable of being routed to legacy or modern implementations based on configurable migration rules.                       | Release 4  |
| Idempotent Processing       | Operations that may be retried or replayed must support idempotent execution.                                                               | Release 4  |
| Reliable Event Publication  | Database updates and event publication shall support transactional consistency through the Outbox Pattern.                                  | Release 4  |
| Parallel Processing Support | High-risk capabilities should support legacy and modern systems operating concurrently during migration.                                    | Release 4  |
| Event-driven Integration    | Cross-domain communication should transition from synchronous integration to asynchronous event-driven messaging where appropriate.         | Release 5  |
| Distributed Reliability     | Enterprise messaging shall support retries, dead-letter queues, replay, and eventual consistency.                                           | Release 5  |
| Reversible Deployment       | Production deployments should support controlled rollback through deployment and routing strategies without requiring domain model changes. | Release 5  |

---

### Design Philosophy

The EPOS architecture follows a migration-aware design philosophy:

- Business capabilities are implemented independently of migration strategies.
- Infrastructure concerns remain outside the Domain Layer.
- Migration, rollback, routing, and coexistence are implemented through the Application and Infrastructure layers.
- Architectural decisions made in early releases should minimize refactoring as the platform evolves.
- New enterprise capabilities should integrate with existing migration patterns rather than introducing bespoke migration logic.

---

### Guiding Principle

> **Design the platform so that migration is an operational concern, not a domain concern.**

Business logic should remain stable regardless of whether the platform is operating in pilot, phased migration, parallel run, or full production mode.

# Revision History

| Version | Release   | Description                                   |
| ------- | --------- | --------------------------------------------- |
| 1.0     | Release 1 | Initial enterprise architecture baseline      |
| 1.1     | Release 1 | Recorded Phase 2 Application Layer completion |
