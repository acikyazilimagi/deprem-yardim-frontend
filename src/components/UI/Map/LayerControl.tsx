import { MarkerData } from "@/mocks/types";
import { HeatmapLayerFactory } from "@vgrid/react-leaflet-heatmap-layer";
import { memo, useCallback } from "react";
import ClusterGroup from "./ClusterGroup";
import { MapLayer, useMapLayers } from "@/stores/mapStore";
import { GenericClusterGroup } from "./GenericClusterGroup";
import { Channel } from "../Drawer/components/types";

const HeatmapLayer = memo(HeatmapLayerFactory<Point>());

export type Point = [number, number, number];

type Props = {
  points: Point[];
  data: MarkerData[];
  locations: Partial<Record<Channel, any>>;
};

const LocationPropertyMap: Partial<Record<string, Record<string, string>>> = {
  teleteyit: {
    description: "aciklama",
    type: "styleUrl",
    icon: "icon",
    verified: "durum",
    city: "il",
    district: "ilce",
  },
  satellite: {
    damage: "damage",
    verified: "is_location_verified",
  },
  sahra_mutfak: {
    name: "name",
    description: "description",
    icon: "icon",
    verified: "verified",
  },
  pharmacy: {
    name: "name",
    city: "city",
    state: "state",
    tel: "tel",
    open_hours: "open_hours",
  },

  deprem_ihtiyac: {
    name: "name",
    city: "city",
    state: "state",
    tel: "tel",
  },
};

const LayerControl = ({ points, data, locations }: Props) => {
  const mapLayers = useMapLayers();
  const longitudeExtractor = useCallback((p: Point) => p[1], []);
  const latitudeExtractor = useCallback((p: Point) => p[0], []);
  const intensityExtractor = useCallback((p: Point) => p[2], []);

  return (
    <>
      {mapLayers.includes(MapLayer.Heatmap) && (
        <HeatmapLayer
          fitBoundsOnUpdate
          radius={15}
          points={points}
          longitudeExtractor={longitudeExtractor}
          latitudeExtractor={latitudeExtractor}
          intensityExtractor={intensityExtractor}
          useLocalExtrema={false}
        />
      )}
      {mapLayers.includes(MapLayer.Markers) && <ClusterGroup data={data} />}

      {Object.keys(locations).map((key) => {
        if (
          mapLayers.includes(
            // REFACTOR: this is a workaround solution, need better solution
            (key.charAt(0).toUpperCase() + key.slice(1)) as MapLayer
          )
        ) {
          return (
            <GenericClusterGroup
              key={key}
              data={locations[key as Channel]}
              channelName={key as Channel}
              propertyMap={LocationPropertyMap[key] || undefined}
            />
          );
        }
      })}
    </>
  );
};

export default LayerControl;