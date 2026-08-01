import { ProductId } from "@epos/enterprise-domain";

import type { ProductRepository } from "../ProductRepository.js";
import { ProductNotFoundError } from "../errors/ProductNotFoundError.js";
import type { RenameProductCommand } from "./RenameProductCommand.js";
import type { RenameProductResult } from "./RenameProductResult.js";

export class RenameProductUseCase {
  public constructor(private readonly productRepository: ProductRepository) {}

  public async execute(
    command: RenameProductCommand
  ): Promise<RenameProductResult> {
    const product = await this.productRepository.findById(
      new ProductId(command.productId)
    );

    if (!product) {
      throw new ProductNotFoundError(command.productId);
    }

    product.rename(command.name);

    await this.productRepository.save(product);

    return {
      productId: product.getId().toString(),
      name: product.getName()
    };
  }
}
