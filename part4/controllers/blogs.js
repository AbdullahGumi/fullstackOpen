// /*eslint-env es6*/
const blogsRouter = require('express').Router()
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
 const blogs = await Blog.find({}).populate('user', { username: 1, name: 1});
   return response.json(blogs)
   return response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
	if (!request.body.title || !request.body.url) {
		return response.status(400).end();
	} else {
    try {
      const token = getTokenFrom(request);
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }


      const user = await User.findById(decodedToken.id);
      console.log('user: ', user)
      const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,      
        user: user._id
      })
  		const result = await blog.save();
      user.blogs = user.blogs.concat(result._id);
      await user.save();
      return response.status(201).json(result);
    } catch(e) {
        next(e)
        response.status(500).end();
    }
	}
})

blogsRouter.delete('/:id', async (request, response) => {
 const blog = await Blog.findByIdAndDelete(request.params.id);
    if (blog) {
      response.json(blog.toJSON());
    } else {
      response.status(400).json({ error: 'Blog not found' });
    }
})

blogsRouter.put('/:id', async (request, response) => {
 const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true});
    if (blog) {
      response.json(blog.toJSON());
    } else {
      response.status(400).json({ error: 'Blog not found' });
    }
})

module.exports = blogsRouter;