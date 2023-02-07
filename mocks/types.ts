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
  place_id: string;
  reference: string;
  types: string[];
};
export type Data = {
  html_attributions: string[];
  results: MarkerData[];
  status: string;
};

export type ClusterPopupData = {
  count: number;
  baseMarker: MarkerData;
};

export type LocationsResponse = {
  count: number;
  next?: string;
  previous?: string;
  results: {
    id: string;
    formatted_address: string;
    loc: [number, number];
    viewport: {
      northeast: Point;
      southwest: Point;
    };
    raw: {
      full_text?: string;
      tweet_id?: string;
      name?: string;
      screen_name?: string;
    };
    resolution: {
      address?: string;
      city?: string;
      distinct?: string;
      neighbourhood?: string;
      street?: string;
      no?: number;
      name_surname?: any;
      tel?: string;
    };
  }[];
};

export type CoordinatesURLParameters = {
  ne_lat: number;
  ne_lng: number;
  sw_lat: number;
  sw_lng: number;
};
