import patientsData from "../../data/patients.json";
import type {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
} from "../types";
import { createId } from "../utils";

type Patients = Array<PatientEntry>;

const patients: Patients = (patientsData as Patients).map((p) => ({
  ...p,
  entries: [],
}));

const getAll = (): Patients => [...patients];
const getAllWithoutSsn = (): Array<NonSensitivePatientEntry> =>
  patients.map((p) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...x } = p;

    return x;
  });

const addPatient = (entry: NewPatientEntry) => {
  const patient: PatientEntry = {
    id: createId(),
    ...entry,
  };

  patients.push(patient);

  return patient;
};

const getById = (id: PatientEntry["id"]): PatientEntry | undefined => {
  const patient = patients.find((p) => p.id === id);

  return patient;
  // if(!patient) return
};

export default { getAll, getAllWithoutSsn, addPatient, getById };
