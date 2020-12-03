import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const createBlog = async newBlog => {
	const config = {
		headers: { Authorization: token }
	}

	const response = await axios.post(baseUrl, newBlog, config)
	return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, createBlog, setToken }