import { describe, expect, it } from "vitest";

import { Agreement } from "../../src/agreement/entities/Agreement.js";
import { AgreementId } from "../../src/agreement/value-objects/AgreementId.js";
import { CustomerId } from "../../src/customer/value-objects/CustomerId.js";
import { ProductId } from "../../src/product/value-objects/ProductId.js";

describe("Agreement", () => {
  it("creates an agreement", () => {
    const agreement = new Agreement(new AgreementId("AGR-1001"), {
      customerId: new CustomerId("CUST-1001"),
      productId: new ProductId("PROD-1001"),
      status: "DRAFT",
      effectiveDate: new Date("2026-01-01")
    });

    expect(agreement.getId().toString()).toBe("AGR-1001");
    expect(agreement.getCustomerId().toString()).toBe("CUST-1001");
    expect(agreement.getProductId().toString()).toBe("PROD-1001");
    expect(agreement.getStatus()).toBe("DRAFT");
  });

  it("activates an agreement", () => {
    const agreement = new Agreement(new AgreementId("AGR-1002"), {
      customerId: new CustomerId("CUST-1002"),
      productId: new ProductId("PROD-1002"),
      status: "PENDING_ACCEPTANCE",
      effectiveDate: new Date()
    });

    agreement.activate();

    expect(agreement.getStatus()).toBe("ACTIVE");
  });

  it("suspends an agreement", () => {
    const agreement = new Agreement(new AgreementId("AGR-1003"), {
      customerId: new CustomerId("CUST-1003"),
      productId: new ProductId("PROD-1003"),
      status: "ACTIVE",
      effectiveDate: new Date()
    });

    agreement.suspend();

    expect(agreement.getStatus()).toBe("SUSPENDED");
  });

  it("expires an agreement", () => {
    const agreement = new Agreement(new AgreementId("AGR-1004"), {
      customerId: new CustomerId("CUST-1004"),
      productId: new ProductId("PROD-1004"),
      status: "ACTIVE",
      effectiveDate: new Date()
    });

    agreement.expire();

    expect(agreement.getStatus()).toBe("EXPIRED");
  });

  it("closes an agreement", () => {
    const agreement = new Agreement(new AgreementId("AGR-1005"), {
      customerId: new CustomerId("CUST-1005"),
      productId: new ProductId("PROD-1005"),
      status: "ACTIVE",
      effectiveDate: new Date()
    });

    agreement.close();

    expect(agreement.getStatus()).toBe("CLOSED");
  });
});
