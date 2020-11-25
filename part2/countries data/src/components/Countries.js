import React from 'react';
import Country from './Country';

const Countries = ({ filteredCountry }) => {
 return (
 	<div>
        {filteredCountry.length > 10 ? (
            <p>Too mant matches, please be more specific!</p>
          ) : (
            filteredCountry.length === 1 ? (
                <Country filteredCountry={filteredCountry} />
              ) : (
                filteredCountry.length > 1 && filteredCountry.map(country => <p key={country.name}>{country.name}</p>)
              ) 
          )
      }
      </div>	
 );
}

export default Countries;