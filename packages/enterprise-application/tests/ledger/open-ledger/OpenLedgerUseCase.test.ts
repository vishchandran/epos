import {
  Account,
  AccountId,
  AccountNotActiveForLedgerOpeningError,
  AgreementId,
  type Ledger
} from "@epos/enterprise-domain";
import { describe, expect, it } from "vitest";

import type { AccountRepository } from "../../../src/account/AccountRepository.js";
import { AccountNotFoundError } from "../../../src/account/errors/AccountNotFoundError.js";
import type { LedgerRepository } from "../../../src/ledger/LedgerRepository.js";
import { OpenLedgerUseCase } from "../../../src/ledger/open-ledger/OpenLedgerUseCase.js";
import type { IdGenerator } from "../../../src/shared/IdGenerator.js";

class AccountStub implements AccountRepository {
  public constructor(private readonly account: Account | null) {}
  public findById(): Promise<Account | null> {
    return Promise.resolve(this.account);
  }
  public save(): Promise<void> {
    return Promise.resolve();
  }
}

class InMemoryLedgerRepository implements LedgerRepository {
  public savedLedger: Ledger | undefined;
  public save(ledger: Ledger): Promise<void> {
    this.savedLedger = ledger;
    return Promise.resolve();
  }
}

class FixedIdGenerator implements IdGenerator {
  public generate(): string {
    return "LED-1001";
  }
}

const account = (active: boolean): Account => {
  const result = Account.open(
    new AccountId("ACC-1001"),
    new AgreementId("AGR-1001")
  );
  if (active) result.activate();
  return result;
};

describe("OpenLedgerUseCase", () => {
  it("opens and saves a ledger for an active account", async () => {
    const repository = new InMemoryLedgerRepository();
    const useCase = new OpenLedgerUseCase(
      new AccountStub(account(true)),
      repository,
      new FixedIdGenerator()
    );
    await expect(useCase.execute({ accountId: "ACC-1001" })).resolves.toEqual({
      ledgerId: "LED-1001",
      accountId: "ACC-1001",
      status: "OPEN"
    });
    expect(repository.savedLedger?.getStatus()).toBe("OPEN");
  });

  it("rejects a missing account", async () => {
    const useCase = new OpenLedgerUseCase(
      new AccountStub(null),
      new InMemoryLedgerRepository(),
      new FixedIdGenerator()
    );
    await expect(
      useCase.execute({ accountId: "ACC-9999" })
    ).rejects.toBeInstanceOf(AccountNotFoundError);
  });

  it("rejects an inactive account", async () => {
    const useCase = new OpenLedgerUseCase(
      new AccountStub(account(false)),
      new InMemoryLedgerRepository(),
      new FixedIdGenerator()
    );
    await expect(
      useCase.execute({ accountId: "ACC-1001" })
    ).rejects.toBeInstanceOf(AccountNotActiveForLedgerOpeningError);
  });
});
