import type { NewPatientEntry } from "../types";
import { requiredDate, requiredGender, requiredString } from "./validators";

type Fields = {
  [k in keyof NewPatientEntry]: unknown;
};

export const toNewPatientEntry = (fields: unknown): NewPatientEntry => {
  const { name, occupation, dateOfBirth, ssn, gender } = fields as Fields;

  const patient: NewPatientEntry = {
    name: requiredString(name, "name"),
    occupation: requiredString(occupation, "occupation"),
    dateOfBirth: requiredDate(dateOfBirth, "dateOfBirth"),
    ssn: requiredString(ssn, "ssn"),
    gender: requiredGender(gender),
  };

  return patient;
};
