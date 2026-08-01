import type { Ledger, LedgerId } from "@epos/enterprise-domain";

export interface LedgerRepository {
  findById(ledgerId: LedgerId): Promise<Ledger | null>;
  save(ledger: Ledger): Promise<void>;
}
