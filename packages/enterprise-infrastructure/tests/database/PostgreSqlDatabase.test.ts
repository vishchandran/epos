import { describe, expect, it, vi } from "vitest";

import type { DatabaseConfig } from "../../src/config/DatabaseConfig.js";
import { PostgreSqlDatabase } from "../../src/database/PostgreSqlDatabase.js";
import { DatabaseConnectionError } from "../../src/errors/DatabaseConnectionError.js";

const databaseConfig: DatabaseConfig = {
  connectionString: "postgresql://epos:test-password@localhost:5432/epos_test"
};

describe("PostgreSqlDatabase", () => {
  it("creates a pool from the database connection string", () => {
    const pool = {
      connect: vi.fn(),
      end: vi.fn(),
      query: vi.fn()
    };

    const createPool = vi.fn(() => pool);
    new PostgreSqlDatabase(databaseConfig, createPool);

    expect(createPool).toHaveBeenCalledWith({
      connectionString: databaseConfig.connectionString
    });
  });

  it("verifies a PostgreSQL connection", async () => {
    const pool = {
      connect: vi.fn(),
      end: vi.fn(),
      query: vi.fn().mockResolvedValue({ rows: [{ "?column?": 1 }] })
    };

    const database = new PostgreSqlDatabase(databaseConfig, () => pool);

    await expect(database.verifyConnection()).resolves.toBeUndefined();
    expect(pool.query).toHaveBeenCalledWith("SELECT 1");
  });

  it("translates connection failures", async () => {
    const cause = new Error("connection refused");
    const pool = {
      connect: vi.fn(),
      end: vi.fn(),
      query: vi.fn().mockRejectedValue(cause)
    };

    const database = new PostgreSqlDatabase(databaseConfig, () => pool);

    await expect(database.verifyConnection()).rejects.toThrow(
      DatabaseConnectionError
    );
  });

  it("closes the pool", async () => {
    const pool = {
      connect: vi.fn(),
      end: vi.fn().mockResolvedValue(undefined),
      query: vi.fn()
    };

    const database = new PostgreSqlDatabase(databaseConfig, () => pool);

    await database.close();

    expect(pool.end).toHaveBeenCalledOnce();
  });
});
