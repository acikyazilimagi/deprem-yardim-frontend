import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";

export type Position = {
  lat: number;
  lng: number;
};

const Recenter: React.FC<Position> = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

export type MapProps = {
  position?: Position;
};
const Map: React.FC<MapProps> = ({
  position = { lat: 37.2544, lng: 37.3315 },
}) => {
  console.log(styles.leafletMap);
  return (
    <MapContainer
      center={[position.lat, position.lng]}
      zoom={9}
      scrollWheelZoom={false}
      className={styles.leafletMap}
    >
      <Recenter lat={position.lat} lng={position.lng} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[51.505, -0.09]}>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Marker>
    </MapContainer>
  );
};

export default Map;
