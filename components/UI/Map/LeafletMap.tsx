import Map from "@/components/UI/Map/Map";
import { MarkerData } from "@/mocks/types";
import { LeafletMouseEvent } from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { Fragment } from "react";
import { Marker, TileLayer } from "react-leaflet";
import { DEFAULT_CENTER, DEFAULT_IMPORTANCY, DEFAULT_ZOOM } from "./utils";
import { HeatmapLayerFactory } from "@vgrid/react-leaflet-heatmap-layer";
const HeatmapLayer = HeatmapLayerFactory<[number, number, number]>();

const MarkerClusterGroup = dynamic(() => import("./MarkerClusterGroup"), {
  ssr: false,
});

const MapLegend = dynamic(() => import("./MapLegend"), {
  ssr: false,
});

type Props = {
  data: MarkerData[];

  onClickMarker: (_e: LeafletMouseEvent, _markerData: MarkerData) => void;
};

function LeafletMap({ onClickMarker, data }: Props) {
  return (
    <>
      <MapLegend />
      <Map center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM}>
        <TileLayer
          url={`https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&apistyle=s.e%3Al.i%7Cp.v%3Aoff%2Cs.t%3A3%7Cs.e%3Ag%7C`}
        />
        <MarkerClusterGroup>
          {data.map((marker: MarkerData) => (
            <Fragment key={marker.place_id}>
              <Marker
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
                longitudeExtractor={(m) => m[1]}
                latitudeExtractor={(m) => m[0]}
                intensityExtractor={(m) => m[2]}
              />
            </Fragment>
          ))}
        </MarkerClusterGroup>
      </Map>
    </>
  );
}

export default LeafletMap;
