import { useState, useEffect } from "react";
import axios from "axios";
import Img from "./Img";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({});
  const {
    latlng: [lat, lon],
    capital: [capital],
  } = country;
  const apiAddress = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`;

  const hook = () => {
    axios.get(apiAddress).then((respo) => {
      setWeather(respo.data);
    });
  };

  useEffect(hook, [apiAddress]);

  return (
    <>
      {Object.keys(weather).length === 0 || weather.error ? (
        <h2>'Waiting...'</h2>
      ) : (
        <>
          <h2>Weather in {capital}</h2>
          <p>Temprature: {weather.main.temp}° Fahrenheit</p>
          <Img
            img={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </>
      )}
    </>
  );
};

export default Weather;
