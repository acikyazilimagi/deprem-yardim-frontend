import Map from "@/components/UI/Map/Map";
import {
  MapLayer,
  useDevice,
  useMapActions,
  useMapType,
} from "@/stores/mapStore";
import ResetViewControl from "@20tab/react-leaflet-resetview";
import { latLng, latLngBounds } from "leaflet";
import dynamic from "next/dynamic";
import { memo, useMemo } from "react";
import { TileLayer } from "react-leaflet";
import {
  DEFAULT_IMPORTANCY,
  DEFAULT_MIN_ZOOM_DESKTOP,
  DEFAULT_MIN_ZOOM_MOBILE,
} from "./utils";
import LayerControl, { Point } from "./LayerControl";
import ViewControl from "./ViewControl";
import { useURLActions } from "@/stores/urlStore";
import useDefaultZoom from "@/hooks/useDefaultZoom";
import useDefaultCenter from "@/hooks/useDefaultCenter";
import { ChannelData } from "@/types";
import { useMapEvents } from "@/hooks/useMapEvents";
import { MapClusterStyle } from "./MapClusterStyle";

const MapLegend = dynamic(() => import("./MapLegend"), {
  ssr: false,
});

const mapBoundaries = {
  southWest: latLng(34.025514, 25.584519),
  northEast: latLng(42.211024, 44.823563),
};

const bounds = latLngBounds(mapBoundaries.southWest, mapBoundaries.northEast);

interface ILeafletMap {
  locations: Omit<Record<MapLayer, ChannelData[]>, "heatmap" | "earthquakes">;
}

function LeafletMap(props: ILeafletMap) {
  useMapEvents();

  const { setCoordinates } = useURLActions();
  // const data = useAreasMarkerData();

  const data = props.locations[MapLayer.Markers];

  const mapType = useMapType();
  const { toggleDrawer, setDrawerData, setEventType } = useMapActions();
  const { defaultZoom } = useDefaultZoom();
  const { defaultCenter } = useDefaultCenter();

  const points: Point[] = useMemo(
    () =>
      Object.values(props.locations).flatMap((item) =>
        item.map(
          (marker) =>
            [
              marker.geometry.location.lng,
              marker.geometry.location.lat,
              DEFAULT_IMPORTANCY,
            ] as Point
        )
      ),
    [props.locations]
  );

  const device = useDevice();

  const baseMapUrl = `https://mt0.google.com/vt/lyrs=${mapType}&hl=en&x={x}&y={y}&z={z}&apistyle=s.e%3Al.i%7Cp.v%3Aoff%2Cs.t%3A3%7Cs.e%3Ag%7C`;

  return (
    <>
      <MapClusterStyle />
      <MapLegend />
      <Map
        center={defaultCenter}
        zoom={defaultZoom}
        minZoom={
          device === "desktop"
            ? DEFAULT_MIN_ZOOM_DESKTOP
            : DEFAULT_MIN_ZOOM_MOBILE
        }
        zoomSnap={1}
        zoomDelta={1}
        whenReady={(map: any) => {
          setTimeout(() => {
            setCoordinates(map.target.getBounds());
            setEventType("ready");
            map.target.invalidateSize();
          }, 100);
        }}
        preferCanvas
        maxBounds={bounds}
        maxBoundsViscosity={1}
        maxZoom={18}
      >
        <ResetViewControl title="Sıfırla" icon="url(/icons/circular.png)" />
        <ViewControl
          onClick={() => {
            setDrawerData(null);
            toggleDrawer();
          }}
        />
        <LayerControl points={points} data={data} locations={props.locations} />
        <TileLayer url={baseMapUrl} />
      </Map>
    </>
  );
}

export default memo(LeafletMap);
