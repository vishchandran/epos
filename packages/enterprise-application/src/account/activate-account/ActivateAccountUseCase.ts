import { AccountId } from "@epos/enterprise-domain";

import type { AccountRepository } from "../AccountRepository.js";
import { AccountNotFoundError } from "../errors/AccountNotFoundError.js";
import type { ActivateAccountCommand } from "./ActivateAccountCommand.js";
import type { ActivateAccountResult } from "./ActivateAccountResult.js";

export class ActivateAccountUseCase {
  public constructor(private readonly repository: AccountRepository) {}

  public async execute(
    command: ActivateAccountCommand
  ): Promise<ActivateAccountResult> {
    const account = await this.repository.findById(
      new AccountId(command.accountId)
    );

    if (!account) {
      throw new AccountNotFoundError(command.accountId);
    }

    account.activate();
    await this.repository.save(account);

    return { accountId: account.getId().toString(), status: "ACTIVE" };
  }
}
