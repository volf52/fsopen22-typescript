import type { Diagnosis } from "../types";
import diagnosesData from "../../data/diagnoses.json";

const diagnoses: Diagnosis[] = diagnosesData as Diagnosis[];

const getAll = (): Diagnosis[] => [...diagnoses];

export default { getAll };
