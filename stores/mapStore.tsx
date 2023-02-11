import { AhbapData } from "@/components/UI/Drawer/components/types";
import { LatLngBounds } from "leaflet";
import { create } from "zustand";
import {
  ClusterPopupData,
  CoordinatesURLParametersWithEventType,
  MarkerData,
  EVENT_TYPES,
  DeviceType,
} from "../mocks/types";

export enum MapType {
  Terrain = "p",
  Satellite = "s",
  Default = "m",
}

export enum MapLayer {
  Heatmap = "heatmap",
  Markers = "markers",
  Earthquakes = "earthquakes",
  Ahbap = "Ahbap",
}

interface MapState {
  popUpData: ClusterPopupData | null;
  drawerData: MarkerData | AhbapData | null;
  isDrawerOpen: boolean;
  coordinates?: CoordinatesURLParametersWithEventType;
  device: DeviceType;
  markerData: MarkerData[];
  mapType: MapType;
  mapLayers: MapLayer[];
  actions: {
    toggleDrawer: () => void;
    toggleMapLayer: (mapLayer: MapLayer) => void;
    setDrawerData: (data: MarkerData | AhbapData | null) => void;
    setPopUpData: (data: ClusterPopupData | null) => void;
    setCoordinates: (data: LatLngBounds, eventType: EVENT_TYPES) => void;
    setDevice: (device: DeviceType) => void;
    setMarkerData: (data: MarkerData[]) => void;
    setMapType: (mapType: MapType) => void;
  };
}

export const useMapStore = create<MapState>()((set) => ({
  drawerData: null,
  popUpData: null,
  isDrawerOpen: false,
  coordinates: undefined,
  device: "desktop",
  markerData: [],
  mapType: MapType.Default,
  mapLayers: [MapLayer.Heatmap, MapLayer.Markers],
  actions: {
    toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
    toggleMapLayer: (mapLayer: MapLayer) =>
      set(({ mapLayers }) => ({
        mapLayers: mapLayers.includes(mapLayer)
          ? mapLayers.filter((layer) => layer !== mapLayer)
          : mapLayers.concat(mapLayer),
      })),
    setDrawerData: (data: MarkerData | AhbapData | null) =>
      set(() => ({ drawerData: data })),
    setPopUpData: (data: ClusterPopupData | null) =>
      set(() => ({ popUpData: data })),
    setCoordinates: (data: LatLngBounds, eventType: EVENT_TYPES) =>
      set(() => ({
        coordinates: {
          eventType,
          ne_lat: data.getNorthEast().lat,
          ne_lng: data.getNorthEast().lng,
          sw_lat: data.getSouthWest().lat,
          sw_lng: data.getSouthWest().lng,
        },
      })),
    setDevice: (device: DeviceType) => set(() => ({ device })),
    setMarkerData: (markerData: MarkerData[]) => set(() => ({ markerData })),
    setMapType: (mapType) => set(() => ({ mapType })),
  },
}));

export const useIsDrawerOpen = () => useMapStore((state) => state.isDrawerOpen);
export const useDrawerData = () => useMapStore((state) => state.drawerData);
export const useMapActions = () => useMapStore((state) => state.actions);
export const useMapLayers = () => useMapStore((state) => state.mapLayers);
export const useMapType = () =>
  useMapStore((state) => state.mapType ?? MapType.Default);
export const usePopUpData = () => useMapStore((state) => state.popUpData);
export const useCoordinates = () => useMapStore((state) => state.coordinates);
export const useDevice = () => useMapStore((state) => state.device);
export const useMarkerData = () => useMapStore((state) => state.markerData);
export const setMarkerData = useMapStore.getState().actions.setMarkerData;
