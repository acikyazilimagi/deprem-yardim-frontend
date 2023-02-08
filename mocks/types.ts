export type Point = {
  lat: number;
  lng: number;
};
export type Geometry = {
  location: Point;
  viewport: {
    northeast: Point;
    southwest: Point;
  };
};
export type Photo = {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
};
export type MarkerData = {
  formatted_address: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  photos: Photo[];
  place_id: number;
  reference: number;
  types: string[];
  source: Raw;
};
export type Data = {
  html_attributions: string[];
  results: MarkerData[];
  status: string;
};

export type ClusterPopupData = {
  count: number;
  baseMarker: MarkerData;
  markers: any[];
};

export type Raw = {
  full_text?: string;
  tweet_id: string;
  name?: string;
  screen_name?: string;
};

export type LocationsResponse = {
  count: number;
  next?: string;
  previous?: string;
  results: LocationsResponseResult;
};

export type LocationsResponseResult = {
  id: string;
  formatted_address: string;
  loc: [number, number];
  viewport: {
    northeast: Point;
    southwest: Point;
  };
  raw: Raw;
  resolution: {
    address?: string;
    city?: string;
    distinct?: string;
    neighbourhood?: string;
    street?: string;
    no?: number;
    name_surname?: string;
    tel?: string;
  };
}[];

export type CoordinatesURLParameters = {
  ne_lat: number;
  ne_lng: number;
  sw_lat: number;
  sw_lng: number;
};

export type EVENT_TYPES = "moveend" | "zoomend" | "ready";

export type CoordinatesURLParametersWithEventType = CoordinatesURLParameters & {
  eventType: EVENT_TYPES;
};
