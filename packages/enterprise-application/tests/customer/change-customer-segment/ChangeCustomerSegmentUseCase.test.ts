import { describe, expect, it } from "vitest";
import {
  Customer,
  CustomerId,
  CustomerSegmentChangeNotAllowedError,
  PartyId
} from "@epos/enterprise-domain";

import type { CustomerRepository } from "../../../src/customer/CustomerRepository.js";
import { CustomerNotFoundError } from "../../../src/customer/errors/CustomerNotFoundError.js";
import { ChangeCustomerSegmentUseCase } from "../../../src/customer/change-customer-segment/ChangeCustomerSegmentUseCase.js";

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

function createCustomer(): Customer {
  return Customer.create(
    new CustomerId("CUST-1001"),
    new PartyId("PARTY-1001"),
    "SMALL_BUSINESS",
    new Date("2026-08-01")
  );
}

describe("ChangeCustomerSegmentUseCase", () => {
  it("changes and saves the segment of an active customer", async () => {
    const customer = createCustomer();
    customer.activate();

    const repository = new InMemoryCustomerRepository([customer]);
    const useCase = new ChangeCustomerSegmentUseCase(repository);

    const result = await useCase.execute({
      customerId: "CUST-1001",
      segment: "COMMERCIAL"
    });

    expect(result).toEqual({
      customerId: "CUST-1001",
      segment: "COMMERCIAL"
    });

    expect(customer.getSegment()).toBe("COMMERCIAL");
    expect(repository.saveCount).toBe(1);
  });

  it("throws CustomerNotFoundError when the customer does not exist", async () => {
    const repository = new InMemoryCustomerRepository();
    const useCase = new ChangeCustomerSegmentUseCase(repository);

    await expect(
      useCase.execute({
        customerId: "CUST-404",
        segment: "COMMERCIAL"
      })
    ).rejects.toThrow(CustomerNotFoundError);

    expect(repository.saveCount).toBe(0);
  });

  it("propagates the domain error and does not save a suspended customer", async () => {
    const customer = createCustomer();
    customer.activate();
    customer.suspend();

    const repository = new InMemoryCustomerRepository([customer]);
    const useCase = new ChangeCustomerSegmentUseCase(repository);

    await expect(
      useCase.execute({
        customerId: "CUST-1001",
        segment: "COMMERCIAL"
      })
    ).rejects.toThrow(CustomerSegmentChangeNotAllowedError);

    expect(customer.getSegment()).toBe("SMALL_BUSINESS");
    expect(repository.saveCount).toBe(0);
  });
});
