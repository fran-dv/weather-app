import { setLoading } from "@/ui";
import { fetchWithErrorHandle } from "@/utilities";

const ipApiUrl =
  "https://ipapi.co/json/";

export const fetchUserGeolocation = async (): Promise<Error | JSON> => {
  setLoading(true);

  const geolocationJSON = await fetchWithErrorHandle(ipApiUrl).finally(() =>
    setLoading(false),
  );

  if ("error" in geolocationJSON) {
    return new Error(`${geolocationJSON.error.message}`);
  }

  return geolocationJSON;
};
