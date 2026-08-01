import { LedgerId } from "@epos/enterprise-domain";

import type { LedgerRepository } from "../LedgerRepository.js";
import { LedgerNotFoundError } from "../errors/LedgerNotFoundError.js";
import type { CloseLedgerCommand } from "./CloseLedgerCommand.js";
import type { CloseLedgerResult } from "./CloseLedgerResult.js";

export class CloseLedgerUseCase {
  public constructor(private readonly repository: LedgerRepository) {}

  public async execute(
    command: CloseLedgerCommand
  ): Promise<CloseLedgerResult> {
    const ledger = await this.repository.findById(
      new LedgerId(command.ledgerId)
    );

    if (!ledger) {
      throw new LedgerNotFoundError(command.ledgerId);
    }

    ledger.close();
    await this.repository.save(ledger);

    return { ledgerId: ledger.getId().toString(), status: "CLOSED" };
  }
}
