import { Location } from "@/core";
import { setLoading } from "@/ui";
import { fetchWithErrorHandle } from "@/utilities";

const getVisualCrossingUrl = (location: Location): string => {
  // key in .env file for good practices
  const key = process.env.VISUAL_CROSSING_KEY || "K9TEM6K7V2VHM7MVTEYKNB2MA";
  return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`;
};

interface Props {
  location: Location;
}

export const fetchWeatherDataByLocation = async ({
  location,
}: Props): Promise<Error | JSON> => {
  setLoading(true);

  const weatherJSON = await fetchWithErrorHandle(
    getVisualCrossingUrl(location),
  ).finally(() => setLoading(false));

  if ("error" in weatherJSON) {
    // Invalid location passed
    if (weatherJSON.status === 400) {
      return new Error(
        `Invalid location: '${location}'. No data available for this location.`,
      );
    }
    // Other error ocurred
    console.error();
    return new Error(`${weatherJSON.error.message}`);
  }

  return weatherJSON;
};
