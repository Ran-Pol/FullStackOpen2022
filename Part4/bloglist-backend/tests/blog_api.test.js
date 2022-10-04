const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

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

const auth = {}

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const response = await api.post('/api/users').send({
    username: 'Test',
    password: '123456',
  })
  // take the result of the POST /users/auth which is a token body and store it in the auth object
  // console.log('This is the user id: ', response.body.id)
  auth.token = response.body.token
  auth.id = response.body.id
  // await Blog.insertMany(helper.initialBlogs)
  // const newBlog = {
  //   title: 'Testing Post',
  //   author: 'Test Author',
  //   url: 'test.com',
  // }

  await api
    .post('/api/blogs')
    .set('authorization', `bearer ${auth.token}`)
    .send(initialBlogs[0])
  await api
    .post('/api/blogs')
    .set('authorization', `bearer ${auth.token}`)
    .send(initialBlogs[1])
  await api
    .post('/api/blogs')
    .set('authorization', `bearer ${auth.token}`)
    .send(initialBlogs[2])
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
    .set('authorization', `bearer ${auth.token}`)
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
    .set('authorization', `bearer ${auth.token}`)
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  const contents = blogsAtEnd.map((n) => n.title)
  expect(contents).not.toContain('Test Author')
})

// Test 6: Deletion of a blog
describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', `bearer ${auth.token}`)
      .expect(204)

    const blogssAtEnd = await helper.blogsInDb()

    expect(blogssAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogssAtEnd.map((r) => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})

// Test 7: Updating of a blog post
describe('updating of a blog post', () => {
  test('succeeds with status code 204 if succed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 16725422 })
      .expect(204)

    const blogssAtEnd = await helper.blogsInDb()

    expect(blogssAtEnd).toHaveLength(helper.initialBlogs.length)

    const contents = blogssAtEnd.map((r) => r.likes)

    expect(contents).toContain(16725422)
  })
})


// Test 8: HTTP Method: POST
test('test to ensure adding a blog without token fails with the proper status code 401', async () => {
  const newBlog = {
    title: 'KLK Code Not Added',
    author: 'Test Author',
    url: 'test.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  const contents = blogsAtEnd.map((n) => n.title)
  expect(contents).not.toContain('KLK Code Not Added')
})


// Api Tests For Users

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const newUser = new User({
      username: 'root',
      name: 'Jason',
      password: await User.encryptPassword('123456'),
    })

    await newUser.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
