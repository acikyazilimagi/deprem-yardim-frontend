import Map from "@/components/UI/Map/Map";
import { MarkerData } from "@/mocks/types";
import { HeatmapLayerFactory } from "@vgrid/react-leaflet-heatmap-layer";
import { LeafletMouseEvent, SpiderfyEventHandlerFn } from "leaflet";
import { useMapActions } from "@/stores/mapStore";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { Fragment } from "react";
import { Marker, MarkerProps, TileLayer, useMapEvents } from "react-leaflet";
import { DEFAULT_CENTER, DEFAULT_IMPORTANCY, DEFAULT_ZOOM } from "./utils";
const HeatmapLayer = HeatmapLayerFactory<[number, number, number]>();

const MarkerClusterGroup = dynamic(() => import("./MarkerClusterGroup"), {
  ssr: false,
});

const MapLegend = dynamic(() => import("./MapLegend"), {
  ssr: false,
});

// const ImpactedCities = dynamic(() => import("./ImpactedCities"), {
//   ssr: false,
// });

type Props = {
  data: MarkerData[];
  onClickMarker: (_e: LeafletMouseEvent, _markerData: MarkerData) => void;
  onClusterClick: SpiderfyEventHandlerFn;
};

type ExtendedMarkerProps = MarkerProps & {
  markerData: MarkerData;
};

function ExtendedMarker({ ...props }: ExtendedMarkerProps) {
  return <Marker {...props} />;
}

const MapEvents = () => {
  const { setCoordinates } = useMapActions();

  const map = useMapEvents({
    moveend: () => setCoordinates(map.getBounds()),
    zoomend: () => setCoordinates(map.getBounds()),
  });

  return null;
};

function LeafletMap({ onClickMarker, data, onClusterClick }: Props) {
  return (
    <>
      <MapLegend />
      <Map center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM}>
        <MapEvents />
        {/* <ImpactedCities /> */}
        <TileLayer
          url={`https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&apistyle=s.e%3Al.i%7Cp.v%3Aoff%2Cs.t%3A3%7Cs.e%3Ag%7C`}
        />
        <MarkerClusterGroup eventHandlers={{ spiderfied: onClusterClick }}>
          {data.map((marker: MarkerData) => (
            <Fragment key={marker.place_id}>
              <ExtendedMarker
                key={marker.place_id}
                position={[
                  marker.geometry.location.lat,
                  marker.geometry.location.lng,
                ]}
                eventHandlers={{
                  click: (e) => {
                    onClickMarker(e, marker);
                  },
                }}
                markerData={marker}
              />
              <HeatmapLayer
                fitBoundsOnLoad
                fitBoundsOnUpdate
                radius={15}
                points={[
                  [
                    marker.geometry.location.lat,
                    marker.geometry.location.lng,
                    DEFAULT_IMPORTANCY,
                  ],
                ]}
                longitudeExtractor={(m: any) => m[1]}
                latitudeExtractor={(m: any) => m[0]}
                intensityExtractor={(m: any) => m[2]}
              />
            </Fragment>
          ))}
        </MarkerClusterGroup>
      </Map>
    </>
  );
}

export default LeafletMap;
