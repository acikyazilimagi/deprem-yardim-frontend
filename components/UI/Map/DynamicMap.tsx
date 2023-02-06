import { useEffect } from "react";
import Leaflet from "leaflet";
import * as ReactLeaflet from "react-leaflet";
import { HeatmapLayerFactory } from "@vgrid/react-leaflet-heatmap-layer";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";
const HeatmapLayer = HeatmapLayerFactory<[number, number, number]>();
const { MapContainer } = ReactLeaflet;

const Map = ({ children, className, ...rest }: any) => {
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
      {children(ReactLeaflet, Leaflet, HeatmapLayer)}
    </MapContainer>
  );
};

export default Map;
