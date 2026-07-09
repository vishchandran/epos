# EPOS Object-Oriented Design Guide

## Purpose

This document defines the object-oriented design rules used to implement the EPOS Enterprise Domain.

The Enterprise Domain Design Specification defines **what** the business model is.

This document defines **how** that business model is represented in code.

---

# Design Principles

- One class should represent one clear business concept.
- Business objects should protect their own invariants.
- State should be private by default.
- State changes should happen through business methods.
- Public setters should be avoided.
- Entities are equal by identity.
- Value objects are equal by value.
- Domain code must remain independent of infrastructure.

---

# Entity Design

An Entity is a business object with identity, state, and behavior.

Entities shall:

- Have an immutable identity.
- Own business state.
- Expose behavior through business methods.
- Protect invalid state.
- Compare equality by identity.

Example entities:

- Party
- Customer
- Product
- Agreement
- Account
- Ledger

---

# Value Object Design

A Value Object represents a descriptive value with no independent identity.

Value objects shall:

- Be immutable.
- Validate their own value.
- Compare equality by value.
- Contain no infrastructure logic.

Example value objects:

- PartyId
- CustomerId
- ProductId
- AgreementId
- AccountId
- LedgerId

---

# Aggregate Design

An Aggregate is a consistency boundary.

Aggregate roots shall:

- Protect business invariants.
- Control state changes inside the aggregate.
- Reference other aggregates by identifier.
- Avoid loading large object graphs.
- Be coordinated by the Application Layer when workflows span multiple aggregates.

For Release 1, the aggregate roots are:

- Party
- Customer
- Product
- Agreement
- Account
- Ledger

---

# Encapsulation Rules

Domain object state shall be private or protected.

Avoid public mutable fields.

Preferred:

```ts
private readonly id: CustomerId;
private status: CustomerStatus;
```

Avoid:

```ts
public id: string;
public status: string;
```

---

# Constructor Rules

Constructors shall create valid objects only.

Constructors shall:

- Require mandatory fields.
- Validate required values.
- Reject invalid state.
- Avoid partially constructed objects.

---

# Behavior Rules

Domain behavior should be expressed as business methods.

Preferred:

```ts
customer.activate();
customer.suspend();
customer.close();
```

Avoid:

```ts
customer.setStatus("ACTIVE");
```

Business methods communicate intent better than generic setters.

---

# Equality Rules

Entities compare by identity.

Value objects compare by value.

Example:

```text
Two Customer objects with the same CustomerId represent the same Customer.

Two CustomerId objects with the same value represent the same CustomerId value.
```

---

# Immutability Rules

The following shall be immutable:

- Entity identifiers
- Value objects
- Historical financial records
- Ledger postings

Entity state may change only through business behavior.

---

# Refactoring Rules

Shared abstractions shall be introduced only after duplication becomes clear.

Release 1 starts with concrete business objects first.

Potential future abstractions include:

- Entity
- AggregateRoot
- UniqueEntityID
- BaseValueObject
- DomainError

These shall be introduced through refactoring, not premature abstraction.

---

# EPOS OOD Philosophy

> **Model the business first. Encapsulate behavior second. Extract abstractions third.**

Object-oriented design in EPOS exists to express the enterprise business model clearly, not to create unnecessary inheritance or framework-heavy abstractions.
