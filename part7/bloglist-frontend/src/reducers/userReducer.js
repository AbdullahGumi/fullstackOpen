const initialState = {
	user: null,
	username: '',
	password: ''
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_USER':
			return {
				...state,
				user: action.payload
			}
		case 'SET_USERNAME':
			return {
				...state,
				username: action.payload
			}
		case 'SET_PASSWORD':
			return {
				...state,
				password: action.payload
			}						
		default:
			return state
	}
}

export const setUser = (user) => ({
	type: 'SET_USER',
	payload: user
})

export const setUsername = (username) => ({
	type: 'SET_USERNAME',
	payload: username
})

export const setPassword = (password) => ({
	type: 'SET_PASSWORD',
	payload: password
})

export default userReducer;