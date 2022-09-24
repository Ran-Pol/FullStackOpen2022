import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import PersonList from "./components/PersonList";
import Notification from "./components/Notification";
// Notes Services
import phoneService from "./services/phonedata";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newFilter, setNewFilterWord] = useState("");
  const [notiMessage, setNotiMessage] = useState(null);

  useEffect(() => {
    phoneService.getAll().then((allContacts) => {
      setPersons(allContacts);
    });
  }, []);

  const notify = (message) => {
    setNotiMessage(message);
    setTimeout(() => {
      setNotiMessage(null);
    }, 5000);
  };

  const addContactHandeler = (event) => {
    event.preventDefault();
    const newContact = {
      name: newName.trim(),
      number: newPhone,
    };

    setNewName("");
    setNewPhone("");

    const existingContact = persons.find(
      (p) => p.name.trim() === newContact.name
    );
    if (existingContact) {
      if (
        window.confirm(
          `${newName.trim()} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        phoneService
          .update(existingContact.id, { ...existingContact, number: newPhone })
          .then((returnedContact) => {
            setPersons(
              persons.map((cont) =>
                cont.id !== existingContact.id ? cont : returnedContact
              )
            );
            notify(
              `${returnedContact.name} was updated with a new number ${returnedContact.number}.`
            );
          })
          .catch((error) => {
            notify(`Error: ${error.response.data.error}`);
          });
      }
      return;
    }

    phoneService
      .create(newContact)
      .then((returnedNewContact) => {
        setPersons(persons.concat(returnedNewContact));
        notify(
          `${returnedNewContact.name} was added to your contact list succefully!`
        );
      })
      .catch((error) => {
        notify(`Error: ${error.response.data.error}`);
      });
  };

  const deleteContactOf = (id) => {
    const { name } = persons.find((n) => n.id === id);

    if (window.confirm(`Do you really want to delete ${name}`)) {
      phoneService.deleteRequest(id).then(() => {
        setPersons(persons.filter((contact) => contact.id !== id));
        notify(`${name} was deleted from your contact list!`);
      });
      return;
    }
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
      <Notification message={notiMessage} />
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
