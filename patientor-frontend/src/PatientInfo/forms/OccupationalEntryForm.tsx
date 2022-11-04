import { DateField, TextField } from "./Fields";
import { Field, Form, Formik } from "formik";
import { FormProps, OccupationalWoId } from "./types";
import {
  CommonFields,
  commonInitialValues,
  FooterCommon,
  validateEntryValues,
} from "./common";
import { Switch } from "@material-ui/core";
import { useState } from "react";

const initialValues: OccupationalWoId = {
  ...commonInitialValues,
  type: "OccupationalHealthcare",
  employerName: "",
};

type OccupationalEntryFormProps = FormProps;

const OccupationalEntryForm = ({
  onCancel,
  onSubmit,
}: OccupationalEntryFormProps) => {
  const [sickLeave, setSickLeave] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, helpers) => {
        onSubmit(values, helpers.setSubmitting);
      }}
      validate={validateEntryValues}
    >
      {({
        isSubmitting,
        dirty,
        isValid,
        values,
        validateForm,
        setFieldTouched,
        setFieldValue,
      }) => (
        <Form>
          <CommonFields />

          <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
          />

          <Switch
            value={sickLeave}
            onChange={(e) => {
              const value = e.target.checked;
              if (value) {
                values.sickLeave = {
                  startDate: "",
                  endDate: "",
                };

                // maybe not needed
                setFieldTouched("sickLeave.startDate", true);
                setFieldTouched("sickLeave.endDate", true);
              } else {
                delete values.sickLeave;
              }
              validateForm().catch(console.error);

              setSickLeave(value);
            }}
          />

          {sickLeave && (
            <>
              <DateField
                label="Sick Leave Start Date"
                name="sickLeave.startDate"
              />
              <DateField label="Sick Leave End Date" name="sickLeave.endDate" />
            </>
          )}

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

export default OccupationalEntryForm;
