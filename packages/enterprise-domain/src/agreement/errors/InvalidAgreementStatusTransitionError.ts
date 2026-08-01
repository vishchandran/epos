import { DomainError } from "../../shared/errors/DomainError.js";

export class InvalidAgreementStatusTransitionError extends DomainError {
  public constructor(message: string) {
    super(message);
  }
}
