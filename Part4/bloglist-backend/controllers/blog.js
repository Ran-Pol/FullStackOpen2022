const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

// Route to receive all blogs
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  })
  res.json(blogs)
})

// Route to create a new blog
blogsRouter.post('/', userExtractor, async (req, res) => {
  // get user from request object
  const user = req.user
  const body = req.body

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
blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  // get user from request object
  const user = req.user
  const blogID = req.params.id
  const blogFound = await Blog.findById(blogID)
  if (!blogFound) {
    return res
      .status(404)
      .json({ erro: `The blog post id#${blogID} don't exits` })
  }

  if (blogFound.user.toString() === user.id) {
    const removedBlog = await Blog.findByIdAndDelete(blogID)
    return res.status(200).json(removedBlog)
  }
  return res
    .status(400)
    .json({ error: 'You are not authorized to delete this blog' })
})

// Route to update a blog
blogsRouter.put('/:id', async (req, res) => {
  const blogID = req.params.id
  const { likes } = req.body

  // const currentBlog = await Blog.findById(blogID)
  const updatedBlog = await Blog.findByIdAndUpdate(
    blogID,
    {
      likes: likes + 1,
    },
    { runValidators: true, new: true }
  ).populate('user', {
    username: 1,
    name: 1,
  })
  res.status(200).json(updatedBlog)
})
module.exports = blogsRouter
