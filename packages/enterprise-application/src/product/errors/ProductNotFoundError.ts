import { ApplicationError } from "../../shared/ApplicationError.js";

export class ProductNotFoundError extends ApplicationError {
  public constructor(productId: string) {
    super(`Product ${productId} was not found.`);
  }
}
