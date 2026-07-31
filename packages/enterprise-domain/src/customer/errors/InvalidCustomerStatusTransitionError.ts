import { DomainError } from "../../shared/errors/DomainError.js";

export class InvalidCustomerStatusTransitionError extends DomainError {
  public constructor(message: string) {
    super(message);
  }
}
