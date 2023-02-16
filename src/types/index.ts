export type APIChannel =
  | "ahbap_location"
  | "sicak_yemek"
  | "hastahane_locations"
  | "teleteyit"
  | "uydu"
  | "sahra_mutfak"
  | "turk_eczane"
  | "eczane_excel"
  | "guvenli_yerler_oteller";

export type APIResponse = {
  id: number;
  entry_id: number;
  channel: APIChannel;
  reason: string;
  extra_parameters: string;
  is_location_verified: boolean;
  is_need_verified: boolean;
  loc: [number, number];
};

export type Channel =
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

export type ExtraParams = BabalaParameters | TwitterParameters;

export interface BaseFeedChannel<T> {
  id?: number;
  full_text?: string;
  is_resolved?: boolean;
  channel?: Channel;
  timestamp?: string;
  extra_parameters: T;
  formatted_address?: string;
  reason?: string | null;
}

export type BabalaParameters = {
  name_surname: string;
  tel: number;
  additional_notes: string;
  status: string;
  manual_confirmation: string;
  reason: string;
};

export type TwitterParameters = {
  user_id: string;
  screen_name: string;
  name: string;
  tweet_id: string;
  created_at: string;
  hashtags: string;
  user_account_created_at: string;
  media: string;
};

export type Point = {
  lat: number;
  lng: number;
};

export type Geometry = {
  location: Point;
};

export type AhbapDataProperties = {
  name: string;
  description: string;
  type: string;
  icon: string;
};

export type HospitalDataProperties = {
  name: string;
  description: string;
  type: string;
  icon: string;
};

export type TeleteyitDataProperties = {
  name: string;
  description: string;
  type: string;
  icon: string;
  city: string;
  district: string;
  status: string;
};

export type SatelliteDataProperties = {
  damage: string;
  verified: boolean;
  icon: string;
};

export type SahraDataProperties = {
  id: number;
  name: string;
  reason: string;
  verified: boolean;
  icon: string;
};

export type PharmacyDataProperties = {
  id: number;
  name: string;
  reason: string;
  verified: boolean;
  icon: string;
  description: string;
};

export type SafePlaceDataProperties = {
  id: number;
  reason: string;
  verified: boolean;
  name: string;
};

export type FoodDataProperties = {
  name: string;
  description: string;
  type: string;
  icon: string;
};

export type TwitterData = {
  channel: "twitter";
  properties: TwitterParameters;
  geometry: Geometry;
};

export type BabalaData = {
  channel: "babala";
  properties: BabalaParameters;
  geometry: Geometry;
};

export type AhbapData = {
  channel: "ahbap";
  properties: AhbapDataProperties;
  geometry: Geometry;
};

export type TeleteyitData = {
  channel: "teleteyit";
  properties: TeleteyitDataProperties;
  geometry: Geometry;
};

export type SatelliteData = {
  channel: "uydu";
  properties: SatelliteDataProperties;
  geometry: Geometry;
};

export type SahraData = {
  channel: "sahra";
  properties: SahraDataProperties;
  geometry: Geometry;
};

export type PharmacyData = {
  channel: "eczane";
  properties: PharmacyDataProperties;
  geometry: Geometry;
};

export type SafePlaceData = {
  channel: "guvenli";
  properties: SafePlaceDataProperties;
  geometry: Geometry;
};

export type HospitalData = {
  channel: "hastane";
  properties: HospitalDataProperties;
  geometry: Geometry;
};

export type FoodData = {
  channel: "yemek";
  properties: FoodDataProperties;
  geometry: Geometry;
};

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
  | HospitalData;

export type ChannelData = DataProperties & {
  reference?: number;
  closeByRecords?: number[];
  isVisited?: boolean;
};

// export type MarkerData = [GeoJSON, ChannelData];

export type Data = {
  id: number;
  full_text: string;
  formatted_address: string;
  extra_parameters?: string;
  timestamp: string;
  is_resolved: boolean;
  channel: Channel;
  reason: string | null;
};

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

export type DeviceType = "mobile" | "desktop";
