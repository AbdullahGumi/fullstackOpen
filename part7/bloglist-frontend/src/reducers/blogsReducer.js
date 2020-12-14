import blogService from '../services/blogs';

const initialState = {
	blogs: []
}

const blogsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'INITIALIZE_BLOGS':
			return {
				...state,
				blogs: action.payload
			}						
		default:
			return state
	}
}

export const initializeBlogs = () => async dispatch => {
	const blogs = await blogService.getAll();
	return dispatch({
		type: 'INITIALIZE_BLOGS',
		payload: blogs		
	})
}

export const createNewBlog = (blog) => async dispatch => {
	blogService.createBlog(blog);
}

export default blogsReducer;