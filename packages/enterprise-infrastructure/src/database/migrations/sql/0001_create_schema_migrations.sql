CREATE TABLE schema_migrations (
  version INTEGER PRIMARY KEY CHECK (version > 0),
  name TEXT NOT NULL CHECK (BTRIM(name) <> ''),
  checksum TEXT NOT NULL CHECK (BTRIM(checksum) <> ''),
  applied_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);