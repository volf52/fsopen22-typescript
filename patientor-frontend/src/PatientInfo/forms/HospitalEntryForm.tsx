import { DateField, TextField } from "./Fields";
import { Field, Form, Formik } from "formik";
import { FormProps, HospitalEntryWoId } from "./types";
import {
  CommonFields,
  commonInitialValues,
  FooterCommon,
  validateEntryValues,
} from "./common";

const initialValues: HospitalEntryWoId = {
  ...commonInitialValues,
  type: "Hospital",
  discharge: {
    date: "",
    criteria: "",
  },
};

type HospitalEntryFormProps = FormProps;

const HospitalEntryForm = ({ onCancel, onSubmit }: HospitalEntryFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, helpers) => {
        onSubmit(values, helpers.setSubmitting);
      }}
      validate={(values) => validateEntryValues(values)}
    >
      {({ isSubmitting, dirty, isValid, setFieldTouched, setFieldValue }) => (
        <Form>
          <CommonFields />

          <DateField label="Discharge Date" name="discharge.date" />
          <Field
            label="Discharge Criteria"
            placeholder="Discharge Criteria"
            name="discharge.criteria"
            component={TextField}
          />

          <FooterCommon
            onCancel={onCancel}
            disableAdd={!dirty || !isValid || isSubmitting}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
          />
        </Form>
      )}
    </Formik>
  );
};

export default HospitalEntryForm;
