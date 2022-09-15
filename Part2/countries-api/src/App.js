import { useState, useEffect } from "react";
import axios from "axios";

import ListOfCountries from "./components/ListOfCountries";

function App() {
  const [countries_raw, setCountriesRaw] = useState({});
  const [countryFilterList, setCountryFilterList] = useState([]);

  // console.log(process.env.REACT_APP_WEATHER_API_KEY)
  const hook = () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountriesRaw(response.data);
    });
  };
  useEffect(hook, []);

  const handleCountriesFilter = (e) => {
    const filterWord = e.target.value.trim().toLowerCase();
    const lookedUp = countries_raw.filter((country) =>
      country.name.common.toLowerCase().includes(filterWord)
    );
    setCountryFilterList(lookedUp);
  };

  return (
    <>
      <h1>Countries Look Up</h1>
      <p>
        Search for countries: <input onChange={handleCountriesFilter} />
      </p>
      <ListOfCountries countryFilterList={countryFilterList} />
    </>
  );
}

export default App;
