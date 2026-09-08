import type { PoolClient } from "pg";

import type { PostgreSqlPool } from "../PostgreSqlDatabase.js";
import { MigrationError } from "../../errors/MigrationError.js";
import type { Migration } from "./Migration.js";
import { orderMigrations } from "./orderMigrations.js";

const MIGRATION_LOCK_ID = 9037001;

type AppliedMigration = {
  version: number;
  checksum: string;
};

type MigrationHistoryExists = {
  exists: boolean;
};

export class MigrationRunner {
  public constructor(private readonly pool: PostgreSqlPool) {}

  public async run(migrations: readonly Migration[]): Promise<void> {
    const orderedMigrations = orderMigrations(migrations);

    if (orderedMigrations.length === 0) {
      return;
    }

    const client = await this.pool.connect();
    let lockAcquired = false;

    try {
      await client.query("SELECT pg_advisory_lock($1)", [MIGRATION_LOCK_ID]);
      lockAcquired = true;

      await this.ensureMigrationHistory(client, orderedMigrations[0]);

      const appliedMigrations = await this.loadAppliedMigrations(client);

      for (const migration of orderedMigrations) {
        const appliedMigration = appliedMigrations.get(migration.version);

        if (appliedMigration) {
          this.verifyChecksum(migration, appliedMigration);
          continue;
        }

        await this.applyMigration(client, migration);
      }
    } catch (error) {
      if (error instanceof MigrationError) {
        throw error;
      }

      throw new MigrationError("Unable to run database migrations.", {
        cause: error
      });
    } finally {
      if (lockAcquired) {
        await client.query("SELECT pg_advisory_unlock($1)", [
          MIGRATION_LOCK_ID
        ]);
      }

      client.release();
    }
  }

  private async ensureMigrationHistory(
    client: PoolClient,
    firstMigration: Migration
  ): Promise<void> {
    const result = await client.query<MigrationHistoryExists>(
      "SELECT to_regclass('public.schema_migrations') IS NOT NULL AS exists"
    );

    if (!result.rows[0]?.exists) {
      await this.applyMigration(client, firstMigration);
    }
  }

  private async loadAppliedMigrations(
    client: PoolClient
  ): Promise<Map<number, AppliedMigration>> {
    const result = await client.query<AppliedMigration>(
      "SELECT version, checksum FROM schema_migrations ORDER BY version"
    );

    return new Map(
      result.rows.map((migration) => [migration.version, migration])
    );
  }

  private verifyChecksum(
    migration: Migration,
    appliedMigration: AppliedMigration
  ): void {
    if (migration.checksum !== appliedMigration.checksum) {
      throw new MigrationError(
        `Migration ${migration.version} does not match the applied checksum.`
      );
    }
  }

  private async applyMigration(
    client: PoolClient,
    migration: Migration
  ): Promise<void> {
    await client.query("BEGIN");

    try {
      await client.query(migration.sql);

      await client.query(
        `INSERT INTO schema_migrations (version, name, checksum)
         VALUES ($1, $2, $3)`,
        [migration.version, migration.name, migration.checksum]
      );

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");

      throw new MigrationError(
        `Migration ${migration.version} (${migration.name}) failed.`,
        { cause: error }
      );
    }
  }
}
