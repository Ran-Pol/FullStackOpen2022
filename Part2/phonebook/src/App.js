import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", phone:"1-800-234-3333"}]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

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
        phone: newPhone
      },
    ];
    setPersons(persons.concat(newContact));
    setNewName("");
    setNewPhone("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContactHandeler}>
        <div>
          Name:{" "}
          <input onChange={(e) => setNewName(e.target.value)} value={newName} placeholder="Enter fullname"/>
        </div>
        <div>
          Phone:{" "}
          <input onChange={(e) => setNewPhone(e.target.value)} value={newPhone} placeholder="Enter phone number"/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(({name,phone}, i) => (
        <p key={i}>{name} {phone}</p>
      ))}
    </div>
  );
};

export default App;
