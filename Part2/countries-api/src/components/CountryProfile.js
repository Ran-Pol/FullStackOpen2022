// import axios from "axios";

// const CountryProfile = ({ filteredCountries }) => {
//   const {
//     name: { common: countryName },
//     capital: [capital],
//     area,
//     languages,
//     flags: { svg: flag },
//     capitalInfo: {
//       latlng: [lat, lon],
//     },
//   } = filteredCountries[0];

//   const hook = async (theCapital) => {
//     const respo = await axios.get(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`
//     );

//     const {
//       weather: [{ icon }],
//       main: { temp },
//       wind: { speed },
//     } = respo.data;
//     // Temp: Fahrenheit
//     // Speed: m/s
//     // console.log(icon, temp, speed);
//     theCapital["icon"] = icon;
//     theCapital["temp"] = temp;
//     theCapital["windSpeed"] = speed;
//   };
//   const weatherObj = {};
//   hook(weatherObj);
//   const{temp, windSpeed, icon}=weatherObj
//   console.log("La temp ",temp)

//   return (
//     <div>
//       <h2>{countryName}</h2>
//       <p>Capital: {capital}</p>
//       <p>Area: {area}</p>
//       <h3>Languages</h3>
//       <ul>
//         {Object.values(languages).map((lang, i) => (
//           <li key={i}>{lang}</li>
//         ))}
//       </ul>
//       <img src={flag} alt={`This is the flag of ${countryName}`} />
//       <h3>{`Weather in ${capital}`}</h3>
//       <p>Tempeture: {temp} Fahrenheit</p>
//       {/* <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Tempeture Illustration"/> */}
//       <p>wind: {windSpeed} m/s</p>
//     </div>
//   );
// };

// export default CountryProfile;
