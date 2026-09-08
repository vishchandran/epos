import { MigrationError } from "../../errors/MigrationError.js";
import type { Migration } from "./Migration.js";

export const orderMigrations = (
  migrations: readonly Migration[]
): Migration[] => {
  const orderedMigrations = [...migrations].sort(
    (left, right) => left.version - right.version
  );

  for (const [index, migration] of orderedMigrations.entries()) {
    const expectedVersion = index + 1;

    if (migration.version !== expectedVersion) {
      throw new MigrationError(
        `Expected migration version ${expectedVersion}, but found ${migration.version}.`
      );
    }
  }

  return orderedMigrations;
};
