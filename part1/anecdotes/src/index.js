import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const nextAnecdotes = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }
  
  const voteForAnecdotes = () => {
    const tmpVotes = [...votes];
    tmpVotes[selected]++;
    setVotes(tmpVotes);
    console.log(tmpVotes);
    console.log('votes', votes); 
  }

  return (
    <div>
      <li>{anecdotes[selected]}</li>
      <button onClick={nextAnecdotes}>View next anecdotes</button>
      <button onClick={voteForAnecdotes}>Vote</button>
      <p>This anecdotes has {votes[selected]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)