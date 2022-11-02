import express from "express";

import diagnosesRouter from "./src/controllers/diagnoses";
import patientsRouter from "./src/controllers/patient";

const app = express();

app.get("/api/ping", (_req, resp) => {
  return resp.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server up on http://localhost:${PORT}`);
});
