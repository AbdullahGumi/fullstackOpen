import React from "react";
import ReactDOM from "react-dom";
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

export interface CoursePart {
  name: string,
  exerciseCount: number,
}
const App: React.FC = () => {

  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
      {/*<p>
              {courseParts[0].name} {courseParts[0].exerciseCount}
            </p>
            <p>
              {courseParts[1].name} {courseParts[1].exerciseCount}
            </p>
            <p>
              {courseParts[2].name} {courseParts[2].exerciseCount}
            </p>
            <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>*/}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));