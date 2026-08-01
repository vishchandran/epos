import { InvalidAgreementStatusTransitionError } from "@epos/enterprise-domain";
import { describe, expect, it } from "vitest";

import { AgreementNotFoundError } from "../../../src/agreement/errors/AgreementNotFoundError.js";
import { ExpireAgreementUseCase } from "../../../src/agreement/expire-agreement/ExpireAgreementUseCase.js";
import {
  agreementFixture,
  InMemoryAgreementRepository
} from "../support/AgreementTestSupport.js";

describe("ExpireAgreementUseCase", () => {
  it("expires and saves an active agreement", async () => {
    const repository = new InMemoryAgreementRepository(
      agreementFixture("ACTIVE")
    );
    const result = await new ExpireAgreementUseCase(repository).execute({
      agreementId: "AGR-1001"
    });
    expect(result).toEqual({ agreementId: "AGR-1001", status: "EXPIRED" });
    expect(repository.savedAgreement?.getStatus()).toBe("EXPIRED");
  });

  it("rejects a missing agreement", async () => {
    await expect(
      new ExpireAgreementUseCase(new InMemoryAgreementRepository(null)).execute(
        { agreementId: "AGR-9999" }
      )
    ).rejects.toBeInstanceOf(AgreementNotFoundError);
  });

  it("preserves the domain lifecycle rule", async () => {
    await expect(
      new ExpireAgreementUseCase(
        new InMemoryAgreementRepository(agreementFixture())
      ).execute({ agreementId: "AGR-1001" })
    ).rejects.toBeInstanceOf(InvalidAgreementStatusTransitionError);
  });
});
