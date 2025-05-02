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
}

export const visualCrossingResponseSchema = z.object({
  resolvedAddress: z.string(),
  currentConditions: z.object({
    feelslike: z.number(),
    humidity: z.number(),
    icon: z.string(),
    precip: z.number(),
    temp: z.number(),
  }),
  description: z.string(),
})

