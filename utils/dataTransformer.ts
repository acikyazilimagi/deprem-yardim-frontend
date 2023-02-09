import { DrawerData, MarkerData } from "@/mocks/types";
import { DataLite, Data } from "@/mocks/TypesAreasEndpoint";

export const dataTransformerLite = (data: DataLite): MarkerData[] =>
  data.results.map((result) => ({
    reference: result.id,
    geometry: {
      location: {
        lat: result.loc?.[0] || 0,
        lng: result.loc?.[1] || 0,
      },
    },
  }));

export const dataTransformer = (data?: Data): DrawerData => {
  return {
    formatted_address: data?.formatted_address,
    geometry: {
      location: {
        lat: data?.loc?.[0] || 0,
        lng: data?.loc?.[1] || 0,
      },
    },
    id: data?.id,
    raw: data?.raw,
  };
};
