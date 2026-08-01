import { Product, ProductId } from "@epos/enterprise-domain";
import { describe, expect, it } from "vitest";

import type { ProductRepository } from "../../../src/product/ProductRepository.js";
import { ProductNotFoundError } from "../../../src/product/errors/ProductNotFoundError.js";
import { GetProductQueryHandler } from "../../../src/product/get-product/GetProductQueryHandler.js";

class InMemoryProductRepository implements ProductRepository {
  public constructor(private readonly product: Product | null) {}

  public findById(productId: ProductId): Promise<Product | null> {
    if (this.product?.getId().equals(productId)) {
      return Promise.resolve(this.product);
    }

    return Promise.resolve(null);
  }

  public save(): Promise<void> {
    return Promise.resolve();
  }
}

describe("GetProductQueryHandler", () => {
  it("returns the requested product as a DTO", async () => {
    const product = Product.create(
      new ProductId("PROD-1001"),
      "SAV-001",
      "Premium Savings",
      "DEPOSIT"
    );

    const handler = new GetProductQueryHandler(
      new InMemoryProductRepository(product)
    );

    const result = await handler.execute({
      productId: "PROD-1001"
    });

    expect(result).toEqual({
      productId: "PROD-1001",
      code: "SAV-001",
      name: "Premium Savings",
      category: "DEPOSIT",
      status: "DESIGNED"
    });
  });

  it("rejects the query when the product does not exist", async () => {
    const handler = new GetProductQueryHandler(
      new InMemoryProductRepository(null)
    );

    await expect(
      handler.execute({
        productId: "PROD-9999"
      })
    ).rejects.toBeInstanceOf(ProductNotFoundError);
  });
});
