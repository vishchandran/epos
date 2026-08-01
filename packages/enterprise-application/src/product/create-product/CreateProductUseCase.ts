import { Product, ProductId } from "@epos/enterprise-domain";

import type { IdGenerator } from "../../shared/IdGenerator.js";
import type { ProductRepository } from "../ProductRepository.js";
import type { CreateProductCommand } from "./CreateProductCommand.js";
import type { CreateProductResult } from "./CreateProductResult.js";

export class CreateProductUseCase {
  public constructor(
    private readonly productRepository: ProductRepository,
    private readonly idGenerator: IdGenerator
  ) {}

  public async execute(
    command: CreateProductCommand
  ): Promise<CreateProductResult> {
    const product = Product.create(
      new ProductId(this.idGenerator.generate()),
      command.code,
      command.name,
      command.category
    );

    await this.productRepository.save(product);

    return {
      productId: product.getId().toString(),
      code: product.getCode(),
      name: product.getName(),
      category: product.getCategory(),
      status: "DESIGNED"
    };
  }
}
