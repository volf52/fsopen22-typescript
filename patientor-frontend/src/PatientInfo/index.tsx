import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import type { Patient } from "../types";
import { addPatient, useStateValue } from "../state";
import Entries from './Entries';

const PatientInfo = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <div><p>No id</p></div>;

  const [{ patients }, dispatch] = useStateValue();
  const patient = patients[id];

  useEffect(() => {
    if (!id) return;
    if (patient && patient.ssn) {
      console.debug(`id ${id} already in state. not refetching`);
      return;
    }

    console.debug(`id ${id} not in state. Fetching`);

    axios.get(`${apiBaseUrl}/patients/${id}`).then(resp => resp.data as Patient).then((patient) => {
      dispatch(addPatient(patient));
    }).catch(console.error);
  }, []);

  if (!patient) return <div>Loading...</div>;

  return (
    <Box marginTop={5}>
      <Box>
        <Typography variant="h2">{patient.name} - {patient.gender}</Typography>

        <Box marginY={1} padding={2}>
          <Typography>ssn: {patient.ssn}</Typography>
          <Typography>occupation: {patient.occupation}</Typography>
        </Box>

        <Entries entries={patient.entries} />
        <Button variant="contained" color="primary" >
          Add New Entry
        </Button>

      </Box>
    </Box>
  );
};

export default PatientInfo;
