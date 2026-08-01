import { InvalidAgreementStatusTransitionError } from "@epos/enterprise-domain";
import { describe, expect, it } from "vitest";

import { ActivateAgreementUseCase } from "../../../src/agreement/activate-agreement/ActivateAgreementUseCase.js";
import { AgreementNotFoundError } from "../../../src/agreement/errors/AgreementNotFoundError.js";
import {
  agreementFixture,
  InMemoryAgreementRepository
} from "../support/AgreementTestSupport.js";

describe("ActivateAgreementUseCase", () => {
  it("activates and saves a pending agreement", async () => {
    const repository = new InMemoryAgreementRepository(
      agreementFixture("PENDING_ACCEPTANCE")
    );
    const result = await new ActivateAgreementUseCase(repository).execute({
      agreementId: "AGR-1001"
    });
    expect(result).toEqual({ agreementId: "AGR-1001", status: "ACTIVE" });
    expect(repository.savedAgreement?.getStatus()).toBe("ACTIVE");
  });

  it("rejects a missing agreement", async () => {
    await expect(
      new ActivateAgreementUseCase(
        new InMemoryAgreementRepository(null)
      ).execute({ agreementId: "AGR-9999" })
    ).rejects.toBeInstanceOf(AgreementNotFoundError);
  });

  it("preserves the domain lifecycle rule", async () => {
    await expect(
      new ActivateAgreementUseCase(
        new InMemoryAgreementRepository(agreementFixture())
      ).execute({ agreementId: "AGR-1001" })
    ).rejects.toBeInstanceOf(InvalidAgreementStatusTransitionError);
  });
});
