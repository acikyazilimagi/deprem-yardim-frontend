import { MarkerData } from "@/types";
import { HeatmapLayerFactory } from "@vgrid/react-leaflet-heatmap-layer";
import { memo, useCallback } from "react";
import ClusterGroup from "./ClusterGroup";
import { MapLayer, useMapLayers } from "@/stores/mapStore";
import { GenericClusterGroup } from "./GenericClusterGroup";
import { DataSource } from "@/utils/data-source";

const HeatmapLayer = memo(HeatmapLayerFactory<Point>());

export type Point = [number, number, number];

type Props = {
  points: Point[];
  data: MarkerData[];
  locations: Partial<Record<MapLayer, any>>;
};

const LocationPropertyMap: any = {
  [MapLayer.SahraMutfak]: {
    name: "name",
    verified: "is_location_verified",
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
        if (mapLayers.includes(key as MapLayer)) {
          return (
            <GenericClusterGroup
              key={key}
              data={locations[key as MapLayer]}
              channelName={DataSource[key as MapLayer]}
              propertyMap={LocationPropertyMap[key as MapLayer]}
            />
          );
        }
      })}
    </>
  );
};

export default LayerControl;
