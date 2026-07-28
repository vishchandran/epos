import { describe, expect, it } from "vitest";
import { Party, PartyId } from "@epos/enterprise-domain";

import type { PartyRepository } from "../../../src/identity/PartyRepository.js";
import { PartyNotFoundError } from "../../../src/identity/errors/PartyNotFoundError.js";
import { GetPartyQueryHandler } from "../../../src/identity/get-party/GetPartyQueryHandler.js";

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

describe("GetPartyQueryHandler", () => {
  it("returns the Party DTO when the party exists", async () => {
    const party = Party.register(
      new PartyId("PTY-1001"),
      "PERSON",
      "Anita Sharma"
    );

    const repository = new InMemoryPartyRepository([party]);
    const handler = new GetPartyQueryHandler(repository);

    const result = await handler.execute({
      partyId: "PTY-1001"
    });

    expect(result).toEqual({
      partyId: "PTY-1001",
      type: "PERSON",
      displayName: "Anita Sharma",
      status: "ACTIVE"
    });

    expect(repository.saveCount).toBe(0);
  });

  it("throws PartyNotFoundError when the party does not exist", async () => {
    const repository = new InMemoryPartyRepository();
    const handler = new GetPartyQueryHandler(repository);

    await expect(
      handler.execute({
        partyId: "PTY-404"
      })
    ).rejects.toThrow(PartyNotFoundError);

    expect(repository.saveCount).toBe(0);
  });
});
