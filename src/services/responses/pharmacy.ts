import { createGeometry } from "@/utils/geometry";
import { APIResponseObject, RT, Geometry } from "@/types";

export type PharmacyAPIExtraParams = {
  name: string;
  description?: string;
  styleUrl: string;
  icon: string;
};

export type PharmacyResponse = APIResponseObject<
  "eczane_excel" | "turk_eczane",
  PharmacyAPIExtraParams
>;

export type PharmacyDataProperties = {
  name: string | null;
  reason: string | null;
  verified: boolean | null;
  icon: string | null;
  description: string | null;
};

export type PharmacyData = {
  channel: "eczane";
  properties: PharmacyDataProperties;
  geometry: Geometry;
};

export const transformPharmacyResponse: RT<PharmacyResponse, PharmacyData> = (
  res
) => {
  return {
    channel: "eczane",
    geometry: createGeometry(res),
    properties: {
      name: res.extraParams?.name ?? null,
      reason: res.reason ?? null,
      icon: "images/icon-15.png",
      verified: res.is_location_verified ?? false,
      description: null,
    },
    reference: res.entry_id ?? null,
  };
};
