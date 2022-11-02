import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";

const courseName = "Half Stack application development";
const courseParts = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
  },
];

const App = () => {
  return (
    <div>
      <Header courseName={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

export default App;
