const mongoose = require("mongoose");

if (process.argv.length < 4) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const username = process.argv[2];
const password = process.argv[3];
const contactName = process.argv[4];
const contactNumber = process.argv[5];

// console.log(password, username);
// console.log(contactName, contactNumber);

const url = `mongodb+srv://${username}:${password}@cluster0.p4jcd5f.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("Person", personSchema);

mongoose
  .connect(url)
  .then((result) => {
    if (Boolean(contactName && contactNumber)) {
      const person = new Person({
        name: contactName,
        number: contactNumber,
      });
      return person.save();
    }
  })
  .then((result) => {
    if (result) {
      console.log(`Added ${result.name} number ${result.number}`);
      return mongoose.connection.close();
    }
    console.log("Phonebook: ");
    Person.find({}).then((persons) => {
      persons.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    });
  })
  .catch((err) => console.log(err));
