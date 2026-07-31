import { CustomerId } from "@epos/enterprise-domain";

import type { CustomerRepository } from "../CustomerRepository.js";
import { CustomerNotFoundError } from "../errors/CustomerNotFoundError.js";
import type { CustomerDto } from "./CustomerDto.js";
import type { GetCustomerQuery } from "./GetCustomerQuery.js";

export class GetCustomerQueryHandler {
  private readonly customerRepository: CustomerRepository;

  public constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  public async execute(query: GetCustomerQuery): Promise<CustomerDto> {
    const customerId = new CustomerId(query.customerId);
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFoundError(query.customerId);
    }

    return {
      customerId: customer.getId().toString(),
      partyId: customer.getPartyId().toString(),
      status: customer.getStatus(),
      segment: customer.getSegment(),
      customerSince: customer.getCustomerSince().toISOString()
    };
  }
}
