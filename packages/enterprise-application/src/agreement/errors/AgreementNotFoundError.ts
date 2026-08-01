import { ApplicationError } from "../../shared/ApplicationError.js";

export class AgreementNotFoundError extends ApplicationError {
  public readonly agreementId: string;

  public constructor(agreementId: string) {
    super(`Agreement '${agreementId}' was not found.`);
    this.agreementId = agreementId;
  }
}
