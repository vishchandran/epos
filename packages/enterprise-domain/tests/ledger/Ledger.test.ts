import { describe, expect, it } from "vitest";

import { AccountId } from "../../src/account/value-objects/AccountId.js";
import { Ledger } from "../../src/ledger/entities/Ledger.js";
import { LedgerId } from "../../src/ledger/value-objects/LedgerId.js";

describe("Ledger", () => {
  it("starts in OPEN status", () => {
    const ledger = new Ledger(
      new LedgerId("LED-1001"),
      new AccountId("ACC-1001")
    );

    expect(ledger.getStatus()).toBe("OPEN");
  });

  it("closes an open ledger", () => {
    const ledger = new Ledger(
      new LedgerId("LED-1001"),
      new AccountId("ACC-1001")
    );

    ledger.close();

    expect(ledger.getStatus()).toBe("CLOSED");
  });

  it("prevents closing an already closed ledger", () => {
    const ledger = new Ledger(
      new LedgerId("LED-1001"),
      new AccountId("ACC-1001")
    );

    ledger.close();

    expect(() => ledger.close()).toThrow("Ledger is already closed.");
  });

  it("compares ledgers by LedgerId", () => {
    const accountId = new AccountId("ACC-1001");

    const firstLedger = new Ledger(new LedgerId("LED-1001"), accountId);

    const secondLedger = new Ledger(new LedgerId("LED-1001"), accountId);

    expect(firstLedger.equals(secondLedger)).toBe(true);
  });
});
