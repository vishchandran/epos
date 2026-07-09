# EPOS Business Capability Model

**Document ID:** EPOS-DOM-004  
**Version:** 1.0  
**Status:** Draft  
**Phase:** Phase 1 – Enterprise Domain Modeling

## 1. Purpose

This document defines the core business capabilities EPOS must provide. A business capability describes **what** the enterprise must be able to do, independent of applications, APIs, or implementation technology.

---

## 2. Capability Principles

1. Capabilities describe business outcomes, not technical solutions.
2. Capabilities remain stable even when technology changes.
3. Every capability has a clear business owner.
4. Capabilities may span multiple applications.
5. Features and APIs implement capabilities—they do not define them.

---

## 3. Level 1 Capability Map

```text
Enterprise Banking
│
├── Identity Management
├── Customer Management
├── Product Management
├── Agreement Management
├── Account Management
├── Transaction Processing
├── Ledger Management
├── Channel Management
└── Branch Management
```

---

## 4. Capability Definitions

### Identity Management

Purpose:
Manage enterprise identities.

Capabilities:

- Register Party
- Update Party
- Assign Party Role
- Maintain Employee
- Search Party

---

### Customer Management

Purpose:
Manage banking relationships.

Capabilities:

- Create Customer
- Activate Customer
- Suspend Customer
- Close Customer
- Maintain Customer Profile

---

### Product Management

Purpose:
Manage financial products.

Capabilities:

- Create Product
- Configure Product
- Activate Product
- Retire Product
- Manage Fees
- Manage Interest Rules

---

### Agreement Management

Purpose:
Manage contractual relationships.

Capabilities:

- Create Agreement
- Sign Agreement
- Activate Agreement
- Amend Agreement
- Terminate Agreement

---

### Account Management

Purpose:
Manage operational servicing accounts.

Capabilities:

- Open Account
- Activate Account
- Freeze Account
- Unfreeze Account
- Close Account
- Maintain Account
- Manage Limits

---

### Transaction Processing

Purpose:
Process movement of value.

Capabilities:

- Initiate Transaction
- Validate Transaction
- Authorize Transaction
- Decline Transaction
- Reverse Transaction
- Settle Transaction
- Post Transaction
- Track Transaction Status

---

### Ledger Management

Purpose:
Maintain accounting truth.

Capabilities:

- Create Ledger Entry
- Post Ledger Entry
- Reconcile Ledger
- Correct Ledger Posting
- Audit Ledger

---

### Channel Management

Purpose:
Manage banking access channels.

Capabilities:

- Register Channel
- Activate Channel
- Deactivate Channel
- Record Channel Activity
- Monitor Channel Health

---

### Branch Management

Purpose:
Manage physical banking locations.

Capabilities:

- Create Branch
- Update Branch
- Open Branch
- Close Branch
- Assign Region

---

## 5. Capability Dependencies

```text
Identity
    ↓
Customer
    ↓
Agreement ───► Product
    ↓
Account
    ↓
Transaction
    ↓
Ledger

Channel ─────► Transaction
Branch ──────► Channel
```

---

## 6. Capability to Domain Mapping

| Capability              | Primary Domain |
| ----------------------- | -------------- |
| Register Party          | Identity       |
| Create Customer         | Customer       |
| Create Product          | Product        |
| Create Agreement        | Agreement      |
| Open Account            | Account        |
| Authorize Transaction   | Transaction    |
| Post Ledger Entry       | Ledger         |
| Record Channel Activity | Channel        |
| Manage Branch           | Branch         |

---

## 7. Future Capabilities

Future EPOS releases may introduce:

- Payments Management
- Card Management
- Loan Management
- Mortgage Management
- Risk Management
- Fraud Management
- Limits Management
- Pricing Management
- Notification Management
- Document Management
- Case Management
- Security & Identity Federation
- Reporting & Analytics

---

## 8. Open Questions

- Which capabilities require real-time processing?
- Which capabilities require event-driven integration?
- Which capabilities become independent services?
- Which capabilities remain inside the System API initially?

---

## 9. Decisions

1. Business capabilities describe what the enterprise must do.
2. Capabilities are independent of APIs and user interfaces.
3. Each capability maps to one primary bounded context.
4. Implementation will trace back to these capabilities.

---

## Appendix A – Capability Hierarchy

```text
Enterprise Banking
│
├── Identity
│   ├── Register Party
│   ├── Maintain Party
│   └── Assign Roles
│
├── Customer
│   ├── Create Customer
│   ├── Maintain Customer
│   └── Close Customer
│
├── Account
│   ├── Open Account
│   ├── Maintain Account
│   └── Close Account
│
├── Transaction
│   ├── Authorize
│   ├── Reverse
│   ├── Settle
│   └── Track
│
└── Ledger
    ├── Post
    ├── Reconcile
    └── Audit
```
