import { Account, AccountId, AgreementId } from "@epos/enterprise-domain";

import type { AccountRepository } from "../../../src/account/AccountRepository.js";

export const accountFixture = (
  status: "PENDING" | "ACTIVE" | "SUSPENDED" | "CLOSED" = "PENDING"
): Account => {
  const account = Account.open(
    new AccountId("ACC-1001"),
    new AgreementId("AGR-1001")
  );

  if (status === "ACTIVE") account.activate();
  if (status === "SUSPENDED") {
    account.activate();
    account.suspend();
  }
  if (status === "CLOSED") {
    account.activate();
    account.close();
  }

  return account;
};

export class InMemoryAccountRepository implements AccountRepository {
  public savedAccount: Account | undefined;

  public constructor(private account: Account | null = null) {}

  public findById(accountId: AccountId): Promise<Account | null> {
    if (this.account?.getId().equals(accountId)) {
      return Promise.resolve(this.account);
    }
    return Promise.resolve(null);
  }

  public save(account: Account): Promise<void> {
    this.account = account;
    this.savedAccount = account;
    return Promise.resolve();
  }
}
