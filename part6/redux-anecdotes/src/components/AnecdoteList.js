import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeVote } from '../reducers/anecdoteReducer.js';
import { setMessage, removeMessage } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes.filter(anec => anec.content.toLowerCase().includes(state.filter.toLowerCase())))
  const dispatch = useDispatch()
  const vote = (anecdote) => {
    dispatch(makeVote(anecdote.id))
    dispatch(setMessage(`You voted "${anecdote.content}"`))
    setTimeout(() => dispatch(removeMessage()), 5000)    
  }	

	return (
	<div>
      {anecdotes.sort((a, b)=> b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}		
	</div>	
	);
}

export default AnecdoteList;