import { describe, expect, it } from "vitest";

import { Party } from "../../src/identity/entities/Party.js";
import { PartyId } from "../../src/identity/value-objects/PartyId.js";

describe("Party", () => {
  it("creates a person party", () => {
    const party = new Party(new PartyId("PTY-1001"), {
      type: "PERSON",
      displayName: "John Smith",
      status: "ACTIVE"
    });

    expect(party.getType()).toBe("PERSON");
    expect(party.getDisplayName()).toBe("John Smith");
    expect(party.getStatus()).toBe("ACTIVE");
  });

  it("changes the display name", () => {
    const party = new Party(new PartyId("PTY-1001"), {
      type: "PERSON",
      displayName: "John Smith",
      status: "ACTIVE"
    });

    party.changeDisplayName("John Doe");

    expect(party.getDisplayName()).toBe("John Doe");
  });

  it("rejects an empty display name", () => {
    expect(() => {
      new Party(new PartyId("PTY-1001"), {
        type: "PERSON",
        displayName: "",
        status: "ACTIVE"
      });
    }).toThrow("Party display name cannot be empty.");
  });

  it("deactivates and activates a party", () => {
    const party = new Party(new PartyId("PTY-1001"), {
      type: "PERSON",
      displayName: "John Smith",
      status: "ACTIVE"
    });

    party.deactivate();
    expect(party.getStatus()).toBe("INACTIVE");

    party.activate();
    expect(party.getStatus()).toBe("ACTIVE");
  });

  it("compares parties by PartyId", () => {
    const firstParty = new Party(new PartyId("PTY-1001"), {
      type: "PERSON",
      displayName: "John Smith",
      status: "ACTIVE"
    });

    const secondParty = new Party(new PartyId("PTY-1001"), {
      type: "PERSON",
      displayName: "Different Name",
      status: "INACTIVE"
    });

    expect(firstParty.equals(secondParty)).toBe(true);
  });
});
