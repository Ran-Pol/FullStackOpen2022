import { useState } from "react";
import { bookList } from "./data/bookList";
const App = () => {
  const [persons, setPersons] = useState(bookList);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newFilter, setNewFilterWord] = useState("");


  const addContactHandeler = (event) => {
    event.preventDefault();
    const doesNameExist = persons
      .map(({ name }) => name)
      .includes(newName.trim());

    if (doesNameExist) {
      alert(`${newName.trim()} is already added to phonebook`);
      return;
    }
    const newContact = [
      {
        name: newName.trim(),
        number: newPhone,
      },
    ];
    setPersons(persons.concat(newContact));
    setNewName("");
    setNewPhone("");
  };

  const applyFilter = (word) => {
    const newWord = word.trim().toLowerCase();
    const newFilterList = persons.filter(({ name }) =>
      name.trim().toLowerCase().includes(newWord)
    );
    return newFilterList;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {/* Component Filter Input */}
      <div>
        Filter Phonebook:
        <input
          onChange={(e) => setNewFilterWord(e.target.value)}
          placeholder="Filter phonebook"
        />
      </div>
      {/* Component Form */}
      <form onSubmit={addContactHandeler}>
        <h3>Add a new contact</h3>
        <div>
          Name:
          <input
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
            placeholder="Enter fullname"
          />
        </div>
        <div>
          Phone:
          <input
            onChange={(e) => setNewPhone(e.target.value)}
            value={newPhone}
            placeholder="Enter phone number"
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
       {/* Component Persons */}
      {newFilter.trim()
        ? applyFilter(newFilter).map(({ name, number }, i) => (
            <p key={i}>
              {name} {number}
            </p>
          ))
        : persons.map(({ name, number }, i) => (
            <p key={i}>
              {name} {number}
            </p>
          ))}
    </div>
  );
};

export default App;
