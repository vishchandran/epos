import type { Ledger } from "@epos/enterprise-domain";

export interface LedgerRepository {
  save(ledger: Ledger): Promise<void>;
}
