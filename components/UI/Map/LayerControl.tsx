import { MarkerData } from "@/mocks/types";
import { HeatmapLayerFactory } from "@vgrid/react-leaflet-heatmap-layer";
import { memo, useCallback, useEffect, useState } from "react";
import { LayerGroup, LayersControl } from "react-leaflet";
import ClusterGroup from "./ClusterGroup";
import localForage from "localforage";
import { localForageKeys } from "@/components/UI/Map/utils";
import { useTranslation } from "next-i18next";

const HeatmapLayer = memo(HeatmapLayerFactory<Point>());

export type Point = [number, number, number];

type Props = {
  points: Point[];
  data: MarkerData[];
};
const LayerControl = ({ points, data }: Props) => {
  const { t } = useTranslation("home");
  const longitudeExtractor = useCallback((p: Point) => p[1], []);
  const latitudeExtractor = useCallback((p: Point) => p[0], []);
  const intensityExtractor = useCallback((p: Point) => p[2], []);
  const [markersVisited, setMarkersVisited] = useState({});

  useEffect(() => {
    localForage
      .getItem(localForageKeys.markersVisited)
      .then(function (markersVisitedMap) {
        if (markersVisitedMap === null) {
          localForage.setItem(localForageKeys.markersVisited, {});
        } else {
          // @ts-ignore
          setMarkersVisited(markersVisitedMap);
        }
      })
      .catch(function (err) {
        console.log("localForageKeys.markersVisited", err);
      });
  }, [data]);

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
          <ClusterGroup data={data} markersVisited={markersVisited} />
        </LayerGroup>
      </LayersControl.Overlay>
    </LayersControl>
  );
};

export default LayerControl;
