import { MarkerData } from "@/mocks/types";
import { HeatmapLayerFactory } from "@vgrid/react-leaflet-heatmap-layer";
import { memo, useCallback } from "react";
import { LayerGroup, LayersControl } from "react-leaflet";
import ClusterGroup from "./ClusterGroup";

const HeatmapLayer = memo(HeatmapLayerFactory<Point>());

export type Point = [number, number, number];

type Props = {
  points: Point[];
  data: MarkerData[];
};

const LayerControl = ({ points, data }: Props) => {
  const longitudeExtractor = useCallback((p: Point) => p[1], []);
  const latitudeExtractor = useCallback((p: Point) => p[0], []);
  const intensityExtractor = useCallback((p: Point) => p[2], []);
  return (
    <LayersControl position="topleft">
      <LayersControl.Overlay checked name="Isı haritası">
        <HeatmapLayer
          fitBoundsOnUpdate
          radius={15}
          points={points}
          longitudeExtractor={longitudeExtractor}
          latitudeExtractor={latitudeExtractor}
          intensityExtractor={intensityExtractor}
          useLocalExtrema={false}
        />
      </LayersControl.Overlay>
      <LayersControl.Overlay checked name="Noktalar">
        <LayerGroup>
          <ClusterGroup data={data} />
        </LayerGroup>
      </LayersControl.Overlay>
    </LayersControl>
  );
};

export default LayerControl;
