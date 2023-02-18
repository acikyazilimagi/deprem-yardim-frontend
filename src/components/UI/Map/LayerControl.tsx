import { ChannelData } from "@/types";
import { HeatmapLayerFactory } from "@vgrid/react-leaflet-heatmap-layer";
import { memo } from "react";
import ClusterGroup from "./ClusterGroup";
import { MapLayer, useMapLayers } from "@/stores/mapStore";
import { GenericClusterGroup } from "./GenericClusterGroup";
import { useRouter } from "next/router";

const HeatmapLayer = memo(HeatmapLayerFactory<Point>());

export type Point = [number, number, number];

type Props = {
  points: Point[];
  data: ChannelData[];
  locations: Partial<Record<MapLayer, ChannelData[]>>;
};

const longitudeExtractor = (p: Point) => p[1];
const latitudeExtractor = (p: Point) => p[0];
const intensityExtractor = (p: Point) => p[2];

const LayerControl = ({ points, data, locations }: Props) => {
  const mapLayers = useMapLayers();
  // const { handleMarkerClick } = useMapClickHandlers();
  //

  const router = useRouter();

  const onMarkerClick = (_e: any, markerData: ChannelData) => {
    console.log({ markerData });
    const query = { ...router.query, id: markerData.reference };
    router.push({ query }, { query });
  };

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

      {Object.keys(locations).map((key) => {
        if (mapLayers.includes(key as MapLayer)) {
          const data = locations[key as MapLayer];

          if (!data) {
            return null;
          }

          return (
            <GenericClusterGroup
              key={key}
              data={data}
              onMarkerClick={onMarkerClick}
            />
          );
        }
      })}
    </>
  );
};

export default LayerControl;
