import { ReactNode, useEffect } from "react";
import Leaflet from "leaflet";
import * as ReactLeaflet from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";
const { MapContainer } = ReactLeaflet;

interface MapProps {
  className?: string;
  children: ReactNode;
}

const Map = ({ children, className, ...rest }: MapProps) => {
  let mapClassName = styles.map;

  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

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
    <MapContainer className={mapClassName} {...rest}>
      {children}
    </MapContainer>
  );
};

export default Map;
