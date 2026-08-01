import { describe, expect, it } from "vitest";

import { Account, AccountId } from "../../src/account/index.js";
import { AgreementId } from "../../src/agreement/index.js";
import {
  AccountNotActiveForLedgerOpeningError,
  Ledger,
  LedgerId,
  LedgerOpeningPolicy
} from "../../src/ledger/index.js";

describe("Ledger", () => {
  it("opens a ledger in open status", () => {
    const ledger = Ledger.open(
      new LedgerId("LED-1001"),
      new AccountId("ACC-1001")
    );

    expect(ledger.getStatus()).toBe("OPEN");
    expect(ledger.getAccountId().toString()).toBe("ACC-1001");
  });

  it("allows ledger opening for an active account", () => {
    const account = Account.open(
      new AccountId("ACC-1001"),
      new AgreementId("AGR-1001")
    );
    account.activate();

    expect(() =>
      LedgerOpeningPolicy.ensureAccountIsActive(account)
    ).not.toThrow();
  });

  it("rejects ledger opening for an inactive account", () => {
    const account = Account.open(
      new AccountId("ACC-1001"),
      new AgreementId("AGR-1001")
    );

    expect(() => LedgerOpeningPolicy.ensureAccountIsActive(account)).toThrow(
      AccountNotActiveForLedgerOpeningError
    );
  });

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
