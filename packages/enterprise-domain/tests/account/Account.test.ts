import { describe, expect, it } from "vitest";

import { Agreement, AgreementId } from "../../src/agreement/index.js";
import {
  Account,
  AccountId,
  AccountOpeningPolicy,
  AgreementNotActiveForAccountOpeningError
} from "../../src/account/index.js";
import { CustomerId } from "../../src/customer/index.js";
import { ProductId } from "../../src/product/index.js";

describe("Account", () => {
  it("opens an account in pending status", () => {
    const account = Account.open(
      new AccountId("ACC-1001"),
      new AgreementId("AGR-1001")
    );

    expect(account.getStatus()).toBe("PENDING");
    expect(account.getAgreementId().toString()).toBe("AGR-1001");
  });

  it("allows account opening under an active agreement", () => {
    const agreement = new Agreement(new AgreementId("AGR-1001"), {
      customerId: new CustomerId("CUST-1001"),
      productId: new ProductId("PROD-1001"),
      status: "ACTIVE",
      effectiveDate: new Date("2026-01-01T00:00:00.000Z")
    });

    expect(() =>
      AccountOpeningPolicy.ensureAgreementIsActive(agreement)
    ).not.toThrow();
  });

  it("rejects account opening under an inactive agreement", () => {
    const agreement = Agreement.create(
      new AgreementId("AGR-1001"),
      new CustomerId("CUST-1001"),
      new ProductId("PROD-1001"),
      new Date("2026-01-01T00:00:00.000Z")
    );

    expect(() =>
      AccountOpeningPolicy.ensureAgreementIsActive(agreement)
    ).toThrow(AgreementNotActiveForAccountOpeningError);
  });

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

  it("closes a suspended account", () => {
    const account = Account.open(
      new AccountId("ACC-1001"),
      new AgreementId("AGR-1001")
    );
    account.activate();
    account.suspend();
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

  it("prevents closing an already closed account", () => {
    const account = Account.open(
      new AccountId("ACC-1001"),
      new AgreementId("AGR-1001")
    );
    account.activate();
    account.close();

    expect(() => account.close()).toThrow(
      "Account cannot be closed from status CLOSED."
    );
  });

  it("compares accounts by AccountId", () => {
    const agreementId = new AgreementId("AGR-1001");

    const firstAccount = new Account(new AccountId("ACC-1001"), agreementId);

    const secondAccount = new Account(new AccountId("ACC-1001"), agreementId);

    expect(firstAccount.equals(secondAccount)).toBe(true);
  });
});
