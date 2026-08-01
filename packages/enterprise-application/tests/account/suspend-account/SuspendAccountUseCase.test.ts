import { InvalidAccountStatusTransitionError } from "@epos/enterprise-domain";
import { describe, expect, it } from "vitest";

import { AccountNotFoundError } from "../../../src/account/errors/AccountNotFoundError.js";
import { SuspendAccountUseCase } from "../../../src/account/suspend-account/SuspendAccountUseCase.js";
import {
  accountFixture,
  InMemoryAccountRepository
} from "../support/AccountTestSupport.js";

describe("SuspendAccountUseCase", () => {
  it("suspends and saves an active account", async () => {
    const repository = new InMemoryAccountRepository(accountFixture("ACTIVE"));
    const result = await new SuspendAccountUseCase(repository).execute({
      accountId: "ACC-1001"
    });
    expect(result).toEqual({ accountId: "ACC-1001", status: "SUSPENDED" });
    expect(repository.savedAccount?.getStatus()).toBe("SUSPENDED");
  });

  it("rejects a missing account", async () => {
    await expect(
      new SuspendAccountUseCase(new InMemoryAccountRepository()).execute({
        accountId: "ACC-9999"
      })
    ).rejects.toBeInstanceOf(AccountNotFoundError);
  });

  it("preserves the domain lifecycle rule", async () => {
    await expect(
      new SuspendAccountUseCase(
        new InMemoryAccountRepository(accountFixture())
      ).execute({ accountId: "ACC-1001" })
    ).rejects.toBeInstanceOf(InvalidAccountStatusTransitionError);
  });
});
