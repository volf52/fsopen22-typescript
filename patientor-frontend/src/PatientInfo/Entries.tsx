import type { Entry } from "../types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import EntryContainer from "./EntryContainer";

interface EntriesProps {
  entries: Entry[];
}

const Entries = ({ entries }: EntriesProps) => {
  return (
    <Box marginY={2}>
      <Typography variant="h4">entries</Typography>
      {entries.map((e) => (
        <EntryContainer key={e.id} entry={e} />
      ))}
    </Box>
  );
};

export default Entries;
