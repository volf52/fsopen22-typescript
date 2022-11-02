export const calculateBmi = (heightInCm: number, weightInKg: number) => {
  const heightInMeters = heightInCm / 100;

  const bmi = weightInKg / (heightInMeters * heightInMeters);

  if (bmi > 40) return "Obesity (Class 3)";
  if (bmi > 35) return "Obesity (Class 2)";
  if (bmi > 30) return "Obesity (Clas 1)";
  if (bmi > 25) return "Overweight";
  if (bmi > 18.5) return "Normal (healthy weight)";

  return "Underweight";
};
