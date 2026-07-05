import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (_req, res) => {
  res.json({
    platform: "EPOS",
    service: "System API",
    status: "Running"
  });
});

app.listen(PORT, () => {
  console.log(`EPOS System API listening on port ${PORT}`);
});