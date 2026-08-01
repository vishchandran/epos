import { AccountId } from "@epos/enterprise-domain";

import type { AccountRepository } from "../AccountRepository.js";
import { AccountNotFoundError } from "../errors/AccountNotFoundError.js";
import type { SuspendAccountCommand } from "./SuspendAccountCommand.js";
import type { SuspendAccountResult } from "./SuspendAccountResult.js";

export class SuspendAccountUseCase {
  public constructor(private readonly repository: AccountRepository) {}

  public async execute(
    command: SuspendAccountCommand
  ): Promise<SuspendAccountResult> {
    const account = await this.repository.findById(
      new AccountId(command.accountId)
    );

    if (!account) {
      throw new AccountNotFoundError(command.accountId);
    }

    account.suspend();
    await this.repository.save(account);

    return { accountId: account.getId().toString(), status: "SUSPENDED" };
  }
}
