import { DomainError } from "../../shared/errors/DomainError.js";

export class InvalidProductCodeError extends DomainError {
  public constructor() {
    super("Product code cannot be empty.");
  }
}
