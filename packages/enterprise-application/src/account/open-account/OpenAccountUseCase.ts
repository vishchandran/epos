import {
  Account,
  AccountId,
  AccountOpeningPolicy,
  AgreementId
} from "@epos/enterprise-domain";

import type { AgreementRepository } from "../../agreement/AgreementRepository.js";
import { AgreementNotFoundError } from "../../agreement/errors/AgreementNotFoundError.js";
import type { IdGenerator } from "../../shared/IdGenerator.js";
import type { AccountRepository } from "../AccountRepository.js";
import type { OpenAccountCommand } from "./OpenAccountCommand.js";
import type { OpenAccountResult } from "./OpenAccountResult.js";

export class OpenAccountUseCase {
  public constructor(
    private readonly agreementRepository: AgreementRepository,
    private readonly accountRepository: AccountRepository,
    private readonly idGenerator: IdGenerator
  ) {}

  public async execute(
    command: OpenAccountCommand
  ): Promise<OpenAccountResult> {
    const agreementId = new AgreementId(command.agreementId);
    const agreement = await this.agreementRepository.findById(agreementId);

    if (!agreement) {
      throw new AgreementNotFoundError(command.agreementId);
    }

    AccountOpeningPolicy.ensureAgreementIsActive(agreement);

    const account = Account.open(
      new AccountId(this.idGenerator.generate()),
      agreementId
    );
    await this.accountRepository.save(account);

    return {
      accountId: account.getId().toString(),
      agreementId: account.getAgreementId().toString(),
      status: "PENDING"
    };
  }
}
