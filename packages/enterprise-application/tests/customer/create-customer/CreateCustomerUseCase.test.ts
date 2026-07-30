import { describe, expect, it } from "vitest";
import { Customer, Party, PartyId } from "@epos/enterprise-domain";

import type { Clock } from "../../../src/shared/Clock.js";
import type { IdGenerator } from "../../../src/shared/IdGenerator.js";
import type { PartyRepository } from "../../../src/party/PartyRepository.js";
import { PartyNotFoundError } from "../../../src/party/errors/PartyNotFoundError.js";
import type { CustomerRepository } from "../../../src/customer/CustomerRepository.js";
import { CreateCustomerUseCase } from "../../../src/customer/create-customer/CreateCustomerUseCase.js";

class FixedIdGenerator implements IdGenerator {
  public generate(): string {
    return "CUST-1001";
  }
}

class FixedClock implements Clock {
  public now(): Date {
    return new Date("2026-07-31T10:00:00.000Z");
  }
}

class InMemoryPartyRepository implements PartyRepository {
  public constructor(private readonly party: Party | null) {}

  public findById(partyId: PartyId): Promise<Party | null> {
    if (this.party?.getId().equals(partyId)) {
      return Promise.resolve(this.party);
    }

    return Promise.resolve(null);
  }

  public save(): Promise<void> {
    return Promise.resolve();
  }
}

class InMemoryCustomerRepository implements CustomerRepository {
  public savedCustomer: Customer | undefined;

  public save(customer: Customer): Promise<void> {
    this.savedCustomer = customer;
    return Promise.resolve();
  }
}

describe("CreateCustomerUseCase", () => {
  it("creates and saves a pending customer for an existing party", async () => {
    const party = Party.register(
      new PartyId("PARTY-1001"),
      "PERSON",
      "Anita Sharma"
    );

    const partyRepository = new InMemoryPartyRepository(party);
    const customerRepository = new InMemoryCustomerRepository();
    const useCase = new CreateCustomerUseCase(
      partyRepository,
      customerRepository,
      new FixedIdGenerator(),
      new FixedClock()
    );

    const result = await useCase.execute({
      partyId: "PARTY-1001",
      segment: "RETAIL"
    });

    expect(result).toEqual({
      customerId: "CUST-1001",
      partyId: "PARTY-1001",
      status: "PENDING",
      segment: "RETAIL",
      customerSince: "2026-07-31T10:00:00.000Z"
    });

    expect(customerRepository.savedCustomer).toBeDefined();
    expect(customerRepository.savedCustomer?.getStatus()).toBe("PENDING");
  });

  it("throws PartyNotFoundError and does not save when the party is missing", async () => {
    const partyRepository = new InMemoryPartyRepository(null);
    const customerRepository = new InMemoryCustomerRepository();
    const useCase = new CreateCustomerUseCase(
      partyRepository,
      customerRepository,
      new FixedIdGenerator(),
      new FixedClock()
    );

    await expect(
      useCase.execute({
        partyId: "PARTY-404",
        segment: "RETAIL"
      })
    ).rejects.toThrow(PartyNotFoundError);

    expect(customerRepository.savedCustomer).toBeUndefined();
  });
});
