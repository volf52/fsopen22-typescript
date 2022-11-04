import {
  TextField,
  DateField,
  DiagnosisSelection,
  DiagnosesSelectionProps,
} from "./Fields";
import { Field } from "formik";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { assertNever } from "../../utils";
import type {
  EntryWithoutId,
  HealthCheckWoId,
  HospitalEntryWoId,
  OccupationalWoId,
} from "./types";
import { useStateValue } from "../../state";
import { useMemo } from "react";

export const commonInitialValues: Omit<EntryWithoutId, "type"> = {
  description: "",
  date: "",
  specialist: "",
  diagnosisCodes: [],
};

export const CommonFields = () => (
  <>
    <Field
      label="Description"
      placeholder="Description"
      name="description"
      component={TextField}
    />
    <DateField label="Date" name="date" />
    <Field
      label="Specialist"
      placeholder="Specialist"
      name="specialist"
      component={TextField}
    />
  </>
);

type DiagnosesSelectionContainerProps = Omit<
  DiagnosesSelectionProps,
  "diagnoses"
>;

const DiagnosesSelectionContainer = ({
  setFieldTouched,
  setFieldValue,
}: DiagnosesSelectionContainerProps) => {
  const [{ diagnoses }] = useStateValue();

  const diagnosesValues = useMemo(() => {
    return Object.values(diagnoses);
  }, [diagnoses]);

  return (
    <DiagnosisSelection
      diagnoses={diagnosesValues}
      setFieldTouched={setFieldTouched}
      setFieldValue={setFieldValue}
    />
  );
};

interface FooterCommonProps extends DiagnosesSelectionContainerProps {
  onCancel: () => void;
  disableAdd: boolean;
}

export const FooterCommon = ({
  onCancel,
  disableAdd,
  setFieldValue,
  setFieldTouched,
}: FooterCommonProps) => (
  <>
    <Divider style={{ marginTop: "0.5em", marginBottom: "0.5em" }} />
    <DiagnosesSelectionContainer
      setFieldTouched={setFieldTouched}
      setFieldValue={setFieldValue}
    />
    <Grid>
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          style={{ float: "left" }}
          type="button"
          onClick={() => onCancel()}
        >
          Cancel
        </Button>
      </Grid>
      <Grid item>
        <Button
          style={{
            float: "right",
          }}
          type="submit"
          variant="contained"
          disabled={disableAdd}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  </>
);

type ErrorObject = {
  [k: string]: string | ErrorObject | undefined;
};

const FIELD_REQUIRED = "Field is required";

const validateField = (
  key: string,
  val: string | undefined,
  errors: ErrorObject
): ErrorObject => {
  if (!val) {
    errors[key] = FIELD_REQUIRED;
  }

  return errors;
};

const removeIfEmpty = (key: string, errors: ErrorObject): ErrorObject => {
  const val = errors[key];
  if (val === undefined) return errors;

  if (typeof val === "string" || val instanceof String) {
    if (val === "") {
      delete errors[key];
    }

    return errors;
  }

  if (Object.keys(val).length === 0) {
    delete errors[key];
  }

  return errors;
};

export const validateEntryValues = (values: EntryWithoutId): ErrorObject => {
  const errors: ErrorObject = {};

  validateField("description", values.description, errors);
  validateField("date", values.date, errors);
  validateField("specialist", values.specialist, errors);

  switch (values.type) {
    case "Hospital":
      return validateHospitalEntryValues(values, errors);
    case "OccupationalHealthcare":
      return validateOccupationalHealthcareEntryValues(values, errors);
    case "HealthCheck":
      return validateHealthCheckEntryValues(values, errors);
    default:
      return assertNever(values);
  }
};

const validateHealthCheckEntryValues = (
  _values: HealthCheckWoId,
  errors: ErrorObject
): ErrorObject => {
  return errors;
};

const validateHospitalEntryValues = (
  values: HospitalEntryWoId,
  errors: ErrorObject
): ErrorObject => {
  errors.discharge = {};

  validateField("date", values.discharge.date, errors.discharge);
  validateField("criteria", values.discharge.criteria, errors.discharge);

  removeIfEmpty("discharge", errors);

  return errors;
};

const validateOccupationalHealthcareEntryValues = (
  values: OccupationalWoId,
  errors: ErrorObject
): ErrorObject => {
  validateField("employerName", values.employerName, errors);
  if (values.sickLeave) {
    errors.sickLeave = {};

    validateField("startDate", values.sickLeave.startDate, errors.sickLeave);
    validateField("endDate", values.sickLeave.endDate, errors.sickLeave);

    removeIfEmpty("sickLeave", errors);
  }

  return errors;
};
