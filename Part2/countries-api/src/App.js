import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import ListOfCountries from "./components/ListOfCountries";

function App() {
  const [countries_raw, setCountriesRaw] = useState([]);
  const [filterName, setFilterName] = useState("");

  const hook = () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountriesRaw(response.data);
    });
  };
  useEffect(hook, []);

  const applyFilter = () => {
    const newWord = filterName.trim().toLowerCase();

    const newFilterList = countries_raw.filter(({ name: { common } }) =>
      common.trim().toLowerCase().includes(newWord)
    );
    return newFilterList;
  };

  return (
    <div>
      <Filter setFilterName={setFilterName} />
      <h2>Lis of countries</h2>
      <ListOfCountries applyFilter={applyFilter} filterName={filterName} />
    </div>
  );
}

export default App;
