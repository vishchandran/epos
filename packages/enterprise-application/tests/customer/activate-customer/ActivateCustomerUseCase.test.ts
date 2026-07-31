import { describe, expect, it } from "vitest";
import {
  Customer,
  CustomerId,
  InvalidCustomerStatusTransitionError,
  PartyId
} from "@epos/enterprise-domain";

import type { CustomerRepository } from "../../../src/customer/CustomerRepository.js";
import { CustomerNotFoundError } from "../../../src/customer/errors/CustomerNotFoundError.js";
import { ActivateCustomerUseCase } from "../../../src/customer/activate-customer/ActivateCustomerUseCase.js";

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

describe("ActivateCustomerUseCase", () => {
  it("activates and saves a pending customer", async () => {
    const customer = Customer.create(
      new CustomerId("CUST-1001"),
      new PartyId("PARTY-1001"),
      "RETAIL",
      new Date("2026-07-31")
    );

    const repository = new InMemoryCustomerRepository([customer]);
    const useCase = new ActivateCustomerUseCase(repository);

    const result = await useCase.execute({
      customerId: "CUST-1001"
    });

    expect(result).toEqual({
      customerId: "CUST-1001",
      status: "ACTIVE"
    });

    expect(customer.getStatus()).toBe("ACTIVE");
    expect(repository.saveCount).toBe(1);
  });

  it("throws CustomerNotFoundError when the customer does not exist", async () => {
    const repository = new InMemoryCustomerRepository();
    const useCase = new ActivateCustomerUseCase(repository);

    await expect(
      useCase.execute({
        customerId: "CUST-404"
      })
    ).rejects.toThrow(CustomerNotFoundError);

    expect(repository.saveCount).toBe(0);
  });

  it("propagates the domain error and does not save an invalid transition", async () => {
    const customer = Customer.create(
      new CustomerId("CUST-1001"),
      new PartyId("PARTY-1001"),
      "RETAIL",
      new Date("2026-07-31")
    );

    customer.activate();

    const repository = new InMemoryCustomerRepository([customer]);
    const useCase = new ActivateCustomerUseCase(repository);

    await expect(
      useCase.execute({
        customerId: "CUST-1001"
      })
    ).rejects.toThrow(InvalidCustomerStatusTransitionError);

    expect(repository.saveCount).toBe(0);
  });
});
