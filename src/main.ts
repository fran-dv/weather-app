import "./index.css";
import apiResponseToWeatherData from "./core/weather/get-weather-data";
import { fetchWeatherDataByLocation } from "./infraestructure";
import { DataClick, generateWeatherInfoDiv, Ids } from "./ui";

const apiResponse = await fetchWeatherDataByLocation({ location: "chascomús" });
const weatherData = apiResponse ? apiResponseToWeatherData(apiResponse) : null;

const weatherContainer = document.querySelector(`#${Ids.mainContainer}`);

if (weatherData && weatherContainer) {
  console.log(apiResponse);
  const test = generateWeatherInfoDiv(weatherData);
  weatherContainer.appendChild(test);
} else if (!weatherData) {
  console.error(
    `Oops! didn't can fetch the data. Please try reloading the page`,
  );
} else if (!weatherContainer) {
  console.error(
    `An error ocurred selecting the element with id ${Ids.mainContainer}`,
  );
}

type Target = HTMLElement | null;

const handleClick = (e: MouseEvent) => {
  if (e.target === null) {
    return;
  }

  const target: Target = (e.target as HTMLElement).closest("[data-click]");

  if (!target) {
    return;
  }

  switch (target.dataset.click) {
    case DataClick.toggleTempScale:
      break;
  }
};

const clickHandler = () => handleClick;

document.addEventListener("click", clickHandler);
