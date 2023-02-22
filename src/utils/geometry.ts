import { APIResponseObject, Geometry } from "@/types";
export const createGeometry = (res: APIResponseObject): Geometry => ({
  location: {
    lat: res.loc?.[1] ?? res.lat ?? 0,
    lng: res.loc?.[0] ?? res.lng ?? 0,
  },
});
