import { ApplicationError } from "../../shared/ApplicationError.js";

export class LedgerNotFoundError extends ApplicationError {
  public constructor(ledgerId: string) {
    super(`Ledger ${ledgerId} was not found.`);
  }
}
