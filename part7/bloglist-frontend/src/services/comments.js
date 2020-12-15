import axios from 'axios'
const baseUrl = '/api/comments'

const getComments = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}

const createComment = async (id, newComment) => {
  const request = await axios.post(`${baseUrl}/${id}`, { comment: newComment })
  // console.log('request:', request.data)
  return request.data
}

export default { getComments, createComment}