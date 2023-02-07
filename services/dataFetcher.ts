import { setMarkerData } from "@/stores/mapStore";
import dataTransformer from "@/utils/dataTransformer";

export const dataFetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      const transformedData = res.results ? dataTransformer(res) : [];
      console.log(transformedData);
      setMarkerData(transformedData);
      return transformedData;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
