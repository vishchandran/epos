import type { Account, AccountId } from "@epos/enterprise-domain";

export interface AccountRepository {
  findById(accountId: AccountId): Promise<Account | null>;
  save(account: Account): Promise<void>;
}
