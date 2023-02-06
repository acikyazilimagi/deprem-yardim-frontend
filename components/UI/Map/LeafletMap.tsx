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

function LeafletMap() {
  return (
    <Map center={DEFAULT_CENTER} zoom={12}>
      {({ TileLayer, Marker, Popup }: any) => (
        <>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <MarkerClusterGroup>
            <Marker position={DEFAULT_CENTER}>
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
