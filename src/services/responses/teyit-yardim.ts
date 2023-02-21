import { createGeometry } from "@/utils/geometry";
import { APIResponseObject, RT, Geometry } from "@/types";

export type TeyitYardimAPIExtraParams = {
  name: string;
  styleUrl: string;
  icon: string;
  description?: string;
};

export type TeyitYardimResponse = APIResponseObject<
  "teyit_yardim",
  TeyitYardimAPIExtraParams
>;

export type TeyitYardimDataProperties = {
  name: string | null;
  description: string | null;
  type: string | null;
  icon: string | null;
};

export type TeyitYardimData = {
  channel: "teyit_yardim";
  properties: TeyitYardimDataProperties;
  geometry: Geometry;
};
export const transformTeyitYardimResponse: RT<
  TeyitYardimResponse,
  TeyitYardimData
> = (res) => {
  return {
    channel: "teyit_yardim",
    geometry: createGeometry(res),
    properties: {
      name: res.extraParams?.name ?? null,
      description: res.extraParams?.description ?? null,
      type: res.extraParams?.styleUrl ?? null,
      icon: null,
    },
    reference: res.entry_id ?? null,
  };
};
