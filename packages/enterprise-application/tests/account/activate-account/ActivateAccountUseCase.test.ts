import { InvalidAccountStatusTransitionError } from "@epos/enterprise-domain";
import { describe, expect, it } from "vitest";

import { ActivateAccountUseCase } from "../../../src/account/activate-account/ActivateAccountUseCase.js";
import { AccountNotFoundError } from "../../../src/account/errors/AccountNotFoundError.js";
import {
  accountFixture,
  InMemoryAccountRepository
} from "../support/AccountTestSupport.js";

describe("ActivateAccountUseCase", () => {
  it("activates and saves a pending account", async () => {
    const repository = new InMemoryAccountRepository(accountFixture());
    const result = await new ActivateAccountUseCase(repository).execute({
      accountId: "ACC-1001"
    });
    expect(result).toEqual({ accountId: "ACC-1001", status: "ACTIVE" });
    expect(repository.savedAccount?.getStatus()).toBe("ACTIVE");
  });

  it("reactivates and saves a suspended account", async () => {
    const repository = new InMemoryAccountRepository(
      accountFixture("SUSPENDED")
    );
    await expect(
      new ActivateAccountUseCase(repository).execute({ accountId: "ACC-1001" })
    ).resolves.toEqual({ accountId: "ACC-1001", status: "ACTIVE" });
  });

  it("rejects a missing account", async () => {
    await expect(
      new ActivateAccountUseCase(new InMemoryAccountRepository()).execute({
        accountId: "ACC-9999"
      })
    ).rejects.toBeInstanceOf(AccountNotFoundError);
  });

  it("preserves the domain lifecycle rule", async () => {
    await expect(
      new ActivateAccountUseCase(
        new InMemoryAccountRepository(accountFixture("CLOSED"))
      ).execute({ accountId: "ACC-1001" })
    ).rejects.toBeInstanceOf(InvalidAccountStatusTransitionError);
  });
});
