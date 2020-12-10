import anecdoteService from '../services/anecdotes';
const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INITIALIZE':
        return action.data
    case 'VOTE':
      const anecdoteToUpdate = state.find(anecdote => anecdote.id === action.data.anecdote.id)
      const updatedAnecdote = {...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1}
      return state.map(anecdote => (
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      ))
    case 'NEW_ANECDOTE': 
      return [
        ...state,
        action.data
      ]  
    default:
      return state
  }
}

export const makeVote = (anec) => {
  return async dispatch => {
    const anecdote = await anecdoteService.likeAnecdote(anec.id, anec);
    dispatch({
      type: 'VOTE',
      data: {anecdote}
    })
  }
}

export const createNewAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INITIALIZE',
      data: anecdotes
    })
  }
}

export default reducer