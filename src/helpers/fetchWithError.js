export const fetchWithError = async (url, options) => {
  const response = await fetch(url, options);

  if (response.status === 200 || response.status === 201) {
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }

    return result;
  }

  throw new Error(`Error ${response.status}: ${response.statusText}`);
};
