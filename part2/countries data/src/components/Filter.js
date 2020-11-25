import React from 'react';

const Filter = ({ filteredCountries }) => {
 return (
 	<div> 
 		find country: <input onChange={filteredCountries} />
 	</div>	
 );
}

export default Filter;