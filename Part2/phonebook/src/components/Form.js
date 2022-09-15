const Form = ({
  addContactHandeler,
  setNewName,
  setNewPhone,
  newName,
  newPhone,
}) => {
  return (
    <form onSubmit={addContactHandeler}>
      <h3>Add a new contact</h3>
      <div>
        Name:
        <input
        autoFocus
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
  );
};

export default Form;
