const ListOfCountries = ({ applyFilter, filterName }) => {
  const listResults = applyFilter(filterName.trim()).map((name, i) => (
    <p key={i}>{name}</p>
  ));
  const lteTen_gTZero =
    listResults.length > 0 && listResults.length <= 10
      ? listResults
      : (listResults.length > 10 && filterName.trim().length)
      ? "Too many matches, specify another filter"
      : "No results..."

  return <div>{lteTen_gTZero}</div>;
};

export default ListOfCountries;
