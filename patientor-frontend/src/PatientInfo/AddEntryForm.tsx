import type { Entry } from "../types";

import HospitalEntryForm from "./forms/HospitalEntryForm";
import { useState } from "react";
import { FormProps } from "./forms/types";
import HealthCheckEntryForm from "./forms/HealthCheckEntryForm";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Divider from "@material-ui/core/Divider";
import OccupationalEntryForm from "./forms/OccupationalEntryForm";
import { assertNever } from "../utils";

interface FormPartProps extends FormProps {
  type: Entry["type"];
}

const FormPart = ({ type, onCancel, onSubmit }: FormPartProps) => {
  switch (type) {
    case "Hospital":
      return <HospitalEntryForm onCancel={onCancel} onSubmit={onSubmit} />;
    case "HealthCheck":
      return <HealthCheckEntryForm onCancel={onCancel} onSubmit={onSubmit} />;
    case "OccupationalHealthcare":
      return <OccupationalEntryForm onCancel={onCancel} onSubmit={onSubmit} />;
    default:
      return assertNever(type);
  }
};

interface SpecialSelectProps {
  value: Entry["type"];
  onChange: (val: Entry["type"]) => void;
}

const SpecialSelect = ({ value, onChange }: SpecialSelectProps) => {
  return (
    <FormControl>
      <InputLabel shrink>FormType</InputLabel>
      <Select
        value={value}
        onChange={(e) => {
          const val = e.target.value as Entry["type"];
          onChange(val);
        }}
      >
        <MenuItem value="Hospital">Hospital</MenuItem>
        <MenuItem value="HealthCheck">HealthCheck</MenuItem>
        <MenuItem value="OccupationalHealthcare">
          OccupationalHealthcare
        </MenuItem>
      </Select>
    </FormControl>
  );
};

type AddEntryFormProps = FormProps;

const AddEntryForm = ({ onCancel, onSubmit }: AddEntryFormProps) => {
  const [type, setType] = useState<Entry["type"]>("HealthCheck");

  return (
    <div>
      <SpecialSelect value={type} onChange={setType} />
      <Divider style={{ marginTop: "10px", marginBottom: "5px" }} />
      <FormPart type={type} onCancel={onCancel} onSubmit={onSubmit} />
    </div>
  );
};

export default AddEntryForm;
