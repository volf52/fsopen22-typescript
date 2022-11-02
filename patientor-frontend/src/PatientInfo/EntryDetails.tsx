import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import type { Entry } from '../types';
import { useStateValue } from '../state';

interface EntryDetailsProps {
  entry: Entry
}

const EntryDetails = ({ entry }: EntryDetailsProps) => {
  const [{ diagnoses },] = useStateValue();


  return <Box margin={2}>
    <Typography><strong>{entry.date}</strong> <i>{entry.description}</i></Typography>
    <ul>
      {entry.diagnosisCodes && entry.diagnosisCodes.map(e => {
        const d = diagnoses[e];

        if (!d) return <li key={e}>{e}</li>;

        return <li key={e}>{e} - {d.name}</li>;
      })}
    </ul>
  </Box>;
};

export default EntryDetails;
