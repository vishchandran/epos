import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { basename, join } from "node:path";

import { MigrationError } from "../../errors/MigrationError.js";
import type { Migration } from "./Migration.js";
import { orderMigrations } from "./orderMigrations.js";

const migrationFileName = /^(\d+)_(.+)\.sql$/;

export const loadMigrations = async (
  directory: string
): Promise<Migration[]> => {
  let entries: string[];

  try {
    entries = await readdir(directory);
  } catch (error) {
    throw new MigrationError("Unable to read the migration directory.", {
      cause: error
    });
  }

  const migrations = await Promise.all(
    entries
      .filter((entry) => entry.endsWith(".sql"))
      .map((entry) => loadMigration(join(directory, entry)))
  );

  return orderMigrations(migrations);
};

const loadMigration = async (filePath: string): Promise<Migration> => {
  const fileName = basename(filePath);

  if (!fileName) {
    throw new MigrationError("Migration file name is missing.");
  }

  const match = fileName.match(migrationFileName);

  if (!match) {
    throw new MigrationError(
      `Migration file '${fileName}' must use the format 0001_description.sql.`
    );
  }

  const sql = await readFile(filePath, "utf8");

  return {
    version: Number.parseInt(match[1], 10),
    name: match[2],
    sql,
    checksum: createHash("sha256").update(sql).digest("hex")
  };
};
