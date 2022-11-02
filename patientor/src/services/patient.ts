import patientsData from "../../data/patients.json";
import type { PatientEntry, NonSensitivePatientEntry } from "../types";

type Patients = Array<PatientEntry>;

const patients: Patients = patientsData as Patients;

const getAll = (): Patients => [...patients];
const getAllWithoutSsn = (): Array<NonSensitivePatientEntry> =>
  patients.map((p) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...x } = p;

    return x;
  });

export default { getAll, getAllWithoutSsn };
