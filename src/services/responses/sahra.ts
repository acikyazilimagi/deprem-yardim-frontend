import { createGeometry } from "@/utils/geometry";
import { APIResponseObject, RT, Geometry } from "@/types";

export type SahraAPIExtraParams = {
  name: string;
  styleUrl: string;
  icon: string;
};

export type SahraResponse = APIResponseObject<
  "sahra_mutfak",
  SahraAPIExtraParams
>;

export type SahraDataProperties = {
  name: string | null;
  reason: string | null;
  verified: boolean | null;
  icon: string | null;
  description: string | null;
};

export type SahraData = {
  channel: "sahra";
  properties: SahraDataProperties;
  geometry: Geometry;
};

export const transformSahraResponse: RT<SahraResponse, SahraData> = (res) => {
  return {
    channel: "sahra",
    geometry: createGeometry(res),
    properties: {
      name: res.extraParams?.name ?? null,
      reason: res.reason ?? null,
      icon: res.extraParams?.icon ?? null,
      verified: res.is_location_verified ?? false,
      description: null,
    },
    reference: res.entry_id ?? null,
  };
};
