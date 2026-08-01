import { DomainError } from "../../shared/errors/DomainError.js";

export class AgreementNotActiveForAccountOpeningError extends DomainError {
  public constructor(agreementId: string) {
    super(`Agreement ${agreementId} must be active to open an account.`);
  }
}
