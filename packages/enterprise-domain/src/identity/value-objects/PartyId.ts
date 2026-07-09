export class PartyId {
  private readonly value: string;

  public constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("PartyId cannot be empty.");
    }

    this.value = value;
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: PartyId): boolean {
    return this.value === other.value;
  }
}
