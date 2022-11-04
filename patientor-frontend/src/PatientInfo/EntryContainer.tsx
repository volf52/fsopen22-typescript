import Box from "@material-ui/core/Box";
import { Entry } from "../types";
import EntryDetails from "./EntryDetails";

interface EntryContainerProps {
  entry: Entry;
}

const EntryContainer = ({ entry }: EntryContainerProps) => (
  <Box padding="0.5em" border={2} marginY="0.5em" borderRadius={14}>
    <EntryDetails entry={entry} />
  </Box>
);

export default EntryContainer;
