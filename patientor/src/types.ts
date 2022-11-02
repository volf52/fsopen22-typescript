export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface PatientEntry {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  ssn: string;
}

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn">;
export type NewPatientEntry = Omit<PatientEntry, "id">;

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
