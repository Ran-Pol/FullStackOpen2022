const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  if (!body.title || !body.url) {
    res.status(400).json({ erro: 'Missing properties' })
    return
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    // This is a test to check if the like property exist if not we add it with the value 0.
    likes: body.likes || 0,
  })

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

module.exports = blogsRouter
