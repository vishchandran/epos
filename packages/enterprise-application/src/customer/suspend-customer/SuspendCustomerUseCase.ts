import { CustomerId } from "@epos/enterprise-domain";

import type { CustomerRepository } from "../CustomerRepository.js";
import { CustomerNotFoundError } from "../errors/CustomerNotFoundError.js";
import type { SuspendCustomerCommand } from "./SuspendCustomerCommand.js";
import type { SuspendCustomerResult } from "./SuspendCustomerResult.js";

export class SuspendCustomerUseCase {
  private readonly customerRepository: CustomerRepository;

  public constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  public async execute(
    command: SuspendCustomerCommand
  ): Promise<SuspendCustomerResult> {
    const customerId = new CustomerId(command.customerId);
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFoundError(command.customerId);
    }

    customer.suspend();

    await this.customerRepository.save(customer);

    return {
      customerId: customer.getId().toString(),
      status: "SUSPENDED"
    };
  }
}
