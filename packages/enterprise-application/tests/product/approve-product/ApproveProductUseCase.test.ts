import {
  InvalidProductStatusTransitionError,
  Product,
  ProductId
} from "@epos/enterprise-domain";
import { describe, expect, it } from "vitest";

import type { ProductRepository } from "../../../src/product/ProductRepository.js";
import { ApproveProductUseCase } from "../../../src/product/approve-product/ApproveProductUseCase.js";
import { ProductNotFoundError } from "../../../src/product/errors/ProductNotFoundError.js";

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

describe("ApproveProductUseCase", () => {
  it("approves and saves a designed product", async () => {
    const product = Product.create(
      new ProductId("PROD-1001"),
      "SAV-001",
      "Premium Savings",
      "DEPOSIT"
    );

    const repository = new InMemoryProductRepository(product);
    const useCase = new ApproveProductUseCase(repository);

    const result = await useCase.execute({
      productId: "PROD-1001"
    });

    expect(result).toEqual({
      productId: "PROD-1001",
      status: "APPROVED"
    });

    expect(repository.savedProduct?.getStatus()).toBe("APPROVED");
  });

  it("rejects approval when the product does not exist", async () => {
    const useCase = new ApproveProductUseCase(
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
      new ProductId("PROD-1001"),
      "SAV-001",
      "Premium Savings",
      "DEPOSIT"
    );

    product.approve();

    const useCase = new ApproveProductUseCase(
      new InMemoryProductRepository(product)
    );

    await expect(
      useCase.execute({
        productId: "PROD-1001"
      })
    ).rejects.toBeInstanceOf(InvalidProductStatusTransitionError);
  });
});
