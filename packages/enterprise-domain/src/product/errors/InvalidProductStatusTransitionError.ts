import { DomainError } from "../../shared/errors/DomainError.js";

export class InvalidProductStatusTransitionError extends DomainError {
  public constructor(message: string) {
    super(message);
  }
}
