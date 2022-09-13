const Filter = ({ setFilterName }) => {
  return (
    <div>
      Find Countries:
      <input
        onChange={(e) => setFilterName(e.target.value)}
        placeholder="Find countries"
      />
    </div>
  );
};

export default Filter;
