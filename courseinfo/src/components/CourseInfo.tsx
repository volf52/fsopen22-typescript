import { Course } from "../types";

interface CourseInfoProps {
  course: Course;
}

export const CourseInfo = ({ course }: CourseInfoProps) => (
  <p>
    {" "}
    {course.name} {course.exerciseCount}
  </p>
);

export default CourseInfo;
