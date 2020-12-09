import React from 'react';
import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { setMessage, removeMessage } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch()
    const createAnecdote = (e) => {

    e.preventDefault()
    dispatch(createNewAnecdote(e.target.anecdote.value))
    dispatch(setMessage(`Anecdote "${e.target.anecdote.value}" was created`))
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