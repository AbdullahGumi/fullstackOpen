import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeVote } from './reducers/anecdoteReducer.js';
import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(makeVote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {/* sort the anecdotes by votes then map*/}
      {anecdotes.sort((a, b)=> b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <AnecdoteForm />
    </div>
  )
}

export default App