const Note = require('../models/blog')

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

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map((note) => note.toJSON())
}

module.exports = {
  initialBlogs,
  notesInDb,
}
