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
app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  if (name === undefined || number === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name,
    number,
    date: new Date(),
  });

  person.save().then((savedContact) => {
    response.json(savedContact);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  const foundContact = persons.filter((p) => p.id !== +id);
  res.send(foundContact);
});

// Show how many total contacts are saved in the phonebook
app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    response.send(
      `<h1>There are ${persons.length} contacts in your phonebook.</h1>`
    );
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
