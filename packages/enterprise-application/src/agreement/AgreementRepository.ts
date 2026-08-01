import type { Agreement, AgreementId } from "@epos/enterprise-domain";

export interface AgreementRepository {
  findById(agreementId: AgreementId): Promise<Agreement | null>;
  save(agreement: Agreement): Promise<void>;
}
