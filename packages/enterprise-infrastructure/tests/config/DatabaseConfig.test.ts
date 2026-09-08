import { describe, expect, it } from "vitest";

import { loadDatabaseConfig } from "../../src/config/DatabaseConfig.js";
import { DatabaseConfigurationError } from "../../src/errors/DatabaseConfigurationError.js";

describe("loadDatabaseConfig", () => {
  it("returns a PostgreSQL connection string", () => {
    const config = loadDatabaseConfig({
      DATABASE_URL: "postgresql://epos:test-password@localhost:5432/epos_test"
    });

    expect(config).toEqual({
      connectionString:
        "postgresql://epos:test-password@localhost:5432/epos_test"
    });
  });

  it("trims the configured connection string", () => {
    const config = loadDatabaseConfig({
      DATABASE_URL:
        "  postgresql://epos:test-password@localhost:5432/epos_test  "
    });

    expect(config.connectionString).toBe(
      "postgresql://epos:test-password@localhost:5432/epos_test"
    );
  });

  it("rejects a missing connection string", () => {
    expect(() => loadDatabaseConfig({})).toThrow(DatabaseConfigurationError);
  });

  it("rejects an invalid connection string", () => {
    expect(() => loadDatabaseConfig({ DATABASE_URL: "not a URL" })).toThrow(
      DatabaseConfigurationError
    );
  });

  it("rejects a non-PostgreSQL URL", () => {
    expect(() =>
      loadDatabaseConfig({
        DATABASE_URL: "mysql://epos:test-password@localhost:3306/epos"
      })
    ).toThrow(DatabaseConfigurationError);
  });
});
