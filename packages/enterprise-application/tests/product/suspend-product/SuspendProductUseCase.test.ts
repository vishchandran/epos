import {
  InvalidProductStatusTransitionError,
  Product,
  ProductId
} from "@epos/enterprise-domain";
import { describe, expect, it } from "vitest";

import type { ProductRepository } from "../../../src/product/ProductRepository.js";
import { ProductNotFoundError } from "../../../src/product/errors/ProductNotFoundError.js";
import { SuspendProductUseCase } from "../../../src/product/suspend-product/SuspendProductUseCase.js";

class InMemoryProductRepository implements ProductRepository {
  public savedProduct: Product | undefined;

  public constructor(private readonly product: Product | null) {}

  public findById(productId: ProductId): Promise<Product | null> {
    if (this.product?.getId().equals(productId)) {
      return Promise.resolve(this.product);
    }

    return Promise.resolve(null);
  }

  public save(product: Product): Promise<void> {
    this.savedProduct = product;
    return Promise.resolve();
  }
}

describe("SuspendProductUseCase", () => {
  it("suspends and saves an available product", async () => {
    const product = Product.create(
      new ProductId("PROD-1001"),
      "CC-001",
      "Rewards Credit Card",
      "CREDIT_CARD"
    );

    product.approve();
    product.makeAvailable();

    const repository = new InMemoryProductRepository(product);
    const useCase = new SuspendProductUseCase(repository);

    const result = await useCase.execute({
      productId: "PROD-1001"
    });

    expect(result).toEqual({
      productId: "PROD-1001",
      status: "SUSPENDED"
    });

    expect(repository.savedProduct?.getStatus()).toBe("SUSPENDED");
  });

  it("rejects suspension when the product does not exist", async () => {
    const useCase = new SuspendProductUseCase(
      new InMemoryProductRepository(null)
    );

    await expect(
      useCase.execute({
        productId: "PROD-9999"
      })
    ).rejects.toBeInstanceOf(ProductNotFoundError);
  });

  it("preserves the domain lifecycle rule", async () => {
    const product = Product.create(
      new ProductId("PROD-1002"),
      "CC-002",
      "Rewards Credit Card",
      "CREDIT_CARD"
    );

    const useCase = new SuspendProductUseCase(
      new InMemoryProductRepository(product)
    );

    await expect(
      useCase.execute({
        productId: "PROD-1002"
      })
    ).rejects.toBeInstanceOf(InvalidProductStatusTransitionError);
  });
});
