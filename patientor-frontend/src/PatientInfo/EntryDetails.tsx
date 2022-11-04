import type { Entry } from "../types";
// import { useStateValue } from '../state';

import HospitalEntryDetails from "./HospitalEntryDetails";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntryDetails";
import { assertNever } from "../utils";

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails = ({ entry }: EntryDetailsProps) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

{
  /* <ul> */
}
{
  /*      {entry.diagnosisCodes && entry.diagnosisCodes.map(e => { */
}
{
  /*        const d = diagnoses[e]; */
}
{
  /**/
}
{
  /*        if (!d) return <li key={e}>{e}</li>; */
}
{
  /**/
}
{
  /*        return <li key={e}>{e} - {d.name}</li>; */
}
{
  /*      })} */
}
{
  /*    </ul> */
}

export default EntryDetails;
