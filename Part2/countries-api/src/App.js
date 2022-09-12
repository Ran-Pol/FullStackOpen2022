import {useState,useEffect} from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import ListOfCountries from './components/ListOfCountries';

function App() {
  const [countries_raw, setCountriesRaw] = useState([])
  const [countriesName, setCountriesName] = useState([])
  const [filterName, setFilterName] = useState([])

const hook = ()=>{
  axios.get("https://restcountries.com/v3.1/all").then((response)=>{
    setCountriesRaw(response.data)
  })
}

useEffect(hook, [])



  return (
    <div >
      <Filter setFilterName={setFilterName}/>
      <ListOfCountries  names={countries_raw} setCountriesName={setCountriesName}/>
    </div>
  );
}

export default App;
