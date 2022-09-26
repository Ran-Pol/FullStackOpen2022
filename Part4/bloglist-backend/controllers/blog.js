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

blogsRouter.delete('/:id', async (req, res) => {
  const blogID = req.params.id
  await Blog.findByIdAndRemove(blogID)
  res.status(204).end()
})
module.exports = blogsRouter

blogsRouter.put('/:id', async (req, res) => {
  const blogID = req.params.id
  const { likes } = req.body

  // const currentBlog = await Blog.findById(blogID)
  const updatedBlog = await Blog.findByIdAndUpdate(
    blogID,
    {
      likes,
    },
    { runValidators: true, new: true }
  )
  res.status(204).json(updatedBlog)
})
module.exports = blogsRouter
