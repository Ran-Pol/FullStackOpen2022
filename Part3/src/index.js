const express = require("express");
const app = express();

app.use(express.json());

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
