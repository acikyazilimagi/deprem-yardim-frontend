import { Bound } from "@/services/ApiClient";
import L from "leaflet";

export const getFetchAreaBound = (bounds: L.LatLngBounds): Bound => {
  return {
    ne_lat: bounds.getNorthEast().lat.toString(),
    ne_lng: bounds.getNorthEast().lng.toString(),
    sw_lat: bounds.getSouthWest().lat.toString(),
    sw_lng: bounds.getSouthWest().lng.toString(),
  };
};
