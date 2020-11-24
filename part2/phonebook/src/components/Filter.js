import React from 'react';

const Filter = ({ filterNames }) => {
 return (
 	<div> 
 		filter shown with  <input onChange={filterNames} />
 	</div>	
 );
}

export default Filter;