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
        iconRetinaUrl: "leaflet/images/marker-icon-2x.webp",
        iconUrl: "leaflet/images/marker-icon.webp",
        shadowUrl: "leaflet/images/marker-shadow.webp",
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
