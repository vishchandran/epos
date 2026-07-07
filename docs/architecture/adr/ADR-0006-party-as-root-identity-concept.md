# ADR-0006: Party as the Root Enterprise Identity Concept

## Status

Accepted

## Date

2026-07-07

## Context

Enterprise banking platforms manage many types of actors, including customers, employees, organizations, vendors, beneficiaries, authorized representatives, and other enterprise-recognized entities.

Using **Customer** as the primary identity concept tightly couples enterprise identity with a banking relationship. This approach results in duplicated identity information across business domains and reduces the flexibility to support additional roles.

EPOS requires a shared enterprise identity model that separates identity from business relationships while maintaining a single source of truth for identity information.

## Decision

EPOS will use **Party** as the root enterprise identity concept.

A **Party** represents any person or organization known to the enterprise.

Business roles such as **Customer** and **Employee** will reference **Party** rather than owning identity information themselves.

The initial enterprise identity model is:

```text
Party
├── Customer
└── Employee
```

## Rationale

This decision provides a clear separation between identity and business relationships.

A Party may exist before becoming a Customer, allowing the enterprise to maintain identity information independently of banking products or services.

The model also supports multiple business roles for the same Party. For example, an individual may simultaneously be both a Customer and an Employee without duplicating identity records.

Using Party as the root identity concept also establishes a single source of truth for identity information across the platform, reducing duplication and improving consistency between domains.

## Consequences

### Positive

- Establishes a single source of truth for enterprise identity.
- Separates identity from banking relationships.
- Eliminates duplication of identity information across domains.
- Supports multiple business roles for the same Party.
- Aligns with enterprise architecture principles and banking industry practices.
- Improves extensibility for future domains and services.

### Trade-offs

- Introduces an additional abstraction into the domain model.
- Requires developers to understand the distinction between Party and Customer.
- May require additional joins when retrieving customer information from persistent storage.

These trade-offs are considered acceptable because they improve long-term maintainability and extensibility.

## Alternatives Considered

### Alternative 1: Customer as the Root Identity

**Decision:** Rejected

**Reason:**

Customer represents a banking relationship rather than enterprise identity.

Using Customer as the identity root would tightly couple identity with business operations and make it more difficult to support other enterprise actors such as employees or organizations.

### Alternative 2: Independent Identity Models per Domain

**Decision:** Rejected

**Reason:**

Allowing each business domain to maintain its own identity model would duplicate information, increase synchronization complexity, and create inconsistent representations of the same person or organization.

## Implications

Future business domains should reference Party whenever enterprise identity is required.

Customer, Employee, and future roles such as Authorized Representative, Beneficial Owner, Guarantor, or Vendor Contact should extend or reference Party rather than creating independent identity roots.

This decision establishes the foundation for enterprise identity across EPOS.

## References

- `docs/domain/enterprise-domain-model.md`
- EPOS Architecture Principles
- EPOS Engineering Standards