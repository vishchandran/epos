import { AccountId } from "@epos/enterprise-domain";

import type { AccountRepository } from "../AccountRepository.js";
import { AccountNotFoundError } from "../errors/AccountNotFoundError.js";

export type ActivateAccountCommand = {
  readonly accountId: string;
};

export type ActivateAccountResult = {
  readonly accountId: string;
  readonly status: "ACTIVE";
};

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
