import Languages from './Languages'
import Img from './Img'
import Weather from './Weather'

function CountryProfile({ country }) {
  return (
    <>
    <h1>{country.name.common}</h1>
    <p>Capital: {country.capital[0]}</p>
    <p>Area: {country.area}</p>
    <h2>Languages</h2>
    <Languages languages={country.languages} />
    <Img img={country.flags.svg} />
    <Weather country={country}/>
    <hr />
  </>
  )
}

export default CountryProfile