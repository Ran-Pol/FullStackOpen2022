const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const Person = require('../models/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

// Morgan middleware to console.log the HTTP methods
morgan.token('bodyData', (req) => JSON.stringify(req.body))

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :bodyData'
  )
)

// Show how many total contacts are saved in the phonebook
app.get('/info', (req, res) => {
  Person.count().then((totalP) => {
    const body = `
    <p>Phonebook has a total of ${totalP} numbers</p>
    <p>${new Date()}</p>
    `
    res.send(body)
  })
})

// All contacts request to the Database
app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

// Individual contact request to the Database
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.json(person)
    })
    .catch((error) => next(error))
})

// Adding a new contact to the Database
app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  const person = new Person({
    name,
    number,
    date: new Date(),
  })

  person
    .save()
    .then((savedContact) => {
      res.json(savedContact)
    })
    .catch((error) => next(error))
})

// Updating a previous contact
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, contex: 'query' }
  )
    .then((updatedContact) => {
      res.json(updatedContact)
    })
    .catch((error) => next(error))
})

// Deleting a contact from the database
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

// Last route before the middleware error handler
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// Error handler funtion
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// This has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`)
})
