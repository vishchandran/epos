import type { ProductCategory } from "@epos/enterprise-domain";

export type CreateProductCommand = {
  readonly code: string;
  readonly name: string;
  readonly category: ProductCategory;
};
