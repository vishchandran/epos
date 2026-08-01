import {
  InvalidProductStatusTransitionError,
  Product,
  ProductId
} from "@epos/enterprise-domain";
import { describe, expect, it } from "vitest";

import type { ProductRepository } from "../../../src/product/ProductRepository.js";
import { ProductNotFoundError } from "../../../src/product/errors/ProductNotFoundError.js";
import { MakeProductAvailableUseCase } from "../../../src/product/make-product-available/MakeProductAvailableUseCase.js";

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

describe("MakeProductAvailableUseCase", () => {
  it("makes an approved product available and saves it", async () => {
    const product = Product.create(
      new ProductId("PROD-1001"),
      "SAV-001",
      "Premium Savings",
      "DEPOSIT"
    );

    product.approve();

    const repository = new InMemoryProductRepository(product);
    const useCase = new MakeProductAvailableUseCase(repository);

    const result = await useCase.execute({
      productId: "PROD-1001"
    });

    expect(result).toEqual({
      productId: "PROD-1001",
      status: "AVAILABLE"
    });

    expect(repository.savedProduct?.getStatus()).toBe("AVAILABLE");
  });

  it("restores a suspended product to available", async () => {
    const product = new Product(new ProductId("PROD-1002"), {
      code: "SAV-002",
      name: "Premium Savings",
      category: "DEPOSIT",
      status: "SUSPENDED"
    });

    const repository = new InMemoryProductRepository(product);
    const useCase = new MakeProductAvailableUseCase(repository);

    const result = await useCase.execute({
      productId: "PROD-1002"
    });

    expect(result.status).toBe("AVAILABLE");
    expect(repository.savedProduct?.getStatus()).toBe("AVAILABLE");
  });

  it("rejects the request when the product does not exist", async () => {
    const useCase = new MakeProductAvailableUseCase(
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
      new ProductId("PROD-1003"),
      "SAV-003",
      "Premium Savings",
      "DEPOSIT"
    );

    const useCase = new MakeProductAvailableUseCase(
      new InMemoryProductRepository(product)
    );

    await expect(
      useCase.execute({
        productId: "PROD-1003"
      })
    ).rejects.toBeInstanceOf(InvalidProductStatusTransitionError);
  });
});
