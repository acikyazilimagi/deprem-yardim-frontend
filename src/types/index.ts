import {
  TwitterData,
  AhbapData,
  BabalaData,
  TeleteyitData,
  SatelliteData,
  SahraData,
  PharmacyData,
  FoodData,
  SafePlaceData,
  HospitalData,
  TeyitEnkazData,
  TeyitYardimData,
  DepremIOData,
} from "@/services/responses";

export type DeviceType = "mobile" | "desktop";

export type APIChannel =
  | "ahbap_location"
  | "sicak_yemek"
  | "hastahane_locations"
  | "teleteyit"
  | "uydu"
  | "sahra_mutfak"
  | "turk_eczane"
  | "eczane_excel"
  | "guvenli_yerler_oteller"
  | "twitter"
  | "teyit_enkaz"
  | "babala"
  | "depremio"
  | "teyit_yardim";

export type ClientChannel =
  | "twitter"
  | "babala"
  | "ahbap"
  | "yemek"
  | "teleteyit"
  | "uydu"
  | "sahra"
  | "eczane"
  | "guvenli"
  | "hastane";

export type Point = {
  lat: number;
  lng: number;
};

export type Geometry = {
  location: Point;
};

export type APIResponse<TChannel extends APIChannel = APIChannel> = {
  channel: TChannel;
  id: number;
  entry_id: number;
  reason?: string;
  extra_parameters: string;
  full_text?: string;
  formatted_address: string;
  timestamp?: string;
  loc?: [number, number];
  lat?: number;
  lng?: number;
  is_location_verified?: boolean;
  is_need_verified: boolean;
};

export type APIResponseObject<
  TChannel extends APIChannel = APIChannel,
  T = any
> = Omit<APIResponse<TChannel>, "extra_parameters"> & {
  extraParams: T | undefined;
};

export type RT<
  TResponse extends APIResponseObject = APIResponseObject,
  TChannelData extends ChannelData = ChannelData
> = (_response: TResponse) => TChannelData;

export type DataProperties =
  | TwitterData
  | BabalaData
  | AhbapData
  | TeleteyitData
  | SatelliteData
  | SahraData
  | PharmacyData
  | SafePlaceData
  | FoodData
  | HospitalData
  | TeyitEnkazData
  | DepremIOData
  | TeyitYardimData
  | TeyitEnkazData;

export type ChannelData = DataProperties & {
  reference?: number | null;
  closeByRecords?: number[];
  isVisited?: boolean;
};

// UNUSED?
export type DataLite = {
  count: number;
  results: APIResponse[];
};

export type MarkerVisited = {
  [key: number]: boolean;
};

export type ClusterPopupData = {
  count: number;
  baseMarker: ChannelData;
  markers: any[];
};

export type EVENT_TYPES =
  | "movestart"
  | "moveend"
  | "zoomstart"
  | "zoomend"
  | "ready";
