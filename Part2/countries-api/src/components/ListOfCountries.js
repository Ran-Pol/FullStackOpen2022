import Country from "./Country";

const ListOfCountries = ({ countryFilterList }) => {
  return (
    <>
      {countryFilterList.length > 9 ? (
        "Too many matches, specify another filter"
      ) : (
        <dl>
          {countryFilterList.map((country) => (
            <Country
              key={country.cca2}
              country={country}
              singleCountry={countryFilterList.length === 1 ? true : false}
            />
          ))}
        </dl>
      )}
    </>
  );
};

export default ListOfCountries;
