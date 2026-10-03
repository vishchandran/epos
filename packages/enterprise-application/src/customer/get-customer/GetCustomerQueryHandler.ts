import { CustomerId } from "@epos/enterprise-domain";

import type { CustomerRepository } from "../CustomerRepository.js";
import { CustomerNotFoundError } from "../errors/CustomerNotFoundError.js";

export type GetCustomerQuery = {
  readonly customerId: string;
};

export type CustomerDto = {
  readonly customerId: string;
  readonly partyId: string;
  readonly status: "PENDING" | "ACTIVE" | "SUSPENDED" | "CLOSED";
  readonly segment: "RETAIL" | "SMALL_BUSINESS" | "COMMERCIAL";
  readonly customerSince: string;
};

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
