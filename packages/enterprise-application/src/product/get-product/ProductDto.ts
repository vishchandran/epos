import type { ProductCategory, ProductStatus } from "@epos/enterprise-domain";

export type ProductDto = {
  readonly productId: string;
  readonly code: string;
  readonly name: string;
  readonly category: ProductCategory;
  readonly status: ProductStatus;
};
