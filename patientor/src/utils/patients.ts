import type {
  BaseEntry,
  EntryWithoutId,
  HealthCheckEntry,
  HospitalEntry,
  NewPatientEntry,
  OccupationalHealthcareEntry,
  PatientEntry,
} from "../types";
import { assertNever, isArray } from "./gaurds";
import {
  validateEntryType,
  requiredDate,
  requiredGender,
  requiredString,
  validateString,
  validateHealthCheckRating,
} from "./validators";

export type UnknownFields<T> = {
  [k in keyof T]: T[k] extends Record<string, unknown>
    ? UnknownFields<T[k]>
    : unknown;
};

type PatientFields = UnknownFields<PatientEntry>;

export const toNewPatientEntry = (fields: unknown): NewPatientEntry => {
  const { name, occupation, dateOfBirth, ssn, gender } =
    fields as PatientFields;

  const patient: NewPatientEntry = {
    name: requiredString(name, "name"),
    occupation: requiredString(occupation, "occupation"),
    dateOfBirth: requiredDate(dateOfBirth, "dateOfBirth"),
    ssn: requiredString(ssn, "ssn"),
    gender: requiredGender(gender),
    entries: [],
  };

  return patient;
};

type BaseEntryWithoutId = Omit<BaseEntry, "id">;
type HospitalEntryWithoutId = Omit<HospitalEntry, "id">;
type HealthCheckEntryWithoutId = Omit<HealthCheckEntry, "id">;
type OccupationalHealthcareEntryWithoutId = Omit<
  OccupationalHealthcareEntry,
  "id"
>;
type EntryFields = UnknownFields<EntryWithoutId>;
type HospitalEntryFields = UnknownFields<HospitalEntry>;
type HealthCheckEntryFields = UnknownFields<HealthCheckEntry>;
type OccupationalHealthcareEntryFields =
  UnknownFields<OccupationalHealthcareEntry>;

export const toNewEntry = (fields: unknown): EntryWithoutId => {
  const { type, description, date, specialist, diagnosisCodes } =
    fields as EntryFields;

  const t = validateEntryType(type);
  const baseEntry: BaseEntryWithoutId = {
    description: requiredString(description, "description"),
    date: requiredDate(date, "date"),
    specialist: requiredString(specialist, "specialist"),
  };

  if (diagnosisCodes) {
    if (!isArray(diagnosisCodes)) {
      throw new Error("diagnosesCodes must be an array type (optional)");
    }

    baseEntry.diagnosisCodes = diagnosisCodes.map((code) =>
      validateString(code, "diagnosesCodes.element")
    );
  }

  switch (t) {
    case "Hospital":
      return toHospitalEntry(baseEntry, fields as HospitalEntryFields);
    case "HealthCheck":
      return toHealthCheckEntry(baseEntry, fields as HealthCheckEntryFields);
    case "OccupationalHealthcare":
      return toOccupationHealthcareEntry(
        baseEntry,
        fields as OccupationalHealthcareEntryFields
      );
    default:
      return assertNever(t);
  }
};

const toHospitalEntry = (
  base: BaseEntryWithoutId,
  fields: HospitalEntryFields
): HospitalEntryWithoutId => {
  if (!fields.discharge) {
    throw new Error("missing required fields for HospitalEntry: 'discharge'");
  }

  const entry: HospitalEntryWithoutId = {
    ...base,
    type: "Hospital",
    discharge: {
      date: requiredDate(fields.discharge.date, "discharge.date"),
      criteria: requiredString(fields.discharge.criteria, "discharge.criteria"),
    },
  };

  return entry;
};

const toHealthCheckEntry = (
  base: BaseEntryWithoutId,
  fields: HealthCheckEntryFields
): HealthCheckEntryWithoutId => {
  const entry: HealthCheckEntryWithoutId = {
    ...base,
    type: "HealthCheck",
    healthCheckRating: validateHealthCheckRating(fields.healthCheckRating),
  };

  return entry;
};

type SickLeaveFields = UnknownFields<OccupationalHealthcareEntry["sickLeave"]>;

const validateSickLeave = (
  fields: SickLeaveFields
): OccupationalHealthcareEntry["sickLeave"] => {
  if (!fields) return undefined;

  return {
    startDate: requiredDate(fields.startDate, "sickLeave.startDate"),
    endDate: requiredDate(fields.endDate, "sickLeave.endDate"),
  };
};

const toOccupationHealthcareEntry = (
  base: BaseEntryWithoutId,
  fields: OccupationalHealthcareEntryFields
): OccupationalHealthcareEntryWithoutId => {
  const entry: OccupationalHealthcareEntryWithoutId = {
    ...base,
    type: "OccupationalHealthcare",
    employerName: requiredString(fields.employerName, "employerName"),
  };

  if (fields.sickLeave) {
    entry.sickLeave = validateSickLeave(fields.sickLeave as SickLeaveFields);
  }

  return entry;
};
