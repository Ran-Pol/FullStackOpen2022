const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'First Blog',
    author: 'Ran Pol',
    url: 'ranpol.com',
    likes: 300,
  },
  {
    title: 'Second Blog',
    author: 'Ran Pol',
    url: 'ranpol.com',
    likes: 200,
  },
  {
    title: 'Third Blog',
    author: 'Ran Pol',
    url: 'ranpol.com',
    likes: 500,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

// Users Test Helpers Functions
const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
}
