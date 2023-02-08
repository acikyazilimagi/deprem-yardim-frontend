import { DrawerData, LocationResponse, MarkerData } from "@/mocks/types";
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

export const dataTransformer = (data: Data): LocationResponse => {
  const id = data.id;
  const formatted_address = data?.formatted_address;
  const loc = data?.loc;
  const raw = data?.raw;

  return {
    formatted_address: formatted_address ?? "",
    geometry: {
      location: {
        lat: loc?.[0] || 0,
        lng: loc?.[1] || 0,
      },
    },
    id,
    types: ["locality", "political"],
    raw,
  };
};
