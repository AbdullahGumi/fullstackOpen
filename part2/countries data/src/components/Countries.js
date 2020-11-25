import React from 'react';
import Country from './Country';
import CountryWithDetails from './CountryWithDetails';

const Countries = ({ filteredCountry }) => {
 return (
 	<div>
        {filteredCountry.length > 10 ? (
            <p>Too mant matches, please be more specific!</p>
          ) : (
            filteredCountry.length === 1 ? (
                <Country filteredCountry={filteredCountry} />
              ) : (
                filteredCountry.length > 1 &&  <CountryWithDetails filteredCountry={filteredCountry}/>
              ) 
          )
      }
      </div>	
 );
}

export default Countries;