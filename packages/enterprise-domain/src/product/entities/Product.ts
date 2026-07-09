import { ProductId } from '../value-objects/ProductId.js';

type ProductCategory = 'DEPOSIT' | 'LOAN' | 'MORTGAGE' | 'LINE_OF_CREDIT' | 'CREDIT_CARD';

type ProductStatus = 'DESIGNED' | 'APPROVED' | 'AVAILABLE' | 'SUSPENDED' | 'RETIRED';

type ProductProps = {
  code: string;
  name: string;
  category: ProductCategory;
  status: ProductStatus;
};

export class Product {
  private readonly id: ProductId;
  private props: ProductProps;

  public constructor(id: ProductId, props: ProductProps) {
    if (!props.code || props.code.trim().length === 0) {
      throw new Error('Product code cannot be empty.');
    }

    if (!props.name || props.name.trim().length === 0) {
      throw new Error('Product name cannot be empty.');
    }

    this.id = id;
    this.props = props;
  }

  public getId(): ProductId {
    return this.id;
  }

  public getCode(): string {
    return this.props.code;
  }

  public getName(): string {
    return this.props.name;
  }

  public getCategory(): ProductCategory {
    return this.props.category;
  }

  public getStatus(): ProductStatus {
    return this.props.status;
  }

  public approve(): void {
    this.props.status = 'APPROVED';
  }

  public makeAvailable(): void {
    this.props.status = 'AVAILABLE';
  }

  public suspend(): void {
    this.props.status = 'SUSPENDED';
  }

  public retire(): void {
    this.props.status = 'RETIRED';
  }

  public rename(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Product name cannot be empty.');
    }

    this.props.name = name;
  }

  public equals(other: Product): boolean {
    return this.id.equals(other.id);
  }
}