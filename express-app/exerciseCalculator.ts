const args = process.argv;

if (args.length < 4) {
  console.log(
    "Usage: ts-node exerciseCalculator.ts {target} {day1Hours} {day2Hours} ... {dayNHours}"
  );
  process.exit(1);
}

type Rating = 1 | 2 | 3;
type RatingDescription = "barely ok" | "satisfactory" | "good";

type Exercises = {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: RatingDescription;
  target: number;
  average: number;
};

const calculateExercises = (
  dailyExerciseHours: number[],
  target: number
): Exercises => {
  const periodLength = dailyExerciseHours.length;
  const trainingDaysArr = dailyExerciseHours.filter((h) => h > 0);
  const trainingDays = trainingDaysArr.length;

  const success = trainingDays === periodLength;
  const average =
    trainingDaysArr.reduce((acc, curr) => acc + curr, 0) / periodLength;

  const ratio = trainingDays / periodLength;

  let rating: Rating;
  let ratingDescription: RatingDescription;
  if (ratio < 0.55) {
    rating = 1;
    ratingDescription = "barely ok";
  } else if (ratio < 0.95) {
    rating = 2;
    ratingDescription = "satisfactory";
  } else {
    rating = 3;
    ratingDescription = "good";
  }

  return {
    target,
    periodLength,
    trainingDays,
    success,
    average,
    rating,
    ratingDescription,
  };
};

const target = parseFloat(args[2]);
if (isNaN(target)) {
  console.log("target must be a number");
  process.exit(1);
}

const hours: number[] = [];

for (let i = 3; i < args.length; i++) {
  const h = parseFloat(args[i]);
  if (isNaN(h)) {
    console.log("hours given must be a number");
    process.exit(1);
  }

  hours.push(h);
}

console.log(calculateExercises(hours, target));
