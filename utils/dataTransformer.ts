import { DrawerData, MarkerData } from "@/mocks/types";
import { DataLite, Data } from "@/mocks/TypesAreasEndpoint";

export const dataTransformerLite = (data: DataLite): MarkerData[] =>
  data.results.map((result) => ({
    reference: result.entry_id,
    geometry: {
      location: {
        lat: result.loc?.[0] || 0,
        lng: result.loc?.[1] || 0,
      },
    },
  }));

export const dataTransformer = (data?: Data): DrawerData => {
  return {
    fullText: data?.full_text,
    formatted_address: data?.formatted_address,
    id: data?.id,
    extraParameters: data?.extra_parameters,
  };
};
