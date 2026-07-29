import { DomainError } from "../../shared/errors/DomainError.js";

export class InvalidPartyDisplayNameError extends DomainError {
  public constructor() {
    super("Party display name cannot be empty.");
  }
}
