import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "../../redux/weatherSlice/weatherSlice";
import { selectSelectedCity } from "../../redux/citiesSlice/citiesSlice";

function Main() {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.data);
  const selectedCity = useSelector(selectSelectedCity);

  useEffect(() => {
    if (selectedCity) {
      dispatch(fetchWeather(selectedCity));
    }
  }, [selectedCity, dispatch]);

  const currentWeather = weather.list ? weather.list[0] : null;

  const getWeatherIcon = (main) => {
    const icons = {
      Clear: "https://openweathermap.org/img/wn/01d@2x.png",
      Clouds: "https://openweathermap.org/img/wn/03d@2x.png",
      Rain: "https://openweathermap.org/img/wn/09d@2x.png",
      Drizzle: "https://openweathermap.org/img/wn/09d@2x.png",
      Thunderstorm: "https://openweathermap.org/img/wn/11d@2x.png",
      Snow: "https://openweathermap.org/img/wn/13d@2x.png",
      Mist: "https://openweathermap.org/img/wn/50d@2x.png",
      Smoke: "https://openweathermap.org/img/wn/50d@2x.png",
      Haze: "https://openweathermap.org/img/wn/50d@2x.png",
      Dust: "https://openweathermap.org/img/wn/50d@2x.png",
      Fog: "https://openweathermap.org/img/wn/50d@2x.png",
      Sand: "https://openweathermap.org/img/wn/50d@2x.png",
      Ash: "https://openweathermap.org/img/wn/50d@2x.png",
      Squall: "https://openweathermap.org/img/wn/50d@2x.png",
      Tornado: "https://openweathermap.org/img/wn/50d@2x.png",
    };
    return icons[main];
  };

  const today = new Date().getDate();
  const uniqueDays = new Set();
  const nextDaysForecast = weather.list
    ? weather.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt);
        const forecastDay = forecastDate.getDate();
        if (forecastDay !== today && !uniqueDays.has(forecastDay)) {
          uniqueDays.add(forecastDay);
          return true;
        }
        return false;
      })
    : [];

  return (
    <main className="main">
      <h3>
        {weather.city
          ? `${weather.city.name}, ${weather.city.country}`
          : "Loading..."}
      </h3>
      <div className="content-top">
        <div className="content-top-left">
          <img
            src={
              currentWeather && getWeatherIcon(currentWeather.weather[0].main)
            }
            alt="Weather"
          />
          <span>{currentWeather ? currentWeather.weather[0].main : "--"}</span>
        </div>
        <div className="content-top-mid">
          <span>{currentWeather ? `${currentWeather.main.temp}°C` : "--"}</span>
        </div>
        <div className="content-top-right">
          <p>
            <span>Wind:</span>{" "}
            {currentWeather ? `${currentWeather.wind.speed} kmph` : "--"}
          </p>
          <p>
            <span>Precip:</span> 0 mm
          </p>
          <p>
            <span>Pressure:</span>{" "}
            {currentWeather ? `${currentWeather.main.pressure} mb` : "--"}
          </p>
        </div>
      </div>
      <div className="content-bottom">
        {nextDaysForecast.slice(0, 5).map((forecast, index) => (
          <div className="content-bottom-item" key={index}>
            <span>
              {new Date(forecast.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </span>
            <img src={getWeatherIcon(forecast.weather[0].main)} alt="Weather" />
            <span>{`${forecast.main.temp}°C`}</span>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Main;
