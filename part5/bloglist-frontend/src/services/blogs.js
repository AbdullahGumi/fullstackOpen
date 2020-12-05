import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = newToken => {
	token = `bearer ${newToken}`;
}

const createBlog = async newBlog => {
	const config = {
		headers: { Authorization: token }
	}

	const response = await axios.post(baseUrl, newBlog, config)
	return response.data
}

const deleteBlog = async (id) => {
	const config = {
		headers: { Authorization: token }
	}

	const response = await axios.delete(`${baseUrl}/${id}`, config);
	return response.data
}

const likeBlog = async ( blogId, updatedBlog ) => {
	const response = await axios.put(`${baseUrl}/${blogId}`, updatedBlog)
	return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
  	return response.data.sort((a, b) => b.likes - a.likes)
  })
}

export default { getAll, createBlog, setToken, likeBlog, deleteBlog }