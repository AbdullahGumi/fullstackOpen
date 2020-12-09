import React, { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import anecdoteService from './services/anecdotes';
import { useDispatch } from 'react-redux'

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
	anecdoteService
	.getAll()
		.then(anec => anec.forEach(item => dispatch({ type: 'NEW_ANECDOTE', data: item })))
	}, [dispatch])


  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App