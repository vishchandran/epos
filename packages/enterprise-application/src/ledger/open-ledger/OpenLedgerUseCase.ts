import {
  AccountId,
  Ledger,
  LedgerId,
  LedgerOpeningPolicy
} from "@epos/enterprise-domain";

import type { AccountRepository } from "../../account/AccountRepository.js";
import { AccountNotFoundError } from "../../account/errors/AccountNotFoundError.js";
import type { IdGenerator } from "../../shared/IdGenerator.js";
import type { LedgerRepository } from "../LedgerRepository.js";
import type { OpenLedgerCommand } from "./OpenLedgerCommand.js";
import type { OpenLedgerResult } from "./OpenLedgerResult.js";

export class OpenLedgerUseCase {
  public constructor(
    private readonly accountRepository: AccountRepository,
    private readonly ledgerRepository: LedgerRepository,
    private readonly idGenerator: IdGenerator
  ) {}

  public async execute(command: OpenLedgerCommand): Promise<OpenLedgerResult> {
    const accountId = new AccountId(command.accountId);
    const account = await this.accountRepository.findById(accountId);

    if (!account) {
      throw new AccountNotFoundError(command.accountId);
    }

    LedgerOpeningPolicy.ensureAccountIsActive(account);
    const ledger = Ledger.open(
      new LedgerId(this.idGenerator.generate()),
      accountId
    );
    await this.ledgerRepository.save(ledger);

    return {
      ledgerId: ledger.getId().toString(),
      accountId: ledger.getAccountId().toString(),
      status: "OPEN"
    };
  }
}
