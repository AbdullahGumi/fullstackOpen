import React from 'react';
import Part from './Part.js';
const Content = ({ parts }) => {
	return(
	<div>
		<Part part={parts[0].name}/>
		<Part part={parts[1].name}/>
		<Part part={parts[2].name}/>
	</div>
	);
};

export default Content;
