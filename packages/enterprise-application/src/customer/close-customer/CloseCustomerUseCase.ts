import { CustomerId } from "@epos/enterprise-domain";

import type { CustomerRepository } from "../CustomerRepository.js";
import { CustomerNotFoundError } from "../errors/CustomerNotFoundError.js";
import type { CloseCustomerCommand } from "./CloseCustomerCommand.js";
import type { CloseCustomerResult } from "./CloseCustomerResult.js";

export class CloseCustomerUseCase {
  private readonly customerRepository: CustomerRepository;

  public constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  public async execute(
    command: CloseCustomerCommand
  ): Promise<CloseCustomerResult> {
    const customerId = new CustomerId(command.customerId);
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFoundError(command.customerId);
    }

    customer.close();

    await this.customerRepository.save(customer);

    return {
      customerId: customer.getId().toString(),
      status: "CLOSED"
    };
  }
}
