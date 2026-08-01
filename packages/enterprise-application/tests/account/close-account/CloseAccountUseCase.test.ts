import { InvalidAccountStatusTransitionError } from "@epos/enterprise-domain";
import { describe, expect, it } from "vitest";

import { CloseAccountUseCase } from "../../../src/account/close-account/CloseAccountUseCase.js";
import { AccountNotFoundError } from "../../../src/account/errors/AccountNotFoundError.js";
import {
  accountFixture,
  InMemoryAccountRepository
} from "../support/AccountTestSupport.js";

describe("CloseAccountUseCase", () => {
  it.each(["ACTIVE", "SUSPENDED"] as const)(
    "closes and saves an account from status %s",
    async (status) => {
      const repository = new InMemoryAccountRepository(accountFixture(status));
      const result = await new CloseAccountUseCase(repository).execute({
        accountId: "ACC-1001"
      });
      expect(result).toEqual({ accountId: "ACC-1001", status: "CLOSED" });
      expect(repository.savedAccount?.getStatus()).toBe("CLOSED");
    }
  );

  it("rejects a missing account", async () => {
    await expect(
      new CloseAccountUseCase(new InMemoryAccountRepository()).execute({
        accountId: "ACC-9999"
      })
    ).rejects.toBeInstanceOf(AccountNotFoundError);
  });

  it.each(["PENDING", "CLOSED"] as const)(
    "preserves the domain rule for status %s",
    async (status) => {
      await expect(
        new CloseAccountUseCase(
          new InMemoryAccountRepository(accountFixture(status))
        ).execute({ accountId: "ACC-1001" })
      ).rejects.toBeInstanceOf(InvalidAccountStatusTransitionError);
    }
  );
});
