import React from 'react';
import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch()
    const createAnecdote = (e) => {

    e.preventDefault()
    dispatch(createNewAnecdote(e.target.anecdote.value))
  }

  return (
  	<div>
      <h2>create new anecdote</h2>
      <form onSubmit={createAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>  		
  	</div>
  );	
}

export default AnecdoteForm;