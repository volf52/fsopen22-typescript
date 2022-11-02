import express from "express";
import { calculateBmi } from "./bmi";

const app = express();

app.use(express.json());

app.get("/hello", (_, resp) => {
  resp.send("Hello Full Stack!");
});

app.get("/bmi", (req, resp) => {
  const height = parseFloat(req.query.height as string);
  const weight = parseFloat(req.query.weight as string);

  if (isNaN(height) || isNaN(weight)) {
    return resp.status(422).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);

  return resp.json({ height, weight, bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
