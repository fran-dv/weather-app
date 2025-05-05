import { z } from "zod";

export interface Coords {
  lat: number;
  lon: number;
}

export type Location = string | Coords;

export interface Geolocation {
  city: string;
  country: string;
}

export const ipApiResponseSchema = z.object({
  city: z.string(),
  country_name: z.string(),
});
