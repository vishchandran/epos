# EPOS Bounded Contexts

**Document ID:** EPOS-DOM-002  
**Version:** 1.0  
**Status:** Draft  
**Phase:** Phase 1 – Enterprise Domain Modeling  
**Related Documents:**

- `docs/domain/core-enterprise-domain-model.md`
- `docs/architecture/adr/ADR-0006-party-as-root-identity-concept.md`

---

## 1. Purpose

This document defines the initial bounded contexts for EPOS.

A bounded context defines a clear business boundary where a specific domain model, language, rules, and ownership responsibilities apply.

The purpose of this document is to separate enterprise banking capabilities into clear domain areas before implementation begins.

This ensures that future TypeScript modules, services, persistence models, APIs, and events are aligned to the business architecture rather than being organized only by technical convenience.

---

## 2. What Is a Bounded Context?

A bounded context is a business boundary around a model.

Inside a bounded context:

- Terms have specific meanings.
- Business rules are owned by that context.
- Data ownership is clear.
- Other contexts may reference the context, but should not directly modify its internal state.

For example, the word **Account** means something specific inside the Account Context. It represents an operational servicing record. It does not mean Customer, Product, Ledger, or Transaction.

---

## 3. Bounded Context Principles

EPOS follows these bounded context principles:

1. Each bounded context owns one clear business capability.
2. Each bounded context owns its own business rules.
3. Each bounded context owns its own data definitions.
4. Contexts reference each other by stable identifiers, not by shared object graphs.
5. No context directly mutates another context's internal state.
6. Cross-context coordination happens through application services, domain services, or domain events.
7. Language must remain consistent inside a context.
8. Shared concepts must be explicitly defined to avoid ambiguity.

---

## 4. Initial EPOS Bounded Contexts

The initial EPOS bounded contexts are:

| Bounded Context     | Primary Responsibility                                |
| ------------------- | ----------------------------------------------------- |
| Identity Context    | Enterprise identity and known parties                 |
| Customer Context    | Banking relationship with the institution             |
| Product Context     | Financial product definitions and rules               |
| Agreement Context   | Contractual relationship between customer and product |
| Account Context     | Operational account servicing                         |
| Transaction Context | Movement lifecycle and transaction state              |
| Ledger Context      | Accounting truth and financial postings               |
| Channel Context     | Origin of activity entering the bank                  |
| Branch Context      | Physical banking location context                     |

---

## 5. Context Relationship Overview

```text
Identity
   │
   ▼
Customer
   │
   ▼
Agreement ─────► Product
   │
   ▼
Account
   │
   ▼
Transaction ◄──── Channel
   │
   ▼
Ledger

Branch ─────► Channel / Employee servicing context
```

This diagram shows dependency direction at the business level.

It does not mean every context calls another context directly. Implementation may use APIs, services, persistence lookups, or events depending on the architecture selected in later phases.

---

# 6. Identity Context

## Purpose

The Identity Context owns enterprise identity.

It answers:

> Who or what is known to the enterprise?

## Owns

- Party
- Party identity attributes
- Party lifecycle
- Enterprise-recognized identity records

## May Include Later

- Contact information
- Legal name
- Organization identity
- Identity verification status
- Beneficial owner
- Authorized representative
- Vendor contact

## Does Not Own

- Customer relationship status
- Account balances
- Product eligibility
- Transaction history
- Ledger postings

## Key Language

| Term               | Meaning                                                 |
| ------------------ | ------------------------------------------------------- |
| Party              | A person or organization known to the enterprise        |
| Individual Party   | A human person                                          |
| Organization Party | A business, institution, trust, estate, or legal entity |

## References

None.

Identity is one of the root enterprise contexts.

## Example Business Rules

1. A Party may exist without being a Customer.
2. A Party may later become a Customer, Employee, or other enterprise role.
3. Identity information must not be duplicated in Customer or Employee records.
4. Party is the root identity concept for EPOS.

---

# 7. Customer Context

## Purpose

The Customer Context owns the banking relationship between a Party and the institution.

It answers:

> Does this Party have a banking relationship with the bank?

## Owns

- Customer
- Customer lifecycle
- Customer status
- Customer relationship type
- Customer onboarding state

## Does Not Own

- Legal identity
- Employee identity
- Product rules
- Account balances
- Ledger entries

## Key Language

| Term                  | Meaning                                                   |
| --------------------- | --------------------------------------------------------- |
| Customer              | A Party with an active or historical banking relationship |
| Customer Status       | The lifecycle state of the banking relationship           |
| Customer Relationship | The relationship between the bank and the Party           |

## References

| Referenced Context | Reason                    |
| ------------------ | ------------------------- |
| Identity Context   | Customer references Party |

## Example Business Rules

1. A Customer must reference exactly one Party.
2. A Party may exist without a Customer record.
3. A Customer does not own identity information.
4. Customer status belongs to the Customer Context, not the Identity Context.

---

# 8. Product Context

## Purpose

The Product Context owns financial product definitions and business rules.

It answers:

> What products does the bank offer?

## Owns

- Product
- Product type
- Product lifecycle
- Product rules
- Eligibility criteria
- Fee configuration
- Interest configuration

## Does Not Own

- Customer identity
- Customer agreements
- Account balances
- Transaction processing
- Ledger postings

## Key Language

| Term         | Meaning                                                              |
| ------------ | -------------------------------------------------------------------- |
| Product      | A bank-offered financial product                                     |
| Product Rule | A rule that governs how the product may be used                      |
| Product Type | A category such as chequing, savings, loan, mortgage, or credit card |

## References

None.

Product is a reusable business definition.

## Example Business Rules

1. A Product may exist before any Customer uses it.
2. A Product can be referenced by many Agreements.
3. Product rules are owned by the Product Context.
4. Product changes do not directly mutate existing Account records.

---

# 9. Agreement Context

## Purpose

The Agreement Context owns the contractual relationship between a Customer and the bank for a Product.

It answers:

> What has the Customer agreed to with the bank?

## Owns

- Agreement
- Agreement lifecycle
- Effective dates
- Terms and conditions
- Product association
- Customer association

## Does Not Own

- Party identity
- Product definition
- Account balance
- Ledger postings

## Key Language

| Term           | Meaning                                                  |
| -------------- | -------------------------------------------------------- |
| Agreement      | Contractual relationship between a Customer and the bank |
| Effective Date | Date the agreement becomes active                        |
| Term           | A contractual condition that governs the relationship    |

## References

| Referenced Context | Reason                                  |
| ------------------ | --------------------------------------- |
| Customer Context   | Agreement is entered into by a Customer |
| Product Context    | Agreement is for a Product              |

## Example Business Rules

1. An Agreement cannot exist without a Customer.
2. An Agreement cannot exist without a Product.
3. One Customer may have multiple Agreements.
4. Many Agreements may reference the same Product.
5. Agreement terms govern the creation and operation of Accounts.

---

# 10. Account Context

## Purpose

The Account Context owns operational banking account servicing.

It answers:

> What operational account exists under an Agreement?

## Owns

- Account
- Account status
- Account lifecycle
- Servicing state
- Balance-facing state
- Limits
- Account closure state

## Does Not Own

- Customer identity
- Product definition
- Contractual terms
- Accounting truth
- Transaction authorization lifecycle

## Key Language

| Term            | Meaning                                                |
| --------------- | ------------------------------------------------------ |
| Account         | Operational servicing record governed by an Agreement  |
| Account Status  | State such as active, suspended, closed, or restricted |
| Servicing State | Operational state used to manage the account           |

## References

| Referenced Context | Reason                              |
| ------------------ | ----------------------------------- |
| Agreement Context  | Account is governed by an Agreement |

## Example Business Rules

1. An Account cannot exist without an Agreement.
2. An Agreement governs one or more Accounts depending on product design.
3. Account status is owned by the Account Context.
4. Account does not own accounting truth; that belongs to the Ledger Context.
5. Account balance may be represented as operational state or a read model, but Ledger remains the source of financial truth.

---

# 11. Transaction Context

## Purpose

The Transaction Context owns the lifecycle of business events that move or attempt to move value.

It answers:

> What movement or attempted movement occurred?

## Owns

- Transaction
- Transaction lifecycle
- Authorization state
- Processing state
- Settlement state
- Transaction result
- Failure reason
- Request and outcome history

## Does Not Own

- Account lifecycle
- Ledger accounting rules
- Product definitions
- Customer identity

## Key Language

| Term          | Meaning                                                              |
| ------------- | -------------------------------------------------------------------- |
| Transaction   | Business event that changes, attempts to change, or records movement |
| Authorization | Decision to approve or decline a transaction request                 |
| Settlement    | Completion of financial movement obligations                         |
| Posting       | Recording financial impact in the Ledger                             |

## References

| Referenced Context | Reason                                |
| ------------------ | ------------------------------------- |
| Account Context    | Transaction is against an Account     |
| Channel Context    | Transaction originates from a Channel |

## Example Business Rules

1. A Transaction must reference one Account.
2. A Transaction must originate from one Channel.
3. A Transaction may be approved, declined, reversed, failed, or posted.
4. A financial Transaction must eventually result in a Ledger posting or a recorded failure reason.
5. Transaction lifecycle is separate from Ledger accounting truth.

---

# 12. Ledger Context

## Purpose

The Ledger Context owns the accounting truth of the platform.

It answers:

> What is the official financial record?

## Owns

- Ledger
- Ledger entries
- Posting rules
- Accounting integrity
- Double-entry records
- Auditability

## Does Not Own

- Customer identity
- Product definition
- Account servicing workflows
- Channel metadata
- Transaction request handling

## Key Language

| Term         | Meaning                                                      |
| ------------ | ------------------------------------------------------------ |
| Ledger       | Accounting source of truth                                   |
| Ledger Entry | Individual accounting posting                                |
| Posting      | Recording financial movement in the ledger                   |
| Double Entry | Accounting model requiring balanced debit and credit entries |

## References

| Referenced Context  | Reason                                               |
| ------------------- | ---------------------------------------------------- |
| Transaction Context | Ledger postings are caused by financial Transactions |

## Example Business Rules

1. Ledger is the source of financial truth.
2. Ledger entries must be auditable.
3. Financial postings must preserve accounting integrity.
4. Other contexts must not directly mutate Ledger records.
5. Ledger does not replace Transaction history; it records accounting impact.

---

# 13. Channel Context

## Purpose

The Channel Context owns the origin through which banking activity enters the enterprise.

It answers:

> Where did this activity come from?

## Owns

- Channel
- Channel type
- Channel metadata
- Origin context
- Source system context

## Does Not Own

- Customer identity
- Account lifecycle
- Transaction processing rules
- Ledger postings

## Key Language

| Term           | Meaning                                              |
| -------------- | ---------------------------------------------------- |
| Channel        | Access path used to initiate or service activity     |
| Channel Type   | Branch, ATM, Mobile, Web, Call Centre, Batch, or API |
| Origin Context | Information about where activity came from           |

## References

None.

Channel may be referenced by Transaction and servicing workflows.

## Example Business Rules

1. Every Transaction originates from one Channel.
2. Channel describes origin, not business ownership.
3. Channel does not determine accounting truth.
4. Channel metadata may be used for audit, fraud, risk, and reporting.

---

# 14. Branch Context

## Purpose

The Branch Context owns physical banking location context.

It answers:

> Which physical banking location is involved?

## Owns

- Branch
- Branch identifier
- Branch location
- Branch region
- Operating context

## Does Not Own

- Employee identity
- Customer identity
- Product definitions
- Ledger postings

## Key Language

| Term           | Meaning                                           |
| -------------- | ------------------------------------------------- |
| Branch         | Physical banking location                         |
| Region         | Geographic or organizational grouping of branches |
| Branch Context | Physical servicing context for activity           |

## References

None.

Branch may be referenced by Employee or Channel activity.

## Example Business Rules

1. A Branch represents a physical banking location.
2. A Branch may provide context for Channel activity.
3. Employees may be associated with a home Branch.
4. Branch does not own Customer or Account records.

---

# 15. Context Dependency Matrix

| Context     | Depends On        | Referenced By                         |
| ----------- | ----------------- | ------------------------------------- |
| Identity    | None              | Customer, Employee-related workflows  |
| Customer    | Identity          | Agreement                             |
| Product     | None              | Agreement                             |
| Agreement   | Customer, Product | Account                               |
| Account     | Agreement         | Transaction                           |
| Transaction | Account, Channel  | Ledger                                |
| Ledger      | Transaction       | Reporting, Audit, Finance             |
| Channel     | None              | Transaction                           |
| Branch      | None              | Channel, Employee servicing workflows |

---

# 16. Context Interaction Rules

1. Identity information is retrieved from the Identity Context.
2. Customer relationship status is retrieved from the Customer Context.
3. Product configuration is retrieved from the Product Context.
4. Agreement rules govern Account creation.
5. Account state is checked before Transaction processing.
6. Transaction outcomes may trigger Ledger postings.
7. Ledger records are not directly modified by Account or Transaction code.
8. Channel context is attached to activity but does not own the activity.
9. Branch context is used for physical servicing and reporting.

---

# 17. Shared Kernel Candidates

A shared kernel is a small set of concepts shared across multiple contexts.

EPOS should keep the shared kernel minimal.

Potential shared concepts:

- Identifier types
- Date/time value objects
- Money value object
- Currency code
- Audit metadata
- Status conventions
- Error codes

These should be introduced carefully to avoid excessive coupling.

---

# 18. Anti-Corruption Layer Candidates

As EPOS evolves, some contexts may need anti-corruption layers to protect the internal domain model from external systems.

Potential future examples:

| External System Type | Protected Context |
| -------------------- | ----------------- |
| Core banking system  | Account, Ledger   |
| Payment network      | Transaction       |
| Identity provider    | Identity          |
| CRM                  | Customer          |
| Product catalogue    | Product           |
| Branch directory     | Branch            |

Anti-corruption layers translate external models into EPOS domain language.

---

# 19. Implementation Mapping

The bounded contexts will eventually map to the application structure under:

```text
apps/system-api/src/domain/
```

Potential future structure:

```text
apps/system-api/src/domain/
├── identity/
├── customer/
├── product/
├── agreement/
├── account/
├── transaction/
├── ledger/
├── channel/
└── branch/
```

This structure should not be created until the corresponding implementation slice is approved.

The domain model remains the source of truth.

---

# 20. Future Bounded Contexts

Future EPOS releases may introduce additional bounded contexts:

- Payments Context
- Card Context
- Loan Context
- Mortgage Context
- Risk Context
- Fraud Context
- Limits Context
- Pricing Context
- Notification Context
- Document Context
- Case Management Context
- Reporting Context
- Audit Context
- Security Context
- Entitlements Context
- Integration Context

Each future context must define:

- Purpose
- Owned entities
- Referenced contexts
- Business rules
- Integration boundaries
- Domain events
- Ownership rules

---

# 21. Open Questions

1. Should Employee remain inside Identity Context or become part of a Workforce Context later?
2. Should Branch remain independent or be grouped under Channel and Servicing?
3. Should Ledger be introduced immediately in implementation or after Transaction modeling?
4. Should Product versioning be modeled before Agreement implementation?
5. Should Account balance be stored, derived from Ledger, or modeled as a read model?
6. Should joint accounts require a Relationship or Account Party Role context?
7. Should Customer and Party remain separate aggregates or separate bounded contexts in implementation?

---

# 22. Decisions

## Decision 1: Identity is separated from Customer

Party belongs to the Identity Context.

Customer belongs to the Customer Context.

This preserves the distinction between enterprise identity and banking relationship.

## Decision 2: Agreement separates Customer from Product

Customer does not directly own Product.

Agreement represents the contractual relationship between Customer and Product.

## Decision 3: Ledger owns accounting truth

Transaction records movement lifecycle.

Ledger records financial truth.

These concepts remain separate.

## Decision 4: Channel describes origin only

Channel provides origin context for activity.

Channel does not own Customer, Account, Transaction, or Ledger state.

---

# Appendix A – Context Summary

```text
Identity
  Owns Party

Customer
  Owns banking relationship
  References Party

Product
  Owns product definitions

Agreement
  Owns contract
  References Customer and Product

Account
  Owns operational servicing
  References Agreement

Transaction
  Owns movement lifecycle
  References Account and Channel

Ledger
  Owns accounting truth
  References Transaction

Channel
  Owns origin context

Branch
  Owns physical location context
```

---

# Appendix B – Glossary

| Term            | Definition                                                    |
| --------------- | ------------------------------------------------------------- |
| Bounded Context | Business boundary where a domain model has a specific meaning |
| Context         | A domain area with clear ownership and language               |
| Aggregate       | Consistency boundary around related business entities         |
| Aggregate Root  | Main entity used to access an aggregate                       |
| Party           | Enterprise identity                                           |
| Customer        | Banking relationship role                                     |
| Agreement       | Contractual relationship                                      |
| Account         | Operational servicing record                                  |
| Transaction     | Movement or attempted movement                                |
| Ledger          | Accounting source of truth                                    |
| Channel         | Origin of activity                                            |
| Branch          | Physical banking location                                     |
