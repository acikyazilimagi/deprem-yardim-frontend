export const dataFetcher = async <T>(url: string | URL) => {
  const response = await fetch(url);
  return (await response.json()) as T;
};
