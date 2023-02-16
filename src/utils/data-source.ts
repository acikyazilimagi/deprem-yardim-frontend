import { MapLayer } from "@/stores/mapStore";
import { Channel } from "@/types";

export const DataSource: Partial<Record<MapLayer, Channel>> = {
  [MapLayer.Ahbap]: "ahbap",
  [MapLayer.SahraMutfak]: "sahra_mutfak",
  [MapLayer.Pharmacy]: "eczane_excel",
  [MapLayer.SafePlaces]: "guvenli_yerler_oteller",
  [MapLayer.Hospital]: "ahbap",
};
