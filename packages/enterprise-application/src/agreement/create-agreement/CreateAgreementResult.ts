export type CreateAgreementResult = {
  readonly agreementId: string;
  readonly customerId: string;
  readonly productId: string;
  readonly status: "DRAFT";
  readonly effectiveDate: string;
};
