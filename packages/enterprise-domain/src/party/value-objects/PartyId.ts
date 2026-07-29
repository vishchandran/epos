import { DomainId } from "../../shared/domain/DomainId.js";

export class PartyId extends DomainId {
  public constructor(value: string) {
    super(value, "PartyId");
  }
}
