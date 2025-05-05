export type FetcherPromise = Promise<{ error?: Error; status?: number } | any>;

export const fetchWithErrorHandle = async (url: string): FetcherPromise => {
  try {
    const isIPApi = url.includes('ip-api.com'); // Special handling for IP-API
    const response = await fetch(url, { 
      mode: "cors",
      headers: isIPApi ? { 
        'Accept': 'application/json',
        'User-Agent': 'weather-app/0.0.0 (https://fran-dv.github.io/weather-app/)' 
      } : undefined,
      cache: isIPApi ? 'no-store' : 'default',
      credentials: 'omit'
    });
    if (!response.ok) {
      return {
        error: new Error(`An errror ocurred! Status: ${response.status}`),
        status: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (err) {
    return { error: new Error(`Oops! A network or unexpected error ocurred`) };
  }
};
