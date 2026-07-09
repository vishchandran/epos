export class ProductId {
  private readonly value: string;

  public constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('ProductId cannot be empty.');
    }

    this.value = value;
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: ProductId): boolean {
    return this.value === other.value;
  }
}