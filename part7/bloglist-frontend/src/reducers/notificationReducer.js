const initialState = {
	message: '',
	messageColor: ''
}

const notificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_MESSAGE':
			return {
				message: action.payload.message,
				messageColor: action.payload.color
			}
		case 'REMOVE_MESSAGE':
			return {
				message: '',
				messageColor: ''
			}			
		default:
			return state
	}
}

const setMessage = (message, color) => ({
	type: 'SET_MESSAGE',
	payload: {
	message,
	color
}
})

export const setNotification = (message, color, timeout) => dispatch => {
	setTimeout(() => dispatch({type: 'REMOVE_MESSAGE'}), timeout * 1000)		
	return dispatch(setMessage(message, color))		
	
}

export default notificationReducer;