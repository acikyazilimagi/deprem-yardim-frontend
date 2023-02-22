import { createGeometry } from "@/utils/geometry";
import { APIResponseObject, RT, Geometry } from "@/types";

export type TeyitEnkazAPIExtraParams = {
  name: string;
  styleUrl: string;
  icon: string;
  description?: string;
};

export type TeyitEnkazResponse = APIResponseObject<
  "sicak_yemek",
  TeyitEnkazAPIExtraParams
>;

export type TeyitEnkazDataProperties = {
  name: string | null;
  description: string | null;
  type: string | null;
  icon: string | null;
};

export type TeyitEnkazData = {
  channel: "teyit_enkaz";
  properties: TeyitEnkazDataProperties;
  geometry: Geometry;
};

export const transformTeyitEnkazResponse: RT<
  TeyitEnkazResponse,
  TeyitEnkazData
> = (res) => {
  return {
    channel: "teyit_enkaz",
    geometry: createGeometry(res),
    properties: {
      name: res.extraParams?.name ?? null,
      description: res.extraParams?.description ?? null,
      type: res.extraParams?.styleUrl ?? null,
      icon: null, // TODO: fix this after we have an icon
    },
    reference: res.entry_id ?? null,
  };
};
