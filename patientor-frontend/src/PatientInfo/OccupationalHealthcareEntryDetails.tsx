import Typography from "@material-ui/core/Typography";
import WorkIcon from "@material-ui/icons/Work";
import { OccupationalHealthcareEntry } from "../types";

interface OccupationalHealthcareEntryProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryDetails = ({
  entry,
}: OccupationalHealthcareEntryProps) => {
  return (
    <>
      <Typography>
        {entry.date} {<WorkIcon />} <em>{entry.employerName}</em>
      </Typography>
      <Typography>
        <em>{entry.description}</em>
      </Typography>
      {entry.sickLeave && (
        <>
          <Typography>
            <strong>Sick Leave Start:</strong> {entry.sickLeave.startDate}
          </Typography>
          <Typography>
            <strong>Sick Leave End:</strong> {entry.sickLeave.endDate}
          </Typography>
        </>
      )}
      <Typography>diagnosed by {entry.specialist}</Typography>
    </>
  );
};

export default OccupationalHealthcareEntryDetails;
