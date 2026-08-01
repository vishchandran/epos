import { ApplicationError } from "../../shared/ApplicationError.js";

export class ProductNotFoundError extends ApplicationError {
  public readonly productId: string;

  public constructor(productId: string) {
    super(`Product '${productId}' was not found.`);
    this.productId = productId;
  }
}
