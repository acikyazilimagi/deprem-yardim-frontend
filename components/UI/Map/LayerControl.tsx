import { MarkerData } from "@/mocks/types";
import { HeatmapLayerFactory } from "@vgrid/react-leaflet-heatmap-layer";
import { memo, useCallback } from "react";
import { LayerGroup, LayersControl } from "react-leaflet";
import { AhbapClusterGroup } from "./AhbapClusterGroup";
import ClusterGroup from "./ClusterGroup";
import { useTranslation } from "next-i18next";

const HeatmapLayer = memo(HeatmapLayerFactory<Point>());

export type Point = [number, number, number];

type Props = {
  points: Point[];
  data: MarkerData[];
  ahbap: any[];
};

const LayerControl = ({ points, data, ahbap }: Props) => {
  const { t } = useTranslation("home");
  const longitudeExtractor = useCallback((p: Point) => p[1], []);
  const latitudeExtractor = useCallback((p: Point) => p[0], []);
  const intensityExtractor = useCallback((p: Point) => p[2], []);

  return (
    <LayersControl position="topleft">
      <LayersControl.Overlay
        checked
        name={t("map.layerControl.heatmap").toString()}
      >
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
      <LayersControl.Overlay
        checked
        name={t("map.layerControl.dots").toString()}
      >
        <LayerGroup>
          <ClusterGroup data={data} />
        </LayerGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay checked={false} name="Ahbap data">
        <LayerGroup>
          <AhbapClusterGroup data={ahbap} />
        </LayerGroup>
      </LayersControl.Overlay>
    </LayersControl>
  );
};

export default LayerControl;
