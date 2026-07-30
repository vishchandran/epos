import type { Customer } from "@epos/enterprise-domain";

export interface CustomerRepository {
  save(customer: Customer): Promise<void>;
}
