import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import PersonList from "./components/PersonList";
// Notes Services
import phoneService from "./services/phonedata";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newFilter, setNewFilterWord] = useState("");

  useEffect(() => {
    phoneService.getAll().then((allContacts) => {
      setPersons(allContacts);
    });
  }, []);

  const addContactHandeler = (event) => {
    event.preventDefault();
    const doesNameExist = persons
      .map(({ name }) => name.trim())
      .includes(newName.trim());

    if (doesNameExist) {
      alert(`${newName.trim()} is already added to phonebook`);
      return;
    }
    const newContact = {
      name: newName.trim(),
      number: newPhone,
    };

    phoneService
      .create(newContact)
      .then((returnedNewContact) =>
        setPersons(persons.concat(returnedNewContact))
      );
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
      <Filter setNewFilterWord={setNewFilterWord} />
      <Form
        addContactHandeler={addContactHandeler}
        setNewName={setNewName}
        setNewPhone={setNewPhone}
        newName={newName}
        newPhone={newPhone}
      />
      <h2>Numbers</h2>
      {/* Component Persons */}
      <PersonList
        newFilter={newFilter}
        persons={persons}
        applyFilter={applyFilter}
      />
    </div>
  );
};

export default App;
