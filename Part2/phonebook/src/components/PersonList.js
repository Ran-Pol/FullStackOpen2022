import PersonCard from "./PersonCard";

const PersonList = ({ applyFilter, newFilter, persons }) => {
  return (
    <div>
      {newFilter.trim()
        ? applyFilter(newFilter).map(({ name, number }, i) => (
            <PersonCard key={i} name={name} number={number} />
          ))
        : persons.map(({ name, number }, i) => (
            <PersonCard key={i} name={name} number={number} />
          ))}
    </div>
  );
};

export default PersonList;
