const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (state = [], action) => {
  switch(action.type) {
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
  data: {
    content: anecdote,
    id: getId(),
    votes: 0
  }
})

export default reducer