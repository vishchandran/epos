# EPOS (Enterprise Platform OS)

Enterprise Platform OS (EPOS) is a long-term engineering program to design and build a modern enterprise banking platform from the ground up.

The program focuses on enterprise architecture, cloud-native engineering, distributed systems, platform engineering, artificial intelligence, and end-to-end banking capabilities while following real-world software engineering and program management practices.

---

## Platform Strategy

EPOS is designed as a complete enterprise banking platform comprising backend services, platform capabilities, and a modern enterprise web portal.

Although the platform is built **backend-first**, every major capability is designed **end-to-end**. Business workflows, user experience, APIs, domain models, architecture, and infrastructure are considered together before implementation.

The enterprise web portal will be introduced incrementally as the platform matures, providing operational dashboards and management interfaces for banking users, platform engineers, and administrators.

---

## Program Roadmap

| Release | Objective                                 | Phase Progress                                                   | Status         |
| ------- | ----------------------------------------- | ---------------------------------------------------------------- | -------------- |
| **1.0** | Enterprise Foundation                     | **Phases -1 to 4** _(Current: Phase 1 • Phases -1 & 0 Complete)_ | 🟢 In Progress |
| **2.0** | Core Platform Services                    | **Phases 5–9**                                                   | ⚪ Planned     |
| **3.0** | Core Banking Platform & API Foundation    | **Phases 10–15**                                                 | ⚪ Planned     |
| **4.0** | Enterprise Banking Platform               | **Phases 16–20**                                                 | ⚪ Planned     |
| **5.0** | Distributed Systems & Platform Operations | **Phases 21–24**                                                 | ⚪ Planned     |
| **6.0** | Platform Engineering & Reliability        | **Phases 25–27**                                                 | ⚪ Planned     |
| **7.0** | Enterprise Intelligence & AI              | **Phases 28–30**                                                 | ⚪ Planned     |

> **Detailed phase planning is available in `program/core-roadmap.md`.**

---

## Engineering Approach

Every major capability within EPOS follows the same engineering lifecycle:

```text
Business Requirement
        ↓
User Workflow
        ↓
UI Wireframe
        ↓
API Design
        ↓
Domain Model
        ↓
Architecture
        ↓
Implementation
        ↓
Testing
        ↓
Deployment
        ↓
Operations
```

This approach ensures that every backend capability is designed with the end user and operational workflow in mind while maintaining a backend-first implementation strategy.

---

## Current Status

| Item                     | Value                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------- |
| **Current Release**      | 1.0                                                                                 |
| **Current Phase**        | Phase 1 – Enterprise Domain Modeling                                                |
| **Status**               | 🟢 In Progress                                                                      |
| **Completed Milestones** | Phase -1 – Technology & Platform Baseline ✅<br>Phase 0 – Engineering Foundation ✅ |

---

## Phase 0 Highlights

Phase 0 established the engineering foundation that every EPOS service will inherit.

### Completed

- ✅ Monorepo architecture with pnpm workspaces
- ✅ TypeScript foundation
- ✅ Express-based System API
- ✅ Environment configuration (`dotenv`)
- ✅ Structured logging (Pino)
- ✅ Health and information endpoints
- ✅ ESLint
- ✅ Prettier
- ✅ Automated testing (Vitest + Supertest)
- ✅ Docker containerization
- ✅ GitHub Actions CI pipeline
- ✅ Architecture Decision Records (ADRs)
- ✅ Engineering standards and development workflow

### Outcome

EPOS now has a production-ready engineering foundation supporting development, testing, containerization, and continuous integration for all future platform services.

---

## Documentation

Project documentation includes:

- Architecture Principles
- Engineering Standards
- Architecture Decision Records (ADRs)
- Program Roadmap
- Release Plans
- RAID Register
- Dependency Matrix
- Daily Engineering Log

---

## Repository Structure

The repository contains:

- Enterprise platform architecture
- Platform engineering components
- Banking domain services
- Shared platform libraries
- Infrastructure as Code
- Engineering documentation
- Program management artifacts

---

## License

This project is intended for learning, research, and engineering experimentation.
