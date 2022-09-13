const ListOfCountries = ({ applyFilter, filterName }) => {
  const filteredCountries = applyFilter();
  const listResults = filteredCountries.map(({ name: { common } }, i) => (
    <p key={i}>{common}</p>
  ));
  let lteTen_gTZero =
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

    lteTen_gTZero = (
      <div>
      <h2>{countryName}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <h3>Languages</h3>
      <ul>
      {Object.values(languages).map((lang,i)=>(
        <li key={i}>{lang}</li>
      ))}
      </ul>
      <img src={flag} alt={`This is the flag of ${countryName}`} />
      </div>
    )
  }
  return <div>{lteTen_gTZero}</div>;
};

export default ListOfCountries;
