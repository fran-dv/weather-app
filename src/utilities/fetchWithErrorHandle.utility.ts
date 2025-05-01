export const fetchWithErrorHandle = async (
  url: string,
): Promise<any | { error: Error; status?: number }> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return {
        error: `An errror ocurred! Status: ${response.status}`,
        status: response.status,
      };
    }

    return await response.json();
  } catch (err) {
    return { error: new Error(`Oops! A network or unexpected error ocurred`) };
  }
};
