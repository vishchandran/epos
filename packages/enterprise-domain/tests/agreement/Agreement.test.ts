import { describe, expect, it } from "vitest";

import {
  Agreement,
  AgreementId,
  InvalidAgreementEffectiveDateError,
  InvalidAgreementStatusTransitionError
} from "../../src/agreement/index.js";
import { CustomerId } from "../../src/customer/index.js";
import { ProductId } from "../../src/product/index.js";

const createAgreement = (
  status:
    | "DRAFT"
    | "PENDING_ACCEPTANCE"
    | "ACTIVE"
    | "SUSPENDED"
    | "EXPIRED"
    | "CLOSED" = "DRAFT"
): Agreement =>
  new Agreement(new AgreementId("AGR-1001"), {
    customerId: new CustomerId("CUST-1001"),
    productId: new ProductId("PROD-1001"),
    status,
    effectiveDate: new Date("2026-01-01T00:00:00.000Z")
  });

describe("Agreement", () => {
  it("creates a draft agreement", () => {
    const agreement = Agreement.create(
      new AgreementId("AGR-1001"),
      new CustomerId("CUST-1001"),
      new ProductId("PROD-1001"),
      new Date("2026-01-01T00:00:00.000Z")
    );

    expect(agreement.getId().toString()).toBe("AGR-1001");
    expect(agreement.getCustomerId().toString()).toBe("CUST-1001");
    expect(agreement.getProductId().toString()).toBe("PROD-1001");
    expect(agreement.getStatus()).toBe("DRAFT");
    expect(agreement.getEffectiveDate().toISOString()).toBe(
      "2026-01-01T00:00:00.000Z"
    );
  });

  it("rejects an invalid effective date", () => {
    expect(() =>
      Agreement.create(
        new AgreementId("AGR-1001"),
        new CustomerId("CUST-1001"),
        new ProductId("PROD-1001"),
        new Date("invalid")
      )
    ).toThrow(InvalidAgreementEffectiveDateError);
  });

  it("submits a draft agreement for acceptance", () => {
    const agreement = createAgreement();
    agreement.submitForAcceptance();
    expect(agreement.getStatus()).toBe("PENDING_ACCEPTANCE");
  });

  it("activates a pending agreement", () => {
    const agreement = createAgreement("PENDING_ACCEPTANCE");
    agreement.activate();
    expect(agreement.getStatus()).toBe("ACTIVE");
  });

  it("reactivates a suspended agreement", () => {
    const agreement = createAgreement("SUSPENDED");
    agreement.activate();
    expect(agreement.getStatus()).toBe("ACTIVE");
  });

  it("suspends an active agreement", () => {
    const agreement = createAgreement("ACTIVE");
    agreement.suspend();
    expect(agreement.getStatus()).toBe("SUSPENDED");
  });

  it.each(["ACTIVE", "SUSPENDED"] as const)(
    "expires an agreement from status %s",
    (status) => {
      const agreement = createAgreement(status);
      agreement.expire();
      expect(agreement.getStatus()).toBe("EXPIRED");
    }
  );

  it.each(["ACTIVE", "SUSPENDED"] as const)(
    "closes an agreement from status %s",
    (status) => {
      const agreement = createAgreement(status);
      agreement.close();
      expect(agreement.getStatus()).toBe("CLOSED");
    }
  );

  it("rejects invalid lifecycle transitions", () => {
    expect(() => createAgreement("ACTIVE").submitForAcceptance()).toThrow(
      InvalidAgreementStatusTransitionError
    );
    expect(() => createAgreement("DRAFT").activate()).toThrow(
      InvalidAgreementStatusTransitionError
    );
    expect(() => createAgreement("DRAFT").suspend()).toThrow(
      InvalidAgreementStatusTransitionError
    );
    expect(() => createAgreement("DRAFT").expire()).toThrow(
      InvalidAgreementStatusTransitionError
    );
    expect(() => createAgreement("DRAFT").close()).toThrow(
      InvalidAgreementStatusTransitionError
    );
  });

  it("keeps expired and closed agreements terminal", () => {
    for (const status of ["EXPIRED", "CLOSED"] as const) {
      expect(() => createAgreement(status).activate()).toThrow(
        InvalidAgreementStatusTransitionError
      );
      expect(() => createAgreement(status).suspend()).toThrow(
        InvalidAgreementStatusTransitionError
      );
      expect(() => createAgreement(status).expire()).toThrow(
        InvalidAgreementStatusTransitionError
      );
      expect(() => createAgreement(status).close()).toThrow(
        InvalidAgreementStatusTransitionError
      );
    }
  });

  it("compares agreements by identity", () => {
    expect(createAgreement().equals(createAgreement("ACTIVE"))).toBe(true);
  });
});
