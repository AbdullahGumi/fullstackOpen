import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeVote, createNewAnecdote } from './reducers/anecdoteReducer.js';

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(makeVote(id))
  }

    const createAnecdote = (e) => {

    e.preventDefault()
    dispatch(createNewAnecdote(e.target.anecdote.value))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
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
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App