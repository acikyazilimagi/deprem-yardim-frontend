import { createGeometry } from "@/utils/geometry";
import { APIResponseObject, RT, Geometry } from "@/types";

export type TeyitEnkazAPIExtraParams = {
  name: string;
  styleUrl: string;
  icon: string;
  description?: string;
};

export type TeyitEnkazResponse = APIResponseObject<
  "teyit_enkaz",
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
      icon: "images/icon-enkaz.png",
    },
    reference: res.entry_id ?? null,
  };
};
