import apiResponseToWeatherData from "./core/weather/get-weather-data";
import "./index.css";
import { fetchWeatherDataByLocation } from "./infraestructure";

const apiResponse = await fetchWeatherDataByLocation({ location: 'Chascomús' });
const weatherData = apiResponse ? apiResponseToWeatherData(apiResponse) : null;

console.log(weatherData)
