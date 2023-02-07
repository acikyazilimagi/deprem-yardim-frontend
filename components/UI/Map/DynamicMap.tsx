import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { ReactNode, useEffect } from "react";
import * as ReactLeaflet from "react-leaflet";
import styles from "./Map.module.css";

interface MapProps {
  className?: string;
  children: ReactNode;
}

const corner1 = Leaflet.latLng(33.9825, 25.20902);
const corner2 = Leaflet.latLng(43.32683, 46.7742);
const bounds = Leaflet.latLngBounds(corner1, corner2);

const Map = ({ children, className, ...rest }: MapProps) => {
  const mapClassName = [styles.map, className].filter(Boolean).join(" ");

  useEffect(() => {
    (async function init() {
      // @ts-ignore
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: "leaflet/images/marker-icon-2x.webp",
        iconUrl: "leaflet/images/marker-icon.webp",
        shadowUrl: "leaflet/images/marker-shadow.webp",
      });
    })();
  }, []);

  return (
    <ReactLeaflet.MapContainer
      maxBoundsViscosity={1}
      maxBounds={bounds}
      className={mapClassName}
      {...rest}
    >
      {children}
    </ReactLeaflet.MapContainer>
  );
};

export default React.memo(Map);
