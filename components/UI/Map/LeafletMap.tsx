import React from "react";
import Map from "@/components/UI/Map/Map";

const DEFAULT_CENTER = [38.907132, -77.036546];

function LeafletMap() {
  return (
    <Map center={DEFAULT_CENTER} zoom={12}>
      {({ TileLayer, Marker, Popup }: any) => (
        <>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={DEFAULT_CENTER}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </>
      )}
    </Map>
  );
}

export default LeafletMap;
