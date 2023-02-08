import { useMapActions } from "@/stores/mapStore";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { ReactNode, useEffect } from "react";
import * as ReactLeaflet from "react-leaflet";
import styles from "./Map.module.css";

interface MapProps {
  className?: string;
  children: ReactNode;
}

const Map = ({ children, className, ...rest }: MapProps) => {
  const { setMap } = useMapActions();
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
    <ReactLeaflet.MapContainer className={mapClassName} {...rest} ref={setMap}>
      {children}
    </ReactLeaflet.MapContainer>
  );
};

export default React.memo(Map);
