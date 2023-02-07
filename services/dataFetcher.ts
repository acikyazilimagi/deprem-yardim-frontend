import { setMarkerData } from "@/stores/mapStore";
import { dataTransformerV2 } from "@/utils/dataTransformer";

export const dataFetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      const transformedData = res.results ? dataTransformerV2(res) : [];
      setMarkerData(transformedData);
      return transformedData;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
