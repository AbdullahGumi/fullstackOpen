import React from 'react';

const Country = ({ filteredCountry}) => {
 return (
 	<div>
 		<h2>{filteredCountry[0].name}</h2>
 		<p>capital: {filteredCountry[0].capital}</p>
 		<p>population: {filteredCountry[0].population}</p>
 		<h3>languages</h3>
 		<ul>
 			{filteredCountry.map(lang => lang.languages.map(speak => <li key={speak.name}>{speak.name}</li>))}
 		</ul>
 		<img style={{width: '250px', height: '250px'}} alt='flag' src={filteredCountry[0].flag}/>
 	</div>
 );
}

export default Country;