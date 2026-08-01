import { PartyId } from "../../party/value-objects/PartyId.js";
import { CustomerId } from "../value-objects/CustomerId.js";
import { InvalidCustomerStatusTransitionError } from "../errors/InvalidCustomerStatusTransitionError.js";
import { CustomerSegmentChangeNotAllowedError } from "../errors/CustomerSegmentChangeNotAllowedError.js";
import { InvalidCustomerSinceDateError } from "../errors/InvalidCustomerSinceDateError.js";

export type CustomerStatus = "PENDING" | "ACTIVE" | "SUSPENDED" | "CLOSED";

export type CustomerSegment = "RETAIL" | "SMALL_BUSINESS" | "COMMERCIAL";

type CustomerProps = {
  partyId: PartyId;
  status: CustomerStatus;
  segment: CustomerSegment;
  customerSince: Date;
};

export class Customer {
  private readonly id: CustomerId;
  private readonly props: CustomerProps;

  public static create(
    id: CustomerId,
    partyId: PartyId,
    segment: CustomerSegment,
    customerSince: Date
  ): Customer {
    return new Customer(id, {
      partyId,
      status: "PENDING",
      segment,
      customerSince
    });
  }

  public constructor(id: CustomerId, props: CustomerProps) {
    if (Number.isNaN(props.customerSince.getTime())) {
      throw new InvalidCustomerSinceDateError();
    }

    this.id = id;
    this.props = {
      ...props,
      customerSince: new Date(props.customerSince)
    };
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
    return new Date(this.props.customerSince);
  }

  public activate(): void {
    if (this.props.status !== "PENDING" && this.props.status !== "SUSPENDED") {
      throw new InvalidCustomerStatusTransitionError(
        `Customer cannot be activated from status ${this.props.status}.`
      );
    }

    this.props.status = "ACTIVE";
  }

  public suspend(): void {
    if (this.props.status !== "ACTIVE") {
      throw new InvalidCustomerStatusTransitionError(
        `Customer cannot be suspended from status ${this.props.status}.`
      );
    }

    this.props.status = "SUSPENDED";
  }

  public close(): void {
    if (this.props.status !== "ACTIVE" && this.props.status !== "SUSPENDED") {
      throw new InvalidCustomerStatusTransitionError(
        `Customer cannot be closed from status ${this.props.status}.`
      );
    }

    this.props.status = "CLOSED";
  }

  public changeSegment(segment: CustomerSegment): void {
    if (this.props.status !== "PENDING" && this.props.status !== "ACTIVE") {
      throw new CustomerSegmentChangeNotAllowedError(this.props.status);
    }

    this.props.segment = segment;
  }

  public equals(other: Customer): boolean {
    return this.id.equals(other.id);
  }
}
