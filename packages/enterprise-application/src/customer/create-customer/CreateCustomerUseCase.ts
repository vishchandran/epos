import { Customer, CustomerId, PartyId } from "@epos/enterprise-domain";

import type { Clock } from "../../shared/Clock.js";
import type { IdGenerator } from "../../shared/IdGenerator.js";
import type { PartyRepository } from "../../party/PartyRepository.js";
import { PartyNotFoundError } from "../../party/errors/PartyNotFoundError.js";
import type { CustomerRepository } from "../CustomerRepository.js";
import type { CreateCustomerCommand } from "./CreateCustomerCommand.js";
import type { CreateCustomerResult } from "./CreateCustomerResult.js";

export class CreateCustomerUseCase {
  private readonly partyRepository: PartyRepository;
  private readonly customerRepository: CustomerRepository;
  private readonly idGenerator: IdGenerator;
  private readonly clock: Clock;

  public constructor(
    partyRepository: PartyRepository,
    customerRepository: CustomerRepository,
    idGenerator: IdGenerator,
    clock: Clock
  ) {
    this.partyRepository = partyRepository;
    this.customerRepository = customerRepository;
    this.idGenerator = idGenerator;
    this.clock = clock;
  }

  public async execute(
    command: CreateCustomerCommand
  ): Promise<CreateCustomerResult> {
    const partyId = new PartyId(command.partyId);
    const party = await this.partyRepository.findById(partyId);

    if (!party) {
      throw new PartyNotFoundError(command.partyId);
    }

    const customer = Customer.create(
      new CustomerId(this.idGenerator.generate()),
      partyId,
      command.segment,
      this.clock.now()
    );

    await this.customerRepository.save(customer);

    return {
      customerId: customer.getId().toString(),
      partyId: customer.getPartyId().toString(),
      status: "PENDING",
      segment: customer.getSegment(),
      customerSince: customer.getCustomerSince().toISOString()
    };
  }
}
