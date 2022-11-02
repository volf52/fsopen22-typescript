import { Router } from "express";
import diagnoseService from "../services/diagnoses";

const router = Router();

router.get("/", (_req, resp) => {
  return resp.json(diagnoseService.getAll());
});

export default router;
