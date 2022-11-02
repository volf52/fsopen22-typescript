import { Router } from "express";
import patientService from "../services/patient";
import { toNewPatientEntry } from "../utils";

const router = Router();

router.get("/", (_req, resp) => {
  return resp.json(patientService.getAllWithoutSsn());
});

router.post("/", (req, resp) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const entry = toNewPatientEntry(req.body);

    const patient = patientService.addPatient(entry);

    return resp.json(patient);
  } catch (err: unknown) {
    let errMsg = "unknown error";

    if (err instanceof Error) {
      errMsg = err.message;
    }

    return resp.status(400).json({ error: errMsg });
  }
});

export default router;
