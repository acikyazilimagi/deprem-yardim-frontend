import Map from "@/components/UI/Map/Map";
import L, { LeafletMouseEvent } from "leaflet";
import { MarkerData } from "@/mocks/types";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import densitySvg from "./DensitySvg";
import dynamic from "next/dynamic";
import React, { Fragment } from "react";
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

const createClusterCustomIcon = function (cluster: any) {
  const count = cluster.getChildCount();
  return L.divIcon({
    html: `${densitySvg(count)}`,
    className: "customMarker",
    iconSize: L.point(40, 40, true),
  });
};

function LeafletMap({ onClickMarker, data }: Props) {
  return (
    <>
      <MapLegend />
      <Map center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM}>
        <TileLayer
          url={`http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&apistyle=s.e%3Al.i%7Cp.v%3Aoff%2Cs.t%3A3%7Cs.e%3Ag%7C`}
        />
        <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
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
