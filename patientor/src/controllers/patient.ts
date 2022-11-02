import { Router } from "express";
import patientService from "../services/patient";

const router = Router();

router.get("/", (_req, resp) => {
  return resp.json(patientService.getAllWithoutSsn());
});

export default router;
