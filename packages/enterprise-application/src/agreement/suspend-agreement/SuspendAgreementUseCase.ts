import { AgreementId } from "@epos/enterprise-domain";

import type { AgreementRepository } from "../AgreementRepository.js";
import { AgreementNotFoundError } from "../errors/AgreementNotFoundError.js";
import type { SuspendAgreementCommand } from "./SuspendAgreementCommand.js";
import type { SuspendAgreementResult } from "./SuspendAgreementResult.js";

export class SuspendAgreementUseCase {
  public constructor(private readonly repository: AgreementRepository) {}

  public async execute(
    command: SuspendAgreementCommand
  ): Promise<SuspendAgreementResult> {
    const agreement = await this.repository.findById(
      new AgreementId(command.agreementId)
    );
    if (!agreement) throw new AgreementNotFoundError(command.agreementId);
    agreement.suspend();
    await this.repository.save(agreement);
    return { agreementId: agreement.getId().toString(), status: "SUSPENDED" };
  }
}
