# EPOS Master Roadmap

## Purpose

This document is the master roadmap for the EPOS program.

It provides a high-level view of the program vision, release strategy, business domain implementation roadmap, implementation phases, timelines, and major milestones.

Detailed planning, execution tracking, release progress, risks, dependencies, and implementation details are maintained in the corresponding program documents.

---

# Program Summary

| Item                   | Value                         |
| ---------------------- | ----------------------------- |
| **Program**            | EPOS (Enterprise Platform OS) |
| **Start Date**         | July 5, 2026                  |
| **Planned Completion** | January 2029                  |
| **Estimated Duration** | ~30 Months                    |
| **Delivery Model**     | Release-Based Delivery        |
| **Methodology**        | Agile                         |

---

# Release Roadmap

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
| **Enterprise Foundation**                | **1.0** | Identity, Party, Customer, Product, Agreement, Account, Ledger, Reference Data                                                                                                                                                                                                                                    |
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
> EPOS follows a **backend-first implementation strategy**. Core business capabilities are implemented and validated before customer-facing channels are introduced. Channels remain thin consumers of application services and evolve incrementally over multiple releases. Every business domain continues to mature throughout the lifetime of the platform.

---

# Implementation Roadmap

|  Phase | Release | Primary Focus                               |
| -----: | :-----: | ------------------------------------------- |
| **-1** |   1.0   | Technology & Platform Baseline              |
|  **0** |   1.0   | Engineering Foundation                      |
|  **1** |   1.0   | Enterprise Domain Modeling & Implementation |
|  **2** |   1.0   | Networking Platform                         |
|  **3** |   1.0   | Identity & Security Platform                |
|  **4** |   1.0   | Kubernetes Platform                         |
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

| Milestone          | Target         |
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

The EPOS Master Roadmap is a strategic planning artifact and is updated only when one or more of the following occur:

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
