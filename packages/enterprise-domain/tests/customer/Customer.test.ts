import { describe, expect, it } from "vitest";

import { PartyId } from "../../src/party/value-objects/PartyId.js";
import { CustomerId } from "../../src/customer/value-objects/CustomerId.js";
import { Customer } from "../../src/customer/entities/Customer.js";
import { InvalidCustomerStatusTransitionError } from "../../src/customer/errors/InvalidCustomerStatusTransitionError.js";
import { CustomerSegmentChangeNotAllowedError } from "../../src/customer/errors/CustomerSegmentChangeNotAllowedError.js";
import { InvalidCustomerSinceDateError } from "../../src/customer/errors/InvalidCustomerSinceDateError.js";

describe("Customer", () => {
  it("rejects an invalid customer-since date", () => {
    expect(() =>
      Customer.create(
        new CustomerId("CUST-1001"),
        new PartyId("PARTY-1001"),
        "RETAIL",
        new Date("invalid")
      )
    ).toThrow(InvalidCustomerSinceDateError);
  });

  it("creates a new customer as pending", () => {
    const customerSince = new Date("2026-07-30T10:00:00.000Z");

    const customer = Customer.create(
      new CustomerId("CUST-1001"),
      new PartyId("PARTY-1001"),
      "RETAIL",
      customerSince
    );

    expect(customer.getId().toString()).toBe("CUST-1001");
    expect(customer.getPartyId().toString()).toBe("PARTY-1001");
    expect(customer.getStatus()).toBe("PENDING");
    expect(customer.getSegment()).toBe("RETAIL");
    expect(customer.getCustomerSince()).toEqual(customerSince);
  });
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

  it("reactivates a suspended customer", () => {
    const customer = Customer.create(
      new CustomerId("CUST-2001"),
      new PartyId("PARTY-2001"),
      "RETAIL",
      new Date("2026-07-31")
    );

    customer.activate();
    customer.suspend();
    customer.activate();

    expect(customer.getStatus()).toBe("ACTIVE");
  });

  it("rejects activation when the customer is already active", () => {
    const customer = Customer.create(
      new CustomerId("CUST-2002"),
      new PartyId("PARTY-2002"),
      "RETAIL",
      new Date("2026-07-31")
    );

    customer.activate();

    expect(() => customer.activate()).toThrow(
      InvalidCustomerStatusTransitionError
    );
  });

  it("rejects suspension of a pending customer", () => {
    const customer = Customer.create(
      new CustomerId("CUST-2003"),
      new PartyId("PARTY-2003"),
      "RETAIL",
      new Date("2026-07-31")
    );

    expect(() => customer.suspend()).toThrow(
      InvalidCustomerStatusTransitionError
    );
  });

  it("closes a suspended customer", () => {
    const customer = Customer.create(
      new CustomerId("CUST-2004"),
      new PartyId("PARTY-2004"),
      "RETAIL",
      new Date("2026-07-31")
    );

    customer.activate();
    customer.suspend();
    customer.close();

    expect(customer.getStatus()).toBe("CLOSED");
  });

  it("rejects closing a pending customer", () => {
    const customer = Customer.create(
      new CustomerId("CUST-2005"),
      new PartyId("PARTY-2005"),
      "RETAIL",
      new Date("2026-07-31")
    );

    expect(() => customer.close()).toThrow(
      InvalidCustomerStatusTransitionError
    );
  });

  it("rejects every transition after the customer is closed", () => {
    const customer = Customer.create(
      new CustomerId("CUST-2006"),
      new PartyId("PARTY-2006"),
      "RETAIL",
      new Date("2026-07-31")
    );

    customer.activate();
    customer.close();

    expect(() => customer.activate()).toThrow(
      InvalidCustomerStatusTransitionError
    );

    expect(() => customer.suspend()).toThrow(
      InvalidCustomerStatusTransitionError
    );

    expect(() => customer.close()).toThrow(
      InvalidCustomerStatusTransitionError
    );
  });
  it("changes the segment of a pending customer", () => {
    const customer = Customer.create(
      new CustomerId("CUST-3001"),
      new PartyId("PARTY-3001"),
      "RETAIL",
      new Date("2026-08-01")
    );

    customer.changeSegment("SMALL_BUSINESS");

    expect(customer.getSegment()).toBe("SMALL_BUSINESS");
  });

  it("rejects a segment change for a suspended customer", () => {
    const customer = Customer.create(
      new CustomerId("CUST-3002"),
      new PartyId("PARTY-3002"),
      "SMALL_BUSINESS",
      new Date("2026-08-01")
    );

    customer.activate();
    customer.suspend();

    expect(() => {
      customer.changeSegment("COMMERCIAL");
    }).toThrow(CustomerSegmentChangeNotAllowedError);

    expect(customer.getSegment()).toBe("SMALL_BUSINESS");
  });

  it("rejects a segment change for a closed customer", () => {
    const customer = Customer.create(
      new CustomerId("CUST-3003"),
      new PartyId("PARTY-3003"),
      "SMALL_BUSINESS",
      new Date("2026-08-01")
    );

    customer.activate();
    customer.close();

    expect(() => {
      customer.changeSegment("COMMERCIAL");
    }).toThrow(CustomerSegmentChangeNotAllowedError);

    expect(customer.getSegment()).toBe("SMALL_BUSINESS");
  });
});
