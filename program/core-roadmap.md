# EPOS Master Roadmap

> **Archive status — Retired November 2026**
>
> EPOS is no longer an active development program. This roadmap is retained as a historical planning record. Releases, phases, milestones, and future domain coverage that were not completed before retirement are not scheduled for delivery. See [ADR-0010](../docs/architecture/adr/ADR-0010-retire-and-archive-epos.md).

## Purpose

This document is the master roadmap for the EPOS program.

It provides a high-level view of the program vision, release strategy, business domain implementation roadmap, implementation phases, timelines, and major milestones.

Detailed planning, execution tracking, release progress, risks, dependencies, and implementation details are maintained in the corresponding program documents.

---

# Program Summary

| Item                          | Value                         |
| ----------------------------- | ----------------------------- |
| **Program**                   | EPOS (Enterprise Platform OS) |
| **Start Date**                | July 5, 2026                  |
| **Status**                    | Retired                       |
| **Retirement Date**           | November 2026                 |
| **Former Planned Completion** | January 2029                  |
| **Former Estimated Duration** | ~30 Months                    |
| **Delivery Model**            | Release-Based Delivery        |
| **Methodology**               | Agile                         |

---

# Release Roadmap

The dates below are the former delivery baseline. They are retained for historical context and are no longer active targets.

| Release | Objective                                           | Planned Duration    |
| ------- | --------------------------------------------------- | ------------------- |
| **1.0** | Enterprise Foundation                               | Jul 2026 – Oct 2026 |
| **2.0** | Core Platform Services                              | Oct 2026 – Mar 2027 |
| **3.0** | Core Banking Platform                               | Mar 2027 – Sep 2027 |
| **4.0** | Enterprise Banking Foundation                       | Sep 2027 – Feb 2028 |
| **5.0** | Enterprise Banking Expansion & Distributed Platform | Feb 2028 – Jul 2028 |
| **6.0** | Platform Engineering & Reliability                  | Jul 2028 – Oct 2028 |
| **7.0** | Enterprise Intelligence & Operations                | Oct 2028 – Jan 2029 |

---

# Business Domain Implementation Roadmap

The following roadmap identifies when implementation of each major business domain begins within EPOS. Business domains are long-lived capabilities that evolve across multiple releases rather than being completed within a single release.

| Business Domain                          | Release | Major Capabilities                                                                                                                                                                                                                                                                                                |
| ---------------------------------------- | :-----: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Enterprise Foundation**                | **1.0** | Party Management, Customer, Product, Agreement, Account, Ledger, Reference Data                                                                                                                                                                                                                                   |
| **Enterprise Services**                  | **2.0** | Notifications, Document Management, Audit, Workflow, Reporting, Configuration, Scheduling, Shared Services                                                                                                                                                                                                        |
| **Banking Products**                     | **3.0** | Product Catalog, Chequing Accounts, Savings Accounts, Term Deposits, Loans, Mortgages, Line of Credit, Credit Card Products                                                                                                                                                                                       |
| **Payments**                             | **4.0** | Internal Transfers, Domestic Payments, International Payments, Payment Orchestration, Payment Routing, Payment Switch, Payment Gateway, Payment Authorization, Payment Status, Payment Limits, ISO 8583 Messaging, Payment Network Integrations, ACH/EFT, RTP, Wires, SWIFT, Clearing, Settlement, Reconciliation |
| **Cards**                                | **4.0** | Debit Cards, Credit Cards, Card Issuance, Card Authorization, PIN Management, Card Lifecycle, Card Controls, Tokenization                                                                                                                                                                                         |
| **Channels**                             | **4.0** | Internal Operations Portal, REST APIs, Web Banking, Mobile Banking, ATM, POS, IVR, Branch Banking, Partner APIs, Open Banking APIs                                                                                                                                                                                |
| **Foreign Exchange**                     | **4.0** | Exchange Rates, Currency Conversion, FX Quotes, FX Deals, Treasury Operations, FX Settlement                                                                                                                                                                                                                      |
| **Trade Finance**                        | **4.0** | Trade Foundation, Letters of Credit, Bank Guarantees, Documentary Collections, Trade Settlement, Trade Workflow, Trade Documentation                                                                                                                                                                              |
| **Risk & Compliance**                    | **4.0** | Customer Limits, Transaction Limits, Fraud Detection, AML, Sanctions Screening, Risk Scoring, Compliance Monitoring, Regulatory Controls                                                                                                                                                                          |
| **Distributed Platform**                 | **5.0** | Event Streaming, Kafka, Domain Events, Event-Driven Architecture, Outbox Pattern, Saga Orchestration, Distributed Workflows, Retries, Dead Letter Queue (DLQ)                                                                                                                                                     |
| **Platform Engineering & Reliability**   | **6.0** | Observability, Logging, Metrics, Distributed Tracing, CI/CD, Infrastructure Automation, Service Mesh, High Availability, Disaster Recovery, Resiliency Engineering                                                                                                                                                |
| **Enterprise Intelligence & Operations** | **7.0** | Enterprise Dashboards, Analytics, Enterprise Reporting, AI Copilots, Operational Intelligence, Predictive Insights, Decision Support, Knowledge Platform                                                                                                                                                          |

> **Implementation Strategy**
>
> EPOS followed a **backend-first implementation strategy** during active development. Core business capabilities were intended to be implemented and validated before customer-facing channels. This strategy is retained as architectural history and no longer represents an active delivery plan.

---

# Business Vertical Coverage — Strategic Proposal

The six verticals below describe the proposed breadth of EPOS. They organize existing capabilities and identify future domain coverage; they are not additional releases, implementation phases, or approved delivery commitments.

**Former delivery baseline:** The Release 1.0–7.0 roadmap, domain implementation schedule, dates, and milestones are retained as historical plans. Retirement cancelled all incomplete and future delivery. Proposed coverage was never assigned an approved release, phase, or delivery date.

| Business Vertical              | Domain Coverage                                                            | Existing Scheduled Coverage                                                                                                                                                                                                  | Newly Proposed Future Coverage — Unscheduled                                                                                                                                                                                                  |
| ------------------------------ | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core Banking**               | Customer, Accounts, Deposits, Lending, Ledger                              | Release 1.0 establishes Customer, Account, and Ledger foundations; Release 3.0 develops core banking and deposit and lending products, including loans, mortgages, and lines of credit.                                      | No additional delivery scope is introduced by this grouping; extensions beyond the existing baseline require separate approval.                                                                                                               |
| **Transaction Banking**        | Payments, Cards, FX, Trade Finance, Cash Management                        | Payments, Cards, Foreign Exchange, and Trade Finance begin in Release 4.0; Release 5.0 retains Advanced Payments & Settlement and Advanced Trade Finance.                                                                    | Cash Management as an explicit domain. Existing payment or treasury capabilities do not constitute approval of the full Cash Management domain.                                                                                               |
| **Capital Markets**            | Trading, Securities, Derivatives, Market Risk, Settlement                  | No explicit Capital Markets delivery allocation exists in the current baseline.                                                                                                                                              | Trading, Securities, Derivatives, capital markets Market Risk, and securities/derivatives Settlement. Existing payment, FX, and trade settlement commitments do not schedule capital markets settlement.                                      |
| **Brokerage & Wealth**         | Retail Brokerage, Prime Brokerage, Custody, Asset Management               | No explicit Brokerage & Wealth delivery allocation exists in the current baseline.                                                                                                                                           | Retail Brokerage, Prime Brokerage, Custody, and Asset Management.                                                                                                                                                                             |
| **Enterprise Risk & Finance**  | Credit Risk, Market Risk, Liquidity Risk, Compliance, Financial Accounting | Release 4.0 retains Risk & Compliance Foundation, including limits, fraud, AML, sanctions screening, risk scoring, and regulatory controls. Ledger foundations remain in Release 1.0, with Accounts & Ledger in Release 3.0. | Explicit Credit Risk, Market Risk, Liquidity Risk, and broader Financial Accounting coverage beyond the existing ledger and risk/compliance scope. Existing risk scoring and ledger capabilities do not imply approval of these full domains. |
| **Enterprise Shared Services** | Party, Product, Agreement, Reference Data, Audit, Documents                | Release 1.0 retains Party, Product, Agreement, and Reference Data foundations; Release 2.0 retains Audit and Document Management; Release 3.0 retains Product Catalog.                                                       | No additional delivery scope is introduced by this grouping; broader service capabilities require separate approval.                                                                                                                          |

## Domain Alignment and Boundaries

- These verticals are strategic groupings, not new bounded contexts or changes to domain ownership. Party remains enterprise identity, Customer remains the banking relationship, Agreement remains contractual, Account remains operational servicing, and Ledger remains the accounting source of truth.
- Market Risk appears in both Capital Markets and Enterprise Risk & Finance. Its ownership, shared controls, and integration boundaries require domain design review before scheduling; the repeated label does not approve duplicate implementations.
- Capital markets Settlement must be modeled separately from the existing payment, FX, and trade settlement commitments. Financial Accounting must define its relationship to Ledger without duplicating accounting truth.
- Channels, Branch, and the existing enterprise and platform capabilities remain in scope as currently documented. The six-vertical view does not remove capabilities omitted from its summary lists.
- The [Core Enterprise Domain Model](../docs/domain/core-enterprise-domain-model.md), [Business Capability Model](../docs/domain/business-capability-model.md), [Bounded Contexts](../docs/domain/bounded-contexts.md), and [Domain Implementation Map](../docs/domain/domain-implementation-map.md) continue to define the existing domain foundations. Proposed domains require capability definitions, business owners, bounded contexts, dependencies, and implementation mappings before delivery allocation.

## Approval and Scheduling

This was a proposed program-scope expansion under [Roadmap Governance](#roadmap-governance). It was not approved as scheduled delivery before retirement. No release allocation, phase, milestone, or date is assigned, and the proposal is retained only as a record of potential future domain coverage.

---

# Implementation Roadmap

## Release 1.0 Status at Retirement

| Phase | Focus                          | Status        |
| ----: | ------------------------------ | ------------- |
|    -1 | Technology & Platform Baseline | ✅ Complete   |
|     0 | Engineering Foundation         | ✅ Complete   |
|     1 | Enterprise Domain Modeling     | ✅ Complete   |
|     2 | Application Layer              | ✅ Complete   |
|     3 | Infrastructure Layer           | ⏹ Not pursued |
|     4 | Enterprise Service Integration | ⏹ Not pursued |

The following table records the former phase sequence. Phases after Phase 2 were not delivered.

|  Phase | Release | Primary Focus                               |
| -----: | :-----: | ------------------------------------------- |
| **-1** |   1.0   | Technology & Platform Baseline              |
|  **0** |   1.0   | Engineering Foundation                      |
|  **1** |   1.0   | Enterprise Domain Modeling & Implementation |
|  **2** |   1.0   | Application Layer                           |
|  **3** |   1.0   | Infrastructure Layer                        |
|  **4** |   1.0   | Enterprise Service Integration              |
|  **5** |   2.0   | Configuration & Secrets Platform            |
|  **6** |   2.0   | Event Platform                              |
|  **7** |   2.0   | Data Platform                               |
|  **8** |   2.0   | Workflow Platform                           |
|  **9** |   2.0   | Observability Platform                      |
| **10** |   3.0   | Customer Domain                             |
| **11** |   3.0   | Accounts & Ledger                           |
| **12** |   3.0   | Banking Products                            |
| **13** |   3.0   | Core Banking Services                       |
| **14** |   4.0   | Payments Foundation                         |
| **15** |   4.0   | Cards Platform                              |
| **16** |   4.0   | Channels Platform                           |
| **17** |   4.0   | Foreign Exchange                            |
| **18** |   4.0   | Trade Finance Foundation                    |
| **19** |   4.0   | Risk & Compliance Foundation                |
| **20** |   5.0   | Distributed Platform                        |
| **21** |   5.0   | Advanced Payments & Settlement              |
| **22** |   5.0   | Advanced Trade Finance                      |
| **23** |   5.0   | Enterprise Integration Platform             |
| **24** |   5.0   | Global Banking Platform                     |
| **25** |   6.0   | Platform Engineering                        |
| **26** |   6.0   | Service Mesh                                |
| **27** |   6.0   | Reliability Platform                        |
| **28** |   7.0   | Enterprise Certification Platform           |
| **29** |   7.0   | Enterprise Operations Platform              |
| **30** |   7.0   | AI Platform & EPOS Control Center           |

---

# Major Milestones

The targets below are historical. Only completed work recorded in the phase logs was delivered; future milestones were cancelled when the program retired.

| Milestone          | Former Target  |
| ------------------ | -------------- |
| Program Kickoff    | July 2026      |
| Release 1 Complete | October 2026   |
| Release 2 Complete | March 2027     |
| Release 3 Complete | September 2027 |
| Release 4 Complete | February 2028  |
| Release 5 Complete | July 2028      |
| Release 6 Complete | October 2028   |
| Release 7 Complete | January 2029   |

---

# Roadmap Governance

During active development, the EPOS Master Roadmap was updated only when one or more of the following occurred:

- Program scope changes.
- A release is added, removed, or redefined.
- Business domain sequencing changes.
- Phase sequencing changes.
- Major milestones change.
- Program timelines are formally revised.

The roadmap intentionally remains high level.

Supporting documents include:

- **Release Plans** — Detailed scope, implementation strategy, dependencies, milestones, and deliverables for each release.
- **Phase Logs** — Historical record of completed work and phase outcomes.
- **Architecture Decision Records (ADRs)** — Significant architectural decisions and their rationale.
- **Enterprise Domain Architecture** — Business domains, bounded contexts, aggregate design, domain events, and implementation architecture.
