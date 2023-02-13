import { LatLngBoundsExpression, LatLngExpression } from "leaflet";

export const DEFAULT_CENTER: LatLngExpression = [37.5922732, 36.8989255];
export const DEFAULT_ZOOM = 8;
export const DEFAULT_ZOOM_MOBILE = 8;
export const DEFAULT_IMPORTANCY = 1;
export const DEFAULT_MAX_BOUNDS: LatLngBoundsExpression = [
  [39.684006, 31.607263],
  [35.459834, 45.281141],
];
export const DEFAULT_MIN_ZOOM_DESKTOP = 6.4;
export const DEFAULT_MIN_ZOOM_MOBILE = 4.5;

export const localStorageKeys = {
  coordinatesURL: "coordinatesURL",
} as const;

export const localForageKeys = {
  markersVisited: "markersVisited",
} as const;

export const safeGetLocalStorage = (key: string) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const safeSetLocalStorage = (key: string, value: string): void => {
  try {
    return window.localStorage.setItem(key, value);
  } catch {
    //
  }
};
