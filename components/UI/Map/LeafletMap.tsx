import React, { useEffect, useState } from "react";
import Map from "@/components/UI/Map/Map";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import dynamic from "next/dynamic";
import styles from "./Map.module.css";
const MarkerClusterGroup = dynamic(() => import("./MarkerClusterGroup"), {
  ssr: false,
});

const DEFAULT_CENTER = [37.0588348, 37.3450317];
const DEFAULT_ZOOM = 9;
// buradaki attribution'lara stackoverflow'dan baktım bu şekilde attribution vermiş. Buraya kontrol rica ederim.
const maps:any = {
  "osm":{
        url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        att:"&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
        },
  "googlemap":{
        url:"http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}",
        att:"google"
        },
  "kgm":{
        url:"http://yol.kgm.gov.tr/wmts/kar_muc/gm_grid/{z}/{x}/{y}.png",
        att:"KGM"
      }
}
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
  const [firstMap, setFirstMap] = useState("osm")
  const [display, setDisplay] = useState(true)
  console.log(styles.mapbtns)
  return (
    <Map center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM}>
      {({ TileLayer, Marker }: any) => (
        <>
          <TileLayer
            url={maps[firstMap].url}
            attribution={maps[firstMap].att}
          />
          <div onClick={() => {setDisplay(!display)}} className={styles.dropdownMenu}>
            <div style={{paddingBottom:8, paddingLeft:5, borderBottom:"1px solid black"}}>
              Haritalar
            </div>
            <div style={{display:display ? "none" : "flex", flexDirection:"column"}}>
              <button className={styles.mapbtns} onClick={() => setFirstMap("googlemap")}>Harita 1</button>
              <button className={styles.mapbtns} onClick={() => setFirstMap("osm")} >Harita 2</button>
              <button className={styles.mapbtns} onClick={() => setFirstMap("kgm")}>Harita 3</button>
            </div>
          </div>
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
