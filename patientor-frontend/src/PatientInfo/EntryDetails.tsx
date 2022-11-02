import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import type { Entry } from '../types';

interface EntryDetailsProps {
  entry: Entry
}

const EntryDetails = ({ entry }: EntryDetailsProps) => {
  return <Box margin={2}>
    <Typography><strong>{entry.date}</strong> <i>{entry.description}</i></Typography>
    <ul>
      {entry.diagnosisCodes && entry.diagnosisCodes.map(e => (
        <li key={e}>{e}</li>
      ))}
    </ul>
  </Box>;
};

export default EntryDetails;
