import { describe, expect, it } from "vitest";
import {
  Customer,
  CustomerId,
  InvalidCustomerStatusTransitionError,
  PartyId
} from "@epos/enterprise-domain";

import type { CustomerRepository } from "../../../src/customer/CustomerRepository.js";
import { CustomerNotFoundError } from "../../../src/customer/errors/CustomerNotFoundError.js";
import { CloseCustomerUseCase } from "../../../src/customer/close-customer/CloseCustomerUseCase.js";

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
    "RETAIL",
    new Date("2026-08-01")
  );
}

describe("CloseCustomerUseCase", () => {
  it("closes and saves an active customer", async () => {
    const customer = createCustomer();
    customer.activate();

    const repository = new InMemoryCustomerRepository([customer]);
    const useCase = new CloseCustomerUseCase(repository);

    const result = await useCase.execute({
      customerId: "CUST-1001"
    });

    expect(result).toEqual({
      customerId: "CUST-1001",
      status: "CLOSED"
    });

    expect(customer.getStatus()).toBe("CLOSED");
    expect(repository.saveCount).toBe(1);
  });

  it("closes and saves a suspended customer", async () => {
    const customer = createCustomer();
    customer.activate();
    customer.suspend();

    const repository = new InMemoryCustomerRepository([customer]);
    const useCase = new CloseCustomerUseCase(repository);

    const result = await useCase.execute({
      customerId: "CUST-1001"
    });

    expect(result.status).toBe("CLOSED");
    expect(customer.getStatus()).toBe("CLOSED");
    expect(repository.saveCount).toBe(1);
  });

  it("throws CustomerNotFoundError when the customer does not exist", async () => {
    const repository = new InMemoryCustomerRepository();
    const useCase = new CloseCustomerUseCase(repository);

    await expect(
      useCase.execute({
        customerId: "CUST-404"
      })
    ).rejects.toThrow(CustomerNotFoundError);

    expect(repository.saveCount).toBe(0);
  });

  it("propagates the domain error and does not save a pending customer", async () => {
    const customer = createCustomer();

    const repository = new InMemoryCustomerRepository([customer]);
    const useCase = new CloseCustomerUseCase(repository);

    await expect(
      useCase.execute({
        customerId: "CUST-1001"
      })
    ).rejects.toThrow(InvalidCustomerStatusTransitionError);

    expect(customer.getStatus()).toBe("PENDING");
    expect(repository.saveCount).toBe(0);
  });
});
