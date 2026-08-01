import { describe, expect, it } from "vitest";

import { ApplicationValidationError } from "../../../src/shared/validation/ApplicationValidationError.js";
import { parseDate } from "../../../src/shared/validation/parseDate.js";

describe("parseDate", () => {
  it("parses a valid date string", () => {
    expect(
      parseDate("2026-01-01T00:00:00.000Z", "effectiveDate").toISOString()
    ).toBe("2026-01-01T00:00:00.000Z");
  });

  it.each(["", "not-a-date", null, undefined])(
    "rejects invalid date input %s",
    (value) => {
      expect(() => parseDate(value, "effectiveDate")).toThrow(
        ApplicationValidationError
      );
    }
  );
});
