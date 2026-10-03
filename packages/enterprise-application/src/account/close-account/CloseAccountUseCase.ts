import { AccountId } from "@epos/enterprise-domain";

import type { AccountRepository } from "../AccountRepository.js";
import { AccountNotFoundError } from "../errors/AccountNotFoundError.js";

export type CloseAccountCommand = {
  readonly accountId: string;
};

export type CloseAccountResult = {
  readonly accountId: string;
  readonly status: "CLOSED";
};

export class CloseAccountUseCase {
  public constructor(private readonly repository: AccountRepository) {}

  public async execute(
    command: CloseAccountCommand
  ): Promise<CloseAccountResult> {
    const account = await this.repository.findById(
      new AccountId(command.accountId)
    );

    if (!account) {
      throw new AccountNotFoundError(command.accountId);
    }

    account.close();
    await this.repository.save(account);

    return { accountId: account.getId().toString(), status: "CLOSED" };
  }
}
