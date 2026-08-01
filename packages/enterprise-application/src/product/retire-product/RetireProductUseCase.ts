import { ProductId } from "@epos/enterprise-domain";

import type { ProductRepository } from "../ProductRepository.js";
import { ProductNotFoundError } from "../errors/ProductNotFoundError.js";
import type { RetireProductCommand } from "./RetireProductCommand.js";
import type { RetireProductResult } from "./RetireProductResult.js";

export class RetireProductUseCase {
  public constructor(private readonly productRepository: ProductRepository) {}

  public async execute(
    command: RetireProductCommand
  ): Promise<RetireProductResult> {
    const product = await this.productRepository.findById(
      new ProductId(command.productId)
    );

    if (!product) {
      throw new ProductNotFoundError(command.productId);
    }

    product.retire();

    await this.productRepository.save(product);

    return {
      productId: product.getId().toString(),
      status: "RETIRED"
    };
  }
}
