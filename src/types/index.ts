export type Channel =
  | "twitter"
  | "babala"
  | "ahbap"
  | "generic"
  | "teleteyit"
  | "uydu"
  | "sahra_mutfak"
  | "turk_eczane"
  | "eczane_excel"
  | "guvenli_yerler_oteller";

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

export type AhbapData = {
  channel: "ahbap";
  properties: {
    name: string;
    description: string | { value: string };
    type: string;
    icon: string;
  };
  reference?: undefined;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  closeByRecords?: number[];
};

export type HospitalData = {
  channel: "hospital";
  properties: {
    name: string;
    description: string;
    type: string;
    icon: string;
  };
  reference?: undefined;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
};

export type TeleteyitData = {
  channel: "teleteyit";
  properties: {
    name: string;
    description: string;
    type: string;
    icon: string;
    verified: string;
    city: string;
    district: string;
  };
  reference?: undefined;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  closeByRecords?: number[];
};

export type SatelliteData = {
  channel: "uydu";
  properties: {
    damage: string;
  };
  reference?: undefined;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  closeByRecords?: number[];
};
export type SahraKitchenData = {
  channel: "sahra_mutfak";
  properties: {};
  reference?: undefined;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  id: number;
  reason: string;
  verified: string;
  closeByRecords?: number[];
};

export type PharmacyData = {
  channel: "eczane_excel";
  properties: {};
  reference?: undefined;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  id: number;
  reason: string;
  verified: string;
  closeByRecords?: number[];
};

export type SafePlaceData = {
  channel: "guvenli_yerler_oteller";
  properties: {
    reason: string;
    verified: string;
  };
  reference?: undefined;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  closeByRecords?: number[];
};

export type FeedChannelBabalaProps = BaseFeedChannel<BabalaParameters>;

export type FeedChannelTwitterProps = BaseFeedChannel<TwitterParameters>;

export type FeedChannelAhbapProps = AhbapData;

export type FeedChannelHospitalProps = HospitalData;

export type FeedChannelTeleteyitProps = TeleteyitData;

export type FeedChannelSatelliteProps = SatelliteData;

export type FeedChannelSahraKitchenProps = SahraKitchenData;

export type FeedChannelPharmacyProps = PharmacyData;

export type FeedChannelSafePlacesProps = SafePlaceData;

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
  results: {
    id: number;
    entry_id: number;
    loc: [number, number];
  }[];
};

export type Point = {
  lat: number;
  lng: number;
};

export type Geometry = {
  location: Point;
};

export type MarkerData = {
  geometry: Geometry;
  reference: number;
  isVisited: boolean;
  closeByRecords?: number[];
};

export type MarkerVisited = {
  [key: number]: boolean;
};

export type ClusterPopupData = {
  count: number;
  baseMarker: MarkerData;
  markers: any[];
};

export type EVENT_TYPES = "moveend" | "zoomend" | "ready";

export type DeviceType = "mobile" | "desktop";
