import { AccountId } from "@epos/enterprise-domain";

import type { AccountRepository } from "../AccountRepository.js";
import { AccountNotFoundError } from "../errors/AccountNotFoundError.js";
import type { AccountDto } from "./AccountDto.js";
import type { GetAccountQuery } from "./GetAccountQuery.js";

export class GetAccountQueryHandler {
  public constructor(private readonly repository: AccountRepository) {}

  public async execute(query: GetAccountQuery): Promise<AccountDto> {
    const account = await this.repository.findById(
      new AccountId(query.accountId)
    );

    if (!account) {
      throw new AccountNotFoundError(query.accountId);
    }

    return {
      accountId: account.getId().toString(),
      agreementId: account.getAgreementId().toString(),
      status: account.getStatus()
    };
  }
}
