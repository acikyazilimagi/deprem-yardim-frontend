import { createGeometry } from "@/utils/geometry";
import { APIResponseObject, RT, Geometry } from "@/types";

export type SatelliteAPIExtraParams = {
  damage: string;
  formatted_address: string;
  longitude: number;
  latitude: number;
  shape_long: string;
  shape_area: string;
};

export type SatelliteResponse = APIResponseObject<
  "uydu",
  SatelliteAPIExtraParams
>;

export type SatelliteDataProperties = {
  damage: string | null;
  verified: boolean | null;
  icon: string;
  name: string | null;
  description: string | null;
};

export type SatelliteData = {
  channel: "uydu";
  properties: SatelliteDataProperties;
  geometry: Geometry;
};

export const transformSatelliteResponse: RT<
  SatelliteResponse,
  SatelliteData
> = (res) => {
  return {
    channel: "uydu",
    geometry: createGeometry(res),
    properties: {
      damage: res.extraParams?.damage ?? null,
      verified: res.is_location_verified ?? false,
      icon: "images/icon-13.png",
      name: null,
      description: null,
    },
    reference: res.entry_id ?? null,
  };
};
