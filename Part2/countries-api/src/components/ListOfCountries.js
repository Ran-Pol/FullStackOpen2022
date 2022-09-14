import axios from "axios";
// import CountryProfile from "./CountryProfile";

const ListOfCountries = ({ applyFilter, filterName, setFilterName }) => {
  const showProfile = (country) => () => setFilterName(country);
  const filteredCountries = applyFilter();
  const listResults = filteredCountries.map(({ name: { common } }, i) => (
    <div key={i}>
      {common}
      <button type="button" onClick={showProfile(common)}>
        Show
      </button>
    </div>
  ));
  let lteTen_gTZero =
    listResults.length > 0 && listResults.length <= 10
      ? // If the first test passes succesfully then we will be send an array.
        listResults
      : listResults.length > 10 && filterName.trim().length
      ? "Too many matches, specify another filter"
      : "No results...";

  if (filteredCountries.length === 1) {

    (async function(){
      const {
        name: { common: countryName },
        capital: [capital],
        area,
        languages,
        flags: { svg: flag },
        capitalInfo: {
          latlng: [lat, lon],
        },
      } = filteredCountries[0];

      const respo = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`
      );


    })();

      const {
        weather: [{ icon }],
        main: { temp },
        wind: { speed },
      } = respo.data;
      // Temp: Fahrenheit
      // Speed: m/s
      // console.log("Inside the hook ",icon, temp, speed);
      // theCapital["icon"] = icon;
      // theCapital["temp"] = temp;
      // theCapital["windSpeed"] = speed;
      theCapital = {
        temp,
        speed,
        icon
      }

      console.log("First Inside")

    };

    let weatherObj;
    hook(weatherObj);
console.log("Second outside")
    const { temp, speed, icon } = weatherObj;
    console.log("This is the result ",weatherObj.temp )
    console.log(weatherObj)

    lteTen_gTZero = (
      <div>
        <h2>{countryName}</h2>
        <p>Capital: {capital}</p>
        <p>Area: {area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.values(languages).map((lang, i) => (
            <li key={i}>{lang}</li>
          ))}
        </ul>
        <img src={flag} alt={`This is the flag of ${countryName}`} />
        <h3>{`Weather in ${capital}`}</h3>
        <p>Tempeture: {temp} Fahrenheit</p>
        {/* <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Tempeture Illustration"/> */}
        <p>wind: {speed} m/s</p>
      </div>
    );
  }
  return <div>{lteTen_gTZero}</div>;
};

export default ListOfCountries;
