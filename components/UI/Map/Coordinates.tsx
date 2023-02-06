import React, { useCallback } from "react";
import { LeafletMouseEvent } from "leaflet";
import { useMapEvents } from "react-leaflet";
import styles from "./Map.module.css";

export default function Coordinates() {
  const [coords, setCoords] = React.useState({ lat: 0, lng: 0 });

  const handleMouseMove = useCallback(
    ({ latlng: { lat, lng } }: LeafletMouseEvent) => {
      const coordsFixed = {
        lat: Number(lat.toFixed(7)),
        lng: Number(lng.toFixed(7)),
      };

      setCoords(coordsFixed);
    },
    [coords]
  );

  useMapEvents({
    mousemove: handleMouseMove,
  });

  const { lat, lng } = coords;

  return (
    <div className={styles.coordinates}>
      <p className={styles.coordtext}>lat: {lat}</p>
      <p className={styles.coordtext}>lng: {lng}</p>
    </div>
  );
}
