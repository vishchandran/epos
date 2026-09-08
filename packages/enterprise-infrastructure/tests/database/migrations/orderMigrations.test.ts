import { describe, expect, it } from "vitest";

import type { Migration } from "../../../src/database/migrations/Migration.js";
import { orderMigrations } from "../../../src/database/migrations/orderMigrations.js";
import { MigrationError } from "../../../src/errors/MigrationError.js";

const migration = (version: number): Migration => ({
  version,
  name: `migration_${version}`,
  sql: `-- migration ${version}`,
  checksum: `checksum-${version}`
});

describe("orderMigrations", () => {
  it("orders migrations by version", () => {
    expect(orderMigrations([migration(3), migration(1), migration(2)])).toEqual(
      [migration(1), migration(2), migration(3)]
    );
  });

  it("allows an empty migration list", () => {
    expect(orderMigrations([])).toEqual([]);
  });

  it("rejects a migration sequence that does not start at version one", () => {
    expect(() => orderMigrations([migration(2)])).toThrow(MigrationError);
  });

  it("rejects a migration sequence with a missing version", () => {
    expect(() => orderMigrations([migration(1), migration(3)])).toThrow(
      MigrationError
    );
  });

  it("rejects duplicate migration versions", () => {
    expect(() => orderMigrations([migration(1), migration(1)])).toThrow(
      MigrationError
    );
  });
});
