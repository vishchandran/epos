import { ProductId } from "../value-objects/ProductId.js";
import { InvalidProductStatusTransitionError } from "../errors/InvalidProductStatusTransitionError.js";
import { ProductRenameNotAllowedError } from "../errors/ProductRenameNotAllowedError.js";
import { InvalidProductCodeError } from "../errors/InvalidProductCodeError.js";
import { InvalidProductNameError } from "../errors/InvalidProductNameError.js";

export type ProductCategory =
  "DEPOSIT" | "LOAN" | "MORTGAGE" | "LINE_OF_CREDIT" | "CREDIT_CARD";

export type ProductStatus =
  "DESIGNED" | "APPROVED" | "AVAILABLE" | "SUSPENDED" | "RETIRED";

type ProductProps = {
  code: string;
  name: string;
  category: ProductCategory;
  status: ProductStatus;
};

export class Product {
  private readonly id: ProductId;
  private readonly props: ProductProps;

  public static create(
    id: ProductId,
    code: string,
    name: string,
    category: ProductCategory
  ): Product {
    return new Product(id, {
      code,
      name,
      category,
      status: "DESIGNED"
    });
  }

  public constructor(id: ProductId, props: ProductProps) {
    if (!props.code || props.code.trim().length === 0) {
      throw new InvalidProductCodeError();
    }

    if (!props.name || props.name.trim().length === 0) {
      throw new InvalidProductNameError();
    }

    this.id = id;
    this.props = { ...props };
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
    if (this.props.status !== "DESIGNED") {
      throw new InvalidProductStatusTransitionError(
        `Product cannot be approved from status ${this.props.status}.`
      );
    }

    this.props.status = "APPROVED";
  }

  public makeAvailable(): void {
    if (this.props.status !== "APPROVED" && this.props.status !== "SUSPENDED") {
      throw new InvalidProductStatusTransitionError(
        `Product cannot be made available from status ${this.props.status}.`
      );
    }

    this.props.status = "AVAILABLE";
  }

  public suspend(): void {
    if (this.props.status !== "AVAILABLE") {
      throw new InvalidProductStatusTransitionError(
        `Product cannot be suspended from status ${this.props.status}.`
      );
    }

    this.props.status = "SUSPENDED";
  }

  public retire(): void {
    if (
      this.props.status !== "APPROVED" &&
      this.props.status !== "AVAILABLE" &&
      this.props.status !== "SUSPENDED"
    ) {
      throw new InvalidProductStatusTransitionError(
        `Product cannot be retired from status ${this.props.status}.`
      );
    }

    this.props.status = "RETIRED";
  }

  public rename(name: string): void {
    if (this.props.status === "RETIRED") {
      throw new ProductRenameNotAllowedError();
    }

    if (!name || name.trim().length === 0) {
      throw new InvalidProductNameError();
    }

    this.props.name = name;
  }

  public equals(other: Product): boolean {
    return this.id.equals(other.id);
  }
}
