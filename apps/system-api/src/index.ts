import "dotenv/config";
import pino from "pino";
import { app } from "./app.js";

const logger = pino();
const PORT = Number(process.env.PORT || 3000);

app.listen(PORT, () => {
  logger.info(
    {
      service: "system-api",
      event: "startup",
      port: PORT,
      environment: process.env.NODE_ENV || "development"
    },
    "EPOS System API started"
  );
});
