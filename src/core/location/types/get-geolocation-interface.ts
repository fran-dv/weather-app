import { Geolocation, ipApiResponseSchema } from "@/core";
import { z } from "zod";

const transformSchemaToGeolocation = (
  data: z.infer<typeof ipApiResponseSchema>,
): Geolocation => {
  return {
    city: data.city,
    country: data.country_name,
  };
};

export const apiResponseToGeolocation = (
  apiResponse: JSON,
): Geolocation | null => {
  const data = ipApiResponseSchema.safeParse(apiResponse);

  if (!data.success) {
    data.error.issues.forEach((issue) => {
      console.error(`Error parsing the api response: ${issue.message}`);
    });
    return null;
  }

  return transformSchemaToGeolocation(data.data);
};
