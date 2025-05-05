import { fetchWeatherDataByLocation } from "@/infraestructure";
import { displayWeatherInfo } from "@/ui";
import { apiResponseToWeatherData } from "@/core";

export const searchWeatherDataByLocation = async (location: string) => {
  const apiResponse = await fetchWeatherDataByLocation({ location: location });

  if (apiResponse instanceof Error) {
    displayWeatherInfo(null, apiResponse.message);
    return;
  }

  const weatherData = apiResponseToWeatherData(apiResponse);
  displayWeatherInfo(weatherData);
};
