import { fetchUserGeolocation } from "@/infraestructure";
import { displayWeatherInfo } from "@/ui";
import {
  apiResponseToGeolocation,
  Geolocation,
  searchWeatherDataByLocation,
} from "@/core";

export const getWeatherOfUserCurrentGeolocation = async () => {
  const apiResponse = await fetchUserGeolocation();
  if (apiResponse instanceof Error) {
    displayWeatherInfo(null, apiResponse.message);
    return;
  }

  const geoLocation: Geolocation | null = apiResponseToGeolocation(apiResponse);
  if (!geoLocation) {
    // the function above will display errors
    return;
  }
  const locationToSearch = `${geoLocation.city}, ${geoLocation.country}`;
  searchWeatherDataByLocation(locationToSearch);
  return;
};
