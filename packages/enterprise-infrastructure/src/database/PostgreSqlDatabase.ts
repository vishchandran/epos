import { Pool, type PoolConfig } from "pg";

import type { DatabaseConfig } from "../config/DatabaseConfig.js";
import { DatabaseConnectionError } from "../errors/DatabaseConnectionError.js";

export type PostgreSqlPool = Pick<Pool, "connect" | "end" | "query">;

export type PostgreSqlPoolFactory = (config: PoolConfig) => PostgreSqlPool;

export class PostgreSqlDatabase {
  private readonly pool: PostgreSqlPool;

  public constructor(
    config: DatabaseConfig,
    createPool: PostgreSqlPoolFactory = (poolConfig) => new Pool(poolConfig)
  ) {
    this.pool = createPool({
      connectionString: config.connectionString
    });
  }

  public getPool(): PostgreSqlPool {
    return this.pool;
  }

  public async verifyConnection(): Promise<void> {
    try {
      await this.pool.query("SELECT 1");
    } catch (error) {
      throw new DatabaseConnectionError("Unable to connect to PostgreSQL.", {
        cause: error
      });
    }
  }

  public close(): Promise<void> {
    return this.pool.end();
  }
}
