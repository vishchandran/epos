import { describe, expect, it } from "vitest";

import { PartyId } from "../../src/identity/value-objects/PartyId.js";
import { CustomerId } from "../../src/customer/value-objects/CustomerId.js";
import { Customer } from "../../src/customer/entities/Customer.js";

describe("Customer", () => {
  it("creates a customer", () => {
    const customer = new Customer(new CustomerId("CUST-1001"), {
      partyId: new PartyId("PARTY-1001"),
      status: "PENDING",
      segment: "RETAIL",
      customerSince: new Date("2026-01-01")
    });

    expect(customer.getId().toString()).toBe("CUST-1001");
    expect(customer.getPartyId().toString()).toBe("PARTY-1001");
    expect(customer.getStatus()).toBe("PENDING");
    expect(customer.getSegment()).toBe("RETAIL");
  });

  it("activates a customer", () => {
    const customer = new Customer(new CustomerId("CUST-1002"), {
      partyId: new PartyId("PARTY-1002"),
      status: "PENDING",
      segment: "RETAIL",
      customerSince: new Date()
    });

    customer.activate();

    expect(customer.getStatus()).toBe("ACTIVE");
  });

  it("suspends a customer", () => {
    const customer = new Customer(new CustomerId("CUST-1003"), {
      partyId: new PartyId("PARTY-1003"),
      status: "ACTIVE",
      segment: "RETAIL",
      customerSince: new Date()
    });

    customer.suspend();

    expect(customer.getStatus()).toBe("SUSPENDED");
  });

  it("closes a customer", () => {
    const customer = new Customer(new CustomerId("CUST-1004"), {
      partyId: new PartyId("PARTY-1004"),
      status: "ACTIVE",
      segment: "RETAIL",
      customerSince: new Date()
    });

    customer.close();

    expect(customer.getStatus()).toBe("CLOSED");
  });

  it("changes customer segment", () => {
    const customer = new Customer(new CustomerId("CUST-1005"), {
      partyId: new PartyId("PARTY-1005"),
      status: "ACTIVE",
      segment: "RETAIL",
      customerSince: new Date()
    });

    customer.changeSegment("COMMERCIAL");

    expect(customer.getSegment()).toBe("COMMERCIAL");
  });
});
