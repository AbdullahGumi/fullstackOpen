import React from 'react';
import { connect } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = ({ createNewAnecdote, setNotification }) => {
    const createAnecdote = async (e) => {

    e.preventDefault()
    createNewAnecdote(e.target.anecdote.value)
    setNotification(`Anecdote "${e.target.anecdote.value}" was created`, 5)
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

const mapDispatchToProps = dispatch => ({
  createNewAnecdote: newAnecdote => dispatch(createNewAnecdote(newAnecdote)),
  setNotification: message => dispatch(setNotification(message))
})

export default connect(null, mapDispatchToProps)(AnecdoteForm);