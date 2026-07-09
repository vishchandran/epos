# EPOS Domain Events

**Document ID:** EPOS-DOM-003  
**Version:** 1.0  
**Status:** Draft  
**Phase:** Phase 1 – Enterprise Domain Modeling  
**Related Documents:**

- `docs/domain/core-enterprise-domain-model.md`
- `docs/domain/bounded-contexts.md`
- `docs/architecture/adr/ADR-0006-party-as-root-identity-concept.md`

---

## 1. Purpose

This document defines the initial domain events for EPOS.

A domain event represents something meaningful that happened in the business domain. Domain events capture business change over time. They are not API endpoints, database tables, or implementation details. They express business facts in the language of the enterprise.

Examples:

- Party Registered
- Customer Created
- Agreement Signed
- Account Opened
- Transaction Authorized
- Ledger Entry Posted

---

## 2. What Is a Domain Event?

A domain event is a statement that something important has already happened.

Domain events should be written in past tense.

Good examples:

- Customer Created
- Account Opened
- Transaction Declined
- Ledger Entry Posted

Poor examples:

- Create Customer
- Open Account
- Process Transaction
- Update Ledger

The poor examples describe commands or actions. The good examples describe facts that have occurred.

## Business Failures vs Technical Failures

Not every failure is a domain event.

A failure is a domain event only when it represents a meaningful business outcome.

### Business Failures (Domain Events)

Examples:

- Transaction Declined
- Transaction Rejected
- Account Frozen
- Customer Suspended
- Agreement Expired
- Payment Returned

These events describe valid business outcomes and are part of the domain model.

### Technical Failures (Operational Events)

Examples:

- Database Connection Failed
- Network Timeout
- Kafka Publish Failed
- Redis Unavailable
- API Gateway Timeout

These events describe infrastructure or operational issues and belong to observability, monitoring, logging, and incident management rather than the business domain.

---

## 3. Domain Event Principles

EPOS follows these event design principles:

1. Domain events describe business facts.
2. Domain events are named in past tense.
3. Domain events belong to a bounded context.
4. Domain events use ubiquitous language.
5. Domain events do not expose internal technical implementation details.
6. Domain events are immutable once recorded.
7. Domain events include enough context for auditability.
8. Domain events may later become integration events, audit records, notifications, or workflow triggers.
9. Domain events do not directly mutate another aggregate.
10. Cross-context reactions to events are handled by application services, domain services, process managers, or integration handlers.
11. Domain events may represent successful or unsuccessful business outcomes, provided the outcome is meaningful to the business.
12. Technical or infrastructure failures are not domain events and should be modeled as operational events.

---

## 4. Event Naming Convention

Domain events use this naming format:

```text
<Noun> <Past-Tense Verb>
```

Examples:

```text
Party Registered
Customer Activated
Agreement Signed
Account Opened
Transaction Authorized
Ledger Entry Posted
```

Avoid technical names such as:

```text
CustomerRowInserted
AccountTableUpdated
LedgerApiCalled
```

Events must reflect business language, not storage or API details.

---

## 5. Event Categories

EPOS domain events are grouped by bounded context.

| Bounded Context     | Event Category                         |
| ------------------- | -------------------------------------- |
| Identity Context    | Party and identity events              |
| Customer Context    | Customer relationship events           |
| Product Context     | Product lifecycle events               |
| Agreement Context   | Agreement lifecycle events             |
| Account Context     | Account lifecycle and servicing events |
| Transaction Context | Transaction lifecycle events           |
| Ledger Context      | Accounting and posting events          |
| Channel Context     | Activity origin events                 |
| Branch Context      | Physical location events               |

---

## 6. Identity Context Events

The Identity Context owns events related to Party identity and enterprise-recognized actors.

| Event                | Meaning                                                      |
| -------------------- | ------------------------------------------------------------ |
| Party Registered     | A new Party was registered in the enterprise identity model. |
| Party Updated        | Identity information for a Party was updated.                |
| Party Deactivated    | A Party was deactivated for enterprise use.                  |
| Party Reactivated    | A previously deactivated Party was reactivated.              |
| Party Role Assigned  | A business role was assigned to a Party.                     |
| Party Role Removed   | A business role was removed from a Party.                    |
| Employee Registered  | A Party was registered as an Employee.                       |
| Employee Activated   | An Employee was activated.                                   |
| Employee Deactivated | An Employee was deactivated.                                 |

Example flow:

```text
Party Registered
        ↓
Party Role Assigned
        ↓
Employee Registered
        ↓
Employee Activated
```

---

## 7. Customer Context Events

The Customer Context owns events related to the banking relationship between a Party and the institution.

| Event                         | Meaning                                            |
| ----------------------------- | -------------------------------------------------- |
| Customer Created              | A Party became a Customer.                         |
| Customer Activated            | A Customer relationship became active.             |
| Customer Suspended            | A Customer relationship was suspended.             |
| Customer Reactivated          | A suspended Customer relationship was reactivated. |
| Customer Closed               | A Customer relationship was closed.                |
| Customer Segment Assigned     | A Customer was assigned to a segment.              |
| Customer Relationship Updated | Customer relationship attributes were updated.     |

Example flow:

```text
Party Registered
        ↓
Customer Created
        ↓
Customer Activated
```

---

## 8. Product Context Events

The Product Context owns events related to financial product definitions and product rules.

| Event                            | Meaning                                                              |
| -------------------------------- | -------------------------------------------------------------------- |
| Product Created                  | A new financial product was defined.                                 |
| Product Activated                | A Product became available for use.                                  |
| Product Updated                  | Product configuration or business rules were updated.                |
| Product Retired                  | A Product was retired and is no longer available for new agreements. |
| Product Eligibility Rule Added   | A new eligibility rule was added to a Product.                       |
| Product Eligibility Rule Updated | An eligibility rule was updated.                                     |
| Product Fee Rule Updated         | Product fee rules were updated.                                      |
| Product Interest Rule Updated    | Product interest rules were updated.                                 |

Example flow:

```text
Product Created
        ↓
Product Eligibility Rule Added
        ↓
Product Activated
```

---

## 9. Agreement Context Events

The Agreement Context owns events related to contractual relationships between Customers and Products.

| Event                | Meaning                                              |
| -------------------- | ---------------------------------------------------- |
| Agreement Created    | An Agreement was created for a Customer and Product. |
| Agreement Signed     | An Agreement was signed or accepted.                 |
| Agreement Activated  | An Agreement became active.                          |
| Agreement Updated    | Agreement terms or metadata were updated.            |
| Agreement Suspended  | An Agreement was suspended.                          |
| Agreement Expired    | An Agreement reached its expiry date.                |
| Agreement Terminated | An Agreement was terminated before or at closure.    |

Example flow:

```text
Customer Activated
        ↓
Product Activated
        ↓
Agreement Created
        ↓
Agreement Signed
        ↓
Agreement Activated
```

---

## 10. Account Context Events

The Account Context owns events related to operational account servicing.

| Event                           | Meaning                                                   |
| ------------------------------- | --------------------------------------------------------- |
| Account Opening Requested       | A request was made to open an Account under an Agreement. |
| Account Opened                  | An Account was created under an Agreement.                |
| Account Activated               | An Account became active for servicing.                   |
| Account Frozen                  | An Account was frozen or restricted.                      |
| Account Unfrozen                | A frozen Account was restored to normal servicing.        |
| Account Closed                  | An Account was closed.                                    |
| Account Limit Changed           | An operational limit was changed for an Account.          |
| Account Status Changed          | The Account status changed.                               |
| Account Servicing State Updated | Operational servicing state was updated.                  |

Example flow:

```text
Agreement Activated
        ↓
Account Opening Requested
        ↓
Account Opened
        ↓
Account Activated
```

---

## 11. Transaction Context Events

The Transaction Context owns events related to movement lifecycle.

| Event                          | Meaning                                                |
| ------------------------------ | ------------------------------------------------------ |
| Transaction Initiated          | A Transaction request was initiated.                   |
| Transaction Validated          | A Transaction request passed validation.               |
| Transaction Rejected           | A Transaction request failed validation.               |
| Transaction Authorized         | A Transaction was authorized.                          |
| Transaction Declined           | A Transaction was declined.                            |
| Transaction Reversed           | A Transaction was reversed.                            |
| Transaction Failed             | A Transaction failed during processing.                |
| Transaction Completed          | A Transaction completed its lifecycle.                 |
| Transaction Posted             | A Transaction was marked as posted to accounting flow. |
| Transaction Settlement Pending | A Transaction is pending settlement.                   |
| Transaction Settled            | A Transaction was settled.                             |

Successful flow:

```text
Transaction Initiated
        ↓
Transaction Validated
        ↓
Transaction Authorized
        ↓
Transaction Posted
        ↓
Transaction Completed
```

Declined flow:

```text
Transaction Initiated
        ↓
Transaction Validated
        ↓
Transaction Declined
```

---

## 12. Ledger Context Events

The Ledger Context owns events related to accounting truth and financial postings.

| Event                     | Meaning                                  |
| ------------------------- | ---------------------------------------- |
| Ledger Entry Created      | A Ledger Entry was created.              |
| Ledger Entry Posted       | A Ledger Entry was posted to the Ledger. |
| Ledger Posting Failed     | A Ledger posting failed.                 |
| Ledger Reconciled         | Ledger records were reconciled.          |
| Ledger Imbalance Detected | A Ledger imbalance was detected.         |
| Ledger Correction Posted  | A corrective Ledger posting was made.    |

Example flow:

```text
Transaction Authorized
        ↓
Ledger Entry Created
        ↓
Ledger Entry Posted
        ↓
Transaction Completed
```

---

## 13. Channel Context Events

The Channel Context owns events related to how activity enters the bank.

| Event                     | Meaning                                  |
| ------------------------- | ---------------------------------------- |
| Channel Registered        | A Channel was registered for use.        |
| Channel Activated         | A Channel became active.                 |
| Channel Deactivated       | A Channel was deactivated.               |
| Channel Session Started   | A Channel session started.               |
| Channel Session Ended     | A Channel session ended.                 |
| Channel Activity Recorded | Activity was recorded against a Channel. |

Example flow:

```text
Channel Session Started
        ↓
Transaction Initiated
        ↓
Channel Activity Recorded
        ↓
Channel Session Ended
```

---

## 14. Branch Context Events

The Branch Context owns events related to physical banking locations.

| Event                     | Meaning                            |
| ------------------------- | ---------------------------------- |
| Branch Created            | A Branch record was created.       |
| Branch Opened             | A Branch became operational.       |
| Branch Updated            | Branch information was updated.    |
| Branch Temporarily Closed | A Branch was temporarily closed.   |
| Branch Permanently Closed | A Branch was permanently closed.   |
| Branch Region Assigned    | A Branch was assigned to a region. |

Example flow:

```text
Branch Created
        ↓
Branch Region Assigned
        ↓
Branch Opened
```

---

## 15. Cross-Context Event Flow Examples

### 15.1 Customer Opens an Account

```text
Party Registered
        ↓
Customer Created
        ↓
Customer Activated
        ↓
Agreement Created
        ↓
Agreement Signed
        ↓
Agreement Activated
        ↓
Account Opening Requested
        ↓
Account Opened
        ↓
Account Activated
```

### 15.2 Customer Performs a Successful Transaction

```text
Channel Session Started
        ↓
Transaction Initiated
        ↓
Transaction Validated
        ↓
Transaction Authorized
        ↓
Ledger Entry Created
        ↓
Ledger Entry Posted
        ↓
Transaction Completed
        ↓
Channel Activity Recorded
```

### 15.3 Transaction Declined

```text
Transaction Initiated
        ↓
Transaction Validated
        ↓
Transaction Declined
```

### 15.4 Account Closure

```text
Account Frozen
        ↓
Account Closed
        ↓
Agreement Terminated
```

---

## 16. Event Payload Principles

This document does not define final technical payload schemas.

Future event payloads should follow these principles:

1. Include a stable event identifier.
2. Include event name.
3. Include event timestamp.
4. Include aggregate identifier.
5. Include bounded context.
6. Include correlation identifier.
7. Include causation identifier where applicable.
8. Include actor or channel context when relevant.
9. Avoid exposing sensitive information unnecessarily.
10. Avoid embedding full aggregate object graphs.

Example conceptual payload:

```json
{
  "eventId": "evt_123",
  "eventName": "Account Opened",
  "boundedContext": "Account",
  "aggregateId": "account_123",
  "occurredAt": "2026-07-07T13:00:00Z",
  "correlationId": "corr_123",
  "causationId": "cmd_123"
}
```

---

## 17. Domain Events vs Integration Events

Domain events are internal business facts within the domain model.

Integration events are external-facing events published to other systems or services.

Example:

```text
Domain Event:
Account Opened

Possible Integration Event:
AccountOpenedV1
```

EPOS will not assume all domain events must become integration events.

---

## 18. Domain Events vs Audit Records

Domain events and audit records are related but not identical.

A domain event captures something meaningful in the business domain.

An audit record captures evidence of system activity for governance, compliance, and traceability.

Example:

```text
Domain Event:
Customer Activated

Audit Record:
User admin-123 activated customer C-100 from IP address X at timestamp Y
```

EPOS may use domain events as inputs to audit logging, but audit logging may include additional operational metadata.

---

## 19. Future Event Evolution

Future EPOS releases may introduce additional event categories:

- Payment Events
- Card Events
- Loan Events
- Mortgage Events
- Risk Events
- Fraud Events
- Limit Events
- Notification Events
- Document Events
- Case Management Events
- Security Events
- Entitlement Events
- Integration Events
- Operational Events

Each future event category should follow the same naming, ownership, and boundary principles defined in this document.

---

## 20. Open Questions

1. Which domain events should become integration events in future releases?
2. Should EPOS introduce an event envelope standard before implementation?
3. Should domain events be persisted immediately or introduced after the first domain implementation?
4. Should Ledger events be modeled before or after Transaction implementation?
5. Should account balance updates be represented as domain events, read models, or ledger-derived projections?
6. Should event versioning begin at Phase 1 or later when external publishing exists?

---

## 21. Decisions

### Decision 1: Domain events are business facts

EPOS will model domain events as meaningful business facts using past-tense names.

### Decision 2: Domain events belong to bounded contexts

Each event must have a clear owning bounded context.

### Decision 3: Domain events are not API operations

EPOS will distinguish commands, API requests, domain events, integration events, and audit records.

### Decision 4: Ledger events represent accounting truth

Transaction events represent movement lifecycle.

Ledger events represent financial accounting impact.

These event types must remain separate.

---

## Appendix A – Initial Event Catalogue

| Context     | Events                                                                                                                                                      |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Identity    | Party Registered, Party Updated, Party Deactivated, Party Reactivated, Party Role Assigned, Party Role Removed                                              |
| Customer    | Customer Created, Customer Activated, Customer Suspended, Customer Reactivated, Customer Closed                                                             |
| Product     | Product Created, Product Activated, Product Updated, Product Retired                                                                                        |
| Agreement   | Agreement Created, Agreement Signed, Agreement Activated, Agreement Suspended, Agreement Expired, Agreement Terminated                                      |
| Account     | Account Opening Requested, Account Opened, Account Activated, Account Frozen, Account Unfrozen, Account Closed                                              |
| Transaction | Transaction Initiated, Transaction Validated, Transaction Authorized, Transaction Declined, Transaction Reversed, Transaction Failed, Transaction Completed |
| Ledger      | Ledger Entry Created, Ledger Entry Posted, Ledger Posting Failed, Ledger Reconciled                                                                         |
| Channel     | Channel Registered, Channel Activated, Channel Session Started, Channel Activity Recorded                                                                   |
| Branch      | Branch Created, Branch Opened, Branch Updated, Branch Temporarily Closed, Branch Permanently Closed                                                         |

---

## Appendix B – Glossary

| Term              | Definition                                                 |
| ----------------- | ---------------------------------------------------------- |
| Domain Event      | A business fact that has occurred within a bounded context |
| Command           | A request to perform an action                             |
| Integration Event | Event published for external consumers                     |
| Audit Record      | Governance record of system or user activity               |
| Aggregate         | Consistency boundary for related business objects          |
| Aggregate Root    | Main entity that controls access to an aggregate           |
| Correlation ID    | Identifier linking related operations across a workflow    |
| Causation ID      | Identifier showing what caused an event                    |
| Event Envelope    | Standard structure around event payload metadata           |
