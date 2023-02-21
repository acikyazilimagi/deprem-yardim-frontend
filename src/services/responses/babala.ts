import { createGeometry } from "@/utils/geometry";
import { APIResponseObject, RT, Geometry } from "@/types";

export type BabalaAPIExtraParams = {
  additional_notes: string;
  "isim-soyisim": string;
  manual_confirmation: string;
  name: string;
  name_surname: string;
  numara: string;
  status: string;
  tel: number;
  telefon: string;
};

export type BabalaResponse = APIResponseObject<"babala", BabalaAPIExtraParams>;

export type BabalaDataProperties = {
  full_text: string;
  reason: string | null;
  timestamp: string | null;
  formatted_address: string;
  name: string | null;
  description: string | null;
};

export type BabalaData = {
  channel: "babala";
  properties: BabalaDataProperties;
  geometry: Geometry;
};

export const transformBabalaResponse: RT<BabalaResponse, BabalaData> = (
  res
) => {
  return {
    channel: "babala",
    properties: {
      reason: res.reason ?? null,
      full_text: res.full_text ?? "",
      timestamp: res.timestamp ?? null,
      formatted_address: res.formatted_address,
      name: res.extraParams?.name ?? null,
      description: null,
    },
    geometry: createGeometry(res),
    reference: res.entry_id ?? null,
  };
};
