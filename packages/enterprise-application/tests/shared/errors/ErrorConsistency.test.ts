import { describe, expect, it } from "vitest";

import { AccountNotFoundError } from "../../../src/account/errors/AccountNotFoundError.js";
import { AgreementNotFoundError } from "../../../src/agreement/errors/AgreementNotFoundError.js";
import { CustomerNotFoundError } from "../../../src/customer/errors/CustomerNotFoundError.js";
import { LedgerNotFoundError } from "../../../src/ledger/errors/LedgerNotFoundError.js";
import { PartyNotFoundError } from "../../../src/party/errors/PartyNotFoundError.js";
import { ProductNotFoundError } from "../../../src/product/errors/ProductNotFoundError.js";
import { ApplicationError } from "../../../src/shared/ApplicationError.js";

describe("Application error consistency", () => {
  it.each([
    [new PartyNotFoundError("PARTY-1"), "Party 'PARTY-1' was not found."],
    [new CustomerNotFoundError("CUST-1"), "Customer 'CUST-1' was not found."],
    [new ProductNotFoundError("PROD-1"), "Product 'PROD-1' was not found."],
    [new AgreementNotFoundError("AGR-1"), "Agreement 'AGR-1' was not found."],
    [new AccountNotFoundError("ACC-1"), "Account 'ACC-1' was not found."],
    [new LedgerNotFoundError("LED-1"), "Ledger 'LED-1' was not found."]
  ])(
    "uses a named ApplicationError with a consistent message",
    (error, message) => {
      expect(error).toBeInstanceOf(ApplicationError);
      expect(error.name).toBe(error.constructor.name);
      expect(error.message).toBe(message);
    }
  );

  it("preserves the relevant identifier on every not-found error", () => {
    expect(new PartyNotFoundError("PARTY-1").partyId).toBe("PARTY-1");
    expect(new CustomerNotFoundError("CUST-1").customerId).toBe("CUST-1");
    expect(new ProductNotFoundError("PROD-1").productId).toBe("PROD-1");
    expect(new AgreementNotFoundError("AGR-1").agreementId).toBe("AGR-1");
    expect(new AccountNotFoundError("ACC-1").accountId).toBe("ACC-1");
    expect(new LedgerNotFoundError("LED-1").ledgerId).toBe("LED-1");
  });
});
