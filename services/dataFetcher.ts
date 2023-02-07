import dataTransformer from "@/utils/dataTransformer";

export const dataFetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => (res.results ? dataTransformer(res.results) : undefined))
    .catch((error) => {
      console.error(error);
      throw error;
    });
