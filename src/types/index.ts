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
  | "babala";

export type APIResponse<TChannel extends APIChannel = APIChannel> = {
  channel: TChannel;

  id: number;
  entry_id: number;
  reason?: string;
  extra_parameters: string;
  full_text?: string;
  formatted_address: string;
  timestamp?: string;

  loc: [number, number];

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
  | "sahra"
  | "eczane"
  | "guvenli"
  | "hastane";

export type ExtraParams = BabalaParameters | TwitterParameters;

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

export type BabalaResponse = APIResponseObject<
  "babala",
  {
    additional_notes: string;
    "isim-soyisim": string;
    manual_confirmation: string;
    name: string;
    name_surname: string;
    numara: string;
    status: string;
    tel: number;
    telefon: string;
  }
>;

export type BabalaParameters = {
  full_text: string;
  reason: string | null;
  timestamp: string | null;
  formatted_address: string;
  name: string | null;
  description: string | null;
};

export type TwitterResponse = APIResponseObject<
  "twitter",
  {
    tweet_id: string;
    screen_name: string;
    name?: string;
  }
>;

export type TwitterParameters = {
  tweet_id: string | null;
  screen_name: string | null;
  name: string | null;
  reason: string | null;
  full_text: string;
  timestamp: string | null;
  formatted_address: string;
  description: string | null;
};

export type AhbapResponse = APIResponseObject<
  "ahbap_location",
  {
    name: string;
    styleUrl: string;
    icon: string;
    description?: string;
  }
>;

export type AhbapDataProperties = {
  name: string | null;
  description: string | null;
  type: string | null;
  icon: string | null;
};

export type HospitalResponse = APIResponseObject<
  "hastahane_locations",
  {
    name: string;
    il: string;
    ilce: string;
    kurum: string;
  }
>;

export type HospitalDataProperties = {
  name: string | null;
  description: string | null;
  icon: string | null;
  city: string | null;
};

export type TeleteyitResponse = APIResponseObject<
  "teleteyit",
  {
    "isim-soyisim": string;
    numara: string;
    aciklama: string;
    il: string;
    ilce: string;
    excel_id: number;
    durum: string;
  }
>;

export type TeleteyitDataProperties = {
  name: string | null;
  description: string | null;
  icon: string;
  city: string | null;
  district: string | null;
  status: string | null;
};

export type SatelliteResponse = APIResponseObject<
  "uydu",
  {
    damage: string;
    formatted_address: string;
    longitude: number;
    latitude: number;
    shape_long: string;
    shape_area: string;
  }
>;

export type SatelliteDataProperties = {
  damage: string | null;
  verified: boolean | null;
  icon: string;
  name: string | null;
  description: string | null;
};

export type SahraResponse = APIResponseObject<
  "sahra_mutfak",
  {
    name: string;
    styleUrl: string;
    icon: string;
  }
>;

export type SahraDataProperties = {
  name: string | null;
  reason: string | null;
  verified: boolean | null;
  icon: string | null;
  description: string | null;
};

export type PharmacyResponse = APIResponseObject<
  "eczane_excel" | "turk_eczane",
  {
    name: string;
    description?: string;
    styleUrl: string;
    icon: string;
  }
>;

export type PharmacyDataProperties = {
  name: string | null;
  reason: string | null;
  verified: boolean | null;
  icon: string | null;
  description: string | null;
};

export type SafePlaceResponse = APIResponseObject<
  "guvenli_yerler_oteller",
  {
    name: string;
    description?: string;
    styleUrl: string;
    icon: string;
  }
>;

export type SafePlaceDataProperties = {
  reason: string | null;
  verified: boolean;
  name: string | null;
  icon: string;
  description: string | null;
};

export type FoodResponse = APIResponseObject<
  "sicak_yemek",
  {
    name: string;
    styleUrl: string;
    icon: string;
    description?: string;
  }
>;

export type FoodDataProperties = {
  name: string | null;
  description: string | null;
  type: string | null;
  icon: string | null;
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
  reference?: number | null;
  closeByRecords?: number[];
  isVisited?: boolean;
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
