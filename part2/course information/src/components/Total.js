import React from "react";

const Total = ({ parts }) => {
	let accumulated = 0
	 parts.map(part => accumulated = part.exercises + accumulated);
	return (
		<div>
			{<h3>Total number of exercises: { accumulated }</h3>}
		</div>
		)
};

export default Total;

