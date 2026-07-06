import express from "express";

export const app = express();

app.get("/", (_req, res) => {
  res.json({
    platform: "EPOS",
    service: "System API",
    status: "Running"
  });
});

app.get("/health/live", (_req, res) => {
  res.json({ status: "UP" });
});

app.get("/health/ready", (_req, res) => {
  res.json({
    status: "READY",
    checks: {
      database: "NOT_CONFIGURED",
      kafka: "NOT_CONFIGURED",
      redis: "NOT_CONFIGURED"
    }
  });
});

app.get("/info", (_req, res) => {
  res.json({
    name: "EPOS System API",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    runtime: process.version
  });
});
