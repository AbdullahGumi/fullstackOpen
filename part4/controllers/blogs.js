// /*eslint-env es6*/
const blogsRouter = require('express').Router()
const Blog = require('../models/blog');
const User = require('../models/user');

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
      console.log('request.body.userId: ', request.body.userId)
      const users = await User.find({});
      const user = users[0]
      console.log('user: ', user)
      const blog = new Blog({
        title: "Ultimate Blogger",
        author: "Elon Musk",
        url: "https://blog.com",      
        user: user._id
      })
  		const result = await blog.save();
      user.blogs = user.blogs.concat(result._id);
      await user.save();
      return response.status(201).json(result);
    } catch(e) {
        next(e)
        response.status(500).end();
        console.log(e);
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