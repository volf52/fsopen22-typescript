import Typography from "@material-ui/core/Typography";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { HealthCheckEntry, HealthCheckRating } from "../types";

interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
}
const getHeart = (rating: HealthCheckRating) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon style={{ color: "green" }} />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon style={{ color: "yellow" }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon style={{ color: "red" }} />;
    case HealthCheckRating.CriticalRisk:
      return <FavoriteIcon style={{ color: "black" }} />;
  }
};

const HealthCheckEntryDetails = ({ entry }: HealthCheckEntryProps) => {
  const Heart = () => getHeart(entry.healthCheckRating);

  return (
    <>
      <Typography>
        {entry.date} {<LocalHospitalIcon />}
      </Typography>
      <Typography>
        <em>{entry.description}</em>
      </Typography>
      <Typography>
        <Heart />
      </Typography>
      <Typography>diagnosed by {entry.specialist}</Typography>
    </>
  );
};

export default HealthCheckEntryDetails;
