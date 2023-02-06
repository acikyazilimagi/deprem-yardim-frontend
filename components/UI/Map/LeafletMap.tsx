import React from "react";
import Map from "@/components/UI/Map/Map";

const DEFAULT_CENTER = [37.2544, 37.3315];
const DEFAULT_ZOOM = 9;

function LeafletMap() {
  return (
    <Map center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM}>
      {({ TileLayer, Marker }: any) => (
        <>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            eventHandlers={{
              click: () => {
                console.log("clicked");
              },
            }}
            position={DEFAULT_CENTER}
          />
        </>
      )}
    </Map>
  );
}

export default LeafletMap;
