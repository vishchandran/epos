import { ApplicationError } from "../../shared/ApplicationError.js";

export class LedgerNotFoundError extends ApplicationError {
  public readonly ledgerId: string;

  public constructor(ledgerId: string) {
    super(`Ledger '${ledgerId}' was not found.`);
    this.ledgerId = ledgerId;
  }
}
