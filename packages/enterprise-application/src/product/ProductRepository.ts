import type { Product } from "@epos/enterprise-domain";

export interface ProductRepository {
  save(product: Product): Promise<void>;
}
