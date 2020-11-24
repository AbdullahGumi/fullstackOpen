import React from 'react';
import Part from './Part.js';
const Content = ({ parts }) => {
	return(
	<div>
		{parts &&
			parts.map(part=> <Part key={part.id} part={part.name} exercises={part.exercises} /> )
		}
	</div>
	);
};

export default Content;
