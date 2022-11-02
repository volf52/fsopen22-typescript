import Typography from "@material-ui/core/Typography";
import HealingIcon from '@material-ui/icons/Healing';
import { HospitalEntry } from "../types";

interface HospitalEntryDetailsProps {
  entry: HospitalEntry
}

const HospitalEntryDetails = ({ entry }: HospitalEntryDetailsProps) => {
  return <>
    <Typography>{entry.date} {<HealingIcon />}</Typography>
    <Typography><em>{entry.description}</em></Typography>
    <Typography><strong>Discharge: {entry.discharge.date}</strong> - {entry.discharge.criteria}</Typography>
    <Typography>diagnosed by {entry.specialist}</Typography>
  </>;
};

export default HospitalEntryDetails;
