import { describe, expect, it } from "vitest";

import { AccountNotFoundError } from "../../../src/account/errors/AccountNotFoundError.js";
import { GetAccountQueryHandler } from "../../../src/account/get-account/GetAccountQueryHandler.js";
import {
  accountFixture,
  InMemoryAccountRepository
} from "../support/AccountTestSupport.js";

describe("GetAccountQueryHandler", () => {
  it("returns an account DTO", async () => {
    const handler = new GetAccountQueryHandler(
      new InMemoryAccountRepository(accountFixture("ACTIVE"))
    );

    await expect(handler.execute({ accountId: "ACC-1001" })).resolves.toEqual({
      accountId: "ACC-1001",
      agreementId: "AGR-1001",
      status: "ACTIVE"
    });
  });

  it("rejects a missing account", async () => {
    const handler = new GetAccountQueryHandler(new InMemoryAccountRepository());

    await expect(
      handler.execute({ accountId: "ACC-9999" })
    ).rejects.toBeInstanceOf(AccountNotFoundError);
  });
});
