import {
  Product,
  ProductId,
  ProductRenameNotAllowedError
} from "@epos/enterprise-domain";
import { describe, expect, it } from "vitest";

import type { ProductRepository } from "../../../src/product/ProductRepository.js";
import { ProductNotFoundError } from "../../../src/product/errors/ProductNotFoundError.js";
import { RenameProductUseCase } from "../../../src/product/rename-product/RenameProductUseCase.js";

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

describe("RenameProductUseCase", () => {
  it("renames and saves an existing product", async () => {
    const product = Product.create(
      new ProductId("PROD-1001"),
      "MTG-001",
      "Mortgage",
      "MORTGAGE"
    );

    const repository = new InMemoryProductRepository(product);
    const useCase = new RenameProductUseCase(repository);

    const result = await useCase.execute({
      productId: "PROD-1001",
      name: "Fixed Rate Mortgage"
    });

    expect(result).toEqual({
      productId: "PROD-1001",
      name: "Fixed Rate Mortgage"
    });

    expect(repository.savedProduct?.getName()).toBe("Fixed Rate Mortgage");
  });

  it("rejects the request when the product does not exist", async () => {
    const useCase = new RenameProductUseCase(
      new InMemoryProductRepository(null)
    );

    await expect(
      useCase.execute({
        productId: "PROD-9999",
        name: "Fixed Rate Mortgage"
      })
    ).rejects.toBeInstanceOf(ProductNotFoundError);
  });

  it("rejects renaming a retired product", async () => {
    const product = new Product(new ProductId("PROD-1002"), {
      code: "MTG-002",
      name: "Legacy Mortgage",
      category: "MORTGAGE",
      status: "RETIRED"
    });

    const useCase = new RenameProductUseCase(
      new InMemoryProductRepository(product)
    );

    await expect(
      useCase.execute({
        productId: "PROD-1002",
        name: "Updated Mortgage"
      })
    ).rejects.toBeInstanceOf(ProductRenameNotAllowedError);
  });

  it("preserves the domain name validation rule", async () => {
    const product = Product.create(
      new ProductId("PROD-1003"),
      "MTG-003",
      "Mortgage",
      "MORTGAGE"
    );

    const useCase = new RenameProductUseCase(
      new InMemoryProductRepository(product)
    );

    await expect(
      useCase.execute({
        productId: "PROD-1003",
        name: "   "
      })
    ).rejects.toThrow("Product name cannot be empty.");
  });
});
