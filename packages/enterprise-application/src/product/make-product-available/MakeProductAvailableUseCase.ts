import { ProductId } from "@epos/enterprise-domain";

import type { ProductRepository } from "../ProductRepository.js";
import { ProductNotFoundError } from "../errors/ProductNotFoundError.js";

export type MakeProductAvailableCommand = {
  readonly productId: string;
};

export type MakeProductAvailableResult = {
  readonly productId: string;
  readonly status: "AVAILABLE";
};

export class MakeProductAvailableUseCase {
  public constructor(private readonly productRepository: ProductRepository) {}

  public async execute(
    command: MakeProductAvailableCommand
  ): Promise<MakeProductAvailableResult> {
    const product = await this.productRepository.findById(
      new ProductId(command.productId)
    );

    if (!product) {
      throw new ProductNotFoundError(command.productId);
    }

    product.makeAvailable();

    await this.productRepository.save(product);

    return {
      productId: product.getId().toString(),
      status: "AVAILABLE"
    };
  }
}
