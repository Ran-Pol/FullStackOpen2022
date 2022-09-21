const express = require("express");
const { json } = require("express/lib/response");
const morgan = require("morgan");
const uuid = require("uuid");

morgan.token("bodyData", function getId(req) {
  return req.bodyData;
});

function assignJsonBody(req, res, next) {
  req.bodyData = JSON.stringify(req.body);
  next();
}

const app = express();

app.use(express.json());

app.use(assignJsonBody);

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :bodyData"
  )
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

function generateID() {
  return Math.floor(Math.random() * 1000);
}

app.get("/", (req, res) => {
  res.send("Hello Persons");
});

app.get("/api/persons", (req, res) => {
  res.send(persons);
});
app.get("/api/persons/:id", (req, res) => {
  const { id } = req.params;

  const foundContact = persons.find((p) => p.id === +id);
  console.log(foundContact);

  if (foundContact) {
    res.send(foundContact);
  } else {
    res.status(404).send("Not found");
  }
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  const nameExist = persons.find((p) => p.name === name);
  if (!name || !number) {
    return res.status(400).json({
      error: `${!name ? "Name" : "Number"} is missing`,
    });
  }
  if (Boolean(nameExist)) {
    return res.status(400).json({
      error: `${nameExist.name} already exist.`,
    });
  }

  persons = persons.concat({
    id: generateID(),
    name,
    number,
  });

  res.send(persons);
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
