import { AgreementId } from "@epos/enterprise-domain";

import type { AgreementRepository } from "../AgreementRepository.js";
import { AgreementNotFoundError } from "../errors/AgreementNotFoundError.js";

export type ExpireAgreementCommand = { readonly agreementId: string };

export type ExpireAgreementResult = {
  readonly agreementId: string;
  readonly status: "EXPIRED";
};

export class ExpireAgreementUseCase {
  public constructor(private readonly repository: AgreementRepository) {}

  public async execute(
    command: ExpireAgreementCommand
  ): Promise<ExpireAgreementResult> {
    const agreement = await this.repository.findById(
      new AgreementId(command.agreementId)
    );
    if (!agreement) throw new AgreementNotFoundError(command.agreementId);
    agreement.expire();
    await this.repository.save(agreement);
    return { agreementId: agreement.getId().toString(), status: "EXPIRED" };
  }
}
