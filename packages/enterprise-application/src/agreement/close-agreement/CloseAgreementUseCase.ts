import { AgreementId } from "@epos/enterprise-domain";

import type { AgreementRepository } from "../AgreementRepository.js";
import { AgreementNotFoundError } from "../errors/AgreementNotFoundError.js";

export type CloseAgreementCommand = { readonly agreementId: string };

export type CloseAgreementResult = {
  readonly agreementId: string;
  readonly status: "CLOSED";
};

export class CloseAgreementUseCase {
  public constructor(private readonly repository: AgreementRepository) {}

  public async execute(
    command: CloseAgreementCommand
  ): Promise<CloseAgreementResult> {
    const agreement = await this.repository.findById(
      new AgreementId(command.agreementId)
    );
    if (!agreement) throw new AgreementNotFoundError(command.agreementId);
    agreement.close();
    await this.repository.save(agreement);
    return { agreementId: agreement.getId().toString(), status: "CLOSED" };
  }
}
