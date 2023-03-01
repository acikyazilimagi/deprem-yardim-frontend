import { createGeometry } from "@/utils/geometry";
import { APIResponseObject, RT, Geometry } from "@/types";

export type TeleteyitAPIExtraParams = {
  "isim-soyisim": string;
  numara: string;
  aciklama: string;
  il: string;
  ilce: string;
  excel_id: number;
  durum: string;
};

export type TeleteyitResponse = APIResponseObject<
  "teleteyit",
  TeleteyitAPIExtraParams
>;

export type TeleteyitDataProperties = {
  name: string | null;
  description: string | null;
  icon: string;
  city: string | null;
  district: string | null;
  status: string | null;
};

export type TeleteyitData = {
  channel: "teleteyit";
  properties: TeleteyitDataProperties;
  geometry: Geometry;
};

export const transformTeleteyitResponse: RT<
  TeleteyitResponse,
  TeleteyitData
> = (res) => {
  return {
    channel: "teleteyit",
    geometry: createGeometry(res),
    properties: {
      name: res.extraParams?.["isim-soyisim"] ?? null,
      description: res.extraParams?.aciklama ?? null,
      icon: "images/icon-14.png",
      reason: res.reason ?? null,
      city: res.extraParams?.il ?? null,
      district: res.extraParams?.ilce ?? null,
      status: res.extraParams?.durum ?? null,
    },
    reference: res.entry_id ?? null,
  };
};
