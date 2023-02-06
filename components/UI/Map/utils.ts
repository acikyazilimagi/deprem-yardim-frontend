export const DEFAULT_CENTER = [37.0588348, 37.3450317];
export const DEFAULT_ZOOM = 13;
export const DEFAULT_IMPORTANCY = 1;

export const markers = [
  {
    lat: 37.0588348,
    lng: 37.3450317,
    id: 1,
    name: "Marker 1",
    intensity: "high",
  },
  {
    lat: 37.0588348,
    lng: 37.3450317,
    id: 2,
    name: "Marker 2",
    intensity: "low",
  },
  {
    lat: 37.0588348,
    lng: 37.3450317,
    id: 3,
    name: "Marker 3",
    intensity: "mid",
  },
];

export type IMarker = (typeof markers)[0];
