import React, { useState, useEffect } from 'react'
import Filter from './components/Filter';
import Countries from './components/Countries';
import axios from 'axios';

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filteredCountry, setFilteredCountry ] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(res => setCountries(res.data));
  }, [])

  const countryName = countries.map(country => country);
  const filteredCountries = e => {
    let searchedCountry = e.target.value.toUpperCase();
    let filtered = countryName.filter(country => country.name.toUpperCase().includes(searchedCountry));
    setFilteredCountry(filtered);
  }

  return (
    <div>
      <Filter filteredCountries={filteredCountries} />
      <Countries filteredCountry={filteredCountry} />
    </div>
  )
}

export default App