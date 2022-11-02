import { Router } from "express";
import patientService from "../services/patient";

const router = Router();

router.get("/", (_req, resp) => {
  return resp.json(patientService.getAllWithoutSsn());
});

router.post("/", (req, resp) => {
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, occupation, dateOfBirth, gender, ssn } = req.body;

  const patient = patientService.addPatient(
    name as string,
    occupation as string,
    gender as string,
    dateOfBirth as string,
    ssn as string
  );

  return resp.json(patient);
});

export default router;
