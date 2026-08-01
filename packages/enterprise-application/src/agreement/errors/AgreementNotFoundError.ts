import { ApplicationError } from "../../shared/ApplicationError.js";

export class AgreementNotFoundError extends ApplicationError {
  public constructor(agreementId: string) {
    super(`Agreement ${agreementId} was not found.`);
  }
}
