// /*eslint-env es6*/
const blogsRouter = require('express').Router()
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');



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
      const token = request.token;
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }


      const user = await User.findById(decodedToken.id);
      const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,       
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
  const token = request.token;
   const decodedToken = jwt.verify(token, process.env.SECRET)
   const blog = await Blog.findById(request.params.id);
      if (!blog) {
        return response.status(404).json({ error: 'Blog not found' });
      }

      if (blog.user.toString() === decodedToken.id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        return response.status(204).end();
      } else {
        return response.status(400).json({ error: `You can't perform this operation` })
      }

})

blogsRouter.put('/:id', async (request, response) => {
  try {
   const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true});
      if (blog) {
        response.json(blog.toJSON());
      } else {
        response.status(400).json({ error: 'Blog not found' });
      }
  } catch(e) {
    console.log(e);
  }
})

module.exports = blogsRouter;