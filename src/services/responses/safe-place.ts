import { createGeometry } from "@/utils/geometry";
import { APIResponseObject, RT, Geometry } from "@/types";

export type SafePlaceAPIExtraParams = {
  name: string;
  description?: string;
  styleUrl: string;
  icon: string;
};

export type SafePlaceResponse = APIResponseObject<
  "guvenli_yerler_oteller",
  SafePlaceAPIExtraParams
>;

export type SafePlaceDataProperties = {
  reason: string | null;
  verified: boolean;
  name: string | null;
  icon: string;
  description: string | null;
};

export type SafePlaceData = {
  channel: "guvenli";
  properties: SafePlaceDataProperties;
  geometry: Geometry;
};

export const transformSafePlaceResponse: RT<
  SafePlaceResponse,
  SafePlaceData
> = (res) => {
  return {
    channel: "guvenli",
    geometry: createGeometry(res),
    properties: {
      description: res.extraParams?.description ?? null,
      icon: "images/icon-16.png",
      reason: res.reason ?? null,
      name: res.extraParams?.name ?? null,
      verified: res.is_location_verified ?? false,
    },
    reference: res.entry_id ?? null,
  };
};
