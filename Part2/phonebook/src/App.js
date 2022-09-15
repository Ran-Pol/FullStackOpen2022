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
      if (
        window.confirm(
          `${newName.trim()} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const oldContact = persons.find(
          ({ name }) => name.trim() === newName.trim()
        );

        phoneService
          .update(oldContact.id, { ...oldContact, number: newPhone })
          .then((returnedContact) => {
            setPersons(
              persons.map((cont) =>
                cont.id !== oldContact.id ? cont : returnedContact
              )
            );
          });
        setNewName("");
        setNewPhone("");
      }
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

  const deleteContactOf = (id) => {
    const { name } = persons.find((n) => n.id === id);

    if (window.confirm(`Do you really want to delete ${name}`)) {
      const newPhoneList = persons.filter((contact) => contact.id !== id);

      phoneService.deleteRequest(id).then(() => {
        setPersons(newPhoneList);
      });
      return;
    }

    console.log(`Decided not to delete ${name}`);
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
      <h1>Phonebook</h1>
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
        deleteContact={deleteContactOf}
      />
    </div>
  );
};

export default App;
