import { Form, Formik } from "formik";
import { HealthCheckEntry, HealthCheckRating } from "../../types";
import { SelectField, SelectFieldOption } from "./Fields";
import { FormProps } from "./types";
import {
  CommonFields,
  commonInitialValues,
  FooterCommon,
  validateEntryValues,
} from "./common";

const initialValues: Omit<HealthCheckEntry, "id"> = {
  ...commonInitialValues,
  type: "HealthCheck",
  healthCheckRating: HealthCheckRating.Healthy,
};

const ratingOptions: SelectFieldOption<HealthCheckRating>[] = [
  { label: "Healthy", value: HealthCheckRating.Healthy },
  { label: "Low Risk", value: HealthCheckRating.LowRisk },
  { label: "High Risk", value: HealthCheckRating.HighRisk },
  { label: "Critical Risk", value: HealthCheckRating.CriticalRisk },
];

type HealthCheckEntryFormProps = FormProps;

const HealthCheckEntryForm = ({
  onCancel,
  onSubmit,
}: HealthCheckEntryFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, helpers) => {
        onSubmit(values, helpers.setSubmitting);
      }}
      validate={validateEntryValues}
    >
      {({ isSubmitting, dirty, isValid, setFieldTouched, setFieldValue }) => (
        <Form>
          <CommonFields />

          <SelectField
            label="Rating"
            name="healthCheckRating"
            options={ratingOptions}
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

export default HealthCheckEntryForm;
