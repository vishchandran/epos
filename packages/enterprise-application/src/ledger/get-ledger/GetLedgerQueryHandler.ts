import { LedgerId } from "@epos/enterprise-domain";

import type { LedgerRepository } from "../LedgerRepository.js";
import { LedgerNotFoundError } from "../errors/LedgerNotFoundError.js";

export type GetLedgerQuery = {
  readonly ledgerId: string;
};

import type { LedgerStatus } from "@epos/enterprise-domain";

export type LedgerDto = {
  readonly ledgerId: string;
  readonly accountId: string;
  readonly status: LedgerStatus;
};

export class GetLedgerQueryHandler {
  public constructor(private readonly repository: LedgerRepository) {}

  public async execute(query: GetLedgerQuery): Promise<LedgerDto> {
    const ledger = await this.repository.findById(new LedgerId(query.ledgerId));
    if (!ledger) {
      throw new LedgerNotFoundError(query.ledgerId);
    }
    return {
      ledgerId: ledger.getId().toString(),
      accountId: ledger.getAccountId().toString(),
      status: ledger.getStatus()
    };
  }
}
