# EPOS Core Enterprise Domain Model

## Purpose

This document defines the high-level business architecture of the EPOS enterprise banking platform.

It serves as the primary source of truth for the enterprise domain model by identifying the major business domains, their core entities, and the relationships between them.

This document intentionally focuses on **business concepts**, not technical implementation.

---

# Enterprise Domain Hierarchy

```text
Enterprise Banking Platform
│
├── Enterprise Foundation
│   ├── Party Management
│   ├── Customer
│   ├── Products
│   ├── Agreements
│   ├── Accounts
│   ├── Ledger
│   └── Reference Data
│
├── Banking Products
│   ├── Deposits
│   ├── Loans
│   ├── Mortgages
│   ├── Line of Credit
│   └── Credit Cards
│
├── Payments
│   ├── Domestic Payments
│   ├── International Payments
│   ├── Wires
│   ├── SWIFT
│   ├── RTP
│   ├── ACH / EFT
│   └── Settlement
│
├── Cards
│   ├── Debit Cards
│   ├── Credit Cards
│   ├── Authorization
│   ├── PIN Management
│   └── Card Lifecycle
│
├── Channels
│   ├── ATM
│   ├── POS
│   ├── IVR
│   ├── Mobile Banking
│   ├── Web Banking
│   ├── Branch
│   └── APIs
│
├── Foreign Exchange
│   ├── Exchange Rates
│   ├── Currency Conversion
│   ├── FX Deals
│   └── FX Settlement
│
├── Trade Finance
│   ├── Letter of Credit
│   ├── Bank Guarantees
│   ├── Documentary Collections
│   └── Trade Settlement
│
├── Risk & Compliance
│   ├── AML
│   ├── Fraud Management
│   ├── Sanctions
│   ├── Limits
│   └── Monitoring
│
└── Enterprise Services
    ├── Notifications
    ├── Documents
    ├── Audit
    ├── Reporting
    └── Workflow
```

---

# Enterprise Foundation

The Enterprise Foundation establishes the common business language used throughout the platform.

It defines the core concepts upon which every other business domain depends.

Core concepts include:

- Party
- Customer
- Product
- Agreement
- Account
- Ledger
- Reference Data

---

# Banking Products

Banking Products represent the financial products offered by the institution.

Examples include:

- Deposit Accounts
- Loans
- Mortgages
- Line of Credit
- Credit Card Products

Products define the business offering, while accounts represent operational instances of those products.

---

# Payments

The Payments domain manages the movement of money between accounts, customers, financial institutions, and payment networks.

Examples include:

- Domestic Transfers
- International Transfers
- Wires
- SWIFT
- ACH / EFT
- Real-Time Payments
- Settlement

---

# Cards

The Cards domain manages the lifecycle and authorization of debit and credit cards.

Responsibilities include:

- Card Issuance
- Card Activation
- PIN Management
- Authorization
- Card Replacement
- Card Lifecycle Management

---

# Channels

Channels represent the methods through which customers and external systems interact with the enterprise.

Channels do not own business logic.

They consume application services exposed by the enterprise.

Examples include:

- ATM
- POS
- IVR
- Mobile Banking
- Web Banking
- Branch
- APIs

---

# Foreign Exchange

The Foreign Exchange domain manages currency conversion and foreign exchange operations.

Responsibilities include:

- Exchange Rates
- Currency Conversion
- FX Deals
- FX Settlement

---

# Trade Finance

The Trade Finance domain supports international trade and commercial banking operations.

Examples include:

- Letters of Credit
- Bank Guarantees
- Documentary Collections
- Trade Settlement

---

# Risk & Compliance

This domain enforces regulatory, operational, and financial controls across the enterprise.

Responsibilities include:

- Anti-Money Laundering (AML)
- Fraud Detection
- Sanctions Screening
- Customer and Transaction Limits
- Monitoring and Compliance

---

# Enterprise Services

Enterprise Services provide capabilities shared across multiple business domains.

Examples include:

- Notifications
- Document Management
- Audit
- Reporting
- Workflow

These services support the enterprise but do not contain core banking business logic.

---

# Core Enterprise Entities

The following enterprise entities form the foundation of the EPOS domain model:

- Party
- Customer
- Product
- Agreement
- Account
- Ledger
- Transaction
- Branch
- Employee
- Channel

Additional entities will be introduced within their respective business domains as the platform evolves.

---

# Domain Relationships

High-level business relationships are defined separately in:

- `entity-relationships.md`
- `bounded-contexts.md`
- `business-capability-model.md`

These documents build upon the enterprise model defined here and should not duplicate its contents.
