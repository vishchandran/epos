import { DomainError } from "../../shared/errors/DomainError.js";

export class InvalidAgreementEffectiveDateError extends DomainError {
  public constructor() {
    super("Agreement effective date must be valid.");
  }
}
