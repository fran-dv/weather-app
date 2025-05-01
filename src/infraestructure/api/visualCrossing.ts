import { Location } from "@/core";
import { fetchWithErrorHandle } from "@/utilities";

const getVisualCrossingUrl = (location: Location): string => {
  // key in .env file for good practices
  const key = process.env.VISUAL_CROSSING_KEY || "K9TEM6K7V2VHM7MVTEYKNB2MA";
  return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`;
};

interface Props {
  location: Location;
}

export const fetchWeatherData = async ({ location }: Props) => {
  const weatherJSON = await fetchWithErrorHandle(
    getVisualCrossingUrl(location),
  );

  if (weatherJSON.error) {
    // Invalid location passed
    if (weatherJSON.status === 400) {
      console.error(
        `Invalid location: '${location}'. No data available for this location.`,
      );
      return;
    }
    // Other error ocurred
    console.error(
      `Error fetching weather data for '${location}':`,
      weatherJSON.error,
    );
    return;
  }

  return weatherJSON;
};
