export interface PatientEntry {
  id: string;
  name: string;
  occupation: string;
  gender: string;
  dateOfBirth: string;
  ssn: string;
}

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn">;

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
