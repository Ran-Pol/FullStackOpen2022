import PersonCard from "./PersonCard";

const PersonList = ({ applyFilter, newFilter, persons, deleteContact }) => {
  return (
    <div>
      {newFilter.trim()
        ? applyFilter(newFilter).map(({ name, number, id }) => (
            <PersonCard
              key={id}
              name={name}
              number={number}
              deleteContact={() => deleteContact(id)}
            />
          ))
        : persons.map(({ name, number, id }) => (
            <PersonCard
              key={id}
              name={name}
              number={number}
              deleteContact={() => deleteContact(id)}
            />
          ))}
    </div>
  );
};

export default PersonList;
