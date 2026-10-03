import { AgreementId } from "@epos/enterprise-domain";

import type { AgreementRepository } from "../AgreementRepository.js";
import { AgreementNotFoundError } from "../errors/AgreementNotFoundError.js";

export type SuspendAgreementCommand = { readonly agreementId: string };

export type SuspendAgreementResult = {
  readonly agreementId: string;
  readonly status: "SUSPENDED";
};

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
