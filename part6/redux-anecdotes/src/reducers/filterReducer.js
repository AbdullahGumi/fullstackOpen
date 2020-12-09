const initialState = '';

const filterReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FILTER_ANECDOTES': 
      return action.data
    default:
      return state
  }
}

export const filterAnecdotes = (anecdote) => ({
  type: 'FILTER_ANECDOTES',
  data: anecdote
})

export default filterReducer;