const usersRouter = require('express').Router()
const User = require('../models/user')

// Get all users route
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
  })
  response.json(users)
})

// Route to create a new user
usersRouter.post('/', async (req, res) => {
  const { username, password, name } = req.body

  // Username and Password is not empty test
  if (!(username && password)) {
    return res
      .status(400)
      .json({ error: 'A Username and Password must be  entered' })
  }

  // Password >= 3
  if (password.length <= 2) {
    return res
      .status(400)
      .json({ error: 'The password must be longer than 3 characters' })
  }

  const existingUser = await User.findOne({ username })

  if (existingUser) {
    return res.status(400).json({
      error: 'username must be unique',
    })
  }

  const newUser = new User({
    username,
    name,
    password: await User.encryptPassword(password),
  })
  const savedUser = await newUser.save()

  res.status(201).json(savedUser)
})

module.exports = usersRouter
