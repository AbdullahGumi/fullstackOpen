import React, {useState} from 'react';
import Country from './Country';

const CountryWithDetails = ({ filteredCountry }) => {

  const [isToggled, toggleCountryDetails] = useState(false);
  const [details, setCountryDetails] = useState([]);

  const showCountryDetails = (countryDetails) => {
    toggleCountryDetails(!isToggled);
    setCountryDetails(countryDetails);
    }

  const country = isToggled ? (
      <Country details={details}/>
    ) : (
      <div>
        {filteredCountry.map(country =>
           <p key={country.name}>{country.name}
             <button onClick={() => showCountryDetails(country)}>Show details</button>
           </p>
         )}
      </div>
    )

 return (
 	<div>
    {country}
  </div>	
 );
}

export default CountryWithDetails;