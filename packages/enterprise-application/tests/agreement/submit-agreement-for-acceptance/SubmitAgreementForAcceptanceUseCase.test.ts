import { InvalidAgreementStatusTransitionError } from "@epos/enterprise-domain";
import { describe, expect, it } from "vitest";

import { AgreementNotFoundError } from "../../../src/agreement/errors/AgreementNotFoundError.js";
import { SubmitAgreementForAcceptanceUseCase } from "../../../src/agreement/submit-agreement-for-acceptance/SubmitAgreementForAcceptanceUseCase.js";
import {
  agreementFixture,
  InMemoryAgreementRepository
} from "../support/AgreementTestSupport.js";

describe("SubmitAgreementForAcceptanceUseCase", () => {
  it("submits and saves a draft agreement", async () => {
    const repository = new InMemoryAgreementRepository(agreementFixture());
    const result = await new SubmitAgreementForAcceptanceUseCase(
      repository
    ).execute({ agreementId: "AGR-1001" });
    expect(result).toEqual({
      agreementId: "AGR-1001",
      status: "PENDING_ACCEPTANCE"
    });
    expect(repository.savedAgreement?.getStatus()).toBe("PENDING_ACCEPTANCE");
  });

  it("rejects a missing agreement", async () => {
    const useCase = new SubmitAgreementForAcceptanceUseCase(
      new InMemoryAgreementRepository(null)
    );
    await expect(
      useCase.execute({ agreementId: "AGR-9999" })
    ).rejects.toBeInstanceOf(AgreementNotFoundError);
  });

  it("preserves the domain lifecycle rule", async () => {
    const useCase = new SubmitAgreementForAcceptanceUseCase(
      new InMemoryAgreementRepository(agreementFixture("ACTIVE"))
    );
    await expect(
      useCase.execute({ agreementId: "AGR-1001" })
    ).rejects.toBeInstanceOf(InvalidAgreementStatusTransitionError);
  });
});
