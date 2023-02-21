import { createGeometry } from "@/utils/geometry";
import { APIResponseObject, RT, Geometry } from "@/types";

export type FoodAPIExtraParams = {
  name: string;
  styleUrl: string;
  icon: string;
  description?: string;
};

export type FoodResponse = APIResponseObject<"sicak_yemek", FoodAPIExtraParams>;

export type FoodDataProperties = {
  name: string | null;
  description: string | null;
  type: string | null;
  icon: string | null;
};

export type FoodData = {
  channel: "yemek";
  properties: FoodDataProperties;
  geometry: Geometry;
};

export const transformFoodResponse: RT<FoodResponse, FoodData> = (res) => {
  return {
    channel: "yemek",
    geometry: createGeometry(res),
    properties: {
      name: res.extraParams?.name ?? null,
      description: res.extraParams?.description ?? null,
      type: res.extraParams?.styleUrl ?? null,
      icon: res.extraParams?.icon ?? null,
    },
    reference: res.entry_id ?? null,
  };
};
