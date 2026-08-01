import { ProductId } from "@epos/enterprise-domain";

import type { ProductRepository } from "../ProductRepository.js";
import { ProductNotFoundError } from "../errors/ProductNotFoundError.js";
import type { SuspendProductCommand } from "./SuspendProductCommand.js";
import type { SuspendProductResult } from "./SuspendProductResult.js";

export class SuspendProductUseCase {
  public constructor(private readonly productRepository: ProductRepository) {}

  public async execute(
    command: SuspendProductCommand
  ): Promise<SuspendProductResult> {
    const product = await this.productRepository.findById(
      new ProductId(command.productId)
    );

    if (!product) {
      throw new ProductNotFoundError(command.productId);
    }

    product.suspend();

    await this.productRepository.save(product);

    return {
      productId: product.getId().toString(),
      status: "SUSPENDED"
    };
  }
}
