import { WeatherData } from "@/core";
import { generateWeatherInfoDiv } from "./weatherInfo";
import { Ids } from "@/ui";

const mainContentDiv = document.querySelector(`#${Ids.mainContainer}`);

const displayErrorH3 = (msg: string) => {
  const errorH3 = document.createElement("h3");
  errorH3.textContent = `${msg} :( Please try again`;
  mainContentDiv?.appendChild(errorH3);

  errorH3.classList.add("text-gray-500", "text-2xl", "w-2/3", "text-center");
};

export const displayWeatherInfo = (
  weatherData: WeatherData | null = null,
  errorMsg: string | null = null,
) => {
  if (!mainContentDiv) {
    console.error(
      `An error ocurred selecting the element with id ${Ids.mainContainer}`,
    );
    return;
  }

  while (mainContentDiv.firstChild) {
    mainContentDiv.firstChild.remove();
  }

  if (errorMsg) {
    displayErrorH3(errorMsg);
    return;
  }

  if (!weatherData) {
    displayErrorH3("An error has ocurred obtaining the data");
    return;
  }

  const infoDiv = generateWeatherInfoDiv(weatherData);
  mainContentDiv.appendChild(infoDiv);
};
