## Relationships

EPOS separates identity relationships from banking relationship flow.

### 1. Enterprise Identity Model

This model answers: who is known to the enterprise?

```text
Party
├── Customer
└── Employee
```

A Party may become a Customer, an Employee, or both. Party is the root identity concept, while Customer and Employee are roles that reference Party.

### 2. Banking Relationship Model

This model answers: how does banking business happen?

```text
Customer
    ↓ enters into
Agreement
    ↓ references
Product
    ↓ creates / governs
Account
    ↓ records
Transaction
    ↓ posts to
Ledger
```

A Customer enters into an Agreement with the bank. The Agreement references a Product and governs one or more Accounts. Accounts record Transactions, and financial Transactions post to the Ledger.

### 3. Channel and Location Context

```text
Channel
    ↓ originates
Transaction

Branch
    ↓ may serve as
Channel context

Employee
    ↓ may service
Customer / Account activity
```

Channels capture how activity enters the bank, such as branch, ATM, mobile, web, call centre, batch, or API.

Branches provide physical location context.

Employees represent internal actors who may service customer or account activity.

## Relationship Rules

| Source | Relationship | Target | Cardinality |
|---|---|---|---|
| Party | may become | Customer | 1 → 0..1 |
| Party | may become | Employee | 1 → 0..1 |
| Customer | enters into | Agreement | 1 → 0..* |
| Agreement | references | Product | * → 1 |
| Agreement | governs | Account | 1 → 1..* |
| Account | records | Transaction | 1 → 0..* |
| Transaction | posts to | Ledger | * → 1 |
| Transaction | originates from | Channel | * → 1 |
| Employee | may service | Customer activity | 1 → 0..* |
| Branch | may provide context for | Channel activity | 1 → 0..* |