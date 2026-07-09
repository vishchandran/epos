export class CustomerId {
  private readonly value: string;

  public constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("CustomerId cannot be empty.");
    }

    this.value = value;
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: CustomerId): boolean {
    return this.value === other.value;
  }
}
