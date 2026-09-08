import type { PoolClient } from "pg";
import { describe, expect, it, vi } from "vitest";

import type { PostgreSqlPool } from "../../../src/database/PostgreSqlDatabase.js";
import type { Migration } from "../../../src/database/migrations/Migration.js";
import { MigrationRunner } from "../../../src/database/migrations/MigrationRunner.js";
import { MigrationError } from "../../../src/errors/MigrationError.js";

const migration: Migration = {
  version: 1,
  name: "create_schema_migrations",
  sql: "CREATE TABLE schema_migrations ();",
  checksum: "migration-1-checksum"
};

const createPool = (
  query: ReturnType<typeof vi.fn>,
  release: ReturnType<typeof vi.fn>
): PostgreSqlPool => {
  const client = { query, release } as unknown as PoolClient;

  return {
    connect: vi.fn().mockResolvedValue(client)
  } as unknown as PostgreSqlPool;
};

describe("MigrationRunner", () => {
  it("does not connect when there are no migrations", async () => {
    const query = vi.fn();
    const release = vi.fn();
    const pool = createPool(query, release);
    const runner = new MigrationRunner(pool);

    await runner.run([]);

    expect(pool.connect).not.toHaveBeenCalled();
  });

  it("applies and records the first migration when history is absent", async () => {
    const query = vi.fn(async (sql: string) => {
      if (sql.startsWith("SELECT to_regclass")) {
        return { rows: [{ exists: false }] };
      }

      if (sql.startsWith("SELECT version, checksum")) {
        return {
          rows: [
            {
              version: migration.version,
              checksum: migration.checksum
            }
          ]
        };
      }

      return { rows: [] };
    });

    const release = vi.fn();
    const runner = new MigrationRunner(createPool(query, release));

    await runner.run([migration]);

    expect(query).toHaveBeenCalledWith(migration.sql);
    expect(query).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO schema_migrations"),
      [migration.version, migration.name, migration.checksum]
    );
    expect(query).toHaveBeenCalledWith("COMMIT");
    expect(release).toHaveBeenCalledOnce();
  });

  it("rejects a changed checksum for an applied migration", async () => {
    const query = vi.fn(async (sql: string) => {
      if (sql.startsWith("SELECT to_regclass")) {
        return { rows: [{ exists: true }] };
      }

      if (sql.startsWith("SELECT version, checksum")) {
        return {
          rows: [
            {
              version: migration.version,
              checksum: "different-checksum"
            }
          ]
        };
      }

      return { rows: [] };
    });

    const release = vi.fn();
    const runner = new MigrationRunner(createPool(query, release));

    await expect(runner.run([migration])).rejects.toThrow(MigrationError);
    expect(release).toHaveBeenCalledOnce();
  });
});
