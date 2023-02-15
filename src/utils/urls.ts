import { BASE_URL } from "./constants";

export const areasURL = `${BASE_URL}/feeds/areas`;
export const locationsURL = (locationId?: number) =>
  `${BASE_URL}/feeds/${locationId}`;
