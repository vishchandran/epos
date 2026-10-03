import { LedgerId } from "@epos/enterprise-domain";

import type { LedgerRepository } from "../LedgerRepository.js";
import { LedgerNotFoundError } from "../errors/LedgerNotFoundError.js";

export type CloseLedgerCommand = {
  readonly ledgerId: string;
};

export type CloseLedgerResult = {
  readonly ledgerId: string;
  readonly status: "CLOSED";
};

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
