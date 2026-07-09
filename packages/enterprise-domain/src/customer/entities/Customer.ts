import { PartyId } from "../../identity/value-objects/PartyId.js";
import { CustomerId } from "../value-objects/CustomerId.js";

type CustomerStatus = "PENDING" | "ACTIVE" | "SUSPENDED" | "CLOSED";

type CustomerSegment = "RETAIL" | "SMALL_BUSINESS" | "COMMERCIAL";

type CustomerProps = {
  partyId: PartyId;
  status: CustomerStatus;
  segment: CustomerSegment;
  customerSince: Date;
};

export class Customer {
  private readonly id: CustomerId;
  private props: CustomerProps;

  public constructor(id: CustomerId, props: CustomerProps) {
    this.id = id;
    this.props = props;
  }

  public getId(): CustomerId {
    return this.id;
  }

  public getPartyId(): PartyId {
    return this.props.partyId;
  }

  public getStatus(): CustomerStatus {
    return this.props.status;
  }

  public getSegment(): CustomerSegment {
    return this.props.segment;
  }

  public getCustomerSince(): Date {
    return this.props.customerSince;
  }

  public activate(): void {
    this.props.status = "ACTIVE";
  }

  public suspend(): void {
    this.props.status = "SUSPENDED";
  }

  public close(): void {
    this.props.status = "CLOSED";
  }

  public changeSegment(segment: CustomerSegment): void {
    this.props.segment = segment;
  }

  public equals(other: Customer): boolean {
    return this.id.equals(other.id);
  }
}
