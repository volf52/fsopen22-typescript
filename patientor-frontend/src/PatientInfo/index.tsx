import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// import SvgIcon from '@material-ui/core/SvgIcon';
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue } from "../state";

// import maleSvg from './male.svg';
// import femaleSvg from './female.svg';

// const MaleIcon = () => <SvgIcon fontSize='large'>{maleSvg}</SvgIcon>;
// const FemaleIcon = () => <SvgIcon>{femaleSvg}</SvgIcon>;

const PatientInfo = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <div><p>No id</p></div>;

  const [{ patients }, dispatch] = useStateValue();
  const patient = patients[id];

  useEffect(() => {
    if (!id) return;
    if (patient) {
      console.debug(`id ${id} already in state. not refetching`);
      return;
    }

    console.debug(`id ${id} not in state. Fetching`);

    axios.get(`${apiBaseUrl}/patients/${id}`).then(resp => resp.data as Patient).then((patient) => {
      dispatch({ type: 'ADD_PATIENT', payload: patient });
    }).catch(console.error);
  }, []);

  if (!patient) return <div>Loading...</div>;

  return (
    <div style={{ paddingTop: 20 }}>
      <Box>
        <Typography variant="h4">{patient.name} - {patient.gender}</Typography>
        <Typography>ssn: {patient.ssn}</Typography>
        <Typography>occupation: {patient.occupation}</Typography>
      </Box>
    </div>
  );
};

export default PatientInfo;
