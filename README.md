# EPOS — Enterprise Platform OS

EPOS is a production-inspired enterprise banking platform built to model, deliver, and operate banking capabilities through clear business boundaries, reusable application services, and independently evolvable platform components.

This README serves as the product requirements overview and entry point for the repository. Detailed architecture, engineering, release, and governance decisions remain in their dedicated documents.

---

## 1. Product Summary

| Item                        | Value                                                        |
| --------------------------- | ------------------------------------------------------------ |
| **Product**                 | EPOS (Enterprise Platform OS)                                |
| **Domain**                  | Enterprise banking                                           |
| **Delivery model**          | Incremental, release-based delivery                          |
| **Architecture**            | Modular monorepo with layered and bounded-context boundaries |
| **Implementation strategy** | Backend first, end-to-end by design                          |
| **Current release**         | Release 1.0 — Enterprise Foundation                          |
| **Current phase**           | Phase 2 — Application Layer                                  |
| **Status**                  | In progress                                                  |

---

## 2. Problem Statement

Enterprise banking platforms must support many business capabilities—party management, customers, products, agreements, accounts, ledgers, payments, risk, channels, and operations—without allowing business rules to become coupled to APIs, databases, messaging platforms, or deployment technologies.

Without explicit boundaries, these systems commonly develop:

- Duplicated customer and identity information
- Business rules embedded in controllers and database code
- Tight coupling between domains
- Inconsistent APIs and error handling
- Unsafe data changes across workflows
- Difficult testing and deployment
- Repository structures that become hard to navigate
- Architecture documentation that diverges from implementation

EPOS addresses these problems by establishing the business model, application workflows, engineering standards, and platform foundations before expanding into full banking capabilities.

---

## 3. Product Vision

Build a modular enterprise banking platform in which:

- Business capabilities are modeled using clear bounded contexts.
- Domain rules remain independent of delivery and infrastructure technologies.
- Application use cases can be invoked by APIs, jobs, workflows, or message consumers.
- Infrastructure implementations can change without changing business behavior.
- Every capability is testable, observable, secure, and documented.
- The monorepo remains predictable as applications and packages grow.
- Architecture decisions and delivery progress remain traceable.

---

## 4. Target Users

### Banking users

Operations staff, customer-service teams, product teams, and administrators who will eventually use EPOS workflows and operational interfaces.

### Application developers

Engineers building banking use cases, APIs, integrations, and domain capabilities.

### Platform engineers

Engineers responsible for runtime platforms, deployment, networking, security, observability, and reliability.

### Architecture and program stakeholders

People reviewing system boundaries, architecture decisions, risks, dependencies, delivery progress, and production readiness.

---

## 5. Product Goals

1. Establish a reusable enterprise banking foundation.
2. Model banking concepts using explicit bounded contexts and aggregate boundaries.
3. Keep business rules independent of HTTP, databases, messaging, and infrastructure.
4. Expose business capabilities through reusable application use cases.
5. Support independently deployable applications within one governed monorepo.
6. Standardize build, formatting, linting, testing, and continuous integration.
7. Introduce security, observability, reliability, and automation as platform capabilities.
8. Maintain architecture and delivery documentation alongside implementation.

---

## 6. Non-Goals

EPOS is not currently intended to:

- Replace a production core-banking system.
- Store real customer or financial data.
- Provide production-certified regulatory compliance.
- Implement every banking domain in Release 1.0.
- Introduce distributed-system complexity before a demonstrated need exists.
- Couple business behavior to one API, database, cloud, or messaging technology.

---

## 7. Product Scope

### Enterprise foundation

- Party Management
- Customer
- Product
- Agreement
- Account
- Ledger
- Reference data

### Core platform services

- Configuration and secrets
- Audit
- Notifications
- Documents
- Workflow
- Scheduling
- Reporting
- Observability

### Banking capabilities

- Deposits and lending
- Payments and settlement
- Cards
- Foreign exchange
- Trade finance
- Channels
- Risk and compliance

### Platform and operations

- Networking
- Identity and access management
- Containers and Kubernetes
- Event streaming
- Data platform
- CI/CD
- Reliability engineering
- Operational intelligence and AI

Capabilities are introduced incrementally according to the program roadmap.

---

## 8. Functional Requirements

### FR-001 — Party Management

EPOS shall maintain a single Party record for each person or organization known to the enterprise.

The platform shall support:

- Registering a Party
- Retrieving Party information
- Activating and deactivating a Party
- Changing a Party display name
- Referencing the same Party from multiple business roles

### FR-002 — Customer Management

EPOS shall represent a Customer as a banking relationship associated with one Party.

The platform shall support:

- Creating a Customer for an existing Party
- Retrieving Customer information
- Managing Customer lifecycle state
- Assigning and changing Customer segments
- Preventing Customer data from duplicating Party identity information

### FR-003 — Product Management

EPOS shall maintain financial-product definitions and their lifecycle.

The platform shall support product creation, approval, availability, suspension, retirement, and naming.

### FR-004 — Agreement Management

EPOS shall represent contractual relationships between Customers and Products.

The platform shall support Agreement creation, activation, suspension, expiration, and closure.

### FR-005 — Account Management

EPOS shall represent operational accounts created under Agreements.

The platform shall support account opening, activation, suspension, closure, and retrieval.

### FR-006 — Ledger Management

EPOS shall maintain accounting records independently of operational account workflows.

The platform shall support Ledger creation, retrieval, lifecycle management, and future posting operations.

### FR-007 — Application orchestration

Every state-changing business operation shall be exposed through an application command and use case.

Every read operation shall be exposed through an application query and result DTO.

Application use cases shall:

- Load required domain objects through repository interfaces
- Invoke Domain Layer behavior
- Persist changed aggregates
- Return explicit result DTOs
- Report application-level failures consistently

### FR-008 — Service interfaces

Future APIs, jobs, workflows, and message consumers shall invoke the Application Layer rather than directly changing domain objects or using persistence implementations.

---

## 9. Non-Functional Requirements

### Maintainability

- Code shall follow bounded-context and layer boundaries.
- Folder placement and public exports shall remain predictable.
- Shared abstractions shall be introduced only when multiple real consumers exist.

### Quality

- TypeScript strict mode shall remain enabled.
- Builds, linting, formatting, and automated tests shall pass before merge.
- Business rules shall be protected by Domain Layer tests.
- Application orchestration shall be protected by Application Layer tests.

### Security

- Secrets shall remain outside source control.
- Sensitive banking and identity data shall not be logged.
- Authentication and authorization shall remain separate from Party Management.
- Secure defaults and least privilege shall guide future infrastructure.

### Reliability

- State-changing use cases shall define clear transaction boundaries.
- Persistence implementations shall account for concurrency and rollback.
- Domain events shall be published reliably using an approved delivery pattern.

### Observability

Deployable services shall eventually provide:

- Structured logs
- Health and readiness checks
- Metrics
- Distributed tracing
- Correlation and request identifiers

### Portability

The Domain and Application layers shall remain independent of Express, PostgreSQL, Kafka, Redis, and cloud-provider SDKs.

---

## 10. Architecture

```text
API / Job / Message Consumer
             ↓
      Application Layer
          ↙      ↘
Domain Layer    Repository and service ports
                         ↑
                   implemented by
                         ↑
              Infrastructure adapters
```

### Layer responsibilities

| Layer              | Responsibility                                                          |
| ------------------ | ----------------------------------------------------------------------- |
| **API**            | Translate transport requests and responses                              |
| **Application**    | Coordinate commands, queries, transactions, repositories, and DTOs      |
| **Domain**         | Protect business rules, entities, value objects, and lifecycle behavior |
| **Infrastructure** | Implement persistence, messaging, caching, and external integrations    |

Dependencies point toward business behavior. The Domain Layer does not depend on the Application, API, or Infrastructure layers.

---

## 11. Current Delivery Status

### Completed

- Phase -1 — Technology & Platform Baseline
- Phase 0 — Engineering Foundation
- Phase 1 — Enterprise Domain Modeling

### In progress

Phase 2 is building the Application Layer across the implemented bounded contexts.

Current Party Management application capabilities:

- Register Party
- Get Party
- Activate Party
- Deactivate Party
- Change Party Display Name

### Planned next

- Customer application use cases
- Product application use cases
- Agreement application use cases
- Account application use cases
- Ledger application use cases
- Transaction boundaries
- Domain-event coordination
- Application architecture documentation and exit review

---

## 12. Acceptance Criteria

A Phase 2 use case is complete when:

- Its command or query contract is explicit.
- Required repository interfaces are defined.
- Business behavior is delegated to the Domain Layer.
- Domain entities are not exposed as transport responses.
- Result data is returned through an explicit DTO.
- Success and failure paths are covered by automated tests.
- No Express, database, Kafka, Redis, or infrastructure dependency enters the Application package.
- Build, lint, test, and formatting checks pass.
- Public package exports are intentional.

---

## 13. Success Measures

EPOS evaluates progress through engineering outcomes rather than feature count alone:

- All quality gates pass in CI.
- Business rules remain isolated in the Domain Layer.
- Application use cases run without infrastructure.
- Repository and package boundaries remain understandable.
- Architecture documents match the implemented system.
- Each phase satisfies a documented exit review.
- New capabilities follow established patterns without duplicating foundational code.

---

## 14. Repository Structure

```text
epos/
├── apps/                 # Independently deployable applications
├── packages/             # Reusable Domain, Application, and supporting packages
├── platform/             # Shared operational platform capabilities
├── infrastructure/       # Provisioning and deployment definitions
├── docs/                 # Architecture and engineering documentation
├── program/              # Roadmaps, releases, risks, and governance
├── scripts/              # Repository automation
└── assets/               # Shared static assets
```

Placement rule:

| Folder            | Content                                   |
| ----------------- | ----------------------------------------- |
| `apps/`           | Something that can be started or deployed |
| `packages/`       | Reusable code imported by applications    |
| `platform/`       | Shared runtime or operational capability  |
| `infrastructure/` | Environment provisioning and deployment   |
| `docs/`           | Architecture and engineering knowledge    |
| `program/`        | Delivery planning and governance          |

---

## 15. Technology Baseline

| Concern                | Technology           |
| ---------------------- | -------------------- |
| Runtime                | Node.js 24 LTS       |
| Language               | TypeScript           |
| Package management     | pnpm workspaces      |
| API framework          | Express              |
| Testing                | Vitest and Supertest |
| Logging                | Pino                 |
| Static analysis        | ESLint               |
| Formatting             | Prettier             |
| Containers             | Docker               |
| Continuous integration | GitHub Actions       |

pnpm recursive workspace scripts are the current task-orchestration mechanism. A dedicated build orchestrator may be introduced later when repository scale demonstrates the need.

---

## 16. Getting Started

### Prerequisites

- Node.js 24 LTS
- pnpm 11
- Git
- Docker for container workflows

### Install

```bash
pnpm install
```

### Validate the repository

```bash
pnpm build
pnpm lint
pnpm test
pnpm format:check
```

### Run the System API

```bash
cp apps/system-api/.env.example apps/system-api/.env
pnpm --filter @epos/system-api dev
```

Default endpoints:

```text
GET /
GET /health/live
GET /health/ready
GET /info
```

---

## 17. Delivery Method

Every major capability follows:

```text
Business Requirement
        ↓
User Workflow
        ↓
API Contract
        ↓
Domain Model
        ↓
Application Design
        ↓
Implementation
        ↓
Testing
        ↓
Deployment
        ↓
Operations and Improvement
```

Implementation proceeds through small, testable vertical slices rather than disconnected horizontal layers.

---

## 18. Documentation and Governance

| Document                | Location                                            |
| ----------------------- | --------------------------------------------------- |
| Architecture principles | `docs/architecture/core-architecture-principles.md` |
| Engineering standards   | `docs/architecture/core-engineering-standards.md`   |
| Architecture decisions  | `docs/architecture/adr/`                            |
| Domain architecture     | `docs/domain/`                                      |
| Master roadmap          | `program/core-roadmap.md`                           |
| Release plans           | `program/release-plans/`                            |
| Phase logs              | `program/phase-log/`                                |
| Phase reviews           | `program/phase-reviews/`                            |
| Dependency governance   | `program/governance/dependency-matrix.md`           |

Architecture decisions shall be recorded through ADRs. Delivery status and phase completion shall be recorded through phase logs and exit reviews.

---

## 19. License and Intended Use

EPOS is intended for learning, research, architecture practice, and engineering experimentation. It must not be used with real customer, credential, or financial data without a separate production-readiness, security, privacy, and regulatory assessment.
