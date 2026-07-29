import { ApplicationError } from "../../shared/ApplicationError.js";

export class PartyNotFoundError extends ApplicationError {
  public readonly partyId: string;

  public constructor(partyId: string) {
    super(`Party '${partyId}' was not found.`);
    this.partyId = partyId;
  }
}
