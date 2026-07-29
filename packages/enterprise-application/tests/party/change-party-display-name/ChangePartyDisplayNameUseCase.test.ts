import { describe, expect, it } from "vitest";
import {
  InvalidPartyDisplayNameError,
  Party,
  PartyId
} from "@epos/enterprise-domain";

import type { PartyRepository } from "../../../src/party/PartyRepository.js";
import { PartyNotFoundError } from "../../../src/party/errors/PartyNotFoundError.js";
import { ChangePartyDisplayNameUseCase } from "../../../src/party/change-party-display-name/ChangePartyDisplayNameUseCase.js";

class InMemoryPartyRepository implements PartyRepository {
  private readonly parties = new Map<string, Party>();
  public saveCount = 0;

  public constructor(parties: Party[] = []) {
    for (const party of parties) {
      this.parties.set(party.getId().toString(), party);
    }
  }

  public findById(partyId: PartyId): Promise<Party | null> {
    return Promise.resolve(this.parties.get(partyId.toString()) ?? null);
  }

  public save(party: Party): Promise<void> {
    this.parties.set(party.getId().toString(), party);
    this.saveCount += 1;
    return Promise.resolve();
  }
}

describe("ChangePartyDisplayNameUseCase", () => {
  it("changes and saves the display name", async () => {
    const party = Party.register(
      new PartyId("PTY-1001"),
      "PERSON",
      "Anita Sharma"
    );

    const repository = new InMemoryPartyRepository([party]);
    const useCase = new ChangePartyDisplayNameUseCase(repository);

    const result = await useCase.execute({
      partyId: "PTY-1001",
      displayName: "Anita Mehta"
    });

    expect(result).toEqual({
      partyId: "PTY-1001",
      displayName: "Anita Mehta"
    });

    expect(party.getDisplayName()).toBe("Anita Mehta");
    expect(repository.saveCount).toBe(1);
  });

  it("throws PartyNotFoundError when the party does not exist", async () => {
    const repository = new InMemoryPartyRepository();
    const useCase = new ChangePartyDisplayNameUseCase(repository);

    await expect(
      useCase.execute({
        partyId: "PTY-404",
        displayName: "Anita Mehta"
      })
    ).rejects.toThrow(PartyNotFoundError);

    expect(repository.saveCount).toBe(0);
  });

  it("propagates the domain error and does not save an empty name", async () => {
    const party = Party.register(
      new PartyId("PTY-1001"),
      "PERSON",
      "Anita Sharma"
    );

    const repository = new InMemoryPartyRepository([party]);
    const useCase = new ChangePartyDisplayNameUseCase(repository);

    await expect(
      useCase.execute({
        partyId: "PTY-1001",
        displayName: ""
      })
    ).rejects.toThrow(InvalidPartyDisplayNameError);

    expect(party.getDisplayName()).toBe("Anita Sharma");
    expect(repository.saveCount).toBe(0);
  });
});
