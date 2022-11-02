import type { Entry } from '../types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import EntryDetails from './EntryDetails';

interface EntriesProps {
  entries: Entry[]
}

const Entries = ({ entries }: EntriesProps) => {
  return <Box>
    <Typography variant="h4">entries</Typography>
    {entries.map(e => <EntryDetails key={e.id} entry={e} />)}
  </Box>;
};

export default Entries;
