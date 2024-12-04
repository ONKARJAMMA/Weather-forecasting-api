import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";

function Forcast(props) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]); // State to store forecast data

  // Function to search for current weather
  const searchWeather = (city) => {
    axios
      .get(
        `${apiKeys.base}weather?q=${
          city !== "[object Object]" ? city : query
        }&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
      })
      .catch((error) => {
        console.log(error);
        setWeather("");
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
  };

  // Function to fetch forecast data
  const searchForecast = (city) => {
    axios
      .get(
        `${apiKeys.base}forecast?q=${
          city !== "[object Object]" ? city : query
        }&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setForecast(response.data.list); // Extract the forecast data
        setQuery("");
      })
      .catch((error) => {
        console.log(error);
        setForecast([]);
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
  };

  // Function to fetch both weather and forecast when searching
  const search = (city) => {
    searchWeather(city);
    searchForecast(city);
  };

  useEffect(() => {
    search("Delhi"); // Default city
  }, []);

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h3>{props.weather}</h3>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <div className="img-box">
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              onClick={() => search(query)} // Trigger search
            />
          </div>
        </div>

        {/* Current Weather */}
        <ul>
          {typeof weather.main !== "undefined" ? (
            <div>
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                />
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
                </span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility)} mi
                </span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
              </li>
            </div>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>
        

        {/* Forecast Data */}
        <h3>FIVE DAY PREDICTION</h3>
        <div className="forecast-container">
          {forecast.length > 0
            ? forecast
                .filter((item, index) => index % 8 === 0) // Show one forecast per day
                .map((item, index) => (
                  <div key={index} className="forecast-item">
                    <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt="Weather Icon"
                    />
                    <p>
                      {Math.round(item.main.temp)}°c ({item.weather[0].main})
                    </p>
                  </div>
                ))
            : "Loading forecast..."}
        </div>
      </div>
    </div>
  );
}

export default Forcast;
