import { Entry, Gender, HealthCheckRating } from "../types";

export const assertNever = (o: never): never => o;

export const isString = (field: unknown): field is string => {
  return typeof field === "string" || field instanceof String;
};

export const isNumber = (field: unknown): field is number => {
  return !isNaN(field as number);
};

export const isDate = (d: string): boolean => Boolean(Date.parse(d));

export const isArray = (d: unknown): d is Array<unknown> => Array.isArray(d);

const GenderSet: Readonly<Set<string>> = new Set(Object.values(Gender));

export const isGender = (g: string): g is Gender => GenderSet.has(g);

const healthCheckRatingRightLimit = Object.values(HealthCheckRating).length / 2;

export const isHealthCheckRating = (r: number): r is HealthCheckRating =>
  r >= 0 && r < healthCheckRatingRightLimit;

const EntryTypeSet: Set<Entry["type"]> = new Set([
  "Hospital",
  "HealthCheck",
  "OccupationalHealthcare",
]);

export const isValidEntryType = (t: string): t is Entry["type"] =>
  EntryTypeSet.has(t as Entry["type"]);
