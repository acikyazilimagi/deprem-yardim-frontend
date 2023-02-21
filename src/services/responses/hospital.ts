import { createGeometry } from "@/utils/geometry";
import { APIResponseObject, RT, Geometry } from "@/types";

export type HospitalAPIExtraParams = {
  name: string;
  il: string;
  ilce: string;
  kurum: string;
};

export type HospitalResponse = APIResponseObject<
  "hastahane_locations",
  HospitalAPIExtraParams
>;

export type HospitalDataProperties = {
  name: string | null;
  description: string | null;
  icon: string | null;
  city: string | null;
};

export type HospitalData = {
  channel: "hastane";
  properties: HospitalDataProperties;
  geometry: Geometry;
};

export const transformHospitalResponse: RT<HospitalResponse, HospitalData> = (
  res
) => {
  return {
    channel: "hastane",
    geometry: createGeometry(res),
    properties: {
      name: res.extraParams?.name ?? null,
      icon: "images/icon-10.png",
      city: res.extraParams?.il ?? null,
      description: null,
    },
    reference: res.entry_id ?? null,
  };
};
