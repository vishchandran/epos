import { CustomerId } from "@epos/enterprise-domain";

import type { CustomerRepository } from "../CustomerRepository.js";
import { CustomerNotFoundError } from "../errors/CustomerNotFoundError.js";

export type ChangeCustomerSegmentCommand = {
  readonly customerId: string;
  readonly segment: "RETAIL" | "SMALL_BUSINESS" | "COMMERCIAL";
};

export type ChangeCustomerSegmentResult = {
  readonly customerId: string;
  readonly segment: "RETAIL" | "SMALL_BUSINESS" | "COMMERCIAL";
};

export class ChangeCustomerSegmentUseCase {
  private readonly customerRepository: CustomerRepository;

  public constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  public async execute(
    command: ChangeCustomerSegmentCommand
  ): Promise<ChangeCustomerSegmentResult> {
    const customerId = new CustomerId(command.customerId);
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFoundError(command.customerId);
    }

    customer.changeSegment(command.segment);

    await this.customerRepository.save(customer);

    return {
      customerId: customer.getId().toString(),
      segment: customer.getSegment()
    };
  }
}
