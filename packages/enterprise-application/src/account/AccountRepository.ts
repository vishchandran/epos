import type { Account } from "@epos/enterprise-domain";

export interface AccountRepository {
  save(account: Account): Promise<void>;
}
