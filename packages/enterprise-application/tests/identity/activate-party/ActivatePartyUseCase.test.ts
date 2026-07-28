import { describe, expect, it } from "vitest";
import { Party, PartyId } from "@epos/enterprise-domain";

import type { PartyRepository } from "../../../src/identity/PartyRepository.js";
import { PartyNotFoundError } from "../../../src/identity/errors/PartyNotFoundError.js";
import { ActivatePartyUseCase } from "../../../src/identity/activate-party/ActivatePartyUseCase.js";

class InMemoryPartyRepository implements PartyRepository {
  private party: Party | null;
  public saveCount = 0;

  public constructor(party: Party | null) {
    this.party = party;
  }

  public findById(partyId: PartyId): Promise<Party | null> {
    if (this.party?.getId().equals(partyId)) {
      return Promise.resolve(this.party);
    }

    return Promise.resolve(null);
  }

  public save(party: Party): Promise<void> {
    this.party = party;
    this.saveCount += 1;
    return Promise.resolve();
  }
}

describe("ActivatePartyUseCase", () => {
  it("activates and saves an inactive party", async () => {
    const party = Party.register(
      new PartyId("PTY-1001"),
      "PERSON",
      "John Smith"
    );

    party.deactivate();

    const repository = new InMemoryPartyRepository(party);
    const useCase = new ActivatePartyUseCase(repository);

    const result = await useCase.execute({
      partyId: "PTY-1001"
    });

    expect(result).toEqual({
      partyId: "PTY-1001",
      status: "ACTIVE"
    });

    expect(party.getStatus()).toBe("ACTIVE");
    expect(repository.saveCount).toBe(1);
  });

  it("throws PartyNotFoundError when the party does not exist", async () => {
    const repository = new InMemoryPartyRepository(null);
    const useCase = new ActivatePartyUseCase(repository);

    await expect(
      useCase.execute({
        partyId: "PTY-404"
      })
    ).rejects.toThrow(PartyNotFoundError);

    expect(repository.saveCount).toBe(0);
  });
});
