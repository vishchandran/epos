import { InvalidAgreementStatusTransitionError } from "@epos/enterprise-domain";
import { describe, expect, it } from "vitest";

import { CloseAgreementUseCase } from "../../../src/agreement/close-agreement/CloseAgreementUseCase.js";
import { AgreementNotFoundError } from "../../../src/agreement/errors/AgreementNotFoundError.js";
import {
  agreementFixture,
  InMemoryAgreementRepository
} from "../support/AgreementTestSupport.js";

describe("CloseAgreementUseCase", () => {
  it("closes and saves an active agreement", async () => {
    const repository = new InMemoryAgreementRepository(
      agreementFixture("ACTIVE")
    );
    const result = await new CloseAgreementUseCase(repository).execute({
      agreementId: "AGR-1001"
    });
    expect(result).toEqual({ agreementId: "AGR-1001", status: "CLOSED" });
    expect(repository.savedAgreement?.getStatus()).toBe("CLOSED");
  });

  it("rejects a missing agreement", async () => {
    await expect(
      new CloseAgreementUseCase(new InMemoryAgreementRepository(null)).execute({
        agreementId: "AGR-9999"
      })
    ).rejects.toBeInstanceOf(AgreementNotFoundError);
  });

  it("preserves the domain lifecycle rule", async () => {
    await expect(
      new CloseAgreementUseCase(
        new InMemoryAgreementRepository(agreementFixture())
      ).execute({ agreementId: "AGR-1001" })
    ).rejects.toBeInstanceOf(InvalidAgreementStatusTransitionError);
  });
});
