import { AccountId } from "../../account/value-objects/AccountId.js";
import { LedgerId } from "../value-objects/LedgerId.js";
import { LedgerAlreadyClosedError } from "../errors/LedgerAlreadyClosedError.js";

export type LedgerStatus = "OPEN" | "CLOSED";

export class Ledger {
  private readonly id: LedgerId;
  private readonly accountId: AccountId;
  private status: LedgerStatus;

  public static open(id: LedgerId, accountId: AccountId): Ledger {
    return new Ledger(id, accountId);
  }

  public constructor(id: LedgerId, accountId: AccountId) {
    this.id = id;
    this.accountId = accountId;
    this.status = "OPEN";
  }

  public getId(): LedgerId {
    return this.id;
  }

  public getAccountId(): AccountId {
    return this.accountId;
  }

  public getStatus(): LedgerStatus {
    return this.status;
  }

  public close(): void {
    if (this.status === "CLOSED") {
      throw new LedgerAlreadyClosedError();
    }

    this.status = "CLOSED";
  }

  public equals(other: Ledger): boolean {
    return this.id.equals(other.id);
  }
}
