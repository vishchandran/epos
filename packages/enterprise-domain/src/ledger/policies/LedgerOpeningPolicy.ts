import type { Account } from "../../account/entities/Account.js";
import { AccountNotActiveForLedgerOpeningError } from "../errors/AccountNotActiveForLedgerOpeningError.js";

export class LedgerOpeningPolicy {
  public static ensureAccountIsActive(account: Account): void {
    if (account.getStatus() !== "ACTIVE") {
      throw new AccountNotActiveForLedgerOpeningError(
        account.getId().toString()
      );
    }
  }
}
