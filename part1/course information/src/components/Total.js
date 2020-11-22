import React from "react";

const Total = ({ exercises1, exercises2, exercises3 }) => {
	return (
		<div>
			<h3>Total number of exercises: { exercises1 + exercises2 + exercises3 }</h3>
		</div>
		)
};

export default Total;

  // let totalNumber = 0;
  // if (parts) {
  //   parts.map(part => {
  //     totalNumber = totalNumber + part.exercises;
  //   });
  // }
  // return <p>Total Number: {totalNumber}</p>;