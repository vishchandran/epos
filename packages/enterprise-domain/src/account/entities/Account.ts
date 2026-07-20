import { AgreementId } from "../../agreement/value-objects/AgreementId.js";
import { AccountId } from "../value-objects/AccountId.js";

export type AccountStatus = "PENDING" | "ACTIVE" | "SUSPENDED" | "CLOSED";

export class Account {
  public readonly id: AccountId;
  public readonly agreementId: AgreementId;

  private status: AccountStatus;

  public constructor(id: AccountId, agreementId: AgreementId) {
    this.id = id;
    this.agreementId = agreementId;
    this.status = "PENDING";
  }

  public activate(): void {
    if (this.status !== "PENDING" && this.status !== "SUSPENDED") {
      throw new Error(
        `Account cannot be activated from status ${this.status}.`
      );
    }

    this.status = "ACTIVE";
  }

  public suspend(): void {
    if (this.status !== "ACTIVE") {
      throw new Error(
        `Account cannot be suspended from status ${this.status}.`
      );
    }

    this.status = "SUSPENDED";
  }

  public close(): void {
    if (this.status !== "ACTIVE" && this.status !== "SUSPENDED") {
      throw new Error(`Account cannot be closed from status ${this.status}.`);
    }

    this.status = "CLOSED";
  }

  public getStatus(): AccountStatus {
    return this.status;
  }

  public equals(other: Account): boolean {
    return this.id.equals(other.id);
  }
}
