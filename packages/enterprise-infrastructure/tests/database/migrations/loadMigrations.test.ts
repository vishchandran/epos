import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { loadMigrations } from "../../../src/database/migrations/loadMigrations.js";
import { MigrationError } from "../../../src/errors/MigrationError.js";

const directories: string[] = [];

const createMigrationDirectory = async (): Promise<string> => {
  const directory = await mkdtemp(join(tmpdir(), "epos-migrations-"));
  directories.push(directory);

  return directory;
};

afterEach(async () => {
  await Promise.all(
    directories
      .splice(0)
      .map((directory) => rm(directory, { force: true, recursive: true }))
  );
});

describe("loadMigrations", () => {
  it("loads migrations in version order", async () => {
    const directory = await createMigrationDirectory();

    await writeFile(
      join(directory, "0002_create_parties.sql"),
      "CREATE TABLE parties ();"
    );
    await writeFile(
      join(directory, "0001_create_schema_migrations.sql"),
      "CREATE TABLE schema_migrations ();"
    );

    const migrations = await loadMigrations(directory);

    expect(migrations.map((migration) => migration.version)).toEqual([1, 2]);
    expect(migrations.map((migration) => migration.name)).toEqual([
      "create_schema_migrations",
      "create_parties"
    ]);
    expect(migrations[0].checksum).toHaveLength(64);
  });

  it("rejects an invalid migration filename", async () => {
    const directory = await createMigrationDirectory();

    await writeFile(join(directory, "create_parties.sql"), "SELECT 1;");

    await expect(loadMigrations(directory)).rejects.toThrow(MigrationError);
  });

  it("rejects migration version gaps", async () => {
    const directory = await createMigrationDirectory();

    await writeFile(
      join(directory, "0001_create_schema_migrations.sql"),
      "CREATE TABLE schema_migrations ();"
    );
    await writeFile(
      join(directory, "0003_create_parties.sql"),
      "CREATE TABLE parties ();"
    );

    await expect(loadMigrations(directory)).rejects.toThrow(MigrationError);
  });

  it("changes the checksum when SQL changes", async () => {
    const directory = await createMigrationDirectory();
    const filePath = join(directory, "0001_create_schema_migrations.sql");

    await writeFile(filePath, "CREATE TABLE schema_migrations ();");
    const firstChecksum = (await loadMigrations(directory))[0].checksum;

    await writeFile(filePath, "CREATE TABLE schema_migrations (version INT);");
    const secondChecksum = (await loadMigrations(directory))[0].checksum;

    expect(secondChecksum).not.toBe(firstChecksum);
  });
});
