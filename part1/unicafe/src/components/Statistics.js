import React from 'react';
import Statistic from './Statistic';

const Statistics = ({ good, neutral, bad }) => {
 	const statisticsStatus = good || neutral || bad ? (		
 		<div>
	      <h2>Statistics</h2>
	      <Statistic text='Good' value={good}/>
	      <Statistic text='Neutral' value={neutral}/>
	      <Statistic text='Bad' value={bad}/>
	      <Statistic text='All' value={good + neutral + bad}/>
	      <Statistic text='average' value={(good + neutral + bad) / 3}/>
	      <Statistic text='positive' value={`${(good * 100)/ (good + neutral + bad)}%`}/>
		</div>
		) : (<p>No feedback given</p>)
	return statisticsStatus;
};

export default Statistics;