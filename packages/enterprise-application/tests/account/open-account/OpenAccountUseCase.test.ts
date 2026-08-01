import {
  Agreement,
  AgreementId,
  AgreementNotActiveForAccountOpeningError,
  CustomerId,
  ProductId,
  type Account
} from "@epos/enterprise-domain";
import { describe, expect, it } from "vitest";

import type { AccountRepository } from "../../../src/account/AccountRepository.js";
import { OpenAccountUseCase } from "../../../src/account/open-account/OpenAccountUseCase.js";
import type { AgreementRepository } from "../../../src/agreement/AgreementRepository.js";
import { AgreementNotFoundError } from "../../../src/agreement/errors/AgreementNotFoundError.js";
import type { IdGenerator } from "../../../src/shared/IdGenerator.js";

class AgreementStub implements AgreementRepository {
  public constructor(private readonly agreement: Agreement | null) {}
  public findById(): Promise<Agreement | null> {
    return Promise.resolve(this.agreement);
  }
  public save(): Promise<void> {
    return Promise.resolve();
  }
}

class InMemoryAccountRepository implements AccountRepository {
  public savedAccount: Account | undefined;
  public save(account: Account): Promise<void> {
    this.savedAccount = account;
    return Promise.resolve();
  }
}

class FixedIdGenerator implements IdGenerator {
  public generate(): string {
    return "ACC-1001";
  }
}

const agreement = (status: "DRAFT" | "ACTIVE"): Agreement =>
  new Agreement(new AgreementId("AGR-1001"), {
    customerId: new CustomerId("CUST-1001"),
    productId: new ProductId("PROD-1001"),
    status,
    effectiveDate: new Date("2026-01-01T00:00:00.000Z")
  });

describe("OpenAccountUseCase", () => {
  it("opens and saves a pending account under an active agreement", async () => {
    const repository = new InMemoryAccountRepository();
    const useCase = new OpenAccountUseCase(
      new AgreementStub(agreement("ACTIVE")),
      repository,
      new FixedIdGenerator()
    );

    await expect(useCase.execute({ agreementId: "AGR-1001" })).resolves.toEqual(
      {
        accountId: "ACC-1001",
        agreementId: "AGR-1001",
        status: "PENDING"
      }
    );
    expect(repository.savedAccount?.getStatus()).toBe("PENDING");
  });

  it("rejects a missing agreement", async () => {
    const useCase = new OpenAccountUseCase(
      new AgreementStub(null),
      new InMemoryAccountRepository(),
      new FixedIdGenerator()
    );
    await expect(
      useCase.execute({ agreementId: "AGR-9999" })
    ).rejects.toBeInstanceOf(AgreementNotFoundError);
  });

  it("rejects an inactive agreement", async () => {
    const useCase = new OpenAccountUseCase(
      new AgreementStub(agreement("DRAFT")),
      new InMemoryAccountRepository(),
      new FixedIdGenerator()
    );
    await expect(
      useCase.execute({ agreementId: "AGR-1001" })
    ).rejects.toBeInstanceOf(AgreementNotActiveForAccountOpeningError);
  });
});
