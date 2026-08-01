import { InvalidDomainIdError } from "../errors/InvalidDomainIdError.js";

export abstract class DomainId {
  protected readonly value: string;

  protected constructor(value: string, idType: string) {
    if (!value || value.trim().length === 0) {
      throw new InvalidDomainIdError(idType);
    }

    this.value = value;
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: DomainId): boolean {
    return this.constructor === other.constructor && this.value === other.value;
  }
}
