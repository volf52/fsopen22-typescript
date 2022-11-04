import TextFieldMUI from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";

import { FieldProps, ErrorMessage, Field, FormikProps } from "formik";
import { useState } from "react";
import { Diagnosis } from "../../types";

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField = ({ field, label, placeholder }: TextProps) => (
  <div style={{ marginBottom: "1em" }}>
    <TextFieldMUI
      fullWidth
      label={label}
      placeholder={placeholder}
      {...field}
    />
    <Typography variant="subtitle2" style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </Typography>
  </div>
);

type DateFieldProps = {
  label: string;
  name: string;
};

export const DateField = ({ label, name, ...props }: DateFieldProps) => (
  <Field
    label={label}
    name={name}
    placeholder="YYYY-MM-DD"
    component={TextField}
    {...props}
  />
);

export type ValidSelectFieldValues = number | string;

export interface SelectFieldOption<T extends ValidSelectFieldValues> {
  label: string;
  value: T;
}

type SelectFieldProps<T extends ValidSelectFieldValues> = {
  name: string;
  label: string;
  options: SelectFieldOption<T>[];
};

const FormikSelect = ({ field, ...props }: FieldProps) => (
  <Select {...field} {...props} />
);

export const SelectField = <T extends ValidSelectFieldValues>({
  name,
  label,
  options,
}: SelectFieldProps<T>) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: "0.5em" }}
      label={label}
      component={FormikSelect}
      name={name}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
);

type DiagnosesFormikProps = FormikProps<{ diagnosisCodes: string[] }>;

export interface DiagnosesSelectionProps {
  diagnoses: Diagnosis[];
  setFieldTouched: DiagnosesFormikProps["setFieldTouched"];
  setFieldValue: DiagnosesFormikProps["setFieldValue"];
}

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: DiagnosesSelectionProps) => {
  const [selectedDiagnoses, setDiagnoses] = useState<string[]>([]);
  const field = "diagnosisCodes";
  const onChange = (data: string[]) => {
    setDiagnoses([...data]);
    setFieldTouched(field, true);
    setFieldValue(field, selectedDiagnoses);
  };

  const stateOptions = diagnoses.map((diagnosis) => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <FormControl style={{ width: 552, marginBottom: "30px" }}>
      <Box marginTop={5} component="ul">
        {selectedDiagnoses.map((diagnosis) => (
          <li key={diagnosis}>{diagnosis}</li>
        ))}
      </Box>
      <InputLabel>Diagnoses</InputLabel>
      <Select
        multiple
        value={selectedDiagnoses}
        onChange={(e) => onChange(e.target.value as string[])}
        input={<Input />}
      >
        {stateOptions.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessage name={field} />
    </FormControl>
  );
};
