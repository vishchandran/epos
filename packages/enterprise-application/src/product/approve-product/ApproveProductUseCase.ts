import { ProductId } from "@epos/enterprise-domain";

import type { ProductRepository } from "../ProductRepository.js";
import { ProductNotFoundError } from "../errors/ProductNotFoundError.js";
import type { ApproveProductCommand } from "./ApproveProductCommand.js";
import type { ApproveProductResult } from "./ApproveProductResult.js";

export class ApproveProductUseCase {
  public constructor(private readonly productRepository: ProductRepository) {}

  public async execute(
    command: ApproveProductCommand
  ): Promise<ApproveProductResult> {
    const product = await this.productRepository.findById(
      new ProductId(command.productId)
    );

    if (!product) {
      throw new ProductNotFoundError(command.productId);
    }

    product.approve();

    await this.productRepository.save(product);

    return {
      productId: product.getId().toString(),
      status: "APPROVED"
    };
  }
}
