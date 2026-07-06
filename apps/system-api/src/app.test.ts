import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "./app.js";

describe("System API", () => {
  it("returns liveness status", async () => {
    const response = await request(app).get("/health/live");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "UP" });
  });

  it("returns readiness status", async () => {
    const response = await request(app).get("/health/ready");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("READY");
  });

  it("returns service info", async () => {
    const response = await request(app).get("/info");

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("EPOS System API");
  });
});
