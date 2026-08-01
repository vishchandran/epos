import { describe, expect, it } from "vitest";
import {
  InvalidProductStatusTransitionError,
  Product,
  ProductId
} from "../../src/product/index.js";

describe("Product", () => {
  it("creates a product", () => {
    const product = new Product(new ProductId("PROD-1001"), {
      code: "CHK-001",
      name: "Everyday Chequing",
      category: "DEPOSIT",
      status: "DESIGNED"
    });

    expect(product.getId().toString()).toBe("PROD-1001");
    expect(product.getCode()).toBe("CHK-001");
    expect(product.getName()).toBe("Everyday Chequing");
    expect(product.getCategory()).toBe("DEPOSIT");
    expect(product.getStatus()).toBe("DESIGNED");
  });

  it("approves a product", () => {
    const product = new Product(new ProductId("PROD-1002"), {
      code: "SAV-001",
      name: "Premium Savings",
      category: "DEPOSIT",
      status: "DESIGNED"
    });

    product.approve();

    expect(product.getStatus()).toBe("APPROVED");
  });

  it("makes a product available", () => {
    const product = new Product(new ProductId("PROD-1003"), {
      code: "LOC-001",
      name: "Line of Credit",
      category: "LINE_OF_CREDIT",
      status: "APPROVED"
    });

    product.makeAvailable();

    expect(product.getStatus()).toBe("AVAILABLE");
  });

  it("suspends a product", () => {
    const product = new Product(new ProductId("PROD-1004"), {
      code: "CC-001",
      name: "Credit Card",
      category: "CREDIT_CARD",
      status: "AVAILABLE"
    });

    product.suspend();

    expect(product.getStatus()).toBe("SUSPENDED");
  });

  it("retires a product", () => {
    const product = new Product(new ProductId("PROD-1005"), {
      code: "LOAN-001",
      name: "Personal Loan",
      category: "LOAN",
      status: "AVAILABLE"
    });

    product.retire();

    expect(product.getStatus()).toBe("RETIRED");
  });

  it("renames a product", () => {
    const product = new Product(new ProductId("PROD-1006"), {
      code: "MTG-001",
      name: "Mortgage",
      category: "MORTGAGE",
      status: "AVAILABLE"
    });

    product.rename("Fixed Rate Mortgage");

    expect(product.getName()).toBe("Fixed Rate Mortgage");
  });

  it.each(["APPROVED", "AVAILABLE", "SUSPENDED", "RETIRED"] as const)(
    "rejects approval when the product status is %s",
    (status) => {
      const product = new Product(new ProductId("PROD-2001"), {
        code: "SAV-001",
        name: "Premium Savings",
        category: "DEPOSIT",
        status
      });

      expect(() => product.approve()).toThrow(
        InvalidProductStatusTransitionError
      );
    }
  );

  it("makes a suspended product available again", () => {
    const product = new Product(new ProductId("PROD-2002"), {
      code: "SAV-002",
      name: "Premium Savings",
      category: "DEPOSIT",
      status: "SUSPENDED"
    });

    product.makeAvailable();

    expect(product.getStatus()).toBe("AVAILABLE");
  });

  it.each(["DESIGNED", "AVAILABLE", "RETIRED"] as const)(
    "rejects making a product available from status %s",
    (status) => {
      const product = new Product(new ProductId("PROD-2003"), {
        code: "SAV-003",
        name: "Premium Savings",
        category: "DEPOSIT",
        status
      });

      expect(() => product.makeAvailable()).toThrow(
        InvalidProductStatusTransitionError
      );
    }
  );
  it.each(["DESIGNED", "APPROVED", "SUSPENDED", "RETIRED"] as const)(
    "rejects suspension when the product status is %s",
    (status) => {
      const product = new Product(new ProductId("PROD-2004"), {
        code: "CC-002",
        name: "Rewards Credit Card",
        category: "CREDIT_CARD",
        status
      });

      expect(() => product.suspend()).toThrow(
        InvalidProductStatusTransitionError
      );
    }
  );
  it.each(["APPROVED", "SUSPENDED"] as const)(
    "retires a product from status %s",
    (status) => {
      const product = new Product(new ProductId("PROD-2005"), {
        code: "LOAN-002",
        name: "Personal Loan",
        category: "LOAN",
        status
      });

      product.retire();

      expect(product.getStatus()).toBe("RETIRED");
    }
  );

  it.each(["DESIGNED", "RETIRED"] as const)(
    "rejects retirement when the product status is %s",
    (status) => {
      const product = new Product(new ProductId("PROD-2006"), {
        code: "LOAN-003",
        name: "Personal Loan",
        category: "LOAN",
        status
      });

      expect(() => product.retire()).toThrow(
        InvalidProductStatusTransitionError
      );
    }
  );
});
