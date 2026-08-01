import type { Product } from "@epos/enterprise-domain";
import { describe, expect, it } from "vitest";

import type { ProductRepository } from "../../../src/product/ProductRepository.js";
import { CreateProductUseCase } from "../../../src/product/create-product/CreateProductUseCase.js";
import type { IdGenerator } from "../../../src/shared/IdGenerator.js";

class InMemoryProductRepository implements ProductRepository {
  public savedProduct: Product | undefined;

  public save(product: Product): Promise<void> {
    this.savedProduct = product;
    return Promise.resolve();
  }
}

class FixedIdGenerator implements IdGenerator {
  public generate(): string {
    return "PROD-1001";
  }
}

describe("CreateProductUseCase", () => {
  it("creates and saves a product in designed status", async () => {
    const repository = new InMemoryProductRepository();
    const useCase = new CreateProductUseCase(
      repository,
      new FixedIdGenerator()
    );

    const result = await useCase.execute({
      code: "SAV-001",
      name: "Premium Savings",
      category: "DEPOSIT"
    });

    expect(result).toEqual({
      productId: "PROD-1001",
      code: "SAV-001",
      name: "Premium Savings",
      category: "DEPOSIT",
      status: "DESIGNED"
    });

    expect(repository.savedProduct).toBeDefined();
    expect(repository.savedProduct?.getStatus()).toBe("DESIGNED");
  });
});
