import { Course } from "../types";
import CourseInfo from "./CourseInfo";

interface ContentProps {
  courses: Course[];
}

const Content = ({ courses }: ContentProps) => {
  return (
    <div>
      {courses.map((c) => (
        <CourseInfo key={c.name} course={c} />
      ))}
    </div>
  );
};

export default Content;
