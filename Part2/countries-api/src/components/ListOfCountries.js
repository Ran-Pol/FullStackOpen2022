const ListOfCountries = ({ applyFilter, filterName }) => {
  const listResults = applyFilter().map(({name:{common}}, i) => (
    <p key={i}>{common}</p>
  ));
  const lteTen_gTZero =
    listResults.length > 0 && listResults.length <= 10
    // If the first test passes succesfully then we will be send an array.
      ? listResults 
      : (listResults.length > 10 && filterName.trim().length)
      ? "Too many matches, specify another filter"
      : "No results..."
console.log(typeof lteTen_gTZero,lteTen_gTZero)
  return <div>{lteTen_gTZero}</div>;
};

export default ListOfCountries;
