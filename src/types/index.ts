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
  | "teyit_yardim"
  | "adana_yemek"
  | "malatya_yemek";

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

export type Channel =
  | "twitter"
  | "babala"
  | "ahbap"
  | "yemek"
  | "teleteyit"
  | "uydu"
  | "eczane"
  | "guvenli"
  | "hastane";

export type RT<
  TResponse extends APIResponseObject = APIResponseObject,
  TChannelData extends ChannelData = ChannelData
> = (_response: TResponse) => TChannelData;

export type Point = {
  lat: number;
  lng: number;
};

export type Geometry = {
  location: Point;
};

// Naming Conventions:
// - [channel]APIExtraParams:   extra_parameters is a string that contains a JSON object
//                                that includes data relevant to that type of data/channel
//
// - [channel]Response:         Response received from API
//
// - [channel]DataProperties:   Properties of data received from api that will be used in UI
//
// - [channel]Data:             Represents all information related to a single channel data

// Type definitions for Babala
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

// Type definitions for Twitter
export type TwitterAPIExtraParams = {
  tweet_id: string;
  screen_name: string;
  name?: string;
};

export type TwitterResponse = APIResponseObject<
  "twitter",
  TwitterAPIExtraParams
>;

export type TwitterDataProperties = {
  tweet_id: string | null;
  screen_name: string | null;
  name: string | null;
  reason: string | null;
  full_text: string;
  timestamp: string | null;
  formatted_address: string;
  description: string | null;
};

export type TwitterData = {
  channel: "twitter";
  properties: TwitterDataProperties;
  geometry: Geometry;
};

// Type definitions for Ahbap
export type AhbapAPIExtraParams = {
  name: string;
  styleUrl: string;
  icon: string;
  description?: string;
};
export type AhbapResponse = APIResponseObject<
  "ahbap_location",
  AhbapAPIExtraParams
>;

export type AhbapDataProperties = {
  name: string | null;
  description: string | null;
  type: string | null;
  icon: string | null;
};

export type AhbapData = {
  channel: "ahbap";
  properties: AhbapDataProperties;
  geometry: Geometry;
};

// Type definitions for Hospital
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

// Type definitions for Teleteyit
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

// Type definitions for Satellite
export type SatelliteAPIExtraParams = {
  damage: string;
  formatted_address: string;
  longitude: number;
  latitude: number;
  shape_long: string;
  shape_area: string;
};

export type SatelliteResponse = APIResponseObject<
  "uydu",
  SatelliteAPIExtraParams
>;

export type SatelliteDataProperties = {
  damage: string | null;
  verified: boolean | null;
  icon: string;
  name: string | null;
  description: string | null;
};

export type SatelliteData = {
  channel: "uydu";
  properties: SatelliteDataProperties;
  geometry: Geometry;
};

// Type definitions for Pharmacy
export type PharmacyAPIExtraParams = {
  name: string;
  description?: string;
  styleUrl: string;
  icon: string;
};

export type PharmacyResponse = APIResponseObject<
  "eczane_excel" | "turk_eczane",
  PharmacyAPIExtraParams
>;

export type PharmacyDataProperties = {
  name: string | null;
  reason: string | null;
  verified: boolean | null;
  icon: string | null;
  description: string | null;
};

export type PharmacyData = {
  channel: "eczane";
  properties: PharmacyDataProperties;
  geometry: Geometry;
};

// Type definitions for Safe Places
export type SafePlaceAPIExtraParams = {
  name: string;
  description?: string;
  styleUrl: string;
  icon: string;
};

export type SafePlaceResponse = APIResponseObject<
  "guvenli_yerler_oteller",
  SafePlaceAPIExtraParams
>;

export type SafePlaceDataProperties = {
  reason: string | null;
  verified: boolean;
  name: string | null;
  icon: string;
  description: string | null;
};

export type SafePlaceData = {
  channel: "guvenli";
  properties: SafePlaceDataProperties;
  geometry: Geometry;
};

// Type definitions for Food
export type FoodAPIExtraParams = {
  name: string;
  styleUrl: string;
  icon: string;
  description?: string;
};

export type FoodResponse = APIResponseObject<
  "sicak_yemek" | "malatya_yemek" | "adana_yemek" | "sahra_mutfak",
  FoodAPIExtraParams
>;

export type FoodDataProperties = {
  name: string | null;
  description: string | null;
  type: string | null;
  icon: string | null;
  reason: string | null;
};

export type FoodData = {
  channel: "yemek";
  properties: FoodDataProperties;
  geometry: Geometry;
};

// Type definitions for Food
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

// Type definitions for Teyit Yardım
export type TeyitYardimAPIExtraParams = {
  name: string;
  styleUrl: string;
  icon: string;
  description?: string;
};

export type TeyitYardimResponse = APIResponseObject<
  "teyit_yardim",
  TeyitEnkazAPIExtraParams
>;

export type TeyitYardimDataProperties = {
  name: string | null;
  description: string | null;
  type: string | null;
  icon: string | null;
};

export type TeyitYardimData = {
  channel: "teyit_yardim";
  properties: TeyitEnkazDataProperties;
  geometry: Geometry;
};

export type DataProperties =
  | TwitterData
  | BabalaData
  | AhbapData
  | TeleteyitData
  | SatelliteData
  | PharmacyData
  | SafePlaceData
  | FoodData
  | HospitalData
  | TeyitEnkazData
  | TeyitYardimData;

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

export type EVENT_TYPES = "moveend" | "zoomend" | "ready";
