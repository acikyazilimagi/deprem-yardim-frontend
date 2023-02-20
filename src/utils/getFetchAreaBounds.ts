import { Bounds } from "@/services/ApiClient";
import L from "leaflet";

export const getFetchAreaBounds = (bounds: L.LatLngBounds): Bounds => {
  return {
    ne_lat: bounds.getNorthEast().lat.toString(),
    ne_lng: bounds.getNorthEast().lng.toString(),
    sw_lat: bounds.getSouthWest().lat.toString(),
    sw_lng: bounds.getSouthWest().lng.toString(),
  };
};
