const initialState = {
  message: null
};

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_MESSAGE': 
      return {message: action.data}
    case 'REMOVE_MESSAGE': 
      return {
        message: null
      }
    default:
      return state
  }
}

export const setNotification = (message, timeout) => {
  return dispatch => {
      dispatch({
        type: 'SET_MESSAGE',
        data: message        
      })
      setTimeout(() => dispatch(clearNotification()), timeout)
  }
}

const clearNotification = () => dispatch => {
      return dispatch({type: 'REMOVE_MESSAGE'})
}

export default notificationReducer;