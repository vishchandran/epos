import { ProductId } from "@epos/enterprise-domain";

import type { ProductRepository } from "../ProductRepository.js";
import { ProductNotFoundError } from "../errors/ProductNotFoundError.js";
import type { GetProductQuery } from "./GetProductQuery.js";
import type { ProductDto } from "./ProductDto.js";

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
