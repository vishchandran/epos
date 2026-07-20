import { AccountId } from "../../account/value-objects/AccountId.js";
import { LedgerId } from "../value-objects/LedgerId.js";

export type LedgerStatus = "OPEN" | "CLOSED";

export class Ledger {
  public readonly id: LedgerId;
  public readonly accountId: AccountId;

  private status: LedgerStatus;

  public constructor(id: LedgerId, accountId: AccountId) {
    this.id = id;
    this.accountId = accountId;
    this.status = "OPEN";
  }

  public close(): void {
    if (this.status === "CLOSED") {
      throw new Error("Ledger is already closed.");
    }

    this.status = "CLOSED";
  }

  public getStatus(): LedgerStatus {
    return this.status;
  }

  public equals(other: Ledger): boolean {
    return this.id.equals(other.id);
  }
}
