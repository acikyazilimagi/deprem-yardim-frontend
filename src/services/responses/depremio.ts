import { createGeometry } from "@/utils/geometry";
import { APIResponseObject, RT, Geometry } from "@/types";

export type DepremIOAPIExtraParams = {
  name: string;
  styleUrl: string;
  icon: string;
  description?: string;
};

export type DepremIOResponse = APIResponseObject<
  "depremio",
  DepremIOAPIExtraParams
>;

export type DepremIODataProperties = {
  name: string | null;
  description: string | null;
  type: string | null;
  icon: string | null;
};

export type DepremIOData = {
  channel: "depremio";
  geometry: Geometry;
  properties: DepremIODataProperties;
};
export const transformDepremIOResponse: RT<DepremIOResponse, DepremIOData> = (
  res
) => {
  return {
    channel: "depremio",
    geometry: createGeometry(res),
    properties: {
      name: res.extraParams?.name ?? null,
      description: res.extraParams?.description ?? null,
      type: res.extraParams?.styleUrl ?? null,
      icon: "images/icon-deprem.io.png",
    },
    reference: res.entry_id ?? null,
  };
};
