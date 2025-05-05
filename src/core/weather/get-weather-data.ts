import { z } from "zod";
import { visualCrossingResponseSchema, WeatherData } from "@/core";
import { getTempFromFahrenheit } from "@/utilities";
import { getVelocityFromMph } from "@/utilities";

const transformSchemaToWeatherData = (
  data: z.infer<typeof visualCrossingResponseSchema>,
): WeatherData => {
  const weatherData: WeatherData = {
    location: data.resolvedAddress,
    description: data.description,
    temperature: getTempFromFahrenheit(data.currentConditions.temp),
    feelslike: getTempFromFahrenheit(data.currentConditions.feelslike),
    humidity: data.currentConditions.humidity,
    icon: data.currentConditions.icon,
    precip: data.currentConditions.precipprob,
    date: data.days.datetime,
    hour: data.currentConditions.datetime,
    windspeed: getVelocityFromMph(data.currentConditions.windspeed),
    conditions: data.currentConditions.conditions,
  };

  return weatherData;
};

export const apiResponseToWeatherData = (
  apiResponse: JSON,
): WeatherData | null => {
  const data = visualCrossingResponseSchema.safeParse(apiResponse);

  if (!data.success) {
    data.error.issues.forEach((issue) => {
      console.error(`Error parsing the api response: ${issue.message}`);
    });
    return null;
  }

  return transformSchemaToWeatherData(data.data);
};
