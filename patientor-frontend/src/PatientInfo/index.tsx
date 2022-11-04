import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { addEntryForPatient, addPatient, useStateValue } from "../state";

import Entries from "./Entries";
import AddEntryModal from "./AddEntryModal";

import type { Entry, Patient } from "../types";
import { SubmissionFunc } from "./forms/types";

const PatientInfo = () => {
  const { id } = useParams<{ id: string }>();

  if (!id)
    return (
      <div>
        <p>No id</p>
      </div>
    );

  const [{ patients }, dispatch] = useStateValue();
  const patient = patients[id];

  useEffect(() => {
    if (!id) return;
    if (patient && patient.ssn) {
      console.debug(`id ${id} already in state. not refetching`);
      return;
    }

    console.debug(`id ${id} not in state. Fetching`);

    axios
      .get(`${apiBaseUrl}/patients/${id}`)
      .then((resp) => resp.data as Patient)
      .then((patient) => {
        dispatch(addPatient(patient));
      })
      .catch(console.error);
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");

  const openModal = () => setModalOpen(true);

  const closeModal = () => {
    setModalOpen(false);
    setError("");
  };

  const submitEntry: SubmissionFunc = async (values, setSubmitting) => {
    setSubmitting(true);
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      console.log(newEntry);
      closeModal();
      dispatch(addEntryForPatient(id, newEntry));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <Box marginTop={5}>
      <Box>
        <Typography variant="h2">
          {patient.name} - {patient.gender}
        </Typography>

        <Box marginY={1} padding={2}>
          <Typography>ssn: {patient.ssn}</Typography>
          <Typography>occupation: {patient.occupation}</Typography>
        </Box>

        <Entries entries={patient.entries} />

        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()} variant="contained" color="primary">
          Add New Entry
        </Button>
      </Box>
    </Box>
  );
};

export default PatientInfo;
