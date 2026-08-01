import { DomainError } from "../../shared/errors/DomainError.js";

export class InvalidCustomerSinceDateError extends DomainError {
  public constructor() {
    super("Customer since date must be valid.");
  }
}
