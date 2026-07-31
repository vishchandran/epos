import { describe, expect, it } from "vitest";
import { Customer, CustomerId, PartyId } from "@epos/enterprise-domain";

import type { CustomerRepository } from "../../../src/customer/CustomerRepository.js";
import { CustomerNotFoundError } from "../../../src/customer/errors/CustomerNotFoundError.js";
import { GetCustomerQueryHandler } from "../../../src/customer/get-customer/GetCustomerQueryHandler.js";

class InMemoryCustomerRepository implements CustomerRepository {
  private readonly customers = new Map<string, Customer>();
  public saveCount = 0;

  public constructor(customers: Customer[] = []) {
    for (const customer of customers) {
      this.customers.set(customer.getId().toString(), customer);
    }
  }

  public findById(customerId: CustomerId): Promise<Customer | null> {
    return Promise.resolve(this.customers.get(customerId.toString()) ?? null);
  }

  public save(customer: Customer): Promise<void> {
    this.customers.set(customer.getId().toString(), customer);
    this.saveCount += 1;
    return Promise.resolve();
  }
}

describe("GetCustomerQueryHandler", () => {
  it("returns the Customer DTO when the customer exists", async () => {
    const customer = Customer.create(
      new CustomerId("CUST-1001"),
      new PartyId("PARTY-1001"),
      "RETAIL",
      new Date("2026-07-31T10:00:00.000Z")
    );

    customer.activate();

    const repository = new InMemoryCustomerRepository([customer]);
    const handler = new GetCustomerQueryHandler(repository);

    const result = await handler.execute({
      customerId: "CUST-1001"
    });

    expect(result).toEqual({
      customerId: "CUST-1001",
      partyId: "PARTY-1001",
      status: "ACTIVE",
      segment: "RETAIL",
      customerSince: "2026-07-31T10:00:00.000Z"
    });

    expect(repository.saveCount).toBe(0);
  });

  it("throws CustomerNotFoundError when the customer does not exist", async () => {
    const repository = new InMemoryCustomerRepository();
    const handler = new GetCustomerQueryHandler(repository);

    await expect(
      handler.execute({
        customerId: "CUST-404"
      })
    ).rejects.toThrow(CustomerNotFoundError);

    expect(repository.saveCount).toBe(0);
  });
});
