import React, { useState, useEffect } from 'react';
import axios from 'axios';


const CountryWeather = ({ capitalName }) => {

const [weatherData, setWeatherData] = useState([]);

const key = '3f87fe8df6fbd3c99832d0d61826248f';
useEffect(() => {
	axios
		.get(`http://api.weatherstack.com/current?access_key=${key}&query=${capitalName}&units=f`)
			.then(res =>  setWeatherData(res.data.current))

}, [])

 return (
 	<div> 
 		<h2>Weather in {capitalName}</h2>
		<h3>Temperature: {Math.floor((weatherData.temperature - 32) * 5/9)} Celcius</h3>
		<img alt='weather' src={weatherData.weather_icons}/>
		<p>{weatherData.weather_descriptions}</p>
		<h3>wind: {weatherData.wind_speed} mph direction {weatherData.wind_dir}</h3>
 	</div>	
 );
}

export default CountryWeather;
