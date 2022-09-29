const express = require('express')
require('express-async-errors')
const pkg = require('./package.json')
const app = express()
const cors = require('cors')
// Routes controllers
const blogsRouter = require('./controllers/blog')
// Middleswares
const middleware = require('./utils/middleware')

// App Configuration
app.set('pkg', pkg)
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

// Routes
app.get('/', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version,
  })
})
app.use('/api/blogs', blogsRouter)

// Middlewares
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
