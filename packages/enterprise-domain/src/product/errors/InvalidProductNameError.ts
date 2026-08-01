import { DomainError } from "../../shared/errors/DomainError.js";

export class InvalidProductNameError extends DomainError {
  public constructor() {
    super("Product name cannot be empty.");
  }
}
