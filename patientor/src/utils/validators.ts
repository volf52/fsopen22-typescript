import { Entry, Gender, HealthCheckRating } from "../types";
import {
  isString,
  isDate,
  isGender,
  isValidEntryType,
  isNumber,
  isHealthCheckRating,
} from "./gaurds";

export const validateString = (field: unknown, name: string): string => {
  if (!isString(field)) {
    throw new Error(`not a string: ${name}`);
  }

  return field;
};

export const requiredString = (field: unknown, fieldName: string): string => {
  if (!field || !isString(field)) {
    throw new Error(`Incorrect or missing ${fieldName}: ${field}`);
  }

  return field;
};

export const requiredDate = (field: unknown, fieldName: string): string => {
  if (!field || !isString(field) || !isDate(field)) {
    throw new Error(`Incorrect or missing date ${fieldName}: ${field}`);
  }

  return field;
};

export const requiredGender = (field: unknown): Gender => {
  if (!field || !isString(field) || !isGender(field)) {
    throw new Error(`Incorrect or missing gender: ${field}`);
  }

  return field;
};

export const validateEntryType = (field: unknown): Entry["type"] => {
  if (!field || !isString(field) || !isValidEntryType(field)) {
    throw new Error(`Incorrect or missing entry type: ${field}`);
  }

  return field;
};

export const validateHealthCheckRating = (
  field: unknown
): HealthCheckRating => {
  const f = Number(field);
  if (!isNumber(f) || !isHealthCheckRating(f)) {
    throw new Error(`not a valid health check rating: ${field}`);
  }

  return f;
};
