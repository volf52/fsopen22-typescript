import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";
import { assertNever } from "../utils";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | { type: "SET_DIAGNOSES_LIST"; payload: Diagnosis[] }
  | {
      type: "ADD_ENTRY_TO_PATIENT";
      payload: { patientId: string; entry: Entry };
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce((memo, d) => ({ ...memo, [d.code]: d }), {}),
          ...state.diagnoses,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_ENTRY_TO_PATIENT":
      const patient = state.patients[action.payload.patientId];
      if (!patient) return state;
      patient.entries = [...patient.entries, { ...action.payload.entry }];

      return {
        ...state,
        patients: {
          ...state.patients,
          [patient.id]: { ...patient },
        },
      };
    default:
      assertNever(action);
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => ({
  type: "SET_PATIENT_LIST",
  payload: patients,
});

export const setDiagnosesList = (diagnoses: Diagnosis[]): Action => ({
  type: "SET_DIAGNOSES_LIST",
  payload: diagnoses,
});

export const addPatient = (patient: Patient): Action => ({
  type: "ADD_PATIENT",
  payload: patient,
});

export const addEntryForPatient = (
  patientId: string,
  entry: Entry
): Action => ({ type: "ADD_ENTRY_TO_PATIENT", payload: { patientId, entry } });
