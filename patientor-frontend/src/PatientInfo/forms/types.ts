import {
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";

export type HospitalEntryWoId = Omit<HospitalEntry, "id">;
export type HealthCheckWoId = Omit<HealthCheckEntry, "id">;
export type OccupationalWoId = Omit<OccupationalHealthcareEntry, "id">;
export type EntryWithoutId =
  | HospitalEntryWoId
  | HealthCheckWoId
  | OccupationalWoId;

export type SubmissionFunc = (
  values: EntryWithoutId,
  setSubmitting: (isSubmitting: boolean) => void
) => void;

export interface FormProps {
  onSubmit: SubmissionFunc;
  onCancel: () => void;
}
