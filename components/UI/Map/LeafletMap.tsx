import React from "react";
import Map from "@/components/UI/Map/Map";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import dynamic from "next/dynamic";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "./utils";
import { MarkerData } from "../../../mocks/types";

const MarkerClusterGroup = dynamic(() => import("./MarkerClusterGroup"), {
  ssr: false,
});

type Props = {
  data: MarkerData[];
  onClickMarker: (e: any, markerData: MarkerData) => void;
};

function LeafletMap({ onClickMarker, data }: Props) {
  return (
    <Map center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM}>
      {({ TileLayer, Marker }: any) => (
        <>
          <TileLayer url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}" />
          <MarkerClusterGroup>
            {data.map((marker: MarkerData) => (
              <Marker
                key={marker.place_id}
                position={[
                  marker.geometry.location.lat,
                  marker.geometry.location.lng,
                ]}
                eventHandlers={{
                  click: (e: any) => {
                    onClickMarker(e, marker);
                  },
                }}
              />
            ))}
          </MarkerClusterGroup>
        </>
      )}
    </Map>
  );
}

export default LeafletMap;
