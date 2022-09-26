const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))

  const promiseArray = blogObjects.map((note) => note.save())

  await Promise.all(promiseArray)
})

// Test 1: HTTP Method: GET
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

// Test 2: HTTP Method: GET
test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})
// Test 3: HTTP Method: GET
test('test all blogs unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')
  const allHaveID = response.body.every((blog) => 'id' in blog)
  expect(allHaveID).toBe(true)
})

// Test 4: HTTP Method: POST
test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Testing Post',
    author: 'Test Author',
    url: 'test.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.notesInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map((n) => n.title)
  expect(contents).toContain('Testing Post')
})

afterAll(() => {
  mongoose.connection.close()
})
