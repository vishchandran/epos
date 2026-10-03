import { AccountId } from "@epos/enterprise-domain";

import type { AccountRepository } from "../AccountRepository.js";
import { AccountNotFoundError } from "../errors/AccountNotFoundError.js";

export type SuspendAccountCommand = {
  readonly accountId: string;
};

export type SuspendAccountResult = {
  readonly accountId: string;
  readonly status: "SUSPENDED";
};

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
