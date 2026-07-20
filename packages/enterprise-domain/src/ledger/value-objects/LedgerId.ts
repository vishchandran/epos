export class LedgerId {
  private readonly value: string;

  public constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("LedgerId cannot be empty.");
    }

    this.value = value;
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: LedgerId): boolean {
    return this.value === other.value;
  }
}
