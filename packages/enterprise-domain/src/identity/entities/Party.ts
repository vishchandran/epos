import { PartyId } from "../value-objects/PartyId.js";
import { InvalidPartyDisplayNameError } from "../errors/InvalidPartyDisplayNameError.js";

type PartyType = "PERSON" | "ORGANIZATION";

type PartyStatus = "ACTIVE" | "INACTIVE";

type PartyProps = {
  type: PartyType;
  displayName: string;
  status: PartyStatus;
};

export class Party {
  private readonly id: PartyId;
  private readonly props: PartyProps;

  public static register(
    id: PartyId,
    type: PartyType,
    displayName: string
  ): Party {
    return new Party(id, {
      type,
      displayName,
      status: "ACTIVE"
    });
  }

  public constructor(id: PartyId, props: PartyProps) {
    if (!props.displayName || props.displayName.trim().length === 0) {
      throw new InvalidPartyDisplayNameError();
    }

    this.id = id;
    this.props = { ...props };
  }

  public getId(): PartyId {
    return this.id;
  }

  public getDisplayName(): string {
    return this.props.displayName;
  }

  public getType(): PartyType {
    return this.props.type;
  }

  public getStatus(): PartyStatus {
    return this.props.status;
  }

  public changeDisplayName(displayName: string): void {
    if (!displayName || displayName.trim().length === 0) {
      throw new InvalidPartyDisplayNameError();
    }

    this.props.displayName = displayName;
  }

  public deactivate(): void {
    this.props.status = "INACTIVE";
  }

  public activate(): void {
    this.props.status = "ACTIVE";
  }

  public equals(other: Party): boolean {
    return this.id.equals(other.id);
  }
}
