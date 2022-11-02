import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  } | { type: "SET_DIAGNOSES_LIST", payload: Diagnosis[] };

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
          ...state.diagnoses
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => ({
  type: "SET_PATIENT_LIST",
  payload: patients
});

export const setDiagnosesList = (diagnoses: Diagnosis[]): Action => ({
  type: "SET_DIAGNOSES_LIST",
  payload: diagnoses
});

export const addPatient = (patient: Patient): Action => ({
  type: 'ADD_PATIENT',
  payload: patient
});
