import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Statistics from './components/Statistics';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => setGood(good + 1)}>Good</button> 
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button> 
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)