import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import ListOfCountries from "./components/ListOfCountries";

function App() {
  const [countries_raw, setCountriesRaw] = useState([]);
  const [countriesName, setCountriesName] = useState([]);
  const [filterName, setFilterName] = useState('');

  const hook = () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountriesRaw(response.data);
      return response.data
    }).then((response)=>{
      const countriesCommonName = response.map(
        (country) => country.name.common)
        setCountriesName(countriesCommonName);
    })
  };

  useEffect(hook, []);


  const applyFilter = (word) => {
    const newWord = word.trim().toLowerCase();
    const newFilterList = countriesName.filter(name =>
      name.trim().toLowerCase().includes(newWord)
    );
    return newFilterList;
  };


  return (
    <div>
      <Filter setFilterName={setFilterName} />
      <h2>Lis of countries</h2>
      <ListOfCountries filterName={filterName} applyFilter={applyFilter} countries_raw={countries_raw}/>
    </div>
  );
}

export default App;
