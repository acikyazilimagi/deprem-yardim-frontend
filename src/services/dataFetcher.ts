import interceptors from "./interceptors";

export const dataFetcher = async <T>(url: string | URL) => {
  try {
    const response = await fetch(url);
    return (await response.json()) as T;
  } catch (error) {
    interceptors(error as Error);
  }
};
