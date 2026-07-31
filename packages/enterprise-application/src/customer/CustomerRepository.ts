import type { Customer, CustomerId } from "@epos/enterprise-domain";

export interface CustomerRepository {
  findById(customerId: CustomerId): Promise<Customer | null>;
  save(customer: Customer): Promise<void>;
}
