import { AgreementId } from "@epos/enterprise-domain";

import type { AgreementRepository } from "../AgreementRepository.js";
import { AgreementNotFoundError } from "../errors/AgreementNotFoundError.js";
import type { ActivateAgreementCommand } from "./ActivateAgreementCommand.js";
import type { ActivateAgreementResult } from "./ActivateAgreementResult.js";

export class ActivateAgreementUseCase {
  public constructor(private readonly repository: AgreementRepository) {}

  public async execute(
    command: ActivateAgreementCommand
  ): Promise<ActivateAgreementResult> {
    const agreement = await this.repository.findById(
      new AgreementId(command.agreementId)
    );
    if (!agreement) throw new AgreementNotFoundError(command.agreementId);
    agreement.activate();
    await this.repository.save(agreement);
    return { agreementId: agreement.getId().toString(), status: "ACTIVE" };
  }
}
