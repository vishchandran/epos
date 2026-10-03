import { AgreementId } from "@epos/enterprise-domain";

import type { AgreementRepository } from "../AgreementRepository.js";
import { AgreementNotFoundError } from "../errors/AgreementNotFoundError.js";

export type GetAgreementQuery = {
  readonly agreementId: string;
};

import type { AgreementStatus } from "@epos/enterprise-domain";

export type AgreementDto = {
  readonly agreementId: string;
  readonly customerId: string;
  readonly productId: string;
  readonly status: AgreementStatus;
  readonly effectiveDate: string;
};

export class GetAgreementQueryHandler {
  public constructor(
    private readonly agreementRepository: AgreementRepository
  ) {}

  public async execute(query: GetAgreementQuery): Promise<AgreementDto> {
    const agreement = await this.agreementRepository.findById(
      new AgreementId(query.agreementId)
    );

    if (!agreement) {
      throw new AgreementNotFoundError(query.agreementId);
    }

    return {
      agreementId: agreement.getId().toString(),
      customerId: agreement.getCustomerId().toString(),
      productId: agreement.getProductId().toString(),
      status: agreement.getStatus(),
      effectiveDate: agreement.getEffectiveDate().toISOString()
    };
  }
}
