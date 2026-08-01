import { describe, expect, it } from "vitest";

import { PartyId } from "../../src/party/index.js";
import { InvalidDomainIdError } from "../../src/shared/errors/InvalidDomainIdError.js";

describe("DomainId", () => {
  it.each(["", "   "])("rejects an empty identifier", (value) => {
    expect(() => new PartyId(value)).toThrow(InvalidDomainIdError);
  });
});
