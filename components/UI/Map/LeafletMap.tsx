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
const DEFAULT_ZOOM = 13;

function LeafletMap() {
  return (
    <Map center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM}>
      {({ TileLayer, Marker, Popup }: any) => (
        <>
          <TileLayer
            url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <MarkerClusterGroup>
            <Marker
              position={DEFAULT_CENTER}
              eventHandlers={{
                click: () => {
                  console.log("clicked");
                },
              }}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
            <Marker position={DEFAULT_CENTER}></Marker>
            <Marker position={DEFAULT_CENTER}></Marker>
            <Marker position={DEFAULT_CENTER}></Marker>
            <Marker position={DEFAULT_CENTER}></Marker>
            <Marker position={DEFAULT_CENTER}></Marker>
            <Marker position={DEFAULT_CENTER}></Marker>
            <Marker position={DEFAULT_CENTER}></Marker>
          </MarkerClusterGroup>
        </>
      )}
    </Map>
  );
}

export default LeafletMap;
