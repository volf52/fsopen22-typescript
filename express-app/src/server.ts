import express from "express";
import { calculateBmi } from "./bmi";
import { calculateExercises } from "./exercises";

const app = express();

app.use(express.json());

app.get("/hello", (_, resp) => {
  resp.send("Hello Full Stack!");
});

app.get("/bmi", (req, resp) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return resp.status(422).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);

  return resp.json({ height, weight, bmi });
});

app.post("/exercises", (req, resp) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!target || !daily_exercises) {
    return resp.status(422).json({ error: "parameters missing" });
  }

  const t = Number(target);
  if (isNaN(t)) {
    return resp.status(422).json({ error: "malformatted parameters" });
  }

  const hours: number[] = [];
  for (const hh of daily_exercises) {
    const h = Number(hh);

    if (isNaN(h)) {
      return resp.status(422).json({ error: "malformatted parameters" });
    }

    hours.push(h);
  }

  const result = calculateExercises(hours, t);

  return resp.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
