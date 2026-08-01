import { CustomerId } from "../../customer/value-objects/CustomerId.js";
import { ProductId } from "../../product/value-objects/ProductId.js";
import { InvalidAgreementStatusTransitionError } from "../errors/InvalidAgreementStatusTransitionError.js";
import { InvalidAgreementEffectiveDateError } from "../errors/InvalidAgreementEffectiveDateError.js";
import { AgreementId } from "../value-objects/AgreementId.js";

export type AgreementStatus =
  | "DRAFT"
  | "PENDING_ACCEPTANCE"
  | "ACTIVE"
  | "SUSPENDED"
  | "EXPIRED"
  | "CLOSED";

type AgreementProps = {
  customerId: CustomerId;
  productId: ProductId;
  status: AgreementStatus;
  effectiveDate: Date;
};

export class Agreement {
  private readonly id: AgreementId;
  private readonly props: AgreementProps;

  public static create(
    id: AgreementId,
    customerId: CustomerId,
    productId: ProductId,
    effectiveDate: Date
  ): Agreement {
    return new Agreement(id, {
      customerId,
      productId,
      status: "DRAFT",
      effectiveDate
    });
  }

  public constructor(id: AgreementId, props: AgreementProps) {
    if (Number.isNaN(props.effectiveDate.getTime())) {
      throw new InvalidAgreementEffectiveDateError();
    }

    this.id = id;
    this.props = {
      ...props,
      effectiveDate: new Date(props.effectiveDate)
    };
  }

  public getId(): AgreementId {
    return this.id;
  }

  public getCustomerId(): CustomerId {
    return this.props.customerId;
  }

  public getProductId(): ProductId {
    return this.props.productId;
  }

  public getStatus(): AgreementStatus {
    return this.props.status;
  }

  public getEffectiveDate(): Date {
    return new Date(this.props.effectiveDate);
  }

  public submitForAcceptance(): void {
    if (this.props.status !== "DRAFT") {
      throw new InvalidAgreementStatusTransitionError(
        `Agreement cannot be submitted for acceptance from status ${this.props.status}.`
      );
    }

    this.props.status = "PENDING_ACCEPTANCE";
  }

  public activate(): void {
    if (
      this.props.status !== "PENDING_ACCEPTANCE" &&
      this.props.status !== "SUSPENDED"
    ) {
      throw new InvalidAgreementStatusTransitionError(
        `Agreement cannot be activated from status ${this.props.status}.`
      );
    }

    this.props.status = "ACTIVE";
  }

  public suspend(): void {
    if (this.props.status !== "ACTIVE") {
      throw new InvalidAgreementStatusTransitionError(
        `Agreement cannot be suspended from status ${this.props.status}.`
      );
    }

    this.props.status = "SUSPENDED";
  }

  public expire(): void {
    if (this.props.status !== "ACTIVE" && this.props.status !== "SUSPENDED") {
      throw new InvalidAgreementStatusTransitionError(
        `Agreement cannot expire from status ${this.props.status}.`
      );
    }

    this.props.status = "EXPIRED";
  }

  public close(): void {
    if (this.props.status !== "ACTIVE" && this.props.status !== "SUSPENDED") {
      throw new InvalidAgreementStatusTransitionError(
        `Agreement cannot be closed from status ${this.props.status}.`
      );
    }

    this.props.status = "CLOSED";
  }

  public equals(other: Agreement): boolean {
    return this.id.equals(other.id);
  }
}
