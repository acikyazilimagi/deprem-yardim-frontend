import { ChannelData } from "@/types";
import { HeatmapLayerFactory } from "@vgrid/react-leaflet-heatmap-layer";
import { memo, useCallback } from "react";
import ClusterGroup from "./ClusterGroup";
import { MapLayer, useMapLayers } from "@/stores/mapStore";
import { GenericClusterGroup } from "./GenericClusterGroup";
import { useMapClickHandlers } from "@/hooks/useMapClickHandlers";

const HeatmapLayer = memo(HeatmapLayerFactory<Point>());

export type Point = [number, number, number];

type Props = {
  points: Point[];
  data: ChannelData[];
  locations: Record<MapLayer, ChannelData[]>;
};

const LayerControl = ({ points, data, locations }: Props) => {
  const mapLayers = useMapLayers();
  const longitudeExtractor = useCallback((p: Point) => p[1], []);
  const latitudeExtractor = useCallback((p: Point) => p[0], []);
  const intensityExtractor = useCallback((p: Point) => p[2], []);
  const { handleMarkerClick } = useMapClickHandlers();

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
              onMarkerClick={(e, markerData: ChannelData) => {
                handleMarkerClick(e, markerData);
              }}
            />
          );
        }
      })}
    </>
  );
};

export default LayerControl;
