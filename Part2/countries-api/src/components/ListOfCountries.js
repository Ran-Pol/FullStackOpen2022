const ListOfCountries = ({ applyFilter, filterName }) => {
  const filteredCountries = applyFilter();
  const listResults = filteredCountries.map(({ name: { common } }, i) => (
    <p key={i}>{common}</p>
  ));
  const lteTen_gTZero =
    listResults.length > 0 && listResults.length <= 10
      ? // If the first test passes succesfully then we will be send an array.
        listResults
      : listResults.length > 10 && filterName.trim().length
      ? "Too many matches, specify another filter"
      : "No results...";
  if (filteredCountries.length === 1) {
    const {
      name: { common: countryName },
      capital: [capital],
      area,
      languages,
      flags: { svg: flag },
    } = filteredCountries[0];
    console.log(countryName);
    console.log(capital);
    console.log(area);
    console.log(JSON.stringify(languages));
    console.log(flag);
  }
  // const singleCountry = lteTen_gTZero.lenght === 1?
  return <div>{lteTen_gTZero}</div>;
};

export default ListOfCountries;
