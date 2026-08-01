import { DomainError } from "./DomainError.js";

export class InvalidDomainIdError extends DomainError {
  public constructor(idType: string) {
    super(`${idType} cannot be empty.`);
  }
}
