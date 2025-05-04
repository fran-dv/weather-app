import { z } from "zod";

export interface Temperature {
    c: number; // in Celius
    f: number; // in Fahrenheit
}

export interface WeatherData {
  location: string;
  description: string;
  temperature: Temperature;
  feelslike: Temperature;
  humidity: number;
  icon: string;
  precip: number;
  date: string;
  hour: string;
  windspeed: number; 
  conditions: string;
}

export const visualCrossingResponseSchema = z.object({
  resolvedAddress: z.string(),
  currentConditions: z.object({
    datetime: z.string(),
    feelslike: z.number(),
    humidity: z.number(),
    icon: z.string(),
    precip: z.number(),
    temp: z.number(),
    windspeed: z.number(),
    conditions: z.string(),
  }),
  days: z.array(z.object({ datetime: z.string() })).transform((days) => days[0]),
  description: z.string(),
})

