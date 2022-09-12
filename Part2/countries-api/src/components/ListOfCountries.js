const ListOfCountries = ({ names, setCountriesName }) => {
  const countriesCommonName = names.map((country) => country.name.common);

//   setCountriesName(countriesCommonName);
  console.log(countriesCommonName);

  return <div>List Of Countries</div>;
};

export default ListOfCountries;
