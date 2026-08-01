import { LedgerId } from "@epos/enterprise-domain";

import type { LedgerRepository } from "../LedgerRepository.js";
import { LedgerNotFoundError } from "../errors/LedgerNotFoundError.js";
import type { GetLedgerQuery } from "./GetLedgerQuery.js";
import type { LedgerDto } from "./LedgerDto.js";

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
