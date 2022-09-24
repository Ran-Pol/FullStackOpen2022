const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blog')
const middleware = require('./utils/middleware')
// eslint-disable-next-line no-unused-vars
const { info, error } = require('./utils/logger')
const mongoose = require('mongoose')

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    info('connected to MongoDB')
  })
  .catch((error) => {
    error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
