export class AgreementId {
  private readonly value: string;

  public constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("AgreementId cannot be empty.");
    }

    this.value = value;
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: AgreementId): boolean {
    return this.value === other.value;
  }
}
