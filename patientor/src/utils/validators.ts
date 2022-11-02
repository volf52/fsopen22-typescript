import { Gender } from "../types";
import { isString, isDate, isGender } from "./gaurds";

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
