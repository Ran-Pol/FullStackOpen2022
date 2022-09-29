const usersRouter = require('express').Router()
const User = require('../models/user')

// Get all users route
usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

// Route to create a new user
usersRouter.post('/', async (req, res) => {
  const { username, password, name } = req.body

  const newUser = new User({
    username,
    name,
    password: await User.encryptPassword(password),
  })

  const savedUser = await newUser.save()
  res.status(201).json(savedUser)
})

module.exports = usersRouter
