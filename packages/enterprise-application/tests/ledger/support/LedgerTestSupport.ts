import { AccountId, Ledger, LedgerId } from "@epos/enterprise-domain";

import type { LedgerRepository } from "../../../src/ledger/LedgerRepository.js";

export const ledgerFixture = (closed = false): Ledger => {
  const ledger = Ledger.open(
    new LedgerId("LED-1001"),
    new AccountId("ACC-1001")
  );
  if (closed) ledger.close();
  return ledger;
};

export class InMemoryLedgerRepository implements LedgerRepository {
  public savedLedger: Ledger | undefined;

  public constructor(private ledger: Ledger | null = null) {}

  public findById(ledgerId: LedgerId): Promise<Ledger | null> {
    if (this.ledger?.getId().equals(ledgerId)) {
      return Promise.resolve(this.ledger);
    }
    return Promise.resolve(null);
  }

  public save(ledger: Ledger): Promise<void> {
    this.ledger = ledger;
    this.savedLedger = ledger;
    return Promise.resolve();
  }
}
