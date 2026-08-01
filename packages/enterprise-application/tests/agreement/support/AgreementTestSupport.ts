import {
  Agreement,
  AgreementId,
  type AgreementStatus,
  CustomerId,
  ProductId
} from "@epos/enterprise-domain";

import type { AgreementRepository } from "../../../src/agreement/AgreementRepository.js";

export const agreementFixture = (
  status: AgreementStatus = "DRAFT"
): Agreement =>
  new Agreement(new AgreementId("AGR-1001"), {
    customerId: new CustomerId("CUST-1001"),
    productId: new ProductId("PROD-1001"),
    status,
    effectiveDate: new Date("2026-01-01T00:00:00.000Z")
  });

export class InMemoryAgreementRepository implements AgreementRepository {
  public savedAgreement: Agreement | undefined;

  public constructor(private agreement: Agreement | null) {}

  public findById(agreementId: AgreementId): Promise<Agreement | null> {
    if (this.agreement?.getId().equals(agreementId)) {
      return Promise.resolve(this.agreement);
    }
    return Promise.resolve(null);
  }

  public save(agreement: Agreement): Promise<void> {
    this.agreement = agreement;
    this.savedAgreement = agreement;
    return Promise.resolve();
  }
}
