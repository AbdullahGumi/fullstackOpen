import React from 'react';


const Statistics = ({ good, neutral, bad }) => {
 	const statisticsStatus = good && neutral && bad ? (		
 		<div>
	      <h2>Statistics</h2>
	      <p>good: {good}</p> 
	      <p>Neutral: {neutral}</p> 
	      <p>bad: {bad}</p> 
	      <p>all: {good + neutral + bad}</p>
	      <p>average: {(good + neutral + bad) / 3}</p>
	      <p>positive: {(good * 100)/ (good + neutral + bad)} %</p>
		</div>
		) : (<p>No feedback given</p>)
	return statisticsStatus;
};

export default Statistics;