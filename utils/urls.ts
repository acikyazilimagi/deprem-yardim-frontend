import { BASE_URL } from "./constants";

export const areasURL = `${BASE_URL}/feeds/areas-lite`;
export const locationsURL = (locationId?: number) =>
  locationId ? `${BASE_URL}/feeds/locations/${locationId}` : null;
