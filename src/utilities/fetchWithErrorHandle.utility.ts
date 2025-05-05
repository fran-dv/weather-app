export type FetcherPromise = Promise<{ error?: Error; status?: number } | any>;

export const fetchWithErrorHandle = async (url: string): FetcherPromise => {
  try {
    const response = await fetch(url);
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
