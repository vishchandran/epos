import { DatabaseConfigurationError } from "../errors/DatabaseConfigurationError.js";

export type DatabaseConfig = {
  connectionString: string;
};

export const loadDatabaseConfig = (
  environment: NodeJS.ProcessEnv = process.env
): DatabaseConfig => {
  const connectionString = environment.DATABASE_URL?.trim();

  if (!connectionString) {
    throw new DatabaseConfigurationError(
      "DATABASE_URL must be configured for PostgreSQL."
    );
  }

  let databaseUrl: URL;

  try {
    databaseUrl = new URL(connectionString);
  } catch {
    throw new DatabaseConfigurationError(
      "DATABASE_URL must be a valid PostgreSQL connection URL."
    );
  }

  if (
    databaseUrl.protocol !== "postgres:" &&
    databaseUrl.protocol !== "postgresql:"
  ) {
    throw new DatabaseConfigurationError(
      "DATABASE_URL must use the postgres or postgresql protocol."
    );
  }

  return { connectionString };
};
