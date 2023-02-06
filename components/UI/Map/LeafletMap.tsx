import React from "react";
import Map from "@/components/UI/Map/Map";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import dynamic from "next/dynamic";

const MarkerClusterGroup = dynamic(() => import("./MarkerClusterGroup"), {
  ssr: false,
});

const DEFAULT_CENTER = [37.0588348, 37.3450317];
const DEFAULT_ZOOM = 9;

const markers = [
  {
    lat: 37.0588348,
    lng: 37.3450317,
    name: "Marker 1",
  },
  {
    lat: 37.0588348,
    lng: 37.3450317,
    name: "Marker 2",
  },
  {
    lat: 37.0588348,
    lng: 37.3450317,
    name: "Marker 3",
  },
];

function LeafletMap({ onClickMarker }: any) {
  return (
    <Map center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM}>
      {({ TileLayer, Marker }: any) => (
        <>
          <TileLayer
            url="http://yol.kgm.gov.tr/wmts/kar_muc/gm_grid/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
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
