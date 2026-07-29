import { describe, expect, it } from "vitest";
import type { Party } from "@epos/enterprise-domain";

import type { IdGenerator } from "../../../src/shared/IdGenerator.js";
import type { PartyRepository } from "../../../src/party/PartyRepository.js";
import { RegisterPartyUseCase } from "../../../src/party/register-party/RegisterPartyUseCase.js";

class FixedIdGenerator implements IdGenerator {
  public generate(): string {
    return "PTY-1001";
  }
}

class InMemoryPartyRepository implements PartyRepository {
  public savedParty: Party | undefined;

  public findById(): Promise<Party | null> {
    return Promise.resolve(this.savedParty ?? null);
  }

  public save(party: Party): Promise<void> {
    this.savedParty = party;
    return Promise.resolve();
  }
}

describe("RegisterPartyUseCase", () => {
  it("registers and saves a new active party", async () => {
    const repository = new InMemoryPartyRepository();
    const idGenerator = new FixedIdGenerator();
    const useCase = new RegisterPartyUseCase(repository, idGenerator);

    const result = await useCase.execute({
      type: "PERSON",
      displayName: "John Smith"
    });

    expect(result).toEqual({
      partyId: "PTY-1001",
      type: "PERSON",
      displayName: "John Smith",
      status: "ACTIVE"
    });

    expect(repository.savedParty).toBeDefined();
    expect(repository.savedParty?.getId().toString()).toBe("PTY-1001");
  });
});
