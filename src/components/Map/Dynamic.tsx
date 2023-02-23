import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { memo, ReactNode, useEffect } from "react";
import * as ReactLeaflet from "react-leaflet";
import styles from "./Map.module.css";

interface MapProps {
  className?: string;
  children: ReactNode;
}

const Map = ({ children, className, ...rest }: MapProps) => {
  const mapClassName = [styles.map, className].filter(Boolean).join(" ");

  useEffect(() => {
    (async function init() {
      // @ts-ignore
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        iconRetinaUrl: "/images/icon-generic.png",
        iconUrl: "/images/icon-generic.png",
        shadowUrl: "",
      });
    })();
  }, []);

  return (
    <ReactLeaflet.MapContainer className={mapClassName} {...rest}>
      {children}
    </ReactLeaflet.MapContainer>
  );
};

export default memo(Map);
