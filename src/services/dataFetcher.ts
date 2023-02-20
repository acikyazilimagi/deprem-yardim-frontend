export const dataFetcher = async (url: string | URL) => {
  const response = await fetch(url);
  return await response.json();
};
