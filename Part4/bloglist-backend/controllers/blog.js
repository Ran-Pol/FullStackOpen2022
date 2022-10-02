const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// Route to receive all blogs
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  })
  res.json(blogs)
})

// Route to create a new blog
blogsRouter.post('/', async (req, res) => {
  const body = req.body
  const user = await User.findById(body.userID)
  if (!body.title || !body.url) {
    res.status(400).json({ erro: 'Missing properties' })
    return
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

// Route to delete a blog
blogsRouter.delete('/:id', async (req, res) => {
  const blogID = req.params.id
  await Blog.findByIdAndRemove(blogID)
  res.status(204).end()
})
module.exports = blogsRouter

// Route to update a blog
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
