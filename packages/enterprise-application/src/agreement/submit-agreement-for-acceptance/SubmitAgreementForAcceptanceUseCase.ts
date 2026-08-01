import { AgreementId } from "@epos/enterprise-domain";

import type { AgreementRepository } from "../AgreementRepository.js";
import { AgreementNotFoundError } from "../errors/AgreementNotFoundError.js";
import type { SubmitAgreementForAcceptanceCommand } from "./SubmitAgreementForAcceptanceCommand.js";
import type { SubmitAgreementForAcceptanceResult } from "./SubmitAgreementForAcceptanceResult.js";

export class SubmitAgreementForAcceptanceUseCase {
  public constructor(
    private readonly agreementRepository: AgreementRepository
  ) {}

  public async execute(
    command: SubmitAgreementForAcceptanceCommand
  ): Promise<SubmitAgreementForAcceptanceResult> {
    const agreement = await this.agreementRepository.findById(
      new AgreementId(command.agreementId)
    );

    if (!agreement) {
      throw new AgreementNotFoundError(command.agreementId);
    }

    agreement.submitForAcceptance();
    await this.agreementRepository.save(agreement);

    return {
      agreementId: agreement.getId().toString(),
      status: "PENDING_ACCEPTANCE"
    };
  }
}
