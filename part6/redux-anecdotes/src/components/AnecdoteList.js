import React from 'react';
import { connect } from 'react-redux';
import { makeVote } from '../reducers/anecdoteReducer.js';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({ makeVote, setNotification, anecdotes, filter }) => {
  const anecdote = anecdotes.filter(anec => anec.content.toLowerCase().includes(filter.toLowerCase()))
  const vote = (anecdote) => {
   makeVote(anecdote)
   setNotification(`You voted "${anecdote.content}"`, 5)
  }	

	return (
	<div>
      {anecdote.sort((a, b)=> b.votes - a.votes).map(anecdote =>
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

const mapStateToProps = (state) => ({
  anecdotes: state.anecdotes,
  filter: state.filter
})

const mapDispatchToProps = dispatch => ({
  makeVote: (anecdote) => dispatch(makeVote(anecdote)),
  setNotification: (message) => dispatch(setNotification(message))
})


export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);