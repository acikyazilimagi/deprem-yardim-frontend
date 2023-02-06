import React from "react";
import Map from "@/components/UI/Map/Map";

const DEFAULT_CENTER = [38.907132, -77.036546];

function LeafletMap(props: any) {
  return (
    <Map center={DEFAULT_CENTER} zoom={12}>
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
