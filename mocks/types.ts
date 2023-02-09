export type Point = {
  lat: number;
  lng: number;
};
export type Geometry = {
  location: Point;
};
export type Photo = {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
};
export type MarkerData = {
  geometry: Geometry;
  reference: number;
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

export type DrawerData = {
  id?: number;
  formatted_address?: string;
  fullText?: string;
  extraParameters?: string;
};

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

export type DeviceType = "mobile" | "desktop";