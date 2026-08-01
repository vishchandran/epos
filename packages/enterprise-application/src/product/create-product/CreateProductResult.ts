import type { ProductCategory } from "@epos/enterprise-domain";

export type CreateProductResult = {
  readonly productId: string;
  readonly code: string;
  readonly name: string;
  readonly category: ProductCategory;
  readonly status: "DESIGNED";
};
