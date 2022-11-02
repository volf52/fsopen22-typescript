import type { Diagnose } from "../types";
import diagnosesData from "../../data/diagnoses.json";

const diagnoses: Diagnose[] = diagnosesData as Diagnose[];

const getAll = (): Diagnose[] => [...diagnoses];

export default { getAll };
