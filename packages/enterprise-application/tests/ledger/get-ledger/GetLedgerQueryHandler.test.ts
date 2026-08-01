import { describe, expect, it } from "vitest";

import { LedgerNotFoundError } from "../../../src/ledger/errors/LedgerNotFoundError.js";
import { GetLedgerQueryHandler } from "../../../src/ledger/get-ledger/GetLedgerQueryHandler.js";
import {
  InMemoryLedgerRepository,
  ledgerFixture
} from "../support/LedgerTestSupport.js";

describe("GetLedgerQueryHandler", () => {
  it("returns a ledger DTO", async () => {
    const handler = new GetLedgerQueryHandler(
      new InMemoryLedgerRepository(ledgerFixture())
    );
    await expect(handler.execute({ ledgerId: "LED-1001" })).resolves.toEqual({
      ledgerId: "LED-1001",
      accountId: "ACC-1001",
      status: "OPEN"
    });
  });

  it("rejects a missing ledger", async () => {
    const handler = new GetLedgerQueryHandler(new InMemoryLedgerRepository());
    await expect(
      handler.execute({ ledgerId: "LED-9999" })
    ).rejects.toBeInstanceOf(LedgerNotFoundError);
  });
});
