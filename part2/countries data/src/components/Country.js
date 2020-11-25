import React from 'react';
import CountryWeather from './CountryWeather';

const Country = ({ filteredCountry, details}) => {
 return (
 	<div>
 		{
 			details ? (
 					<div>
	 					<h2>{details.name}</h2>
				 		<p>capital: {details.capital}</p>
				 		<p>population: {details.population}</p>
				 		<h3>languages</h3>
				 		<ul>
				 			{details.languages.map(speak => <li key={speak.name}>{speak.name}</li>)}
				 		</ul>
				 		<img style={{width: '250px', height: '250px'}} alt='flag' src={details.flag}/>	
 					</div>	
 				) : (
 					<div>
						<h2>{filteredCountry[0].name}</h2>
				 		<p>capital: {filteredCountry[0].capital}</p>
				 		<p>population: {filteredCountry[0].population}</p>
				 		<h3>languages</h3>
				 		<ul>
				 			{filteredCountry.map(lang => lang.languages.map(speak => <li key={speak.name}>{speak.name}</li>))}
				 		</ul>
				 		<img style={{width: '250px', height: '250px'}} alt='flag' src={filteredCountry[0].flag}/>
				 		<CountryWeather capitalName={filteredCountry[0].capital} />
 					</div>
 				)
 		}
 	</div>
 );
}

export default Country;