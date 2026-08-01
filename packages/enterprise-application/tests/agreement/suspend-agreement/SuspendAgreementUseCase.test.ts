import { InvalidAgreementStatusTransitionError } from "@epos/enterprise-domain";
import { describe, expect, it } from "vitest";

import { AgreementNotFoundError } from "../../../src/agreement/errors/AgreementNotFoundError.js";
import { SuspendAgreementUseCase } from "../../../src/agreement/suspend-agreement/SuspendAgreementUseCase.js";
import {
  agreementFixture,
  InMemoryAgreementRepository
} from "../support/AgreementTestSupport.js";

describe("SuspendAgreementUseCase", () => {
  it("suspends and saves an active agreement", async () => {
    const repository = new InMemoryAgreementRepository(
      agreementFixture("ACTIVE")
    );
    const result = await new SuspendAgreementUseCase(repository).execute({
      agreementId: "AGR-1001"
    });
    expect(result).toEqual({ agreementId: "AGR-1001", status: "SUSPENDED" });
    expect(repository.savedAgreement?.getStatus()).toBe("SUSPENDED");
  });

  it("rejects a missing agreement", async () => {
    await expect(
      new SuspendAgreementUseCase(
        new InMemoryAgreementRepository(null)
      ).execute({ agreementId: "AGR-9999" })
    ).rejects.toBeInstanceOf(AgreementNotFoundError);
  });

  it("preserves the domain lifecycle rule", async () => {
    await expect(
      new SuspendAgreementUseCase(
        new InMemoryAgreementRepository(agreementFixture())
      ).execute({ agreementId: "AGR-1001" })
    ).rejects.toBeInstanceOf(InvalidAgreementStatusTransitionError);
  });
});
