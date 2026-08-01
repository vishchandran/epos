import type { AgreementStatus } from "@epos/enterprise-domain";

export type AgreementDto = {
  readonly agreementId: string;
  readonly customerId: string;
  readonly productId: string;
  readonly status: AgreementStatus;
  readonly effectiveDate: string;
};
