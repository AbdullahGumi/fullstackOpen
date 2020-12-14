// /*eslint-env es2021*/
const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const body = request.body;
  if (!body.password) {
    return response.status(400).json({ error: 'Please enter a password' })
  }
  if (body.password.toString().length < 3) {
    return response.status(400).json({ error: 'Password must be at least 3 characters long' })
  }
  if (body.username.length < 3) {
    return response.status(400).json({ error: 'Username must be at least 3 characters long' })
  }  
  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password.toString(), saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch(e) {
    next(e);
  }

})

usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });
    res.json(users.map(user => user.toJSON()));
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
});

module.exports = usersRouter