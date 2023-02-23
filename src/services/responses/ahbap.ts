import { createGeometry } from "@/utils/geometry";
import { APIResponseObject, RT, Geometry } from "@/types";

export type AhbapAPIExtraParams = {
  name: string;
  styleUrl: string;
  icon: string;
  description?: string;
};
export type AhbapResponse = APIResponseObject<
  "ahbap_location",
  AhbapAPIExtraParams
>;

export type AhbapDataProperties = {
  name: string | null;
  description: string | null;
  type: string | null;
  icon: string | null;
};

export type AhbapData = {
  channel: "ahbap";
  properties: AhbapDataProperties;
  geometry: Geometry;
};

export const transformAhbapResponse: RT<AhbapResponse, AhbapData> = (res) => {
  return {
    channel: "ahbap",
    geometry: createGeometry(res),
    properties: {
      name: res.extraParams?.name ?? null,
      description: res.extraParams?.description ?? null,
      type: res.extraParams?.styleUrl ?? null,
      icon: "images/icon-ahbap.png",
    },
    reference: res.entry_id ?? null,
  };
};
