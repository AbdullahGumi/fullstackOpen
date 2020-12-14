const initialState = {
	blogs: []
}

const blogsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_BLOGS':
			return {
				...state,
				blogs: action.payload
			}					
		default:
			return state
	}
}

export const setBlogs = (blogs) => ({
	type: 'SET_BLOGS',
	payload: blogs
})

export default blogsReducer;