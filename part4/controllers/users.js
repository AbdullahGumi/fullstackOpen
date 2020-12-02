// /*eslint-env es2021*/
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password.toString(), saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users.map(user => user.toJSON()));
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
});

module.exports = usersRouter