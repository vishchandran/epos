import { CustomerId } from "../../customer/value-objects/CustomerId.js";
import { ProductId } from "../../product/value-objects/ProductId.js";
import { AgreementId } from "../value-objects/AgreementId.js";

type AgreementStatus =
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
  private props: AgreementProps;

  public constructor(id: AgreementId, props: AgreementProps) {
    this.id = id;
    this.props = props;
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
    return this.props.effectiveDate;
  }

  public activate(): void {
    this.props.status = "ACTIVE";
  }

  public suspend(): void {
    this.props.status = "SUSPENDED";
  }

  public expire(): void {
    this.props.status = "EXPIRED";
  }

  public close(): void {
    this.props.status = "CLOSED";
  }

  public equals(other: Agreement): boolean {
    return this.id.equals(other.id);
  }
}
