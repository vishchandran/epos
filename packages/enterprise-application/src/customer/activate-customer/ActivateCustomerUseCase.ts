import { CustomerId } from "@epos/enterprise-domain";

import type { CustomerRepository } from "../CustomerRepository.js";
import { CustomerNotFoundError } from "../errors/CustomerNotFoundError.js";
import type { ActivateCustomerCommand } from "./ActivateCustomerCommand.js";
import type { ActivateCustomerResult } from "./ActivateCustomerResult.js";

export class ActivateCustomerUseCase {
  private readonly customerRepository: CustomerRepository;

  public constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  public async execute(
    command: ActivateCustomerCommand
  ): Promise<ActivateCustomerResult> {
    const customerId = new CustomerId(command.customerId);
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFoundError(command.customerId);
    }

    customer.activate();

    await this.customerRepository.save(customer);

    return {
      customerId: customer.getId().toString(),
      status: "ACTIVE"
    };
  }
}
