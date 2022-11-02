import { Course } from "../types";

interface TotalProps {
  courses: Course[];
}

const Total = ({ courses }: TotalProps) => (
  <div>
    {" "}
    <p>
      Number of exercises{" "}
      {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  </div>
);

export default Total;
