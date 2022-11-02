import { CoursePart } from "../types";
import { assertNever } from "../utils";

interface PartProps {
  part: CoursePart;
}

export const Part = ({ part }: PartProps) => {
  let extra;
  switch (part.type) {
    case "normal":
      extra = <p>{part.description}</p>
      break
    case "submission":
      extra = <><p>{part.description}</p><p>submit to {part.exerciseSubmissionLink}</p></>
      break
    case "groupProject":
      extra = <p>project exercises {part.groupProjectCount}</p>
      break;
    case "special":
      extra = <> <p>{part.description}</p><p>required skills: {part.requirements.join(', ')}</p></>
      break;
    default:
      return assertNever(part)
  }


  return <div>
    <h3>{part.name} {part.exerciseCount}</h3>
    {extra}
  </div>
};

export default Part;
