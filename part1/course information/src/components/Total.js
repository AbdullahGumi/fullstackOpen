import React from "react";

const Total = ({ parts }) => {
  let totalNumber = 0;
  if (parts) {
    parts.map(part => {
      totalNumber = totalNumber + part.exercises;
    });
  }
  return <p>Total Number: {totalNumber}</p>;
};

export default Total;
