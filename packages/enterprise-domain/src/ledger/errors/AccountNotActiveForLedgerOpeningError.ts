import { DomainError } from "../../shared/errors/DomainError.js";

export class AccountNotActiveForLedgerOpeningError extends DomainError {
  public constructor(accountId: string) {
    super(`Account ${accountId} must be active to open a ledger.`);
  }
}
