import dataTransformer from "@/utils/dataTransformer";

export const dataFetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => dataTransformer(res.results))
    .catch((error) => {
      console.error(error);
      throw error;
    });
