import { describe, expect, it } from "vitest";

import { AgreementId } from "../../src/agreement/value-objects/AgreementId.js";
import { Account } from "../../src/account/entities/Account.js";
import { AccountId } from "../../src/account/value-objects/AccountId.js";

describe("Account", () => {
  it("starts in PENDING status", () => {
    const account = new Account(
      new AccountId("ACC-1001"),
      new AgreementId("AGR-1001")
    );

    expect(account.getStatus()).toBe("PENDING");
  });

  it("activates a pending account", () => {
    const account = new Account(
      new AccountId("ACC-1001"),
      new AgreementId("AGR-1001")
    );

    account.activate();

    expect(account.getStatus()).toBe("ACTIVE");
  });

  it("suspends and reactivates an active account", () => {
    const account = new Account(
      new AccountId("ACC-1001"),
      new AgreementId("AGR-1001")
    );

    account.activate();
    account.suspend();

    expect(account.getStatus()).toBe("SUSPENDED");

    account.activate();

    expect(account.getStatus()).toBe("ACTIVE");
  });

  it("closes an active account", () => {
    const account = new Account(
      new AccountId("ACC-1001"),
      new AgreementId("AGR-1001")
    );

    account.activate();
    account.close();

    expect(account.getStatus()).toBe("CLOSED");
  });

  it("prevents closing a pending account", () => {
    const account = new Account(
      new AccountId("ACC-1001"),
      new AgreementId("AGR-1001")
    );

    expect(() => account.close()).toThrow(
      "Account cannot be closed from status PENDING."
    );
  });

  it("prevents reactivating a closed account", () => {
    const account = new Account(
      new AccountId("ACC-1001"),
      new AgreementId("AGR-1001")
    );

    account.activate();
    account.close();

    expect(() => account.activate()).toThrow(
      "Account cannot be activated from status CLOSED."
    );
  });

  it("compares accounts by AccountId", () => {
    const agreementId = new AgreementId("AGR-1001");

    const firstAccount = new Account(new AccountId("ACC-1001"), agreementId);

    const secondAccount = new Account(new AccountId("ACC-1001"), agreementId);

    expect(firstAccount.equals(secondAccount)).toBe(true);
  });
});
