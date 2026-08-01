import { LedgerAlreadyClosedError } from "@epos/enterprise-domain";
import { describe, expect, it } from "vitest";

import { CloseLedgerUseCase } from "../../../src/ledger/close-ledger/CloseLedgerUseCase.js";
import { LedgerNotFoundError } from "../../../src/ledger/errors/LedgerNotFoundError.js";
import {
  InMemoryLedgerRepository,
  ledgerFixture
} from "../support/LedgerTestSupport.js";

describe("CloseLedgerUseCase", () => {
  it("closes and saves an open ledger", async () => {
    const repository = new InMemoryLedgerRepository(ledgerFixture());
    const result = await new CloseLedgerUseCase(repository).execute({
      ledgerId: "LED-1001"
    });
    expect(result).toEqual({ ledgerId: "LED-1001", status: "CLOSED" });
    expect(repository.savedLedger?.getStatus()).toBe("CLOSED");
  });

  it("rejects a missing ledger", async () => {
    await expect(
      new CloseLedgerUseCase(new InMemoryLedgerRepository()).execute({
        ledgerId: "LED-9999"
      })
    ).rejects.toBeInstanceOf(LedgerNotFoundError);
  });

  it("preserves the already-closed domain rule", async () => {
    await expect(
      new CloseLedgerUseCase(
        new InMemoryLedgerRepository(ledgerFixture(true))
      ).execute({ ledgerId: "LED-1001" })
    ).rejects.toBeInstanceOf(LedgerAlreadyClosedError);
  });
});
