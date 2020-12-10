import anecdoteService from '../services/anecdotes';
const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INITIALIZE':
        return action.data
    case 'VOTE':
      const anecdoteToUpdate = state.find(anecdote => anecdote.id === action.data.id)
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

export const makeVote = (id) => ({
  type: 'VOTE',
  data: {id}
})

export const createNewAnecdote = (anecdote) => ({
  type: 'NEW_ANECDOTE',
  data: anecdote
})

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