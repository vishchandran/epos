import { AgreementId } from "../../agreement/value-objects/AgreementId.js";
import { AccountId } from "../value-objects/AccountId.js";
import { InvalidAccountStatusTransitionError } from "../errors/InvalidAccountStatusTransitionError.js";

export type AccountStatus = "PENDING" | "ACTIVE" | "SUSPENDED" | "CLOSED";

export class Account {
  private readonly id: AccountId;
  private readonly agreementId: AgreementId;
  private status: AccountStatus;

  public static open(id: AccountId, agreementId: AgreementId): Account {
    return new Account(id, agreementId);
  }

  public constructor(id: AccountId, agreementId: AgreementId) {
    this.id = id;
    this.agreementId = agreementId;
    this.status = "PENDING";
  }

  public getId(): AccountId {
    return this.id;
  }

  public getAgreementId(): AgreementId {
    return this.agreementId;
  }

  public getStatus(): AccountStatus {
    return this.status;
  }

  public activate(): void {
    if (this.status !== "PENDING" && this.status !== "SUSPENDED") {
      throw new InvalidAccountStatusTransitionError(
        `Account cannot be activated from status ${this.status}.`
      );
    }

    this.status = "ACTIVE";
  }

  public suspend(): void {
    if (this.status !== "ACTIVE") {
      throw new InvalidAccountStatusTransitionError(
        `Account cannot be suspended from status ${this.status}.`
      );
    }

    this.status = "SUSPENDED";
  }

  public close(): void {
    if (this.status !== "ACTIVE" && this.status !== "SUSPENDED") {
      throw new InvalidAccountStatusTransitionError(
        `Account cannot be closed from status ${this.status}.`
      );
    }

    this.status = "CLOSED";
  }

  public equals(other: Account): boolean {
    return this.id.equals(other.id);
  }
}
