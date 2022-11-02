import { Gender } from "../types";

export const isString = (field: unknown): field is string => {
  return typeof field === "string" || field instanceof String;
};

export const isDate = (d: string): boolean => Boolean(Date.parse(d));

const GenderSet: Readonly<Set<string>> = new Set(Object.values(Gender));

export const isGender = (g: string): g is Gender => GenderSet.has(g);
