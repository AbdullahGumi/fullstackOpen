import React from 'react';
import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { setMessage, removeMessage } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch()
    const createAnecdote = async (e) => {

    e.preventDefault()
    const newAnecdote = await anecdoteService.createNew(e.target.anecdote.value)
    dispatch(createNewAnecdote(newAnecdote))
    dispatch(setMessage(`Anecdote "${newAnecdote.content}" was created`))
    setTimeout(() => dispatch(removeMessage()), 5000)      
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