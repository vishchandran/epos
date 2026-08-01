import { describe, expect, it } from "vitest";

import { AgreementNotFoundError } from "../../../src/agreement/errors/AgreementNotFoundError.js";
import { GetAgreementQueryHandler } from "../../../src/agreement/get-agreement/GetAgreementQueryHandler.js";
import {
  agreementFixture,
  InMemoryAgreementRepository
} from "../support/AgreementTestSupport.js";

describe("GetAgreementQueryHandler", () => {
  it("returns an agreement DTO", async () => {
    const handler = new GetAgreementQueryHandler(
      new InMemoryAgreementRepository(agreementFixture())
    );
    await expect(handler.execute({ agreementId: "AGR-1001" })).resolves.toEqual(
      {
        agreementId: "AGR-1001",
        customerId: "CUST-1001",
        productId: "PROD-1001",
        status: "DRAFT",
        effectiveDate: "2026-01-01T00:00:00.000Z"
      }
    );
  });

  it("rejects a missing agreement", async () => {
    const handler = new GetAgreementQueryHandler(
      new InMemoryAgreementRepository(null)
    );
    await expect(
      handler.execute({ agreementId: "AGR-9999" })
    ).rejects.toBeInstanceOf(AgreementNotFoundError);
  });
});
