import { ProductId } from "@epos/enterprise-domain";

import type { ProductRepository } from "../ProductRepository.js";
import { ProductNotFoundError } from "../errors/ProductNotFoundError.js";

export type GetProductQuery = {
  readonly productId: string;
};

import type { ProductCategory, ProductStatus } from "@epos/enterprise-domain";

export type ProductDto = {
  readonly productId: string;
  readonly code: string;
  readonly name: string;
  readonly category: ProductCategory;
  readonly status: ProductStatus;
};

export class GetProductQueryHandler {
  public constructor(private readonly productRepository: ProductRepository) {}

  public async execute(query: GetProductQuery): Promise<ProductDto> {
    const product = await this.productRepository.findById(
      new ProductId(query.productId)
    );

    if (!product) {
      throw new ProductNotFoundError(query.productId);
    }

    return {
      productId: product.getId().toString(),
      code: product.getCode(),
      name: product.getName(),
      category: product.getCategory(),
      status: product.getStatus()
    };
  }
}
