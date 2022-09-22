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

// All contacts request
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// Individual contact request
app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const nameExist = persons.find((p) => p.name === name);
  // If a property name or number is empty send error
  if (!name || !number) {
    return res.status(400).json({
      error: `${!name ? "Name" : "Number"} is missing`,
    });
  }

  // If the name exist send an error
  if (Boolean(nameExist)) {
    return res.status(400).json({
      error: `${nameExist.name} already exist.`,
    });
  }
  const newContact = {
    id: generateID(),
    name,
    number,
  };
  // If the new contact doesn't exit or all properties are filled, then we create a new contact.
  persons = persons.concat(newContact);

  res.send(newContact);
});

app.delete("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  const foundContact = persons.filter((p) => p.id !== +id);
  res.send(foundContact);
});

app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has for ${persons.length} people</p> <p>${new Date()}</p>`
  );
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
