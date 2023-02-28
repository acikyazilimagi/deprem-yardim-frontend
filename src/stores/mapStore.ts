/* eslint-disable no-unused-vars */
import {
  AhbapData,
  PharmacyData,
  SafePlaceData,
  SahraKitchenData,
  SatelliteData,
  TeleteyitData,
} from "@/types";
import { ClusterPopupData, DeviceType, EVENT_TYPES, MarkerData } from "@/types";
import { create } from "zustand";

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
  Hospital = "Hospital",
  Food = "Food",
  Teleteyit = "Teleteyit",
  Satellite = "Satellite",
  SahraMutfak = "SahraMutfak",
  Pharmacy = "Pharmacy",
  SafePlaces = "SafePlaces",
}

interface MapState {
  eventType?: EVENT_TYPES;
  popUpData: ClusterPopupData | null;
  drawerData:
    | MarkerData
    | AhbapData
    | TeleteyitData
    | SatelliteData
    | SahraKitchenData
    | SafePlaceData
    | PharmacyData
    | null;
  isDrawerOpen: boolean;
  device: DeviceType;
  mapType: MapType;
  mapLayers: MapLayer[];
  actions: {
    toggleDrawer: () => void;
    toggleMapLayer: (mapLayer: MapLayer) => void;
    setDrawerData: (
      data:
        | MarkerData
        | AhbapData
        | TeleteyitData
        | SatelliteData
        | SahraKitchenData
        | PharmacyData
        | SafePlaceData
        | null
    ) => void;
    setPopUpData: (data: ClusterPopupData | null) => void;
    setDevice: (device: DeviceType) => void;
    setMapType: (mapType: MapType) => void;
    setEventType: (eventType: EVENT_TYPES) => void;
  };
}

export const useMapStore = create<MapState>()((set) => ({
  drawerData: null,
  popUpData: null,
  isDrawerOpen: false,
  device: "desktop",
  markerData: [],
  mapType: MapType.Default,
  mapLayers: [
    MapLayer.Ahbap,
    MapLayer.Pharmacy,
    MapLayer.SafePlaces,
    MapLayer.Hospital,
    MapLayer.Food,
    MapLayer.Teleteyit,
    MapLayer.SahraMutfak,
  ],
  actions: {
    toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
    toggleMapLayer: (mapLayer: MapLayer) =>
      set(({ mapLayers }) => ({
        mapLayers: mapLayers.includes(mapLayer)
          ? mapLayers.filter((layer) => layer !== mapLayer)
          : mapLayers.concat(mapLayer),
      })),
    setDrawerData: (
      data:
        | MarkerData
        | SafePlaceData
        | AhbapData
        | TeleteyitData
        | SatelliteData
        | SahraKitchenData
        | PharmacyData
        | null
    ) => set(() => ({ drawerData: data })),
    setPopUpData: (data: ClusterPopupData | null) =>
      set(() => ({ popUpData: data })),
    setDevice: (device: DeviceType) => set(() => ({ device })),
    setMapType: (mapType) => set(() => ({ mapType })),
    setEventType: (eventType) => set(() => ({ eventType })),
  },
}));

export const useIsDrawerOpen = () => useMapStore((state) => state.isDrawerOpen);
export const useDrawerData = () => useMapStore((state) => state.drawerData);
export const useMapActions = () => useMapStore((state) => state.actions);
export const useMapLayers = () => useMapStore((state) => state.mapLayers);
export const useMapType = () =>
  useMapStore((state) => state.mapType ?? MapType.Default);
export const usePopUpData = () => useMapStore((state) => state.popUpData);
export const useDevice = () => useMapStore((state) => state.device);
export const useEventType = () => useMapStore((state) => state.eventType);
