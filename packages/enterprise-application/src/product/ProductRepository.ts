import type { Product, ProductId } from "@epos/enterprise-domain";

export interface ProductRepository {
  findById(productId: ProductId): Promise<Product | null>;
  save(product: Product): Promise<void>;
}
