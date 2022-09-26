const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
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

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map((n) => n.title)
  expect(contents).toContain('Testing Post')
})
// Test 5: HTTP Method: POST
test('title and url properties are missing from the request dat', async () => {
  const newBlog = {
    author: 'Test Author',
    url: 'test.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  const contents = blogsAtEnd.map((n) => n.title)
  expect(contents).not.toContain('Test Author')
})

// Test 6: Deletion of a note
describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogssAtEnd = await helper.blogsInDb()

    expect(blogssAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogssAtEnd.map((r) => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
