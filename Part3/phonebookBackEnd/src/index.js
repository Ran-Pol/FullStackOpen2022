const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Person = require("../models/person");

morgan.token("bodyData", function getId(req) {
  return req.bodyData;
});

function assignJsonBody(req, res, next) {
  req.bodyData = JSON.stringify(req.body);
  next();
}

app.use(express.json());

app.use(assignJsonBody);

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :bodyData"
  )
);

app.use(cors());

app.use(express.static("build"));

app.get("/", (req, res) => {
  res.send("<h1>Hello Persons!</h1>");
});

// All contacts request to the Database
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// Individual contact request to the Database
app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

// Adding a new contact to the Database
app.post("/api/persons", (request, response, next) => {
  const { name, number } = request.body;

  const person = new Person({
    name,
    number,
    date: new Date(),
  });

  person
    .save()
    .then((savedContact) => {
      response.json(savedContact);
    })
    .catch((error) => next(error));
});

// Updating a previous contact
app.put("/api/persons/:id", (request, response, next) => {
  const { number } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { number },
    { new: true, runValidators: true, contex: "query" }
  )
    .then((updatedContact) => {
      response.json(updatedContact);
    })
    .catch((error) => next(error));
});

// Deleting a contact from the database
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

// Show how many total contacts are saved in the phonebook
app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    response.send(
      `<h1>There are ${persons.length} contacts in your phonebook.</h1>`
    );
  });
});

// Last route before the middleware error handler
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

// Error handler funtion
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// This has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
