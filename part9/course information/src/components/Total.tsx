import React from 'react';
import { CoursePart } from "../types";

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <div>
        Number of exercises{" "}
        {courseParts.reduce((acc, part) => acc + part.exerciseCount, 0)}
    </div>
  );
}

export default Total;
