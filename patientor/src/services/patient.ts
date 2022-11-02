import patientsData from "../../data/patients.json";
import type {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
} from "../types";
import { createId } from "../utils";

type Patients = Array<PatientEntry>;

const patients: Patients = patientsData as Patients;

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

export default { getAll, getAllWithoutSsn, addPatient };
