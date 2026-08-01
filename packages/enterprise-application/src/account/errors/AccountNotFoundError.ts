import { ApplicationError } from "../../shared/ApplicationError.js";

export class AccountNotFoundError extends ApplicationError {
  public readonly accountId: string;

  public constructor(accountId: string) {
    super(`Account '${accountId}' was not found.`);
    this.accountId = accountId;
  }
}
