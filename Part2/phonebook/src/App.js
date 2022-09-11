import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

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
      },
    ];
    setPersons(persons.concat(newContact));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContactHandeler}>
        <div>
          name:{" "}
          <input onChange={(e) => setNewName(e.target.value)} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) => (
        <p key={i}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
