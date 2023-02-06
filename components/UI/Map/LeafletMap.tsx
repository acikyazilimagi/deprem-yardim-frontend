import React from "react";
import Map from "@/components/UI/Map/Map";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import dynamic from "next/dynamic";
import { DEFAULT_CENTER, DEFAULT_ZOOM, markers } from "./utils";

const MarkerClusterGroup = dynamic(() => import("./MarkerClusterGroup"), {
  ssr: false,
});

function LeafletMap({ onClickMarker }: any) {
  return (
    <Map center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM}>
      {({ TileLayer, Marker }: any) => (
        <>
          <TileLayer url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}" />
          <MarkerClusterGroup>
            {markers.map((marker: any) => (
              <Marker
                key={marker.name}
                position={[marker.lat, marker.lng]}
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
