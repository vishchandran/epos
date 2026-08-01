import { AgreementId } from "@epos/enterprise-domain";

import type { AgreementRepository } from "../AgreementRepository.js";
import { AgreementNotFoundError } from "../errors/AgreementNotFoundError.js";
import type { AgreementDto } from "./AgreementDto.js";
import type { GetAgreementQuery } from "./GetAgreementQuery.js";

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
