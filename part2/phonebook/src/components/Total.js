import React from "react";

const Total = ({ parts }) => {
	let accumulated = parts.reduce((s, part) => s + part.exercises, 0);
	return (
		<div>
			{<h3>Total number of exercises: { accumulated }</h3>}
		</div>
		)
};

export default Total;

