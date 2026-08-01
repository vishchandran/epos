import {
  Customer,
  CustomerId,
  PartyId,
  Product,
  ProductId
} from "@epos/enterprise-domain";
import { describe, expect, it } from "vitest";

import type { CustomerRepository } from "../../../src/customer/CustomerRepository.js";
import { CustomerNotFoundError } from "../../../src/customer/errors/CustomerNotFoundError.js";
import type { ProductRepository } from "../../../src/product/ProductRepository.js";
import { ProductNotFoundError } from "../../../src/product/errors/ProductNotFoundError.js";
import type { IdGenerator } from "../../../src/shared/IdGenerator.js";
import { ApplicationValidationError } from "../../../src/shared/validation/ApplicationValidationError.js";
import { CreateAgreementUseCase } from "../../../src/agreement/create-agreement/CreateAgreementUseCase.js";
import { InMemoryAgreementRepository } from "../support/AgreementTestSupport.js";

class CustomerStub implements CustomerRepository {
  public constructor(private readonly customer: Customer | null) {}
  public findById(): Promise<Customer | null> {
    return Promise.resolve(this.customer);
  }
  public save(): Promise<void> {
    return Promise.resolve();
  }
}

class ProductStub implements ProductRepository {
  public constructor(private readonly product: Product | null) {}
  public findById(): Promise<Product | null> {
    return Promise.resolve(this.product);
  }
  public save(): Promise<void> {
    return Promise.resolve();
  }
}

class FixedIdGenerator implements IdGenerator {
  public generate(): string {
    return "AGR-1001";
  }
}

const customer = Customer.create(
  new CustomerId("CUST-1001"),
  new PartyId("PARTY-1001"),
  "RETAIL",
  new Date("2025-01-01T00:00:00.000Z")
);
const product = Product.create(
  new ProductId("PROD-1001"),
  "SAV-001",
  "Premium Savings",
  "DEPOSIT"
);

describe("CreateAgreementUseCase", () => {
  it("creates and saves a draft agreement", async () => {
    const repository = new InMemoryAgreementRepository(null);
    const useCase = new CreateAgreementUseCase(
      new CustomerStub(customer),
      new ProductStub(product),
      repository,
      new FixedIdGenerator()
    );

    const result = await useCase.execute({
      customerId: "CUST-1001",
      productId: "PROD-1001",
      effectiveDate: "2026-01-01T00:00:00.000Z"
    });

    expect(result).toEqual({
      agreementId: "AGR-1001",
      customerId: "CUST-1001",
      productId: "PROD-1001",
      status: "DRAFT",
      effectiveDate: "2026-01-01T00:00:00.000Z"
    });
    expect(repository.savedAgreement?.getStatus()).toBe("DRAFT");
  });

  it("rejects a missing customer", async () => {
    const useCase = new CreateAgreementUseCase(
      new CustomerStub(null),
      new ProductStub(product),
      new InMemoryAgreementRepository(null),
      new FixedIdGenerator()
    );
    await expect(
      useCase.execute({
        customerId: "CUST-9999",
        productId: "PROD-1001",
        effectiveDate: "2026-01-01T00:00:00.000Z"
      })
    ).rejects.toBeInstanceOf(CustomerNotFoundError);
  });

  it("rejects a missing product", async () => {
    const useCase = new CreateAgreementUseCase(
      new CustomerStub(customer),
      new ProductStub(null),
      new InMemoryAgreementRepository(null),
      new FixedIdGenerator()
    );
    await expect(
      useCase.execute({
        customerId: "CUST-1001",
        productId: "PROD-9999",
        effectiveDate: "2026-01-01T00:00:00.000Z"
      })
    ).rejects.toBeInstanceOf(ProductNotFoundError);
  });

  it("rejects an invalid effective date", async () => {
    const useCase = new CreateAgreementUseCase(
      new CustomerStub(customer),
      new ProductStub(product),
      new InMemoryAgreementRepository(null),
      new FixedIdGenerator()
    );

    await expect(
      useCase.execute({
        customerId: "CUST-1001",
        productId: "PROD-1001",
        effectiveDate: "not-a-date"
      })
    ).rejects.toBeInstanceOf(ApplicationValidationError);
  });
});
