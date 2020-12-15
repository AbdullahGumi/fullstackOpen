// /*eslint-env es6*/
const commentsRouter = require('express').Router()
const Blog = require('../models/blog');
const Comment = require('../models/comment');

commentsRouter.get('/:id', async (request, response) => {
 const blog = await Blog.findById(request.params.id)
 const comments =  Promise.all(blog.comments.map(comment =>  Comment.findById(comment)))
 const a = await comments;
 return response.json(a)
})

commentsRouter.post('/:id', async (request, response, next) => {
	if (!request.body.comment) {
		return response.status(400).end();
	} else {
    try {
      const blog = await Blog.findById(request.params.id);
      const comment = new Comment({
        comment: request.body.comment
      })
  		const result = await comment.save();
      blog.comments = blog.comments.concat(result._id);
      await blog.save();
      return response.status(201).json(result);
    } catch(e) {
        next(e)
        response.status(500).end();
    }
	}
})

module.exports = commentsRouter;